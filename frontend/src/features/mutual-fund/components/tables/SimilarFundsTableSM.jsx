import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  columnsConfig,
  getNextColumn,
  sortPeersBy,
} from "../../utils/similarFundsTableUtils";
import { formatToINR } from "@/utils/formatters";

function SimilarFundsTableSM({ fund }) {
  const [activeColumn, setActiveColumn] = useState("return_1y");
  const [peers, setPeers] = useState(fund.comparison || []);

  useEffect(() => {
    if (fund.comparison) setPeers(fund.comparison);
  }, [fund.comparison]);

  function handleSortClick() {
    const next = getNextColumn(activeColumn);
    setActiveColumn(next);
    let order = next === "expense_ratio" ? "asc" : "desc";
    setPeers((prevPeers) => sortPeersBy(prevPeers, next, order));
  }

  return (
    <div className="pl-4">
      <Table>
        <TableHeader>
          <TableRow className="border-transparent">
            <TableHead className="text-muted-foreground p-0">
              Fund name
            </TableHead>
            <TableHead onClick={handleSortClick} className="text-primary">
              <div className="flex items-center justify-end gap-1">
                <span>{columnsConfig[activeColumn].name}</span>
                <ChevronsUpDown className="fill-primary size-3.5" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {peers.map((peer) => (
            <TableRow key={peer.scheme_code}>
              <TableCell
                className={`${peer.name === fund.name && "font-semibold"} py-4 pl-0 whitespace-pre-wrap`}
              >
                <Link
                  to={`/mutual-funds/${peer.scheme_code}`}
                  className="hover:text-primary"
                >
                  {peer.short_name}
                </Link>
              </TableCell>
              <TableCell
                onClick={handleSortClick}
                className="py-4 pr-4 text-right font-[450]"
              >
                {peer[activeColumn]
                  ? activeColumn === "aum"
                    ? `${formatToINR(peer[activeColumn] / 10, 1)}Cr`
                    : `${columnsConfig[activeColumn].prefix}  ${peer[activeColumn]} ${columnsConfig[activeColumn].suffix}`
                  : "NA"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SimilarFundsTableSM;
