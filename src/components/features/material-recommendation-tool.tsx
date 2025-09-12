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
import { LoaderCircle, Wrench } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Material Finder</CardTitle>
          <CardDescription>Specify your requirements to get material recommendations.</CardDescription>
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
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{result.recommendations}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
