import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

import { indices } from "../constants/indices";
import { useGetLiveIndices } from "../hooks/useGetLiveIndices";
import { useSubscribeStock } from "../hooks/useSubscribeStock";

function Indices() {
  const symbols = indices.map((item) => item.symbol);
  const indicesData = useGetLiveIndices(symbols);
  useSubscribeStock(symbols);

  return (
    <div className="py-4 px-4 sm:px-0 flex items-center justify-between gap-4 overflow-auto scrollbar-none">
      {indices.map((item) => {
        const liveData = indicesData?.[item.symbol];
        return (
          <Item
            key={item.symbol}
            variant="outline"
            className="flex-1 basis-0 min-w-46 sm:min-w-[11rem] p-3 rounded-xl"
          >
            <ItemContent>
              <ItemTitle className="text-xs">{item.name}</ItemTitle>
              <ItemDescription className="text-xs">
                {liveData?.price || "--"}{" "}
                <span className="text-positive">
                  {liveData?.change > 0 ? "+" : ""}
                  {liveData?.change} ({liveData?.changePercent}%)
                </span>
              </ItemDescription>
            </ItemContent>
          </Item>
        );
      })}
    </div>
  );
}
export default Indices;
