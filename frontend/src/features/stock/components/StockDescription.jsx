function StockDescription({ stock }) {
  return (
    <div className="px-4">
      <h3 className="mb-3 text-lg font-semibold">About {stock.symbol}</h3>
      <div className="space-y-4">
        <div>
          <h4 className="mb-2 text-sm font-medium text-muted-foreground">
            Company Description
          </h4>
          <p className="text-sm leading-relaxed">
            {stock.description ||
              `${stock.symbol} is a publicly traded company listed on Indian stock exchanges. 
            For detailed information about the company's business operations, financial performance, and future prospects, 
            please refer to the company's investor relations page and regulatory filings.`}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
          <div>
            <p className="text-muted-foreground text-sm">Industry</p>
            <p className="font-medium">{stock.industry || "N/A"}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Sector</p>
            <p className="font-medium">{stock.sector || "N/A"}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Face Value</p>
            <p className="font-medium">{stock.faceValue || "N/A"}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Listing Date</p>
            <p className="font-medium">{stock.listingDate || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockDescription;
