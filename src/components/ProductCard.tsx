import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Package, MapPin, Leaf } from "lucide-react";
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="h-full shadow-soft hover:shadow-medium transition-shadow duration-300 overflow-hidden">
      <div className="aspect-video bg-gradient-earth relative overflow-hidden">
        {product.productImageLink ? (
          <img
            src={product.productImageLink}
            alt={product.productName}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-16 w-16 text-earth-dark/60" />
          </div>
        )}
        {product.organicCertified && product.organicCertified.toLowerCase().includes('organic') && (
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
            <Leaf className="h-3 w-3 mr-1" />
            Organic
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{product.companyName}</p>
          <CardTitle className="text-lg leading-tight">{product.productName}</CardTitle>
          {product.brandName && (
            <p className="text-sm font-medium text-primary">{product.brandName}</p>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {product.productType && (
            <Badge variant="secondary" className="text-xs">
              {product.productType}
            </Badge>
          )}
          {product.subType && (
            <Badge variant="outline" className="text-xs">
              {product.subType}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {product.description}
          </p>
        )}

        {product.suitableCrops && (
          <div>
            <h4 className="text-sm font-medium mb-1">Suitable Crops:</h4>
            <p className="text-sm text-muted-foreground">{product.suitableCrops}</p>
          </div>
        )}

        {product.dosage && (
          <div>
            <h4 className="text-sm font-medium mb-1">Dosage:</h4>
            <p className="text-sm text-muted-foreground">{product.dosage}</p>
          </div>
        )}

        {product.priceRange && (
          <div className="bg-accent/30 rounded-lg p-3">
            <h4 className="text-sm font-medium mb-1">Price Range:</h4>
            <p className="text-lg font-semibold text-primary">{product.priceRange}</p>
          </div>
        )}

        {product.availableIn && (
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="text-sm font-medium">Available In:</h4>
              <p className="text-sm text-muted-foreground">{product.availableIn}</p>
            </div>
          </div>
        )}

        {product.sourceURL && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full"
          >
            <a
              href={product.sourceURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              View Details
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;