'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Layers, Droplets, Zap, Paintbrush, Star, ShieldCheck, BadgeIndianRupee, Tag } from 'lucide-react';
import { Badge } from '../ui/badge';

const materialData = {
  foundation: [
    {
      name: 'M25 Grade Concrete',
      rating: 4.8,
      tags: ['Foundation', 'Columns', 'Beams'],
      description: 'High-strength concrete ideal for foundation and load-bearing structures.',
      priceRange: '₹4,500-5,200/cubic meter',
      durability: '25+ years',
      brands: ['UltraTech', 'ACC', 'Ambuja'],
      budgetFriendly: true,
    },
    {
      name: 'TMT Steel Bars',
      rating: 4.9,
      tags: ['Reinforcement'],
      description: 'Corrosion-resistant steel reinforcement with superior strength.',
      priceRange: '₹65-75/kg',
      durability: '50+ years',
      brands: ['Tata Steel', 'SAIL', 'JSW'],
      budgetFriendly: true,
    },
  ],
  walls: [
    {
      name: 'AAC Blocks',
      rating: 4.7,
      tags: ['Lightweight', 'Internal & External Walls'],
      description: 'Lightweight, pre-cast, foam concrete building material.',
      priceRange: '₹3,000-4,000/cubic meter',
      durability: '50+ years',
      brands: ['Magicrete', 'Ultratech', 'Birla Aerocon'],
      budgetFriendly: false,
    },
  ],
  waterproofing: [],
  electrical: [],
  finishing: [],
};


const MaterialCard = ({ material }: { material: any }) => {
  const { toast } = useToast();
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold font-headline">{material.name}</CardTitle>
          {material.budgetFriendly && <Badge variant="secondary" className="bg-orange-100 text-orange-600 border-orange-200">Budget Friendly</Badge>}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span>{material.rating}</span>
          <span>&middot;</span>
          <span>{material.tags.join(', ')}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{material.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-start gap-2">
                <BadgeIndianRupee className="w-5 h-5 text-muted-foreground mt-1"/>
                <div>
                    <p className="font-semibold">Price Range</p>
                    <p className="text-muted-foreground">{material.priceRange}</p>
                </div>
            </div>
            <div className="flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-muted-foreground mt-1"/>
                <div>
                    <p className="font-semibold">Durability</p>
                    <p className="text-muted-foreground">{material.durability}</p>
                </div>
            </div>
        </div>
        <div className="mb-6">
            <p className="font-semibold text-sm flex items-center gap-2 mb-2"><Tag className="w-4 h-4 text-muted-foreground"/> Recommended Brands:</p>
            <div className="flex flex-wrap gap-2">
                {material.brands.map((brand: string) => (
                    <Badge key={brand} variant="outline" className="font-normal">{brand}</Badge>
                ))}
            </div>
        </div>
        <div className="flex gap-2">
          <Button className="w-full" onClick={() => toast({ title: 'Get Quote: Coming Soon!' })}>Get Quote</Button>
          <Button variant="outline" className="w-full" onClick={() => toast({ title: 'Learn More: Coming Soon!' })}>Learn More</Button>
        </div>
      </CardContent>
    </Card>
  )
};


export function MaterialRecommendationTool() {
  const renderContent = (category: keyof typeof materialData) => {
    const materials = materialData[category];
    if (materials.length === 0) {
      return <p className="text-sm text-muted-foreground p-4 bg-card rounded-lg">AI recommendations for this category will appear here soon.</p>;
    }
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {materials.map(material => <MaterialCard key={material.name} material={material} />)}
      </div>
    )
  }

  return (
    <div>
      <p className="text-muted-foreground mb-4">Choose the right materials for every part of your construction project</p>
      <Tabs defaultValue="foundation" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6 h-auto flex-wrap md:h-10">
          <TabsTrigger value="foundation"><Building className="w-4 h-4 mr-2"/>Foundation & Structure</TabsTrigger>
          <TabsTrigger value="walls"><Layers className="w-4 h-4 mr-2"/>Walls & Roofing</TabsTrigger>
          <TabsTrigger value="waterproofing"><Droplets className="w-4 h-4 mr-2"/>Waterproofing</TabsTrigger>
          <TabsTrigger value="electrical"><Zap className="w-4 h-4 mr-2"/>Electrical & Plumbing</TabsTrigger>
          <TabsTrigger value="finishing"><Paintbrush className="w-4 h-4 mr-2"/>Paint & Finishing</TabsTrigger>
        </TabsList>
        <TabsContent value="foundation">
          {renderContent('foundation')}
        </TabsContent>
        <TabsContent value="walls">
          {renderContent('walls')}
        </TabsContent>
        <TabsContent value="waterproofing">
          {renderContent('waterproofing')}
        </TabsContent>
        <TabsContent value="electrical">
          {renderContent('electrical')}
        </TabsContent>
        <TabsContent value="finishing">
          {renderContent('finishing')}
        </TabsContent>
      </Tabs>
    </div>
  );
}
