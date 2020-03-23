export interface Case {
  name: string;
  lowestPrice: string;
  medianPrice: string;
}

export interface Price {
  lowest_price: string;
  median_price: string;
  isError: boolean;
}

export interface UpdateCase {
    id: number;
    name: string;
}
