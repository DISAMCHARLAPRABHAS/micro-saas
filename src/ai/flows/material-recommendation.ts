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

const FAQSchema = z.object({
  question: z.string().describe("A frequently asked question about the material."),
  answer: z.string().describe("The answer to the question.")
});

// Define the output schema for a single material
const MaterialSchema = z.object({
  name: z.string().describe('The name of the material (e.g., "M25 Grade Concrete").'),
  rating: z.number().min(1).max(5).describe('A rating from 1 to 5, can be a float.'),
  tags: z.array(z.string()).describe('Keywords associated with the material (e.g., ["Foundation", "Columns"]).'),
  description: z.string().describe('A short description of the material.'),
  priceRange: z.string().describe('The estimated price range in INR (e.g., "₹4,500 - ₹5,200 per cubic meter").'),
  durability: z.string().describe('The expected durability (e.g., "25+ years").'),
  brands: z.array(z.string()).describe('A list of 2-3 recommended brands (e.g., ["UltraTech", "ACC", "Ambuja"]).'),
  budgetFriendly: z.boolean().describe('Whether the material is considered budget-friendly.'),
  pros: z.array(z.string()).describe("A list of key advantages of the material."),
  cons: z.array(z.string()).describe("A list of key disadvantages or limitations."),
  warranty: z.string().describe("Information about the material's warranty, if applicable."),
  usageTips: z.string().describe("Practical tips for using or applying the material correctly."),
  faqs: z.array(FAQSchema).describe("A list of 1-2 frequently asked questions with answers."),
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
  prompt: `You are an expert in Indian construction materials. Based on the category provided, recommend 2 relevant construction materials. For each material, provide all the details as specified in the output schema. Ensure all fields are filled with accurate, practical information relevant to the Indian market.

Category: {{{category}}}

Generate detailed recommendations including name, rating, tags, description, price range in INR (Indian Rupees), durability, a list of 2-3 popular brands, whether it's budget-friendly, pros, cons, warranty information, usage tips, and 1-2 frequently asked questions (FAQs).
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
