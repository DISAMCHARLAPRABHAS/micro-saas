'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Building,
  Layers,
  Droplets,
  Zap,
  Paintbrush,
  Star,
  ShieldCheck,
  BadgeIndianRupee,
  Tag,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { useState } from 'react';
import type { MaterialRecommendationOutput } from '@/ai/flows/material-recommendation';
import { GetQuoteModal } from './get-quote-modal';
import { LearnMoreSheet } from './learn-more-sheet';

const initialMaterialData: MaterialRecommendationOutput['recommendations'] = [
  {
    name: 'UltraTech Cement',
    rating: 4.8,
    tags: ['All structural work', 'Foundation', 'Ready Mix'],
    description: "India's largest cement producer (part of Aditya Birla Group). Known for consistent quality, wide availability, and innovative products (Ready Mix, waterproof, eco-friendly blends). USP: Widely available, reliable, strong customer trust.",
    priceRange: '₹380 - ₹420 per bag (50kg)',
    durability: '25-50 years',
    brands: ['UltraTech OPC 43/53', 'PPC', 'UltraTech Ready Mix Concrete'],
    budgetFriendly: false,
    pros: ['High compressive strength', 'Excellent durability', 'Widely available'],
    cons: ['Slightly premium pricing'],
    warranty: 'Varies by supplier and product; typically assured quality.',
    usageTips: 'Ideal for all types of foundation and structural work (M20, M25, M30 concrete). Ensure proper curing for best results.',
    faqs: [
      { question: 'Is UltraTech good for high-rise buildings?', answer: 'Yes, its high compressive strength makes it ideal for high-rise residential and commercial buildings.' },
    ],
  },
  {
    name: 'ACC Cement',
    rating: 4.7,
    tags: ['Foundation', 'Load-bearing walls', 'Eco-friendly'],
    description: "One of India’s oldest cement companies (since 1936), now part of Holcim Group. Known for quality control & innovative sustainable practices. USP: Strong R&D focus, eco-friendly cement.",
    priceRange: '₹370 - ₹410 per bag',
    durability: '25-40 years',
    brands: ['ACC Gold Water Shield', 'ACC Ready Mix'],
    budgetFriendly: false,
    pros: ['Good quality control', 'Water-shield products available', 'Sustainable practices'],
    cons: ['Slightly higher cost in some regions'],
    warranty: 'Assured quality from Holcim group.',
    usageTips: 'Excellent for foundations and load-bearing walls where durability is key.',
    faqs: [
      { question: 'What is special about ACC Gold Water Shield?', answer: 'It provides enhanced water resistance, making it suitable for foundations and structures in areas with high rainfall or water exposure.' },
    ],
  },
  {
    name: 'Ambuja Cement',
    rating: 4.7,
    tags: ['Foundation', 'Coastal areas', 'High durability'],
    description: "Another Holcim Group company, highly reputed for sustainability and durability. Their “Ambuja Plus” is widely used in residential construction. USP: Energy efficient, high durability.",
    priceRange: '₹370 - ₹420 per bag',
    durability: '30-50 years',
    brands: ['Ambuja Plus', 'Ambuja Cool Walls', 'Ambuja Ready Mix'],
    budgetFriendly: false,
    pros: ['High strength and durability', 'Resists salinity, good for coastal areas', 'Energy efficient production'],
    cons: ['Premium pricing'],
    warranty: 'Brand assurance of high quality and strength.',
    usageTips: 'Best for foundations in coastal areas due to its resistance to salinity. Also great for strong, durable structures.',
    faqs: [
        { question: 'Why is Ambuja cement good for coastal areas?', answer: 'It has properties that help it resist saline and sulfate attacks, which are common in coastal environments, thus preventing corrosion of steel reinforcement.' }
    ],
  },
  {
    name: 'Shree Cement',
    rating: 4.5,
    tags: ['Budget-friendly', 'Foundations', 'Slabs'],
    description: "2nd largest cement company in India by market cap. Known for affordability & high production efficiency. USP: Very cost-efficient, good balance of price & strength.",
    priceRange: '₹340 - ₹390 per bag',
    durability: '20-35 years',
    brands: ['Shree Jung Rodhak Cement'],
    budgetFriendly: true,
    pros: ['Cost-effective', 'Good balance of price and strength', 'Anti-rust properties in some products'],
    cons: ['May not be as premium as top-tier brands'],
    warranty: 'Standard quality assurance.',
    usageTips: 'A great choice for budget-friendly foundations and slabs in residential projects.',
    faqs: [
        { question: 'What does "Jung Rodhak" mean?', answer: '"Jung Rodhak" translates to "Rust Proof". This cement has properties that help protect the inner steel rods from rusting.' }
    ],
  },
  {
    name: 'Dalmia Cement',
    rating: 4.6,
    tags: ['Sulfate-rich soils', 'Eco-friendly', 'Foundation'],
    description: "Pioneer in blended cements (slag, PPC). Strong eco-friendly focus. Known for high durability and sulfate resistance. USP: Sustainability, eco-friendly.",
    priceRange: '₹360 - ₹400 per bag',
    durability: '30-50 years',
    brands: ['Dalmia DSP', 'Dalmia PPC', 'Dalmia Ready Mix'],
    budgetFriendly: false,
    pros: ['High durability', 'Sulfate resistance', 'Eco-friendly'],
    cons: ['Availability might be limited in some regions'],
    warranty: 'Focus on long-term durability and sustainability.',
    usageTips: 'Highly recommended for foundations in areas with sulfate-rich soils or for environmentally conscious projects.',
    faqs: [
        { question: 'What is blended cement?', answer: 'Blended cement is created by adding other materials like fly ash or slag to ordinary Portland cement, which enhances durability and reduces the carbon footprint.' }
    ],
  },
  {
    name: 'Ramco Cements',
    rating: 4.5,
    tags: ['South India', 'Residential', 'Foundation'],
    description: "South India’s strong cement brand. High consistency and reliable OPC/PPC products. USP: Best for South Indian markets, reliable supply chain.",
    priceRange: '₹350 - ₹390 per bag',
    durability: '25-40 years',
    brands: ['Ramco Supergrade', 'Ramco Ready Mix'],
    budgetFriendly: true,
    pros: ['Strong presence in South India', 'Consistent quality', 'Reliable'],
    cons: ['Limited availability in North India'],
    warranty: 'Known for consistent quality and supply.',
    usageTips: 'A go-to choice for residential houses and foundations in the southern states of India.',
    faqs: [
        { question: 'Is Ramco a good choice for North India?', answer: 'While Ramco is a strong brand, its availability and supply chain are more robust in South India, making it a more common choice there.' }
    ],
  },
  {
    name: 'JK Lakshmi Cement',
    rating: 4.4,
    tags: ['Budget-friendly', 'Mid-budget projects', 'Foundation'],
    description: "Part of JK Organization. Affordable yet durable cement, widely used in both rural & urban builds. USP: Cost-effective, widely available.",
    priceRange: '₹340 - ₹380 per bag',
    durability: '20-35 years',
    brands: ['JK Lakshmi Pro+ Cement'],
    budgetFriendly: true,
    pros: ['Cost-effective', 'Durable for its price point', 'Widely available'],
    cons: ['Quality might vary slightly compared to premium brands'],
    warranty: 'Standard quality assurance for its price segment.',
    usageTips: 'Suitable for foundations and walls in low to mid-budget residential and commercial projects.',
    faqs: [
        { question: 'What is "Pro+" in the product name?', answer: 'The "Pro+" signifies an enhanced formula that offers better workability, strength, and durability compared to their standard offerings.' }
    ],
  },
  {
    name: 'India Cements',
    rating: 4.3,
    tags: ['Budget-friendly', 'Value for money', 'Residential'],
    description: "One of the oldest brands, especially popular in South India. Focuses on affordability. USP: Value for money.",
    priceRange: '₹330 - ₹370 per bag',
    durability: '20-30 years',
    brands: ['Sankar Super Power', 'Coromandel King'],
    budgetFriendly: true,
    pros: ['Very affordable', 'Good value for money', 'Strong in South India'],
    cons: ['May not match the durability of premium brands'],
    warranty: 'Focus on providing a budget-friendly solution.',
    usageTips: 'A solid choice for budget-conscious residential construction, particularly in South India.',
    faqs: [
        { question: 'Is India Cements suitable for heavy structures?', answer: 'For standard residential buildings, it is adequate. For high-rise or heavy industrial structures, a higher-grade cement like OPC 53 from a premium brand is recommended.' }
    ],
  },
  {
    name: 'Birla Cement (MP Birla Group)',
    rating: 4.5,
    tags: ['North/Central India', 'Residential', 'Foundation'],
    description: "Strong presence in Central & North India. Known for consistent quality. USP: Strong in North/Central India, reliable mid-tier brand.",
    priceRange: '₹350 - ₹390 per bag',
    durability: '25-40 years',
    brands: ['Birla Perfect Plus', 'Birla Samrat'],
    budgetFriendly: true,
    pros: ['Consistent quality', 'Reliable mid-tier option', 'Strong distribution in North and Central India'],
    cons: ['Less presence in South India'],
    warranty: 'Assured quality from the MP Birla Group.',
    usageTips: 'A reliable choice for residential and small commercial foundations in its primary markets.',
    faqs: [
        { question: 'Is this the same as UltraTech?', answer: 'No, this is part of the MP Birla Group, while UltraTech Cement is part of the Aditya Birla Group. They are separate entities.' }
    ],
  },
  {
    name: 'JSW Cement',
    rating: 4.6,
    tags: ['Eco-friendly', 'Coastal foundations', 'RCC work'],
    description: "Known for Portland Slag Cement (PSC) blends, eco-friendly. Good durability & corrosion resistance. USP: Resistant to seawater, sustainable.",
    priceRange: '₹340 - ₹380 per bag',
    durability: '25-45 years',
    brands: ['JSW PSC', 'JSW Concreel HD'],
    budgetFriendly: true,
    pros: ['Eco-friendly (uses industrial by-products)', 'Good corrosion resistance', 'Resistant to seawater'],
    cons: ['PSC may have a slower setting time initially'],
    warranty: 'Focus on sustainable and durable construction.',
    usageTips: 'Excellent for coastal foundations and RCC work where resistance to moisture and salt is important.',
    faqs: [
        { question: 'What is Portland Slag Cement (PSC)?', answer: 'PSC is made by blending granulated slag (a by-product of the steel industry) with clinker. It improves the durability and long-term strength of the concrete.' }
    ],
  },
];

