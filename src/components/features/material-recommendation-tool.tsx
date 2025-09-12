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

const concreteMaterials: MaterialRecommendationOutput['recommendations'] = [
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
    priceRange: '₹370 - ₹420/bag',
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
    priceRange: '₹340 - ₹390/bag',
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
    priceRange: '₹360 - ₹400/bag',
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
    priceRange: '₹350 - ₹390/bag',
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
    priceRange: '₹340 - ₹380/bag',
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
    priceRange: '₹330 - ₹370/bag',
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
    priceRange: '₹350 - ₹390/bag',
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
    priceRange: '₹340 - ₹380/bag',
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

const steelMaterials: MaterialRecommendationOutput['recommendations'] = [
  {
    name: 'Tata Tiscon',
    rating: 4.8,
    tags: ['Popular', 'GreenPro Certified', 'Super-ductile'],
    description: 'Very popular, GreenPro certified. Offers super-ductile grades (e.g. Fe 500 SD). Reliable quality & good bending/weldability.',
    priceRange: '₹55,000 - ₹65,000 per ton',
    durability: '50+ years',
    brands: ['Tata Tiscon 500 SD'],
    budgetFriendly: false,
    pros: ['High ductility', 'Reliable quality', 'Good for seismic zones'],
    cons: ['Premium pricing'],
    warranty: 'Assured quality and performance.',
    usageTips: 'Ideal for residential and commercial projects requiring high strength and flexibility.',
    faqs: [{ question: 'What does "SD" stand for?', answer: '"SD" stands for Super Ductile, which provides a higher level of seismic resistance.' }],
  },
  {
    name: 'JSW Neosteel',
    rating: 4.7,
    tags: ['Premium', 'High load', 'Ductile'],
    description: 'Strong, ductile, good for high load/mass structures. Premium quality.',
    priceRange: '₹58,000 - ₹68,000 per ton',
    durability: '50+ years',
    brands: ['JSW Neosteel Fe 550D'],
    budgetFriendly: false,
    pros: ['High strength', 'Excellent ductility', 'Suitable for heavy structures'],
    cons: ['Higher cost'],
    warranty: 'Guaranteed quality for high-performance applications.',
    usageTips: 'Use in critical structural elements like columns and beams in high-rise buildings.',
    faqs: [],
  },
  {
    name: 'Jindal Panther',
    rating: 4.7,
    tags: ['High Strength', 'Weldability', 'HYQST'],
    description: 'HYQST technology, high strength grades (Fe 550D etc.), good weldability.',
    priceRange: '₹54,000 - ₹64,000 per ton',
    durability: '40-50 years',
    brands: ['Jindal Panther Fe 550D'],
    budgetFriendly: false,
    pros: ['High strength grades', 'Good weldability', 'Advanced manufacturing process'],
    cons: ['Premium pricing'],
    warranty: 'Consistent mechanical properties.',
    usageTips: 'Suitable for projects where welding is required for reinforcement cages.',
    faqs: [],
  },
  {
    name: 'SRMB Steel',
    rating: 4.6,
    tags: ['Seismic zones', 'Tempcore licensed', 'Good grip'],
    description: 'Known for Tempcore® licensed manufacturing, good grip & rib pattern, reliable for seismic zones.',
    priceRange: '₹52,000 - ₹62,000 per ton',
    durability: '40-50 years',
    brands: ['SRMB Fe 500D'],
    budgetFriendly: true,
    pros: ['Reliable for seismic zones', 'Good concrete grip', 'Licensed technology'],
    cons: ['Regional availability can vary'],
    warranty: 'Assured quality for earthquake-prone areas.',
    usageTips: 'The unique rib pattern ensures a strong bond with concrete.',
    faqs: [],
  },
  {
    name: 'SAIL',
    rating: 4.5,
    tags: ['Government-backed', 'Heavy duty', 'Corrosion resistant'],
    description: 'Government‐backed, large capacity, good for basic & heavy duty structural use. Has high corrosion resistant bars (HCR).',
    priceRange: '₹50,000 - ₹60,000 per ton',
    durability: '40+ years',
    brands: ['SAIL TMT HCR'],
    budgetFriendly: true,
    pros: ['Corrosion resistant options', 'Widely used in government projects', 'Reliable supply'],
    cons: ['May lack some premium features'],
    warranty: 'Standard government quality assurance.',
    usageTips: 'A dependable choice for a wide range of construction projects, especially with HCR variants in corrosive environments.',
    faqs: [],
  },
  {
    name: 'Shyam Steel',
    rating: 4.5,
    tags: ['Good value', 'Durable', 'Tough'],
    description: 'Good value, reliable Fe 500D / Fe 550D grades, offers toughness and durability.',
    priceRange: '₹51,000 - ₹61,000 per ton',
    durability: '35-45 years',
    brands: ['Shyam Steel Fe 500D'],
    budgetFriendly: true,
    pros: ['Good value for money', 'Tough and durable', 'Reliable grades'],
    cons: ['Less known than top-tier brands'],
    warranty: 'Focus on providing a balance of cost and quality.',
    usageTips: 'A solid choice for residential and mid-sized commercial projects.',
    faqs: [],
  },
  {
    name: 'Vizag Steel (RINL)',
    rating: 4.6,
    tags: ['Virgin ore', 'High purity', 'Coastal areas'],
    description: 'Made from virgin ore; good purity; often used in coastal / corrosion‐sensitive areas.',
    priceRange: '₹53,000 - ₹63,000 per ton',
    durability: '40-50 years',
    brands: ['Vizag TMT'],
    budgetFriendly: false,
    pros: ['High purity steel', 'Good for coastal areas', 'Made from virgin ore'],
    cons: ['Can be more expensive'],
    warranty: 'High quality assurance due to raw material purity.',
    usageTips: 'Recommended for structures in corrosive environments like coastal regions.',
    faqs: [],
  },
  {
    name: 'Kamdhenu',
    rating: 4.3,
    tags: ['Affordable', 'Decent quality', 'Wide presence'],
    description: 'Affordable yet decent quality; multiple plants; has good presence & supply.',
    priceRange: '₹48,000 - ₹58,000 per ton',
    durability: '30-40 years',
    brands: ['Kamdhenu Nxt'],
    budgetFriendly: true,
    pros: ['Affordable', 'Good availability', 'Decent quality for the price'],
    cons: ['May not match the performance of premium brands'],
    warranty: 'Standard quality for budget-friendly projects.',
    usageTips: 'A popular choice for budget-conscious builders in residential construction.',
    faqs: [],
  },
  {
    name: 'Essar TMT',
    rating: 4.4,
    tags: ['Western India', 'Mechanical strength', 'Elongation'],
    description: 'Strong performance in Western India; good mechanical strength and elongation.',
    priceRange: '₹52,000 - ₹62,000 per ton',
    durability: '35-45 years',
    brands: ['Essar TMT'],
    budgetFriendly: true,
    pros: ['Good mechanical strength', 'Strong presence in Western India', 'Good elongation'],
    cons: ['Regional focus'],
    warranty: 'Reliable performance for its target market.',
    usageTips: 'A good option for projects located in the western regions of India.',
    faqs: [],
  },
  {
    name: 'Prime Gold',
    rating: 4.4,
    tags: ['Rising brand', 'Quality ribs', 'Reinforcement'],
    description: 'Rising brand, known for quality rib patterns, good for reinforcement needs.',
    priceRange: '₹49,000 - ₹59,000 per ton',
    durability: '30-40 years',
    brands: ['Prime Gold TMT'],
    budgetFriendly: true,
    pros: ['Good rib pattern for grip', 'Affordable', 'Growing brand recognition'],
    cons: ['Newer compared to established players'],
    warranty: 'Focus on providing quality reinforcement bars at a competitive price.',
    usageTips: 'Suitable for general reinforcement needs in small to medium-sized projects.',
    faqs: [],
  },
];

const waterproofingMaterials: MaterialRecommendationOutput['recommendations'] = [
  {
    name: 'Dr. Fixit (Pidilite)',
    rating: 4.8,
    tags: ['Wide range', 'Trusted brand', 'All-purpose'],
    description: 'Very wide product range (liquid membranes, cementitious coatings, sealers). Good distribution, trusted name in residential & commercial waterproofing.',
    priceRange: 'Varies widely by product',
    durability: '10-15 years',
    brands: ['Dr. Fixit Roofseal', 'Dr. Fixit Pidiproof LW+', 'Dr. Fixit URP'],
    budgetFriendly: false,
    pros: ['Trusted brand name', 'Wide product availability', 'Solutions for almost any surface'],
    cons: ['Can be more expensive than competitors'],
    warranty: 'Product-specific warranty available.',
    usageTips: 'Best for roofs, terraces, bathrooms, and damp walls. Ensure proper surface preparation before application.',
    faqs: [
      { question: 'Which Dr. Fixit product is best for terrace waterproofing?', answer: 'Dr. Fixit Roofseal is a popular and effective choice for terrace and rooftop waterproofing applications.' }
    ],
  },
  {
    name: 'Asian Paints SmartCare',
    rating: 4.7,
    tags: ['Exterior', 'Crack-bridging', 'Anti-fungal'],
    description: 'Anti-fungal, crack-bridging, good for external surfaces. Known for coatings and waterproof paints.',
    priceRange: 'Varies by product',
    durability: '7-10 years',
    brands: ['SmartCare Damp Proof', 'SmartCare Hydroloc'],
    budgetFriendly: false,
    pros: ['Excellent for exterior walls', 'Crack-bridging properties', 'Anti-fungal and anti-algal'],
    cons: ['Primarily focused on paint-like coatings'],
    warranty: 'Up to 10 years waterproofing warranty on select products.',
    usageTips: 'Ideal for exterior walls and terraces. For best results, apply two coats as recommended.',
    faqs: [],
  },
  {
    name: 'Cico Technologies',
    rating: 4.5,
    tags: ['Admixtures', 'Chemical solutions', 'Foundations'],
    description: 'Specializes in integral & surface waterproofing admixtures and coatings. Strong chemical solutions.',
    priceRange: 'Varies',
    durability: '20+ years (for admixtures)',
    brands: ['CICO No.1', 'CICO Super'],
    budgetFriendly: true,
    pros: ['Strong in chemical admixtures', 'Improves concrete quality integrally', 'Cost-effective for large projects'],
    cons: ['Less known in direct consumer market'],
    warranty: 'Depends on application and product.',
    usageTips: 'Best used during the concrete mixing stage for foundations, basements, and slabs to make the concrete itself waterproof.',
    faqs: [],
  },
  {
    name: 'Sika India',
    rating: 4.7,
    tags: ['Heavy-duty', 'Industrial', 'Technical support'],
    description: 'Global technology, wide variety of systems: membranes, admixtures, joint sealers, etc. Good technical support & durability.',
    priceRange: 'Premium',
    durability: '15-25 years',
    brands: ['SikaTop Seal', 'Sikalastic', 'Sika CoolCoat'],
    budgetFriendly: false,
    pros: ['High-performance industrial-grade products', 'Excellent technical support', 'Durable and long-lasting solutions'],
    cons: ['Premium pricing', 'May require skilled applicators'],
    warranty: 'System warranty available for certified applicators.',
    usageTips: 'Ideal for heavy-duty applications like industrial roofs, balconies, water tanks, and basements.',
    faqs: [],
  },
  {
    name: 'Kryton',
    rating: 4.6,
    tags: ['Crystalline', 'Self-healing', 'Premium'],
    description: 'Known for crystalline waterproofing (penetration into concrete, self-healing types). Durable & premium solution.',
    priceRange: 'High-end',
    durability: 'Life of the structure',
    brands: ['Krystol Internal Membrane (KIM)'],
    budgetFriendly: false,
    pros: ['Becomes integral part of concrete', 'Self-healing capabilities for minor cracks', 'Permanent solution'],
    cons: ['Very high initial cost', 'Requires precise application during construction'],
    warranty: 'Offers long-term performance guarantees.',
    usageTips: 'A premium solution for sub-grade structures like foundations and basements, especially in areas with high water tables.',
    faqs: [],
  },
  {
    name: 'Berger Paints (WeatherCoat)',
    rating: 4.5,
    tags: ['Exterior walls', 'Decorative', 'Waterproof paint'],
    description: 'Combination of aesthetic paint + waterproof coating; good for external walls, roof coatings, decorative yet functional.',
    priceRange: 'Mid-range',
    durability: '5-8 years',
    brands: ['WeatherCoat Long Life', 'WeatherCoat Kool & Seal'],
    budgetFriendly: true,
    pros: ['Provides both decoration and waterproofing', 'Good for exterior wall aesthetics', 'Resists sun and rain'],
    cons: ['Less effective for heavy-duty waterproofing needs'],
    warranty: 'Up to 10 years performance warranty on select products.',
    usageTips: 'A great choice for revamping exterior walls with a fresh paint job that also provides waterproofing.',
    faqs: [],
  },
  {
    name: 'Ultratech Waterproofing',
    rating: 4.4,
    tags: ['Cement-based', 'Polymer-modified', 'Basements'],
    description: 'Cement-based and polymer modified solutions; good product linkage with big concrete/cement producers.',
    priceRange: 'Mid-range',
    durability: '10-12 years',
    brands: ['UltraTech Seal & Dry', 'UltraTech Weather Pro WP+200'],
    budgetFriendly: true,
    pros: ['Good compatibility with concrete and mortar', 'Easily available with cement dealers', 'Cost-effective'],
    cons: ['Product range is not as extensive as specialists'],
    warranty: 'Standard product warranty.',
    usageTips: 'Best used for basements, water tanks, and walls, often in conjunction with other UltraTech cement products.',
    faqs: [],
  },
  {
    name: 'Fosroc',
    rating: 4.6,
    tags: ['Industrial', 'Chemical resistance', 'Membranes'],
    description: 'Heavy-duty membranes, chemical resistance; widely used in commercial / industrial construction.',
    priceRange: 'Premium',
    durability: '15-20 years',
    brands: ['Brushbond', 'Nitoproof'],
    budgetFriendly: false,
    pros: ['Excellent for industrial environments', 'High chemical resistance', 'Durable membrane solutions'],
    cons: ['Overkill for most residential uses', 'Requires professional application'],
    warranty: 'Project-specific warranties available.',
    usageTips: 'Suitable for industrial structures, commercial basements, and water retaining structures where chemical exposure is a concern.',
    faqs: [],
  },
  {
    name: 'Garg Waterproofing',
    rating: 4.3,
    tags: ['Service provider', 'Tailored solutions', 'Turnkey'],
    description: 'Known as both service + chemicals supplier; good technical systems & tailored solutions.',
    priceRange: 'Varies per project',
    durability: 'Depends on system used',
    brands: ['Garg-branded chemicals'],
    budgetFriendly: true,
    pros: ['Provides full solution (product + application)', 'Good for those needing a turnkey service', 'Experienced team'],
    cons: ['Limited to regions where they operate'],
    warranty: 'Service and product warranty combined.',
    usageTips: 'A good option for homeowners or builders who want a single vendor to handle the entire waterproofing process.',
    faqs: [],
  },
  {
    name: 'Damsure',
    rating: 4.2,
    tags: ['Service provider', 'Structural waterproofing', 'Contractors'],
    description: 'Provides both waterproof services & product systems; experience in challenging structural waterproofing conditions.',
    priceRange: 'Varies per project',
    durability: 'Depends on system used',
    brands: ['Proprietary systems'],
    budgetFriendly: false,
    pros: ['Specializes in challenging cases', 'Strong experience with large projects', 'Offers service guarantee'],
    cons: ['More focused on B2B and large contractors'],
    warranty: 'Service-based warranty on application.',
    usageTips: 'Best for large-scale projects, basements, and structural waterproofing where expertise is critical.',
    faqs: [],
  },
];

const electricalMaterials: MaterialRecommendationOutput['recommendations'] = [
  {
    name: 'Finolex Wires',
    rating: 4.8,
    tags: ['Reliable', 'Fire retardant', 'Residential'],
    description: 'One of the most trusted brands in India for electrical wires. Known for safety, reliability, and a wide range of products for residential and commercial use.',
    priceRange: '₹1,200 - ₹3,500 per 90m coil',
    durability: '40+ years',
    brands: ['Finolex FR-LSH', 'Finolex FRLS'],
    budgetFriendly: false,
    pros: ['High safety standards', 'Fire retardant properties', 'Excellent brand reputation'],
    cons: ['Premium pricing'],
    warranty: 'Assured quality and adherence to safety standards.',
    usageTips: 'Ideal for all internal wiring in residential and commercial buildings. Use appropriate gauge for different load points.',
    faqs: [{ question: 'What does FR-LSH mean?', answer: 'It stands for Flame Retardant Low Smoke Halogen, which means the wires are safer during a fire, emitting less smoke and toxic fumes.' }],
  },
  {
    name: 'Polycab Wires',
    rating: 4.7,
    tags: ['Wide range', 'Industrial', 'Flexible'],
    description: 'A leading manufacturer of wires and cables in India with a very wide product portfolio for various applications, from residential to heavy industrial.',
    priceRange: '₹1,100 - ₹3,200 per 90m coil',
    durability: '40+ years',
    brands: ['Polycab FRLS-ZH', 'Polycab Green Wire'],
    budgetFriendly: false,
    pros: ['Extensive product range', 'High conductivity copper', 'Good for industrial use'],
    cons: ['Can be slightly stiff to work with'],
    warranty: 'Comes with a quality guarantee for performance and safety.',
    usageTips: 'Suitable for a wide range of applications. Their "Green Wire" is an eco-friendly option with low environmental impact.',
    faqs: [],
  },
];

const plumbingMaterials: MaterialRecommendationOutput['recommendations'] = [
  {
    name: 'Supreme Industries Ltd.',
    rating: 4.7,
    tags: ['CPVC pipes', 'Trusted brand', 'Wide network'],
    description: 'An old and trusted brand in the Indian market, known for good quality CPVC pipes, fittings, and a wide network of distributors.',
    priceRange: 'Mid to Premium',
    durability: '50+ years',
    brands: ['Supreme CPVC'],
    budgetFriendly: false,
    pros: ['Strong brand reputation', 'Consistent quality', 'Widely available'],
    cons: ['Can be on the pricier side'],
    warranty: 'Standard manufacturer warranty on products.',
    usageTips: 'A reliable choice for both hot and cold water plumbing systems in residential and commercial projects.',
    faqs: [],
  },
  {
    name: 'Astral Pipes',
    rating: 4.8,
    tags: ['Innovative', 'Certified', 'CPVC/PVC'],
    description: 'Known for innovation and high-quality certifications, Astral offers a wide variety of CPVC, PVC, and HDPE plumbing and drainage systems.',
    priceRange: 'Premium',
    durability: '50+ years',
    brands: ['Astral CPVC Pro', 'Astral P-trap'],
    budgetFriendly: false,
    pros: ['Leader in innovation', 'High-quality standards', 'Excellent for hot water applications'],
    cons: ['Premium pricing'],
    warranty: 'Often comes with a long-term performance warranty.',
    usageTips: 'Highly recommended for projects where quality and long-term reliability are paramount. Their products often exceed standard quality requirements.',
    faqs: [{ question: 'Is Astral better than other brands?', answer: 'Astral is widely regarded as a top-tier brand due to its focus on quality, innovation, and certifications, making it a preferred choice for many professionals.' }],
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
  const { toast } = useToast();

  const renderContent = (
    categoryMaterials: MaterialRecommendationOutput['recommendations']
  ) => {
    if (!categoryMaterials || categoryMaterials.length === 0) {
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
          <Tabs defaultValue="concrete" className="w-full">
            <TabsList>
              <TabsTrigger value="concrete">M25 Concrete</TabsTrigger>
              <TabsTrigger value="steel">Steel (TMT Bars)</TabsTrigger>
            </TabsList>
            <TabsContent value="concrete" className="mt-6">
              {renderContent(concreteMaterials)}
            </TabsContent>
            <TabsContent value="steel" className="mt-6">
              {renderContent(steelMaterials)}
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="walls">
          {renderContent([])}
        </TabsContent>
        <TabsContent value="waterproofing">
          {renderContent(waterproofingMaterials)}
        </TabsContent>
        <TabsContent value="electrical">
           <Tabs defaultValue="electrical-wiring" className="w-full">
            <TabsList>
              <TabsTrigger value="electrical-wiring">Electrical (Wires)</TabsTrigger>
              <TabsTrigger value="plumbing-pipes">Plumbing (Pipes)</TabsTrigger>
            </TabsList>
            <TabsContent value="electrical-wiring" className="mt-6">
              {renderContent(electricalMaterials)}
            </TabsContent>
            <TabsContent value="plumbing-pipes" className="mt-6">
              {renderContent(plumbingMaterials)}
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="finishing">
          {renderContent([])}
        </TabsContent>
      </Tabs>
    </div>
  );
}
