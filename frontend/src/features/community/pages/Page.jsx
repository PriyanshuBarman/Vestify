import LoadingState from "@/components/LoadingState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Loader2Icon, SearchIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import UserPreviewCard from "../components/UserPreviewCard";
import NoUsersFound from "../components/empty-states/NoUsersFound";
import { useGetUsers } from "../hooks/useGetUsers";
import { useSearchUsers } from "../hooks/useSearchUsers";

function Page() {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const isMobile = useIsMobile();

  const {
    data: listData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isListPending,
  } = useGetUsers();

  const { data: searchData, isPending: isSearchPending } =
    useSearchUsers(search);

  const isSearching = !!search;
  const users = isSearching
    ? searchData || []
    : listData?.pages.flatMap((page) => page?.users || []) || [];

  const isPending = isSearching ? isSearchPending : isListPending;

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
    enabled: !isSearching,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isSearching) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage, isSearching]);

  const toggleSearch = () => {
    if (showSearch) {
      setSearch(""); // Clear search when closing
    }
    setShowSearch(!showSearch);
  };

  return (
    <div className="max-sm:px-4 max-sm:pb-24 sm:mx-auto sm:flex sm:gap-24">
      {/* Illustration */}
      {!isMobile && (
        <div className="flex w-[40%] flex-col items-center justify-center max-sm:hidden">
          <img
            src="./team-work.svg"
            alt="community illustrator"
            className="size-90"
          />
          <h2 className="text-2xl font-semibold tracking-tight">Community</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Discover other investors
          </p>
        </div>
      )}

      <div className="flex-1">
        <div className="sticky top-0 z-10 sm:top-20.5">
          {isMobile && (
            <div className="bg-background flex items-center justify-between pt-6 pb-4">
              <div className="space-y-1">
                <h1 className="text-xl font-semibold tracking-tight">
                  Community
                </h1>
                <p className="text-muted-foreground text-sm">
                  Discover other investors
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSearch}
                className="rounded-full"
              >
                {showSearch ? (
                  <XIcon className="size-6" />
                ) : (
                  <SearchIcon className="size-6" />
                )}
              </Button>
            </div>
          )}

          {(showSearch || !isMobile) && (
            <div className="animate-in slide-in-from-top-2 bg-background fade-in relative mt-1 mb-6 sm:mr-4">
              <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                autoFocus={isMobile}
                placeholder="Search by name or username..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 sm:rounded-xl sm:py-5"
              />
            </div>
          )}
        </div>

        {isPending ? (
          <LoadingState />
        ) : !users?.length ? (
          <NoUsersFound />
        ) : (
          <ScrollArea className="mask-b-from-95% sm:h-[calc(100vh-150px)]">
            <div className="space-y-4 pt-6 sm:mr-4">
              {users.map((user) => (
                <UserPreviewCard key={user.userId} user={user} />
              ))}

              {/* Pagination sentinel */}
              {!isSearching && (
                <div
                  ref={inViewRef}
                  className="flex h-16 w-full items-center justify-center"
                >
                  {isFetchingNextPage && (
                    <Loader2Icon className="text-muted-foreground animate-spin" />
                  )}
                  {!hasNextPage && users.length > 0 && (
                    <p className="text-muted-foreground text-xs opacity-50">
                      End of community
                    </p>
                  )}
                </div>
              )}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        )}
      </div>
    </div>
  );
}

export default Page;
