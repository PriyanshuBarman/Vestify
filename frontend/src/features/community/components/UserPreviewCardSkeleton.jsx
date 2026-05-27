import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
} from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";

function UserPreviewCardSkeleton() {
  return (
    <Item variant="outline" className="rounded-3xl">
      <ItemMedia>
        <Skeleton className="size-11 rounded-full sm:size-12" />
      </ItemMedia>

      <ItemContent className="gap-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-3.5 w-24" />
      </ItemContent>

      <ItemActions>
        <Skeleton className="h-5 w-8" />
      </ItemActions>
    </Item>
  );
}

export default UserPreviewCardSkeleton;
