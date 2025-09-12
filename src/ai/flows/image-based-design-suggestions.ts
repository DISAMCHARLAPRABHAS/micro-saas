'use server';
/**
 * @fileOverview An image-based design suggestion AI agent.
 *
 * - getImageBasedDesignSuggestions - A function that handles the image-based design suggestion process.
 * - ImageBasedDesignSuggestionsInput - The input type for the getImageBasedDesignSuggestions function.
 * - ImageBasedDesignSuggestionsOutput - The return type for the getImageBasedDesignSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageBasedDesignSuggestionsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a home or design style, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ImageBasedDesignSuggestionsInput = z.infer<typeof ImageBasedDesignSuggestionsInputSchema>;

const ImageBasedDesignSuggestionsOutputSchema = z.object({
  designSuggestions: z.string().describe('Design suggestions based on the uploaded image.'),
  elevationSuggestions: z.string().describe('Elevation suggestions based on the uploaded image.'),
  colorSuggestions: z.string().describe('Color suggestions based on the uploaded image.'),
});
export type ImageBasedDesignSuggestionsOutput = z.infer<typeof ImageBasedDesignSuggestionsOutputSchema>;

export async function getImageBasedDesignSuggestions(input: ImageBasedDesignSuggestionsInput): Promise<ImageBasedDesignSuggestionsOutput> {
  return imageBasedDesignSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageBasedDesignSuggestionsPrompt',
  input: {schema: ImageBasedDesignSuggestionsInputSchema},
  output: {schema: ImageBasedDesignSuggestionsOutputSchema},
  prompt: `You are a helpful AI assistant that provides design, elevation, and color suggestions for home projects based on user-uploaded images of existing homes or design styles.

  Analyze the provided image and offer creative and practical suggestions for design, elevation, and color schemes. Focus on extracting key elements and features from the image that can be adapted and incorporated into new home designs.

  Provide the suggestions in a structured format, clearly separating design, elevation, and color ideas.

  Image: {{media url=photoDataUri}}

  Here are some keywords that might be present in the image which can help inspire design, elevation, and color suggestions: {{{keywords}}}

  Your response should include the following sections:

  - Design Suggestions: Provide specific design ideas inspired by the image.
  - Elevation Suggestions: Suggest elevation features and styles based on the image.
  - Color Suggestions: Recommend color palettes and combinations that complement the design.
  `,
});

const imageBasedDesignSuggestionsFlow = ai.defineFlow(
  {
    name: 'imageBasedDesignSuggestionsFlow',
    inputSchema: ImageBasedDesignSuggestionsInputSchema,
    outputSchema: ImageBasedDesignSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
