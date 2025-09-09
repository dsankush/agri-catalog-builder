import React, { useState } from 'react';
import { Leaf, Upload } from 'lucide-react';
import ExcelUpload from '@/components/ExcelUpload';
import ProductCatalog from '@/components/ProductCatalog';
import { Product } from '@/types/product';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleDataLoad = (loadedProducts: Product[]) => {
    setProducts(loadedProducts);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero shadow-soft">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AgriCatalog</h1>
              <p className="text-white/90">Agricultural Product Directory</p>
            </div>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            Discover agricultural products, fertilizers, and farming solutions. 
            Upload your Excel catalog to get started.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {products.length === 0 ? (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Get Started</h2>
              <p className="text-muted-foreground">
                Upload an Excel file with your agricultural product data to populate the catalog.
              </p>
            </div>
            <ExcelUpload onDataLoad={handleDataLoad} />
          </div>
        ) : (
          <ProductCatalog products={products} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 AgriCatalog. Empowering farmers with easy product discovery.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
