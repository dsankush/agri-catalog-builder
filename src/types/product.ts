export interface Product {
  sNo: number;
  companyName: string;
  productName: string;
  brandName: string;
  description: string;
  productType: string;
  subType: string;
  appliedSeasons: string;
  suitableCrops: string;
  benefits: string;
  dosage: string;
  applicationMethod: string;
  packSizes: string;
  priceRange: string;
  availableIn: string;
  organicCertified: string;
  productImageLink: string;
  sourceURL: string;
  notes: string;
}

export interface ProductFilters {
  productType: string;
  suitableCrops: string;
  companyName: string;
  productName: string;
  brandName: string;
  availableIn: string;
}