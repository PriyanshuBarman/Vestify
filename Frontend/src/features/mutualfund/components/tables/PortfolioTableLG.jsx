import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatToINR } from "@/utils/formatters";
import { useNavigate } from "react-router";
import FundLogo from "../FundLogo";

function PortfolioTableLG({ portfolio }) {
  const navigate = useNavigate();

  return (
    <div className="mt-4 min-h-90 overflow-hidden rounded-3xl border">
      <Table className="table-fixed">
        <TableHeader className="bg-accent text-md h-18">
          <TableRow>
            <TableHead className="w-[40%] pl-14">Fund name</TableHead>
            <TableHead>Invested </TableHead>
            <TableHead>Current Value</TableHead>
            <TableHead>Returns</TableHead>
            <TableHead>Day Change</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-base font-medium tabular-nums">
          {portfolio?.map((fund) => (
            <TableRow
              onClick={() => navigate(`/mutual-funds/${fund.schemeCode}`)}
              key={fund.schemeCode}
            >
              <TableCell className="flex items-center gap-8 py-4 pl-8">
                <FundLogo noFormat fundHouseDomain={fund.fundHouseDomain} />
                <div>
                  <h4 className="text-wrap">{fund.shortName}</h4>
                  <p className="text-muted-foreground mt-1 flex items-center text-xs font-medium">
                    {fund.fundType}
                  </p>
                </div>
              </TableCell>

              <TableCell className="font-medium">
                {formatToINR(fund.invested)}
              </TableCell>

              <TableCell
                className={` ${Number(fund.current) >= Number(fund.invested) ? "text-positive" : "text-negative"} `}
              >
                {formatToINR(fund.current, 2)}
              </TableCell>

              <TableCell>
                <div
                  className={`${Number(fund.pnl) >= 0 ? "text-positive" : "text-negative"} space-x-4 text-start`}
                >
                  <p>{formatToINR(fund.pnl, 2)}</p>
                  <p
                    className={`${Number(fund.returnPercent) >= 0 ? "text-positive" : "text-negative"} text-sm font-light`}
                  >
                    ({fund.returnPercent}%)
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <div
                  className={`${Number(fund.dayChangeValue) >= 0 ? "text-positive" : "text-negative"} space-x-4 text-start`}
                >
                  <p>{formatToINR(fund.dayChangeValue, 2)}</p>
                  <p
                    className={`${Number(fund.dayChangePercent) >= 0 ? "text-positive" : "text-negative"} text-sm font-light`}
                  >
                    ({fund.dayChangePercent}%)
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PortfolioTableLG;
