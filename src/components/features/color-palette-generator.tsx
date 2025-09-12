'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { generatePaletteAction } from '@/app/color-palettes/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState } from 'react';
import type { GenerateColorPaletteOutput } from '@/ai/flows/downloadable-color-palettes';
import { LoaderCircle, Paintbrush, Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Image from 'next/image';

const formSchema = z.object({
  designScheme: z.string().min(3, 'Please describe a design scheme.'),
  numberOfColors: z.number().min(3).max(8).default(5),
  roomType: z.string().optional(),
  mood: z.string().optional(),
});

export function ColorPaletteGenerator() {
  const [result, setResult] = useState<GenerateColorPaletteOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      designScheme: '',
      numberOfColors: 5,
      roomType: 'living-room',
      mood: 'warm',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const { data, error } = await generatePaletteAction(values);
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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: `${text} copied to clipboard.`,
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Palette Generator</CardTitle>
          <CardDescription>Describe a design style to create a color palette.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="designScheme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Design Scheme or Reference</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Modern Minimalist' or upload an image" {...field} />
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="roomType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a room" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="living-room">Living Room</SelectItem>
                          <SelectItem value="bedroom">Bedroom</SelectItem>
                          <SelectItem value="kitchen">Kitchen</SelectItem>
                          <SelectItem value="exterior">Exterior</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mood</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a mood" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="warm">Warm</SelectItem>
                          <SelectItem value="calm">Calm</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                           <SelectItem value="minimal">Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="numberOfColors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Colors: {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={3}
                        max={8}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Generate Palette
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
                <p>Generating your palette...</p>
            </div>
          </Card>
        )}
        {!isLoading && !result && (
            <Card className="flex items-center justify-center min-h-[300px] border-dashed">
                <div className="text-center text-muted-foreground space-y-2">
                    <Paintbrush className="mx-auto h-8 w-8" />
                    <p>Your generated palette will appear here.</p>
                </div>
            </Card>
        )}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle>{result.paletteName}</CardTitle>
              <CardDescription>{result.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.colors.map((color) => (
                  <div key={color.hex} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50">
                    <div
                      className="w-16 h-16 rounded-lg border shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold font-headline">{color.name}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <span>{color.hex.toUpperCase()}</span>
                          <Button variant="ghost" size="icon" className="w-6 h-6" onClick={() => handleCopy(color.hex)}>
                            <Copy className="w-3 h-3"/>
                          </Button>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>{color.rgb}</span>
                           <Button variant="ghost" size="icon" className="w-6 h-6" onClick={() => handleCopy(color.rgb)}>
                            <Copy className="w-3 h-3"/>
                          </Button>
                        </div>
                      </div>
                       <p className="text-xs text-muted-foreground mt-1">Suggested use: <span className="font-semibold">{color.hex === result.colors[0].hex ? 'Walls' : color.hex === result.colors[1].hex ? 'Ceiling' : 'Accent'}</span></p>
                    </div>
                  </div>
                ))}
              </div>
               <div className="mt-6 relative aspect-video w-full">
                  <Image src="https://picsum.photos/seed/room-mockup/800/450" alt="Room Mockup" fill className="rounded-lg object-cover" data-ai-hint="living room" />
                  <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                    <p className="text-white font-bold text-lg">Palette applied to room mockup (coming soon)</p>
                  </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button className="w-full" onClick={() => toast({ title: 'Coming Soon!' })}>
                  <Download className="mr-2"/> Download Palette (PNG/PDF)
                </Button>
                 <Button variant="secondary" className="w-full" onClick={() => toast({ title: 'Coming Soon!' })}>✅ Save Palette to Project</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
