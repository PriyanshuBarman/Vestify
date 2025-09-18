import GoBackBar from "@/components/GoBackBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader2Icon, SearchIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchProfile } from "../hooks/queries/internalQueries";

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
              <Loader2Icon className="text-primary animate-spin" />
            ) : (
              <XIcon size={20} />
            )}
          </button>
        )}
      </div>

      <div className="mx-4 mt-6">
        {searchResult?.length > 0 ? (
          <ul className="space-y-2">
            {searchResult.map((user) => (
              <li
                onClick={() =>
                  navigate("/upi/enter-amount", {
                    state: {
                      name: user.name,
                      username: user.username,
                      avatar: user.avatar,
                    },
                  })
                }
                key={user.username}
                className="flex cursor-pointer gap-4 p-3"
              >
                <Avatar className="size-12">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback />
                </Avatar>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-muted-foreground text-md">
                    @{user.username}
                  </p>
                </div>
              </li>
            ))}
          </ul>
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
