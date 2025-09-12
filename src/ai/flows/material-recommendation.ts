// Material Recommendation Flow
'use server';

/**
 * @fileOverview This file defines a Genkit flow for recommending construction materials based on user specifications.
 *
 * The flow takes room type, wall specifications, or slab requirements as input and returns
 * recommendations for appropriate construction materials.
 *
 * @param {MaterialRecommendationInput} input - The input data containing room type, wall specifications, and/or slab requirements.
 * @returns {Promise<MaterialRecommendationOutput>} - A promise that resolves with the material recommendations.
 *
 * @example
 * // Example usage:
 * const input = {
 *   roomType: "Bathroom",
 *   wallSpecs: "Moisture resistant",
 *   slabRequirements: "None"
 * };
 *
 * const recommendations = await recommendMaterials(input);
 * console.log(recommendations);
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const MaterialRecommendationInputSchema = z.object({
  roomType: z.string().describe("The type of room (e.g., bedroom, bathroom, kitchen).").optional(),
  wallSpecs: z.string().describe("Specifications for the walls (e.g., moisture resistant, soundproof).").optional(),
  slabRequirements: z.string().describe("Requirements for the slab (e.g., load-bearing, insulated).").optional(),
});

export type MaterialRecommendationInput = z.infer<typeof MaterialRecommendationInputSchema>;

// Define the output schema
const MaterialRecommendationOutputSchema = z.object({
  recommendations: z.string().describe("Recommended construction materials based on the input specifications."),
});

export type MaterialRecommendationOutput = z.infer<typeof MaterialRecommendationOutputSchema>;

// Exported function to call the flow
export async function recommendMaterials(input: MaterialRecommendationInput): Promise<MaterialRecommendationOutput> {
  return materialRecommendationFlow(input);
}

// Define the prompt
const materialRecommendationPrompt = ai.definePrompt({
  name: 'materialRecommendationPrompt',
  input: {schema: MaterialRecommendationInputSchema},
  output: {schema: MaterialRecommendationOutputSchema},
  prompt: `Based on the following specifications, recommend appropriate construction materials:

  {% if roomType %}Room Type: {{{roomType}}}{% endif %}
  {% if wallSpecs %}Wall Specifications: {{{wallSpecs}}}{% endif %}
  {% if slabRequirements %}Slab Requirements: {{{slabRequirements}}}{% endif %}

  Recommendations:`, // Use Handlebars syntax to conditionally include the specifications
});

// Define the flow
const materialRecommendationFlow = ai.defineFlow(
  {
    name: 'materialRecommendationFlow',
    inputSchema: MaterialRecommendationInputSchema,
    outputSchema: MaterialRecommendationOutputSchema,
  },
  async input => {
    const {output} = await materialRecommendationPrompt(input);
    return output!;
  }
);
