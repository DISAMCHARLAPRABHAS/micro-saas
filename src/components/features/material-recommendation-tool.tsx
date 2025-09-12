'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getMaterialRecommendationAction } from '@/app/materials/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState } from 'react';
import type { MaterialRecommendationOutput } from '@/ai/flows/material-recommendation';
import { LoaderCircle, Wrench, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const formSchema = z.object({
  roomType: z.string().optional(),
  wallSpecs: z.string().optional(),
  slabRequirements: z.string().optional(),
}).refine(data => data.roomType || data.wallSpecs || data.slabRequirements, {
    message: "Please fill out at least one field.",
    path: ["roomType"],
});

export function MaterialRecommendationTool() {
  const [result, setResult] = useState<MaterialRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomType: '',
      wallSpecs: '',
      slabRequirements: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const { data, error } = await getMaterialRecommendationAction(values);
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } else {
      setResult(data);
    }
    setIsLoading(false);
  }

  return (
    <div>
      <Tabs defaultValue="walls" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-4">
          <TabsTrigger value="walls">Walls</TabsTrigger>
          <TabsTrigger value="roofing">Roofing</TabsTrigger>
          <TabsTrigger value="flooring">Flooring</TabsTrigger>
          <TabsTrigger value="plumbing">Plumbing</TabsTrigger>
          <TabsTrigger value="electrical">Electrical</TabsTrigger>
          <TabsTrigger value="finishes">Finishes</TabsTrigger>
        </TabsList>
        <TabsContent value="walls">
          <p className="text-sm text-muted-foreground p-4 bg-card rounded-lg">AI recommendations for bricks, cement, plaster, and paint bases will appear here based on your project needs.</p>
        </TabsContent>
        <TabsContent value="roofing">
          <p className="text-sm text-muted-foreground p-4 bg-card rounded-lg">AI recommendations for tiles, concrete slabs, and waterproofing will appear here.</p>
        </TabsContent>
        <TabsContent value="flooring">
           <p className="text-sm text-muted-foreground p-4 bg-card rounded-lg">AI recommendations for tiles, marble, wood, and vinyl flooring will appear here.</p>
        </TabsContent>
        <TabsContent value="plumbing">
           <p className="text-sm text-muted-foreground p-4 bg-card rounded-lg">AI recommendations for pipes, fittings, and waterproofing will appear here.</p>
        </TabsContent>
         <TabsContent value="electrical">
           <p className="text-sm text-muted-foreground p-4 bg-card rounded-lg">AI recommendations for wiring, panels, and switches will appear here.</p>
        </TabsContent>
        <TabsContent value="finishes">
           <p className="text-sm text-muted-foreground p-4 bg-card rounded-lg">AI recommendations for paints, polish, and textures will appear here.</p>
        </TabsContent>
      </Tabs>
      
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Get Specific Recommendations</CardTitle>
            <CardDescription>Specify your requirements to get detailed material recommendations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="roomType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 'Bathroom' or 'Kitchen'" {...field} />
                      </FormControl>
                      <FormDescription>What kind of room is this for?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="wallSpecs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wall Specifications</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 'Moisture resistant'" {...field} />
                      </FormControl>
                      <FormDescription>Any special requirements for the walls?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slabRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slab Requirements</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 'Load-bearing'" {...field} />
                      </FormControl>
                      <FormDescription>Any special requirements for the slab/floor?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                  Get Recommendations
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {isLoading && (
            <Card className="flex items-center justify-center min-h-[300px]">
              <div className="text-center text-muted-foreground space-y-2">
                  <LoaderCircle className="mx-auto h-8 w-8 animate-spin" />
                  <p>Finding the best materials...</p>
              </div>
            </Card>
          )}
          {!isLoading && !result && (
              <Card className="flex items-center justify-center min-h-[300px] border-dashed">
                  <div className="text-center text-muted-foreground space-y-2">
                      <Wrench className="mx-auto h-8 w-8" />
                      <p>Material recommendations will appear here.</p>
                  </div>
              </Card>
          )}
          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Recommended Materials</CardTitle>
                <CardDescription>Includes brand, cost range, durability, and more.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="whitespace-pre-line">{result.recommendations}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader><CardTitle>ACC Gold Cement</CardTitle></CardHeader>
                        <CardContent>
                            <p><strong>Cost:</strong> ₹400-₹450 / bag</p>
                            <p><strong>Durability:</strong> 9/10</p>
                            <p><strong>Pros:</strong> Waterproof</p>
                            <p><strong>Cons:</strong> Higher cost</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Anti-Skid Kitchen Tiles</CardTitle></CardHeader>
                        <CardContent>
                            <p><strong>Cost:</strong> ₹80-₹120 / sqft</p>
                            <p><strong>Durability:</strong> 8/10</p>
                            <p><strong>Pros:</strong> Safe for wet areas</p>
                            <p><strong>Cons:</strong> Limited designs</p>
                        </CardContent>
                    </Card>
                </div>
                <Button variant="outline" className="w-full" onClick={() => toast({ title: 'Coming Soon!' })}>
                  <Download className="mr-2"/>
                  Export as PDF/CSV
                </Button>
              </CardContent>
            </Card>
          )}
           <Card>
              <CardHeader><CardTitle>Smart Tips</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>💡 "Use waterproof cement for bathrooms and kitchens."</p>
                  <p>💡 "Go with anti-skid tiles for kitchen and wet areas."</p>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
