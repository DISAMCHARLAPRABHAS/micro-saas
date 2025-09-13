import { ColorPaletteGenerator } from '@/components/features/color-palette-generator';
import { PageHeader } from '@/components/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Palette, Wand2, Paintbrush } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

const popularPalettes = [
  {
    name: 'Modern Minimal',
    description: 'Clean, contemporary feel with neutral tones.',
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Charcoal Gray', hex: '#2D3E50' },
      { name: 'Soft Gray', hex: '#BDC3C7' },
      { name: 'Warm Beige', hex: '#F5F3F0' },
      { name: 'Muted Blue', hex: '#A9CCE3' },
    ],
  },
  {
    name: 'Earthy Warmth',
    description: 'Natural, cozy atmosphere with earth tones.',
    colors: [
      { name: 'Cream', hex: '#F7F3E9' },
      { name: 'Terracotta', hex: '#CD853F' },
      { name: 'Forest Green', hex: '#355E3B' },
      { name: 'Warm White', hex: '#FAF9F6' },
      { name: 'Deep Brown', hex: '#5C4033' },
    ],
  },
  {
    name: 'Coastal Breeze',
    description: 'Fresh, airy feel inspired by the ocean.',
    colors: [
      { name: 'Sky Blue', hex: '#87CEEB' },
      { name: 'Sandy Beige', hex: '#F4E4BC' },
      { name: 'Ocean Teal', hex: '#4A8B8B' },
      { name: 'Crisp White', hex: '#FAFAFA' },
      { name: 'Coral Pink', hex: '#F8C8DC' },
    ],
  },
  {
    name: 'Royal Classic',
    description: 'Rich and elegant, for a touch of luxury.',
    colors: [
      { name: 'Royal Blue', hex: '#002366' },
      { name: 'Gold', hex: '#FFD700' },
      { name: 'Deep Burgundy', hex: '#800020' },
      { name: 'Ivory', hex: '#FFFFF0' },
      { name: 'Emerald Green', hex: '#50C878' },
    ],
  },
];

const brandColors = [
  {
    brand: 'Asian Paints',
    logo: 'https://picsum.photos/seed/asianpaints/40/40',
    popularShades: [
      { name: 'Royale Aspira', code: 'AP-123', hex: '#F5F5DC' },
      { name: 'Apex Ultima', code: 'AP-456', hex: '#A0522D' },
      { name: 'Tractor Emulsion', code: 'AP-789', hex: '#ADD8E6' },
    ],
  },
  {
    brand: 'Berger Paints',
    logo: 'https://picsum.photos/seed/berger/40/40',
    popularShades: [
      { name: 'Silk Glamour', code: 'BP-101', hex: '#FFF5EE' },
      { name: 'WeatherCoat', code: 'BP-202', hex: '#8FBC8F' },
      { name: 'Easy Clean', code: 'BP-303', hex: '#D3D3D3' },
    ],
  },
  {
    brand: 'Nerolac',
    logo: 'https://picsum.photos/seed/nerolac/40/40',
    popularShades: [
      { name: 'Impressions', code: 'NP-111', hex: '#FFE4B5' },
      { name: 'Suraksha', code: 'NP-222', hex: '#4682B4' },
      { name: 'Beauty', code: 'NP-333', hex: '#F0E68C' },
    ],
  },
  {
    brand: 'Dulux',
    logo: 'https://picsum.photos/seed/dulux/40/40',
    popularShades: [
      { name: 'Velvet Touch', code: 'DL-777', hex: '#E6E6FA' },
      { name: 'Weathershield', code: 'DL-888', hex: '#BDB76B' },
      { name: 'SuperClean', code: 'DL-999', hex: '#FFFAF0' },
    ],
  },
];

export default function ColorSectionPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Color Section"
        description="Explore palettes, generate schemes, and find brand colors for your dream home."
      />
      <div className="flex-1 overflow-y-auto p-6 pt-0">
        <Tabs defaultValue="library" className="w-full">
          <TabsList className="bg-transparent p-0 justify-start h-auto mb-6 gap-4">
            <TabsTrigger value="library" className="data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:underline data-[state=active]:underline-offset-4 bg-transparent shadow-none p-0">
              <Palette className="w-4 h-4 mr-2" />
              Palette Library
            </TabsTrigger>
            <Separator orientation="vertical" className="h-5"/>
            <TabsTrigger value="generator" className="data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:underline data-[state=active]:underline-offset-4 bg-transparent shadow-none p-0">
              <Wand2 className="w-4 h-4 mr-2" />
              AI Generator
            </TabsTrigger>
             <Separator orientation="vertical" className="h-5"/>
            <TabsTrigger value="brands" className="data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:underline data-[state=active]:underline-offset-4 bg-transparent shadow-none p-0">
              <Paintbrush className="w-4 h-4 mr-2" />
              Brand Colors
            </TabsTrigger>
          </TabsList>
          <TabsContent value="library">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {popularPalettes.map((palette) => (
                <Card key={palette.name}>
                  <CardHeader>
                    <CardTitle>{palette.name}</CardTitle>
                    <CardDescription>{palette.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2 mb-4">
                      {palette.colors.map((color) => (
                        <div
                          key={color.hex}
                          className="w-full h-16 rounded-md border"
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                    <Button className="w-full" variant="outline">
                      <Download className="mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="generator">
            <ColorPaletteGenerator />
          </TabsContent>
          <TabsContent value="brands">
            <div className="grid md:grid-cols-2 gap-8">
              {brandColors.map((brand) => (
                <Card key={brand.brand}>
                  <CardHeader className="flex flex-row items-center gap-4">
                     <Image src={brand.logo} alt={`${brand.brand} logo`} width={40} height={40} className="rounded-md" data-ai-hint={`${brand.brand} logo`} />
                    <CardTitle>{brand.brand}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold mb-2 text-sm text-muted-foreground">Popular Shades:</p>
                    <div className="space-y-2">
                        {brand.popularShades.map(shade => (
                           <div key={shade.code} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: shade.hex }} />
                                    <div>
                                        <p className="font-medium">{shade.name}</p>
                                        <p className="text-xs text-muted-foreground">{shade.code}</p>
                                    </div>
                                </div>
                                <Badge variant="outline">{shade.hex}</Badge>
                           </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
