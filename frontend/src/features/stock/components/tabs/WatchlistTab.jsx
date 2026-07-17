import SectionHeading from "@/components/SectionHeading";

function WatchlistTab() {
  return (
    <div className="px-4 py-6">
      <SectionHeading
        heading="Watchlist"
        subheading="Your favorite stocks at a glance"
      />

      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-muted-foreground mb-4">
          <svg
            className="mx-auto size-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">No stocks in watchlist</h3>
        <p className="text-muted-foreground text-sm max-w-md">
          Start adding stocks to your watchlist to track their performance here.
        </p>
      </div>
    </div>
  );
}

export default WatchlistTab;
