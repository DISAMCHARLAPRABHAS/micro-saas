'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { type HousePlan } from '@/lib/placeholder-plans';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

type PlanCardProps = {
  plan: HousePlan;
};

export function PlanCard({ plan }: PlanCardProps) {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: 'Saved!',
      description: `The "${plan.title}" plan has been saved to your profile.`,
    });
  };

  const handleViewDetails = () => {
    toast({
        title: "Details Coming Soon",
        description: "Detailed view for this plan will be available shortly."
    })
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/3 aspect-[3/4]">
           <Image
            src={plan.imageUrl}
            alt={plan.title}
            fill
            className="object-cover"
            data-ai-hint={plan.imageHint}
          />
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
                <Badge 
                    variant={
                        plan.tag === 'Popular' ? 'default' : 
                        plan.tag === 'New' ? 'secondary' : 'destructive'
                    }
                    className="mb-4"
                >
                    {plan.tag}
                </Badge>
                <h2 className="text-3xl font-bold">{plan.area}</h2>
                <p className="text-muted-foreground text-lg mt-1">{plan.bedrooms} &middot; {plan.facing}</p>
                <p className="text-muted-foreground text-lg">{plan.floor}</p>
            </div>
            <div className="flex gap-2 mt-6">
                <Button className="w-full" onClick={handleViewDetails}>View Details</Button>
                <Button variant="outline" className="w-full" onClick={handleSave}>Save</Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
