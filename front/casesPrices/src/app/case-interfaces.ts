export interface Case {
  name: string;
  lowestPrice: number;
  medianPrice: number;
}

export interface Price {
  lowest_price: number;
  median_price: number;
  isError: boolean;
}
