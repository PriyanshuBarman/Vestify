import { UsersThreeIcon } from "@phosphor-icons/react";

function NoUsersFound() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted rounded-full p-4">
        <UsersThreeIcon className="text-muted-foreground h-8 w-8" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">No users found</h3>
      <p className="text-muted-foreground mt-2 max-w-xs text-sm">
        Try adjusting your search terms or check back later.
      </p>
    </div>
  );
}

export default NoUsersFound;
