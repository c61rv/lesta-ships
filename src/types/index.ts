export interface Vehicle {
  title: string;
  description: string;
  icons: {
    large: string;
    medium: string;
  };
  level: number;
  type: {
    name: string;
    title: string;
    icons: {
      default: string;
    };
  };
  nation: {
    name: string;
    title: string;
    color: string;
    icons: {
      small: string;
      medium: string;
      large: string;
    };
  };
}

export interface FilterOptionItem {
  name: string;
  title: string;
}

export interface FilterOptions {
  nations: FilterOptionItem[];
  itemTypes: FilterOptionItem[];
  levels: number[];
}

export interface VehicleFilters {
  nation: string | null;
  type: string | null;
  level: number | null;
}