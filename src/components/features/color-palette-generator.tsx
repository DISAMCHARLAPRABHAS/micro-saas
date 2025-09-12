'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useState } from 'react';
import type {
  GenerateColorPaletteOutput,
  GenerateColorPaletteInput,
} from '@/ai/flows/downloadable-color-palettes';
import { LoaderCircle, Palette, Copy, Download, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { generatePaletteAction } from '@/app/color-palettes/actions';
import { Slider } from '../ui/slider';

const formSchema = z.object({
  designScheme: z
    .string()
    .min(3, 'Please describe the design scheme in more detail.'),
  numberOfColors: z.number().min(3).max(8),
});

const initialPalettes: GenerateColorPaletteOutput['palettes'] = [
  {
    paletteName: 'Modern Minimalist',
    description: 'Clean, contemporary feel with neutral tones',
    colors: [
      { name: 'Pure White', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', suggestedUse: 'Walls, Ceiling' },
      { name: 'Charcoal Gray', hex: '#2D3E50', rgb: 'rgb(45, 62, 80)', suggestedUse: 'Accent Wall' },
      { name: 'Soft Gray', hex: '#BDC3C7', rgb: 'rgb(189, 195, 199)', suggestedUse: 'Trim, Doors' },
      { name: 'Warm Beige', hex: '#F5F3F0', rgb: 'rgb(245, 243, 240)', suggestedUse: 'Secondary Walls' },
    ],
  },
  {
    paletteName: 'Earthy Warmth',
    description: 'Natural, cozy atmosphere with earth tones',
    colors: [
      { name: 'Cream', hex: '#F7F3E9', rgb: 'rgb(247, 243, 233)', suggestedUse: 'Main Walls' },
      { name: 'Terracotta', hex: '#CD853F', rgb: 'rgb(205, 133, 63)', suggestedUse: 'Feature Wall' },
      { name: 'Forest Green', hex: '#355E3B', rgb: 'rgb(53, 94, 59)', suggestedUse: 'Accents' },
      { name: 'Warm White', hex: '#FAF9F6', rgb: 'rgb(250, 249, 246)', suggestedUse: 'Ceiling, Trim' },
    ],
  },
  {
    paletteName: 'Coastal Breeze',
    description: 'Fresh, airy feel inspired by the ocean',
    colors: [
      { name: 'Sky Blue', hex: '#87CEEB', rgb: 'rgb(135, 206, 235)', suggestedUse: 'Bedroom Walls' },
      { name: 'Sandy Beige', hex: '#F4E4BC', rgb: 'rgb(244, 228, 188)', suggestedUse: 'Living Area' },
      { name: 'Ocean Teal', hex: '#4A8B8B', rgb: 'rgb(74, 139, 139)', suggestedUse: 'Bathroom Accent' },
      { name: 'Crisp White', hex: '#FAFAFA', rgb: 'rgb(250, 250, 250)', suggestedUse: 'Ceiling, Trim' },
    ],
  },
];

export function ColorPaletteGenerator() {
  const [palettes, setPalettes] = useState<
    GenerateColorPaletteOutput['palettes']
  >(initialPalettes);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      designScheme: 'Modern minimalist',
      numberOfColors: 5,
    },
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: `${text} copied to clipboard.`,
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPalettes([]);
    const { data, error } = await generatePaletteAction(values);
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
      setPalettes(initialPalettes); // Reset to initial on error
    } else if (data) {
      setPalettes(data.palettes);
    }
    setIsLoading(false);
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Palette Generator</CardTitle>
          <CardDescription>
            Describe a design scheme to generate color palettes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="designScheme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Design Scheme</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 'Scandinavian', 'Bohemian', 'Coastal'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberOfColors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Colors ({field.value})</FormLabel>
                    <FormControl>
                      <Slider
                        min={3}
                        max={8}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2" />
                )}
                Generate Palettes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {isLoading && (
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
                <Card key={i}>
                    <CardHeader>
                        <div className="h-5 w-2/3 bg-muted rounded-md animate-pulse" />
                        <div className="h-4 w-full bg-muted rounded-md animate-pulse mt-1" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[...Array(5)].map((_, j) => (
                            <div key={j} className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-muted animate-pulse shrink-0" />
                                <div className="flex-1 space-y-2">
                                     <div className="h-4 w-1/2 bg-muted rounded-md animate-pulse" />
                                     <div className="h-3 w-1/4 bg-muted rounded-md animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
         </div>
      )}
      {!isLoading && palettes.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {palettes.map((palette) => (
            <Card key={palette.paletteName}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  {palette.paletteName}
                </CardTitle>
                <CardDescription>{palette.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {palette.colors.map((color) => (
                    <div key={color.hex} className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-lg border shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold font-headline text-sm">
                          {color.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <span>{color.hex.toUpperCase()}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-5 h-5"
                              onClick={() => handleCopy(color.hex)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {color.suggestedUse}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-6">
                  <Button
                    className="w-full"
                    onClick={() => toast({ title: 'Coming Soon!' })}
                  >
                    <Download className="mr-2" /> Download Palette
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
       {!isLoading && palettes.length === 0 && (
          <Card className="flex items-center justify-center min-h-[200px] border-dashed col-span-full">
            <div className="text-center text-muted-foreground">
              <Palette className="mx-auto h-8 w-8 mb-2" />
              <p>Your generated palettes will appear here.</p>
            </div>
          </Card>
      )}
    </div>
  );
}
