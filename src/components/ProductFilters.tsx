import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { Product, ProductFilters } from '@/types/product';

interface ProductFiltersProps {
  products: Product[];
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
}

const ProductFiltersComponent: React.FC<ProductFiltersProps> = ({
  products,
  filters,
  onFiltersChange,
}) => {
  const uniqueValues = React.useMemo(() => {
    const productTypes = [...new Set(products.map(p => p.productType).filter(Boolean))];
    const companies = [...new Set(products.map(p => p.companyName).filter(Boolean))];
    const states = [...new Set(
      products.flatMap(p => 
        p.availableIn.split(',').map(state => state.trim())
      ).filter(Boolean)
    )];
    
    return { productTypes, companies, states };
  }, [products]);

  const clearFilters = () => {
    onFiltersChange({
      productType: '',
      suitableCrops: '',
      companyName: '',
      productName: '',
      brandName: '',
      availableIn: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="search-product">Product Name</Label>
            <Input
              id="search-product"
              placeholder="Search products..."
              value={filters.productName}
              onChange={(e) => onFiltersChange({ ...filters, productName: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="search-brand">Brand Name</Label>
            <Input
              id="search-brand"
              placeholder="Search brands..."
              value={filters.brandName}
              onChange={(e) => onFiltersChange({ ...filters, brandName: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="search-crops">Suitable Crops</Label>
            <Input
              id="search-crops"
              placeholder="Search crops..."
              value={filters.suitableCrops}
              onChange={(e) => onFiltersChange({ ...filters, suitableCrops: e.target.value })}
            />
          </div>

          <div>
            <Label>Product Type</Label>
            <Select
              value={filters.productType}
              onValueChange={(value) => onFiltersChange({ ...filters, productType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All types</SelectItem>
                {uniqueValues.productTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Company</Label>
            <Select
              value={filters.companyName}
              onValueChange={(value) => onFiltersChange({ ...filters, companyName: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All companies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All companies</SelectItem>
                {uniqueValues.companies.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Available In</Label>
            <Select
              value={filters.availableIn}
              onValueChange={(value) => onFiltersChange({ ...filters, availableIn: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All states" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All states</SelectItem>
                {uniqueValues.states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFiltersComponent;