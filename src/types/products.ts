export interface Price {
  Varus: number;
  Сильпо: number;
  АТБ: number;
}

export interface Product {
  name: string;
  image: string;
  prices: Price;
}

export interface Subcategory {
  name: string;
  products: Product[];
}

export interface Category {
  name: string;
  subcategories: Subcategory[];
}

export interface Data {
  categories: Category[];
}