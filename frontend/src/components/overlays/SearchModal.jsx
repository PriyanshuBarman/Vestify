import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGetSearchResults } from "@/features/search/hooks/useGetSearchResults";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

export function SearchModal({ isOpen, onClose, onSelectFund }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query.trim());
  const { data: searchResult, isLoading } = useGetSearchResults(
    debouncedQuery,
    "mutualFunds",
  );

  const handleResultClick = (fund) => {
    onSelectFund(fund.scheme_code);
    setQuery("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="data-[state=open]:slide-in-from-top-6 data-[state=closed]:slide-out-to-top-6 fixed top-6 flex -translate-y-0 flex-col rounded-[1.25rem] p-2 sm:!max-w-[640px] [&>button:last-child]:hidden">
        <DialogHeader>
          <div className="SearchBar relative">
            <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 sm:size-6" />
            <Input
              type="text"
              placeholder="Search Fund"
              className="sm:!text-md sm:placeholder:text-md rounded-xl pl-10 text-sm !ring-0 sm:py-6"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto py-2">
          {isLoading ? (
            <Spinner className="text-primary sm:size-6 mx-auto" />
          ) : searchResult?.length > 0 ? (
            <ul className="space-y-2">
              {searchResult.map((fund) => (
                <li
                  key={fund.id}
                  className="hover:bg-accent cursor-pointer rounded-lg p-3 transition-colors"
                  onClick={() => handleResultClick(fund)}
                >
                  <div className="text-sm font-medium">{fund.short_name}</div>
                </li>
              ))}
            </ul>
          ) : (
            query && (
              <div className="text-muted-foreground text-center">
                <p className="text-sm">No funds found</p>
              </div>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
