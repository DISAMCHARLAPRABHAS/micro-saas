'use server';

/**
 * @fileOverview Generates elevation ideas and smart planning suggestions based on user preferences.
 *
 * - generateElevationAndPlanningIdeas - A function that generates elevation and planning ideas.
 * - ElevationAndPlanningIdeasInput - The input type for the generateElevationAndPlanningIdeas function.
 * - ElevationAndPlanningIdeasOutput - The return type for the generateElevationAndPlanningIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ElevationAndPlanningIdeasInputSchema = z.object({
  preferences: z
    .string()
    .describe('The user preferences for elevation and planning ideas.'),
});
export type ElevationAndPlanningIdeasInput = z.infer<
  typeof ElevationAndPlanningIdeasInputSchema
>;

const ElevationAndPlanningIdeasOutputSchema = z.object({
  elevationIdeas: z
    .string()
    .describe('Generated elevation ideas based on user preferences.'),
  planningSuggestions: z
    .string()
    .describe('Smart planning suggestions based on user preferences.'),
});
export type ElevationAndPlanningIdeasOutput = z.infer<
  typeof ElevationAndPlanningIdeasOutputSchema
>;

export async function generateElevationAndPlanningIdeas(
  input: ElevationAndPlanningIdeasInput
): Promise<ElevationAndPlanningIdeasOutput> {
  return elevationAndPlanningIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'elevationAndPlanningIdeasPrompt',
  input: {schema: ElevationAndPlanningIdeasInputSchema},
  output: {schema: ElevationAndPlanningIdeasOutputSchema},
  prompt: `You are an AI assistant specializing in generating elevation ideas and smart planning suggestions for home construction based on user preferences.\n\nUser Preferences: {{{preferences}}}\n\nGenerate elevation ideas and smart planning suggestions based on the provided user preferences.\n\nOutput:\nElevation Ideas: [Generated elevation ideas]\nPlanning Suggestions: [Generated planning suggestions]`, // Improved Prompt
});

const elevationAndPlanningIdeasFlow = ai.defineFlow(
  {
    name: 'elevationAndPlanningIdeasFlow',
    inputSchema: ElevationAndPlanningIdeasInputSchema,
    outputSchema: ElevationAndPlanningIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
