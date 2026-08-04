function NoResult({ query, searchType }) {
  return (
    <div className="flex flex-col py-12 sm:py-28 px-4 items-center justify-center sm:space-y-2 space-y-1 ">
      <span className=" text-sm sm:text-md">
        No results found for “{query}”
      </span>
      {searchType === "indianStocks" && (
        <span className="text-muted-foreground/80 text-xs sm:text-sm  px-4 text-center">
          Please type the full name of the stock or its symbol
        </span>
      )}
    </div>
  );
}

export default NoResult;
