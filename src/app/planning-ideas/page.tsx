import { PlanningIdeasGenerator } from '@/components/features/planning-ideas-generator';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Home, Lightbulb, Landmark, Sofa } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    title: 'House Design',
    icon: <Home className="w-8 h-8 text-primary" />,
    description: 'Explore various house designs and layouts.',
    href: '/house-designs',
  },
  {
    title: 'Elevation',
    icon: <Building className="w-8 h-8 text-primary" />,
    description: 'Discover different elevation styles for your home.',
    href: '#', // Will be implemented later
  },
  {
    title: 'Idea Generator',
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    description: 'Get AI-powered ideas for your new home.',
    href: '#generator', // Scrolls to the generator section
  },
  {
    title: 'Loan Guide',
    icon: <Landmark className="w-8 h-8 text-primary" />,
    description: 'Information and guidance on home loans.',
    href: '/loan-guide', 
  },
  {
    title: 'Interior Design',
    icon: <Sofa className="w-8 h-8 text-primary" />,
    description: 'Find inspiration for your home interiors.',
    href: '#', // Will be implemented later
  },
];

export default function PlanningIdeasPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Home Section"
        description="Your starting point for planning your dream home."
      />
      <div className="flex-1 overflow-y-auto p-6 pt-0">
        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Link href="https://ibb.co/yFfv9cfT" target="_blank">
              <Image 
                src="https://i.ibb.co/JjB61wBL/Gemini-Generated-Image-ds5q8ds5q8ds5q8d-1.png"
                alt="Promotional Banner"
                width={1200}
                height={300}
                className="rounded-lg object-cover w-full h-full"
                data-ai-hint="promotional banner"
              />
            </Link>
          </div>
           <div>
             <Link href="https://ibb.co/fzkKH1pS" target="_blank">
              <Image 
                src="https://i.ibb.co/YFcKhRkW/Gemini-Generated-Image-t6t2igt6t2igt6t2.png"
                alt="Gemini-Generated-Image-t6t2igt6t2igt6t2"
                width={600}
                height={300}
                className="rounded-lg object-cover w-full h-full"
                data-ai-hint="modern living room"
              />
            </Link>
           </div>
            <div>
              <Link href="https://ibb.co/B5K3py79" target="_blank">
                <Image 
                  src="https://i.ibb.co/YFTQCcKx/Gemini-Generated-Image.png"
                  alt="Gemini-Generated-Image"
                  width={600}
                  height={300}
                  className="rounded-lg object-cover w-full h-full"
                  data-ai-hint="luxury kitchen"
                />
              </Link>
            </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {categories.map((category) => (
            <Link href={category.href} key={category.title}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                    {category.icon}
                    <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
                </Card>
            </Link>
          ))}
        </div>
        <div id="generator">
            <PlanningIdeasGenerator />
        </div>
      </div>
    </div>
  );
}
