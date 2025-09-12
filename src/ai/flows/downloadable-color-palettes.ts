'use server';
/**
 * @fileOverview Flow for generating downloadable color palettes with HEX/RGB codes for different design schemes.
 *
 * - generateColorPalette - A function that generates a color palette based on a design scheme.
 * - GenerateColorPaletteInput - The input type for the generateColorPalette function.
 * - GenerateColorPaletteOutput - The return type for the generateColorPalette function, containing the color palette data.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ColorSchema = z.object({
  name: z.string().describe('The name of the color.'),
  hex: z.string().describe('The HEX code of the color.'),
  rgb: z.string().describe('The RGB code of the color.'),
  suggestedUse: z.string().describe('Suggested use for the color (e.g., Walls, Ceiling, Accent).'),
});

const PaletteSchema = z.object({
  paletteName: z.string().describe('The name of the color palette.'),
  description: z.string().describe('A description of the color palette.'),
  colors: z.array(ColorSchema).describe('An array of color objects.'),
});

const GenerateColorPaletteInputSchema = z.object({
  designScheme: z
    .string()!
    .describe(
      'A description of the desired design scheme (e.g., modern, minimalist, Scandinavian)'
    ),
  numberOfColors: z
    .number()
    .min(3)
    .max(8)
    .default(5)
    .describe('The number of colors to include in the palette.'),
});
export type GenerateColorPaletteInput = z.infer<typeof GenerateColorPaletteInputSchema>;

const GenerateColorPaletteOutputSchema = z.object({
  palettes: z.array(PaletteSchema).describe('An array of generated color palettes.'),
});

export type GenerateColorPaletteOutput = z.infer<typeof GenerateColorPaletteOutputSchema>;

export async function generateColorPalette(input: GenerateColorPaletteInput): Promise<GenerateColorPaletteOutput> {
  return generateColorPaletteFlow(input);
}

const generateColorPalettePrompt = ai.definePrompt({
  name: 'generateColorPalettePrompt',
  input: {schema: GenerateColorPaletteInputSchema},
  output: {schema: GenerateColorPaletteOutputSchema},
  prompt: `You are a professional color palette generator for home designs.

  Based on the design scheme provided by the user, generate 3 distinct color palettes.
  Each palette should have a name, a description, and an array of colors with the specified number of colors. Each color should have a name, HEX code, RGB code, and a suggested use (e.g., Walls, Ceiling, Accent).
  Make sure to generate real and valid HEX and RGB codes. The RGB code should be in the format "rgb(red, green, blue)" where red, green, and blue are integers between 0 and 255.
  Make sure each palette is visually appealing and suitable for the specified design scheme.

  Design Scheme: {{{designScheme}}}
  Number of Colors in each palette: {{{numberOfColors}}}
  `,
});

const generateColorPaletteFlow = ai.defineFlow(
  {
    name: 'generateColorPaletteFlow',
    inputSchema: GenerateColorPaletteInputSchema,
    outputSchema: GenerateColorPaletteOutputSchema,
  },
  async input => {
    const {output} = await generateColorPalettePrompt(input);
    return output!;
  }
);
