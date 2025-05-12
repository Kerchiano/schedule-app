import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import data from "data.json";
import type { Category, Product, Subcategory } from "@/types/products";

interface ScheduleSettings {
  categories: Record<string, { days: string[]; marketplaces: string[] }>;
  subcategories: Record<string, { days: string[]; marketplaces: string[] }>;
  products: Record<string, { days: string[]; marketplaces: string[] }>;
}

interface FiltersContextType {
  selectedCategories: string[];
  selectedSubcategories: string[];
  selectedMarketplaces: string[];
  selectedDay: string;
  filteredCategories: Category[];
  getFilteredSubcategories: (
    categorySlug: string,
    selectedDay: string,
    scheduleSettings: ScheduleSettings
  ) => Subcategory[];
  filteredProducts: Product[];
  toggleCategory: (name: string) => void;
  toggleSubcategory: (name: string) => void;
  toggleMarketplace: (name: string) => void;
  toggleDay: (day: string) => void;
  getScheduleFromLocalStorage: () => ScheduleSettings;
}

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
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    Record<string, Subcategory[]>
  >({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const getFilteredSubcategories = (
    categorySlug: string,
    selectedDay: string,
    scheduleSettings: ScheduleSettings
  ): Subcategory[] => {
    if (!selectedDay || !(categorySlug in scheduleSettings.categories)) {
      return [];
    }

    const categories = data.categories.filter(
      (cat) => cat.slug === categorySlug
    );

    if (categories.length === 0) return [];

    const category = categories[0];

    return category.subcategories.filter((subcategory) => {
      const subSettings = scheduleSettings.subcategories?.[subcategory.slug];

      return subSettings;
    });
  };

  const toggleCategory = (name: string) => {
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(name)
        ? prev.filter((cat) => cat !== name)
        : [...prev, name];

      const category = data.categories.find((cat) => cat.name === name);
      if (category) {
        const subcategoriesToUpdate = category.subcategories.map(
          (sub) => sub.name
        );
        setSelectedSubcategories((prevSubcategories) => {
          return updatedCategories.includes(name)
            ? [...new Set([...prevSubcategories, ...subcategoriesToUpdate])]
            : prevSubcategories.filter(
                (sub) => !subcategoriesToUpdate.includes(sub)
              );
        });
      }

      return updatedCategories;
    });
  };

  const toggleSubcategory = (name: string) => {
    const category = data.categories.find((cat) =>
      cat.subcategories.some((sub) => sub.name === name)
    );
    if (!category || !category.name) return;
    const index = selectedCategories.indexOf(category?.name);

    const updatedCategories = [...selectedCategories];
    updatedCategories.splice(index, 1);
    setSelectedCategories(updatedCategories);

    setSelectedSubcategories((prev) =>
      prev.includes(name)
        ? prev.filter((subcategory) => subcategory !== name)
        : [...prev, name]
    );
  };

  const toggleMarketplace = (name: string) => {
    setSelectedMarketplaces((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const toggleDay = (day: string) => {
    setSelectedDay((prevDay) => (prevDay === day ? "" : day));
  };

  const getScheduleFromLocalStorage = () => {
    const scheduleSettings = JSON.parse(
      localStorage.getItem("scheduleSettings") || "{}"
    );
    return scheduleSettings;
  };

  useEffect(() => {
    if (selectedDay === "") {
      setFilteredCategories(data.categories);

      const groupedSubcategories = data.categories.reduce<
        Record<string, Subcategory[]>
      >((acc, category) => {
        const subcategories = category.subcategories.map((subcategory) => ({
          ...subcategory,
        }));

        acc[category.slug] = subcategories;
        return acc;
      }, {});

      const allProducts = data.categories.flatMap((category) =>
        category.subcategories.flatMap((subcategory) =>
          subcategory.products.map((product) => ({
            ...product,
            subcategoryName: subcategory.name,
            categoryName: category.name,
          }))
        )
      );
      setFilteredSubcategories(groupedSubcategories);
      setFilteredProducts(allProducts);
      return;
    }

    const scheduleSettings = getScheduleFromLocalStorage();

    const filteredCategories = data.categories.filter((category) => {
      const categorySchedule =
        scheduleSettings.categories?.[category.slug]?.days || [];
      return categorySchedule.includes(selectedDay);
    });

    const filteredProducts = data.categories.flatMap((category) =>
      category.subcategories.flatMap((subcategory) => {
        return subcategory.products
          .filter((product) => {
            const productSchedule =
              scheduleSettings.products?.[product.slug]?.days || [];
            return productSchedule.includes(selectedDay);
          })
          .map((product) => ({
            ...product,
            subcategoryName: subcategory.name,
            categoryName: category.name,
          }));
      })
    );

    setFilteredCategories(filteredCategories);
    setFilteredSubcategories(filteredSubcategories);
    setFilteredProducts(filteredProducts);
  }, [selectedDay]);

  return (
    <FiltersContext.Provider
      value={{
        selectedCategories,
        selectedSubcategories,
        selectedMarketplaces,
        selectedDay,
        filteredCategories,
        getFilteredSubcategories,
        filteredProducts,
        toggleCategory,
        toggleSubcategory,
        toggleMarketplace,
        toggleDay,
        getScheduleFromLocalStorage,
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
