import { useEffect, useState } from "react";

type ScheduleSettings = {
  categories: Record<string, { days: string[]; marketplaces: string[] }>;
  subcategories: Record<string, { days: string[]; marketplaces: string[] }>;
  products: Record<string, { days: string[]; marketplaces: string[] }>;
};

type UseScheduleSettingsReturn = {
  selectedDays: string[];
  selectedMarketplaces: string[];
  toggleDay: (day: string) => void;
  toggleMarketplace: (mp: string) => void;
  handleSave: (e: React.FormEvent) => void;
};

export function useScheduleSettings(
  type: "categories" | "subcategories" | "products",
  slug: string | undefined
): UseScheduleSettingsReturn {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedMarketplaces, setSelectedMarketplaces] = useState<string[]>(
    []
  );

  useEffect(() => {
    if (slug) {
      const raw = localStorage.getItem("scheduleSettings");
      const settings: ScheduleSettings = raw
        ? JSON.parse(raw)
        : { categories: {}, subcategories: {}, products: {} };

      const current = settings[type][slug] || { days: [], marketplaces: [] };

      setSelectedDays(current.days);
      setSelectedMarketplaces(current.marketplaces);
    }
  }, [slug, type]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleMarketplace = (mp: string) => {
    setSelectedMarketplaces((prev) =>
      prev.includes(mp) ? prev.filter((m) => m !== mp) : [...prev, mp]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (slug) {
      const raw = localStorage.getItem("scheduleSettings");
      const settings: ScheduleSettings = raw
        ? JSON.parse(raw)
        : { categories: {}, subcategories: {}, products: {} };

      settings[type][slug] = {
        days: selectedDays,
        marketplaces: selectedMarketplaces,
      };

      localStorage.setItem("scheduleSettings", JSON.stringify(settings));
      alert("Настройки сохранены!");
    }
  };

  return {
    selectedDays,
    selectedMarketplaces,
    toggleDay,
    toggleMarketplace,
    handleSave,
  };
}
