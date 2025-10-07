import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import { Product } from '@/types/product';

interface ExcelUploadProps {
  onDataLoad: (products: Product[]) => void;
}

const ExcelUpload: React.FC<ExcelUploadProps> = ({ onDataLoad }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/kh.csv');
        if (!response.ok) {
          throw new Error('Failed to load CSV file');
        }
        
        const text = await response.text();
        const workbook = XLSX.read(text, { type: 'string' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const products: Product[] = jsonData.map((row: any, index: number) => ({
          sNo: row['S.No'] || index + 1,
          companyName: row['Company Name'] || '',
          productName: row['Product Name'] || '',
          brandName: row['Brand Name'] || '',
          description: row['Description of the Product'] || '',
          productType: row['Product Type'] || '',
          subType: row['Sub-Type'] || '',
          appliedSeasons: row['Applied Seasons'] || '',
          suitableCrops: row['Suitable Crops'] || '',
          benefits: row['Benefits'] || '',
          dosage: row['Dosage (Unit/acre)'] || '',
          applicationMethod: row['Application Method'] || '',
          packSizes: row['Pack Sizes'] || '',
          priceRange: row['Price Range'] || '',
          availableIn: row['Available In (States)'] || '',
          organicCertified: row['Organic/Certified'] || '',
          productImageLink: row['Product Image Link'] || '',
          sourceURL: row['Source URL'] || '',
          notes: row['Notes'] || ''
        }));

        onDataLoad(products);
        setLoaded(true);
        toast({
          title: "Data Loaded Successfully",
          description: `Loaded ${products.length} products from kh.csv`,
        });
      } catch (error) {
        toast({
          title: "Load Error",
          description: "Failed to load kh.csv. Please ensure the file exists in the public directory.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [onDataLoad, toast]);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <FileSpreadsheet className="h-8 w-8 text-primary" />
          Product Catalog
        </CardTitle>
        <CardDescription className="text-lg">
          Loading agricultural product data from kh.csv
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-border rounded-lg p-8 text-center">
          {loading ? (
            <>
              <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
              <p className="text-muted-foreground">Loading product data...</p>
            </>
          ) : loaded ? (
            <>
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <p className="text-foreground font-medium">Data loaded successfully!</p>
            </>
          ) : (
            <p className="text-destructive">Failed to load data</p>
          )}
        </div>
        
        <div className="bg-accent/30 rounded-lg p-4 text-sm text-muted-foreground">
          <h4 className="font-medium text-foreground mb-2">Data Source:</h4>
          <p className="text-xs">Loading from: <code className="bg-background px-2 py-1 rounded">public/kh.csv</code></p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExcelUpload;