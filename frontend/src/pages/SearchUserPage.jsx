import { useRef, useState } from "react";
import { HistoryIcon, SearchIcon, Trash2Icon, XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

import { useDebounce } from "@/hooks/useDebounce";
import { useGetUser } from "@/hooks/useGetUser";
import { useSearchProfile } from "@/hooks/useSearchProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import GoBackBar from "@/components/GoBackBar";
import UserAvatar from "@/components/UserAvatar";
import {
  addUserSearchHistory,
  clearUserSearchHistory,
} from "@/store/slices/searchSlice";
import { getNavigationConfig } from "@/utils/searchUserProfile";

function SearchUserPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query.trim().replace("@", ""));
  const inputRef = useRef(null);
  const location = useLocation();
  // Get mode from location state - "send-money" or "community" (default)
  const mode = location.state?.mode || "community";
  const userSearchHistory =
    useSelector((state) => state.search.userSearchHistory) || [];
  const { data: user } = useGetUser();
  const dispatch = useDispatch();

  const { data: searchResult, isLoading } = useSearchProfile(debouncedQuery);

  const isSelf = (userId) => {
    return userId === user.id;
  };

  const handleResultClick = (profile) => {
    if (isSelf(profile?.userId) && mode === "send-money") {
      return toast.info("You can't pay yourself");
    }

    const navConfig = getNavigationConfig(mode, profile);
    dispatch(addUserSearchHistory({ profile }));
    navigate(navConfig.pathname, { state: navConfig.state });
  };

  return (
    <div className="mx-auto min-h-dvh sm:max-w-3xl">
      <GoBackBar
        title={mode === "send-money" ? "Send Money" : "Search User"}
        showSearchIcon={false}
      />

      {/* Searchbar */}
      <div className="SearchBar relative mx-4 mt-2">
        <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 sm:left-5 sm:size-6" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search by name or username"
          className="sm:!text-md h-10 sm:placeholder:text-md rounded-xl pl-10 text-sm sm:py-6  sm:pl-14"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        {query.length > 0 && (
          <button
            className="Clear-Btn absolute top-1/2 right-4 z-50 -translate-y-1/2"
            disabled={isLoading}
            onClick={() => {
              inputRef.current.focus();
              setQuery("");
            }}
          >
            {isLoading ? (
              <Spinner className="text-primary" />
            ) : (
              <XIcon size={16} />
            )}
          </button>
        )}
      </div>

      <div className="mx-4 mt-6">
        {searchResult?.length > 0 ? (
          <ItemGroup>
            {searchResult.map((profile) => {
              return (
                <Item
                  onClick={() => handleResultClick(profile)}
                  key={profile.userId}
                  className="hover:bg-accent/50"
                >
                  <ItemMedia variant="image">
                    <UserAvatar user={profile} />
                  </ItemMedia>
                  <ItemContent className="gap-0">
                    <ItemTitle className="capitalize">{profile.name}</ItemTitle>
                    <ItemDescription>@{profile.username}</ItemDescription>
                  </ItemContent>
                </Item>
              );
            })}
          </ItemGroup>
        ) : query ? (
          <div className="text-muted-foreground text-center">
            <p className="text-sm">No users found</p>
          </div>
        ) : userSearchHistory.length > 0 ? (
          <ItemGroup>
            <div className="flex items-center justify-end px-2 pb-2">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => dispatch(clearUserSearchHistory())}
              >
                <Trash2Icon />
              </Button>
            </div>
            {userSearchHistory.map((profile) => {
              return (
                <Item
                  onClick={() => handleResultClick(profile)}
                  key={profile.userId}
                  className="hover:bg-accent/50 cursor-pointer transition-colors duration-100"
                >
                  <ItemMedia variant="image">
                    <UserAvatar user={profile} />
                  </ItemMedia>
                  <ItemContent className="gap-0">
                    <ItemTitle className="capitalize">{profile.name}</ItemTitle>
                    <ItemDescription>@{profile.username}</ItemDescription>
                  </ItemContent>
                  <div className="ml-auto text-muted-foreground">
                    <HistoryIcon className="size-5" />
                  </div>
                </Item>
              );
            })}
          </ItemGroup>
        ) : null}
      </div>
    </div>
  );
}

export default SearchUserPage;
