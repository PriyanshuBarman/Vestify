import { useGetAMCs } from "../../hooks/useGetAMCs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSelector, useDispatch } from "react-redux";
import { selectFilters, setFilters } from "@/store/slices/mutualFundSlice";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import LoadingState from "@/components/LoadingState";

function FilterFundHouseTab() {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  const { data = [], isLoading } = useGetAMCs();
  const [searchTerm, setSearchTerm] = useState("");

  const amcs = useMemo(() => {
    return data.filter((amc) => {
      const amcName = amc.amc_name.toLowerCase();
      return amcName.includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm]);

  const selectedAMCs = filters?.amc_name;

  const handleChange = (amcName) => {
    if (selectedAMCs.includes(amcName)) {
      dispatch(
        setFilters({
          ...filters,
          amc_name: selectedAMCs.filter((n) => n !== amcName),
        }),
      );
    } else {
      dispatch(
        setFilters({
          ...filters,
          amc_name: [...selectedAMCs, amcName],
        }),
      );
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="bg-background sticky top-0 z-10 mb-4 flex items-center p-1">
        <div className="SearchBar relative w-full">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            type="search"
            placeholder="Search fund house"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-input bg-background focus:ring-primary w-full rounded-md border py-6 pr-3 pl-9 text-sm focus:ring-2 focus:outline-none"
          />
        </div>
      </div>

      {amcs.map((amc) => (
        <Label
          key={amc.amc_code}
          className="flex items-center space-x-3 border-b p-2 py-4 font-normal"
        >
          <Checkbox
            checked={selectedAMCs.includes(amc.amc_name)}
            onCheckedChange={() => handleChange(amc.amc_name)}
            className="data-[state=checked]:border-primary border-muted-foreground size-4.5 border-2"
          />
          <span className="leading-normal capitalize">
            {amc.amc_name.toLowerCase()}
          </span>
        </Label>
      ))}

      {amcs.length < 1 && !isLoading ? (
        <div className="text-center text-sm">No results found</div>
      ) : null}

      <LoadingState isLoading={isLoading} className="mb-4" />
    </div>
  );
}

export default FilterFundHouseTab;
