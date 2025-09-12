'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getPlanningIdeasAction } from '@/app/planning-ideas/actions';
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState } from 'react';
import type { ElevationAndPlanningIdeasOutput } from '@/ai/flows/elevation-and-planning-ideas';
import { LoaderCircle, LayoutTemplate } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  preferences: z.string().min(10, 'Please describe your preferences in more detail.'),
});

export function PlanningIdeasGenerator() {
  const [result, setResult] = useState<ElevationAndPlanningIdeasOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferences: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const { data, error } = await getPlanningIdeasAction(values);
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
          <CardTitle>Idea Generator</CardTitle>
          <CardDescription>Describe your dream home to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Preferences</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I want a 3-bedroom modern house with an open kitchen, lots of natural light, and a home office.'"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The more detail you provide, the better the suggestions will be.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Generate Ideas
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
                <p>Generating elevation and planning ideas...</p>
            </div>
          </Card>
        )}
        {!isLoading && !result && (
            <Card className="flex items-center justify-center min-h-[300px] border-dashed">
                <div className="text-center text-muted-foreground space-y-2">
                    <LayoutTemplate className="mx-auto h-8 w-8" />
                    <p>Your generated ideas will appear here.</p>
                </div>
            </Card>
        )}
        {result && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Elevation Ideas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{result.elevationIdeas}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Smart Planning Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="whitespace-pre-line">{result.planningSuggestions}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
