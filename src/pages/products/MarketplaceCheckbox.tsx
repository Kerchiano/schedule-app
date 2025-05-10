import { useFilters } from "@/contexts/FiltersContext";

interface MarketplaceProps {
  marketplace: string;
}

const MarketplaceCheckbox = ({ marketplace }: MarketplaceProps) => {
  const { selectedMarketplaces, toggleMarketplace } = useFilters();

  return (
    <li className="mb-2">
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          onChange={() => toggleMarketplace(marketplace)}
          checked={selectedMarketplaces.includes(marketplace)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        {marketplace}
      </label>
    </li>
  );
};

export default MarketplaceCheckbox;
