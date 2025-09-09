import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Grid, List, Search } from "lucide-react";
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import { Product, ProductFilters as FilterType } from '@/types/product';

interface ProductCatalogProps {
  products: Product[];
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ products }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterType>({
    productType: 'all',
    suitableCrops: '',
    companyName: 'all',
    productName: '',
    brandName: '',
    availableIn: 'all',
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesProductType = filters.productType === 'all' || !filters.productType || 
        product.productType.toLowerCase().includes(filters.productType.toLowerCase());
      
      const matchesCrops = !filters.suitableCrops || 
        product.suitableCrops.toLowerCase().includes(filters.suitableCrops.toLowerCase());
      
      const matchesCompany = filters.companyName === 'all' || !filters.companyName || 
        product.companyName.toLowerCase().includes(filters.companyName.toLowerCase());
      
      const matchesProductName = !filters.productName || 
        product.productName.toLowerCase().includes(filters.productName.toLowerCase());
      
      const matchesBrandName = !filters.brandName || 
        product.brandName.toLowerCase().includes(filters.brandName.toLowerCase());
      
      const matchesAvailableIn = filters.availableIn === 'all' || !filters.availableIn || 
        product.availableIn.toLowerCase().includes(filters.availableIn.toLowerCase());

      return matchesProductType && matchesCrops && matchesCompany && 
             matchesProductName && matchesBrandName && matchesAvailableIn;
    });
  }, [products, filters]);

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Products Yet</h3>
        <p className="text-muted-foreground">Upload an Excel file to populate the product catalog.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Product Catalog</h2>
          <span className="text-muted-foreground">
            {filteredProducts.length} of {products.length} products
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-6">
        <aside className="w-80 flex-shrink-0">
          <ProductFilters
            products={products}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </aside>

        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more products.
              </p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }>
              {filteredProducts.map((product) => (
                <ProductCard key={product.sNo} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductCatalog;