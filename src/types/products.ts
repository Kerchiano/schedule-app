export interface Price {
  Varus: number;
  Сильпо: number;
  АТБ: number;
}

export interface Product {
  name: string;
  slug: string;
  image: string;
  prices: Price;
}

export interface Subcategory {
  name: string;
  slug: string;
  products: Product[];
}

export interface Category {
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

export interface Data {
  categories: Category[];
}

export interface EntitySettings {
  days: string[];
  marketplaces: string[];
}

export interface ScheduleSettings {
  categories: { [slug: string]: EntitySettings };
  subcategories: { [slug: string]: EntitySettings };
  products: { [slug: string]: EntitySettings };
}
