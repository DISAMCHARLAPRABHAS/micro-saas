'use server';

/**
 * @fileOverview This file defines a Genkit flow for recommending construction materials based on user specifications.
 *
 * The flow takes a material category as input and returns a structured list of material recommendations.
 *
 * @param {MaterialRecommendationInput} input - The input data containing the material category.
 * @returns {Promise<MaterialRecommendationOutput>} - A promise that resolves with the material recommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const MaterialRecommendationInputSchema = z.object({
  category: z
    .string()
    .describe(
      'The category of materials to recommend (e.g., "Foundation & Structure", "Walls & Roofing", "Waterproofing", "Electrical & Plumbing", "Paint & Finishing").'
    ),
});

export type MaterialRecommendationInput = z.infer<
  typeof MaterialRecommendationInputSchema
>;

// Define the output schema for a single material
const MaterialSchema = z.object({
  name: z.string().describe('The name of the material (e.g., "M25 Grade Concrete").'),
  rating: z.number().describe('A rating from 1 to 5, can be a float.'),
  tags: z.array(z.string()).describe('Keywords associated with the material (e.g., ["Foundation", "Columns"]).'),
  description: z.string().describe('A short description of the material.'),
  priceRange: z.string().describe('The estimated price range in INR (e.g., "₹4,500-5,200/cubic meter").'),
  durability: z.string().describe('The expected durability (e.g., "25+ years").'),
  brands: z.array(z.string()).describe('A list of recommended brands (e.g., ["UltraTech", "ACC", "Ambuja"]).'),
  budgetFriendly: z.boolean().describe('Whether the material is considered budget-friendly.'),
});

const MaterialRecommendationOutputSchema = z.object({
  recommendations: z
    .array(MaterialSchema)
    .describe(
      'A list of recommended construction materials for the given category.'
    ),
});

export type MaterialRecommendationOutput = z.infer<
  typeof MaterialRecommendationOutputSchema
>;

// Exported function to call the flow
export async function recommendMaterials(
  input: MaterialRecommendationInput
): Promise<MaterialRecommendationOutput> {
  return materialRecommendationFlow(input);
}

// Define the prompt
const materialRecommendationPrompt = ai.definePrompt({
  name: 'materialRecommendationPrompt',
  input: {schema: MaterialRecommendationInputSchema},
  output: {schema: MaterialRecommendationOutputSchema},
  prompt: `You are an expert in construction materials. Based on the category provided, recommend 2-3 relevant construction materials. For each material, provide all the details as specified in the output schema.

Category: {{{category}}}

Generate detailed recommendations including name, rating, tags, description, price range in INR (Indian Rupees), durability, a list of 2-3 popular brands, and whether it's budget-friendly.
`,
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
