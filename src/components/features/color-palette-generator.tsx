'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useState } from 'react';
import type { GenerateColorPaletteOutput } from '@/ai/flows/downloadable-color-palettes';
import { LoaderCircle, Palette, Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const initialPalettes: GenerateColorPaletteOutput['palettes'] = [
  {
    paletteName: 'Modern Minimalist',
    description: 'Clean, contemporary feel with neutral tones',
    colors: [
      { name: 'Pure White', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', suggestedUse: 'Walls, Ceiling' },
      { name: 'Charcoal Gray', hex: '#2D3E50', rgb: 'rgb(45, 62, 80)', suggestedUse: 'Accent Wall' },
      { name: 'Soft Gray', hex: '#BDC3C7', rgb: 'rgb(189, 195, 199)', suggestedUse: 'Trim, Doors' },
      { name: 'Warm Beige', hex: '#F5F3F0', rgb: 'rgb(245, 243, 240)', suggestedUse: 'Secondary Walls' },
    ],
  },
  {
    paletteName: 'Earthy Warmth',
    description: 'Natural, cozy atmosphere with earth tones',
    colors: [
      { name: 'Cream', hex: '#F7F3E9', rgb: 'rgb(247, 243, 233)', suggestedUse: 'Main Walls' },
      { name: 'Terracotta', hex: '#CD853F', rgb: 'rgb(205, 133, 63)', suggestedUse: 'Feature Wall' },
      { name: 'Forest Green', hex: '#355E3B', rgb: 'rgb(53, 94, 59)', suggestedUse: 'Accents' },
      { name: 'Warm White', hex: '#FAF9F6', rgb: 'rgb(250, 249, 246)', suggestedUse: 'Ceiling, Trim' },
    ],
  },
  {
    paletteName: 'Coastal Breeze',
    description: 'Fresh, airy feel inspired by the ocean',
    colors: [
      { name: 'Sky Blue', hex: '#87CEEB', rgb: 'rgb(135, 206, 235)', suggestedUse: 'Bedroom Walls' },
      { name: 'Sandy Beige', hex: '#F4E4BC', rgb: 'rgb(244, 228, 188)', suggestedUse: 'Living Area' },
      { name: 'Ocean Teal', hex: '#4A8B8B', rgb: 'rgb(74, 139, 139)', suggestedUse: 'Bathroom Accent' },
      { name: 'Crisp White', hex: '#FAFAFA', rgb: 'rgb(250, 250, 250)', suggestedUse: 'Ceiling, Trim' },
    ],
  },
];


export function ColorPaletteGenerator() {
  const [palettes, setPalettes] = useState<GenerateColorPaletteOutput['palettes']>(initialPalettes);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: `${text} copied to clipboard.`,
    });
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
       {palettes.map((palette) => (
          <Card key={palette.paletteName}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5"/>
                {palette.paletteName}
                </CardTitle>
              <CardDescription>{palette.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {palette.colors.map((color) => (
                  <div key={color.hex} className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-lg border shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold font-headline text-sm">{color.name}</p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <span>{color.hex.toUpperCase()}</span>
                          <Button variant="ghost" size="icon" className="w-5 h-5" onClick={() => handleCopy(color.hex)}>
                            <Copy className="w-3 h-3"/>
                          </Button>
                        </div>
                      </div>
                       <p className="text-xs text-muted-foreground mt-1">{color.suggestedUse}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-6">
                <Button className="w-full" onClick={() => toast({ title: 'Coming Soon!' })}>
                  <Download className="mr-2"/> Download Palette
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
