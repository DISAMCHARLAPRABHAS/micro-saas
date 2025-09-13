'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { ZoomIn, ZoomOut, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { type HousePlan } from '@/lib/placeholder-plans';
import { useToast } from '@/hooks/use-toast';

type PlanCardProps = {
  plan: HousePlan;
};

export function PlanCard({ plan }: PlanCardProps) {
  const [scale, setScale] = useState(1);
  const [showDescription, setShowDescription] = useState(false);
  const { toast } = useToast();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = plan.imageUrl;
    link.download = `${plan.title.replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
        title: "Downloading Plan",
        description: `${plan.title} image is being downloaded.`
    })
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{plan.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-auto mb-4 overflow-hidden border rounded-lg">
          <Image
            src={plan.imageUrl}
            alt={plan.title}
            width={600}
            height={400}
            className="transition-transform duration-300"
            style={{ transform: `scale(${scale})` }}
            data-ai-hint={plan.imageHint}
          />
        </div>
        <div className="flex justify-center gap-2 mb-4">
          <Button variant="outline" size="icon" onClick={() => setScale(s => Math.min(s + 0.1, 2))}>
            <ZoomIn />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setScale(s => Math.max(s - 0.1, 0.5))}>
            <ZoomOut />
          </Button>
          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download />
          </Button>
        </div>
        {showDescription && (
            <CardDescription className="mt-4 p-4 bg-muted rounded-lg border">
                {plan.description}
            </CardDescription>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full" onClick={() => setShowDescription(prev => !prev)}>
            {showDescription ? 'Hide Details' : 'View Details'}
            {showDescription ? <ChevronUp className="ml-2"/> : <ChevronDown className="ml-2"/>}
        </Button>
      </CardFooter>
    </Card>
  );
}
