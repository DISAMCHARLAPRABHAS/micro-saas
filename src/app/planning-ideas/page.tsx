import { PlanningIdeasGenerator } from '@/components/features/planning-ideas-generator';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Home, Lightbulb, Landmark, Sofa } from 'lucide-react';

const categories = [
  {
    title: 'House Design',
    icon: <Home className="w-8 h-8 text-primary" />,
    description: 'Explore various house designs and layouts.',
  },
  {
    title: 'Elevation',
    icon: <Building className="w-8 h-8 text-primary" />,
    description: 'Discover different elevation styles for your home.',
  },
  {
    title: 'Idea Generator',
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    description: 'Get AI-powered ideas for your new home.',
  },
  {
    title: 'Loan Guide',
    icon: <Landmark className="w-8 h-8 text-primary" />,
    description: 'Information and guidance on home loans.',
  },
  {
    title: 'Interior Design',
    icon: <Sofa className="w-8 h-8 text-primary" />,
    description: 'Find inspiration for your home interiors.',
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
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {categories.map((category) => (
            <Card key={category.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4">
                {category.icon}
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <PlanningIdeasGenerator />
      </div>
    </div>
  );
}
