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
  paletteName: z.string().describe('The name of the color palette.'),
  description: z.string().describe('A description of the color palette.'),
  colors: z.array(
    z.object({
      name: z.string().describe('The name of the color.'),
      hex: z.string().describe('The HEX code of the color.'),
      rgb: z.string().describe('The RGB code of the color.'),
    })
  ).describe('An array of color objects, each containing the name, HEX code, and RGB code.'),
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

  Based on the design scheme provided by the user, generate a color palette with the specified number of colors.

  Design Scheme: {{{designScheme}}}
  Number of Colors: {{{numberOfColors}}}

  The color palette should include a name, description, and an array of colors. Each color should have a name, HEX code, and RGB code.
  Make sure to generate real and valid HEX and RGB codes. The RGB code should be in the format "rgb(red, green, blue)" where red, green, and blue are integers between 0 and 255.
  Make sure the palette is visually appealing and suitable for the specified design scheme.`, 
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
