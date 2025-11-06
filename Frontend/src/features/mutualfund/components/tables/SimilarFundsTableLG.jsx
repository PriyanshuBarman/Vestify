import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  columnsConfig,
  getNewOrder,
  sortPeersBy,
} from "../../utils/similarFundsTable";

const DEFAULT_COLUMNS = [
  "return_1y",
  "return_3y",
  "return_5y",
  "return_since_inception",
];

function SimilarFundsTableLG({ fund }) {
  const [activeColumn, setActiveColumn] = useState("return_1y");
  const [sortOrder, setSortOrder] = useState("desc");
  const [peers, setPeers] = useState(fund.comparison || []);

  useEffect(() => setPeers(fund.comparison || []), [fund.comparison]);

  function handleSortClick(clicked) {
    const newOrder = getNewOrder(clicked, activeColumn, sortOrder);
    setPeers((prevPeers) => sortPeersBy(prevPeers, clicked, newOrder));
    setActiveColumn(clicked);
    setSortOrder(newOrder);
  }

  return (
    <div className="overflow-hidden rounded-2xl border">
      <Table>
        <TableHeader>
          <TableRow className="bg-accent">
            <TableHead className="py-5 pl-6">Fund name</TableHead>
            {DEFAULT_COLUMNS.map((key) => (
              <TableHead key={key}>
                <div
                  onClick={() => handleSortClick(key)}
                  className={`flex h-full cursor-pointer items-center gap-2 py-4 ${
                    activeColumn === key && "fill-foreground font-bold"
                  }`}
                >
                  {columnsConfig[key].shortName}
                  {activeColumn === key ? (
                    <ChevronDownIcon
                      className={`size-4 fill-inherit transition-all duration-200 ease-in ${sortOrder === "desc" && "rotate-180"}`}
                    />
                  ) : (
                    <ChevronDownIcon className="fill-foreground size-4" />
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="text-md">
          {peers.map((peer) => (
            <TableRow key={peer.scheme_code}>
              <TableCell
                className={`${peer.name === fund.name && "font-semibold"} py-5 pl-6`}
              >
                <Link
                  to={`/mutual-funds/${peer.scheme_code}`}
                  className="hover:text-primary"
                >
                  {peer.short_name}
                </Link>
              </TableCell>
              {DEFAULT_COLUMNS.map((key) => (
                <TableCell
                  key={key}
                  onClick={() => handleSortClick(key)}
                  className={`py-4 ${activeColumn === key && "font-semibold"} `}
                >
                  {peer[key]
                    ? `${columnsConfig[key].prefix || ""} ${peer[key]}${columnsConfig[key].suffix || ""}`
                    : "NA"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SimilarFundsTableLG;