const MaterialCard = ({
  material,
}: {
  material: MaterialRecommendationOutput['recommendations'][0];
}) => {
  const [isQuoteModalOpen, setQuoteModalOpen] = useState(false);
  const [isLearnMoreSheetOpen, setLearnMoreSheetOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold font-headline">
              {material.name}
            </CardTitle>
            {material.budgetFriendly && (
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-600 border-orange-200"
              >
                Budget Friendly
              </Badge>
            )}
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
              <BadgeIndianRupee className="w-5 h-5 text-muted-foreground mt-1" />
              <div>
                <p className="font-semibold">Price Range</p>
                <p className="text-muted-foreground">{material.priceRange}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-muted-foreground mt-1" />
              <div>
                <p className="font-semibold">Durability</p>
                <p className="text-muted-foreground">{material.durability}</p>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <p className="font-semibold text-sm flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-muted-foreground" /> Recommended
              Products:
            </p>
            <div className="flex flex-wrap gap-2">
              {material.brands.map((brand: string) => (
                <Badge key={brand} variant="outline" className="font-normal">
                  {brand}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="w-full" onClick={() => setQuoteModalOpen(true)}>
              Get Quote
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setLearnMoreSheetOpen(true)}
            >
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
      <GetQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        materialName={material.name}
        brands={material.brands}
      />
      <LearnMoreSheet
        isOpen={isLearnMoreSheetOpen}
        onClose={() => setLearnMoreSheetOpen(false)}
        material={material}
      />
    </>
  );
};

export function MaterialRecommendationTool() {
  const [recommendations] = useState(initialMaterialData);

  const renderContent = (
    categoryMaterials: MaterialRecommendationOutput['recommendations']
  ) => {
    if (categoryMaterials.length === 0) {
      return (
        <p className="text-sm text-muted-foreground p-4 bg-card rounded-lg">
          AI recommendations for this category will appear here soon.
        </p>
      );
    }
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {categoryMaterials.map(material => (
          <MaterialCard key={material.name} material={material} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <p className="text-muted-foreground mb-4">
        Choose the right materials for every part of your construction project
      </p>
      <Tabs defaultValue="foundation" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6 h-auto flex-wrap md:h-10">
          <TabsTrigger value="foundation">
            <Building className="w-4 h-4 mr-2" />
            Foundation & Structure
          </TabsTrigger>
          <TabsTrigger value="walls">
            <Layers className="w-4 h-4 mr-2" />
            Walls & Roofing
          </TabsTrigger>
          <TabsTrigger value="waterproofing">
            <Droplets className="w-4 h-4 mr-2" />
            Waterproofing
          </TabsTrigger>
          <TabsTrigger value="electrical">
            <Zap className="w-4 h-4 mr-2" />
            Electrical & Plumbing
          </TabsTrigger>
          <TabsTrigger value="finishing">
            <Paintbrush className="w-4 h-4 mr-2" />
            Paint & Finishing
          </TabsTrigger>
        </TabsList>
        <TabsContent value="foundation">
          {renderContent(recommendations)}
        </TabsContent>
        <TabsContent value="walls">
          {renderContent([])}
        </TabsContent>
        <TabsContent value="waterproofing">
          {renderContent([])}
        </TabsContent>
        <TabsContent value="electrical">
          {renderContent([])}
        </TabsContent>
        <TabsContent value="finishing">
          {renderContent([])}
        </TabsContent>
      </Tabs>
    </div>
  );
}
