import { createContext, useContext, useState, type ReactNode } from "react";

type FiltersContextType = {
  selectedCategories: string[];
  selectedSubcategories: string[];
  selectedMarketplaces: string[];
  toggleCategory: (name: string) => void;
  toggleSubcategory: (name: string) => void;
  toggleMarketplace: (name: string) => void;
};

interface FiltersProviderProps {
  children: ReactNode;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({ children }: FiltersProviderProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [selectedMarketplaces, setSelectedMarketplaces] = useState<string[]>(
    []
  );

  const toggleCategory = (name: string) => {
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const toggleSubcategory = (name: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const toggleMarketplace = (name: string) => {
    setSelectedMarketplaces((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <FiltersContext.Provider
      value={{
        selectedCategories,
        selectedSubcategories,
        selectedMarketplaces,
        toggleCategory,
        toggleSubcategory,
        toggleMarketplace,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = (): FiltersContextType => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};
