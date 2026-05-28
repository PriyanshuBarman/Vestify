import { useEffect, useState } from "react";
import { FilterIcon, Loader2Icon, SearchIcon } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { useGetUserCount } from "@/hooks/useGetUserCount";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import {
  selectExpandedCardIndex,
  selectSortBy,
  setSortBy,
  toggleExpandedCardIndex,
} from "@/store/slices/communitySlice";

import NoUsersFound from "../components/empty-states/NoUsersFound";
import UserPreviewCard from "../components/UserPreviewCard";
import UserPreviewCardSkeleton from "../components/UserPreviewCardSkeleton";
import { useGetUsers } from "../hooks/useGetUsers";
import { useSearchUser } from "../hooks/useSearchUser";

function Page() {
  const [search, setSearch] = useState("");
  const expandedCardIndex = useSelector(selectExpandedCardIndex);
  const sortBy = useSelector(selectSortBy);
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const {
    data: listData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isListPending,
  } = useGetUsers({ sortBy });
  const { data: totalUsersCount } = useGetUserCount();

  const { data: searchData, isPending: isSearchPending } =
    useSearchUser(search);

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

  return (
    <div className="max-sm:px-4 relative max-sm:pb-16 sm:mx-auto sm:flex sm:gap-24">
      {/* Illustration */}
      {!isMobile && (
        <div className="flex w-[45%] flex-col items-center justify-center max-sm:hidden">
          <img
            src="./team-work.svg"
            alt="Community illustration"
            className="size-120"
            loading="lazy"
            draggable={false}
          />
          <h1 className="text-2xl font-semibold tracking-tight">
            Community /
            <span className="text-xl ml-2">
              {totalUsersCount || 100}+ users
            </span>
          </h1>
          <p className="text-muted-foreground sm:text-base mt-2 text-sm">
            Discover other investor profiles
          </p>
        </div>
      )}

      <div className="flex-1">
        <div className="sticky top-0 z-10 sm:top-20.5">
          <div className="bg-background flex items-center justify-between pt-6 pb-4">
            <div className="space-y-1 sm:hidden">
              <h1 className="text-xl font-semibold tracking-tight">
                Community /
                <span className="text-md font-medium ml-1">
                  {totalUsersCount || 100}+ users
                </span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Discover other investors
              </p>
            </div>
            <div className="flex max-sm:border max-sm:rounded-full max-sm:px-1 max-sm:py-0.75 sm:w-full items-center gap-1">
              {isMobile ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    navigate("/search-user", { state: { mode: "community" } })
                  }
                >
                  <SearchIcon className="size-6" />
                </Button>
              ) : (
                <div className="bg-background fade-in relative flex-1 sm:mr-4">
                  <SearchIcon className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
                  <Input
                    autoFocus={isMobile}
                    placeholder="Search by name or username..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 sm:rounded-xl sm:py-5"
                  />
                </div>
              )}

              <Select
                value={sortBy}
                onValueChange={(value) => dispatch(setSortBy(value))}
              >
                <SelectTrigger
                  size="sm"
                  aria-label="Sort"
                  className="border-transparent max-sm:!bg-transparent shadow-none [&_[data-slot=select-value]]:sr-only [&_svg:last-child]:hidden"
                >
                  <SelectValue placeholder="Sort" />
                  <FilterIcon className="text-foreground size-5" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="rounded-xl [&_[data-slot=select-item]]:rounded-lg "
                >
                  <SelectItem value="updatedAt">Recently Active</SelectItem>
                  <SelectItem value="createdAt">New Users</SelectItem>
                  <SelectItem value="name">A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <ScrollArea className="sm:h-[calc(100vh-150px)] sm:mask-b-from-95%">
          <div className="space-y-4 pt-6 pb-8 sm:mr-4">
            {isPending ? (
              <>
                {Array.from({ length: 6 }).map((_, index) => (
                  <UserPreviewCardSkeleton key={index} />
                ))}
              </>
            ) : !users?.length ? (
              <NoUsersFound />
            ) : (
              <>
                {users.map((user, index) => (
                  <UserPreviewCard
                    key={user.username}
                    user={user}
                    isExpanded={expandedCardIndex === index}
                    onToggle={() => dispatch(toggleExpandedCardIndex(index))}
                  />
                ))}

                {/* Pagination sentinel */}
                {!isSearching && hasNextPage && (
                  <div
                    ref={inViewRef}
                    className="flex h-16 w-full items-center justify-center"
                  >
                    {isFetchingNextPage && (
                      <Loader2Icon className="text-muted-foreground animate-spin" />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
      <ScrollToTopButton className="bottom-20" scrollThreshold={1800} />
    </div>
  );
}

export default Page;
