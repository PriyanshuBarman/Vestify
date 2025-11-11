import GoBackBar from "@/components/GoBackBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchProfile } from "@/hooks/useSearchProfile";
import { SearchIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

function SendMoneyPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query.trim().replace("@", ""));
  const inputRef = useRef(null);

  const { data: searchResult, isLoading } = useSearchProfile(debouncedQuery);

  return (
    <div className="mx-auto min-h-dvh sm:max-w-3xl">
      <GoBackBar title="Send Money" />

      {/* Searchbar */}
      <div className="SearchBar relative mx-4 mt-2">
        <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 sm:size-6" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search by name or username"
          className="sm:!text-md sm:placeholder:text-md rounded-xl pl-10 text-sm sm:py-6"
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
              <XIcon size={20} />
            )}
          </button>
        )}
      </div>

      <div className="mx-4 mt-6">
        {searchResult?.length > 0 ? (
          <ItemGroup>
            {searchResult.map((profile) => (
              <Item
                key={profile.userId}
                asChild
                className="hover:bg-accent/50 cursor-pointer transition-colors duration-100"
              >
                <Link
                  to="/wallet/enter-amount"
                  state={{
                    receiverId: profile.userId,
                    receiverName: profile.name,
                    receiverUsername: profile.username,
                    receiverAvatar: profile.avatar,
                  }}
                >
                  <ItemMedia variant="image">
                    <Avatar className="size-10">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback className="uppercase">
                        {profile?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent className="gap-0">
                    <ItemTitle className="capitalize">{profile.name}</ItemTitle>
                    <ItemDescription>@{profile.username}</ItemDescription>
                  </ItemContent>
                </Link>
              </Item>
            ))}
          </ItemGroup>
        ) : (
          query && (
            <div className="text-muted-foreground text-center">
              <p className="text-sm">No users found</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
export default SendMoneyPage;
