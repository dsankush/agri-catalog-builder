import React, { useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import { Product } from '@/types/product';

interface ExcelUploadProps {
  onDataLoad: (products: Product[]) => void;
}

const ExcelUpload: React.FC<ExcelUploadProps> = ({ onDataLoad }) => {
  const { toast } = useToast();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
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
        toast({
          title: "Upload Successful",
          description: `Loaded ${products.length} products from the Excel file.`,
        });
      } catch (error) {
        toast({
          title: "Upload Error",
          description: "Failed to parse the Excel file. Please check the format.",
          variant: "destructive",
        });
      }
    };

    reader.readAsArrayBuffer(file);
  }, [onDataLoad, toast]);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <FileSpreadsheet className="h-8 w-8 text-primary" />
          Upload Product Catalog
        </CardTitle>
        <CardDescription className="text-lg">
          Upload your Excel file to populate the agricultural product catalog
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <label htmlFor="excel-upload" className="cursor-pointer">
            <Button asChild variant="hero" size="lg">
              <span>Choose Excel File</span>
            </Button>
          </label>
          <input
            id="excel-upload"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Supports .xlsx and .xls files
          </p>
        </div>
        
        <div className="bg-accent/30 rounded-lg p-4 text-sm text-muted-foreground">
          <h4 className="font-medium text-foreground mb-2">Expected Excel Columns:</h4>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <span>• Company Name</span>
            <span>• Product Name</span>
            <span>• Brand Name</span>
            <span>• Product Type</span>
            <span>• Suitable Crops</span>
            <span>• Available In (States)</span>
            <span>• Description</span>
            <span>• And more...</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExcelUpload;