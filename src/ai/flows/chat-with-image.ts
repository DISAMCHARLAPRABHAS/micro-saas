'use server';
/**
 * @fileOverview An AI chatbot that can process images along with text queries.
 *
 * - chatWithImage - A function that handles the chat with image process.
 * - ChatWithImageInput - The input type for the chatWithImage function.
 * - ChatWithImageOutput - The return type for the chatWithImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithImageInputSchema = z.object({
  query: z.string().optional().describe('The user query about home construction, materials, design, or budgeting.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ChatWithImageInput = z.infer<typeof ChatWithImageInputSchema>;

const ChatWithImageOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type ChatWithImageOutput = z.infer<typeof ChatWithImageOutputSchema>;

export async function chatWithImage(input: ChatWithImageInput): Promise<ChatWithImageOutput> {
  return chatWithImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatWithImagePrompt',
  input: {schema: ChatWithImageInputSchema},
  output: {schema: ChatWithImageOutputSchema},
  prompt: `You are a helpful AI chatbot assistant named Nexa that answers questions related to home construction, materials, design, and budgeting. Use your knowledge to provide informative and helpful answers to the user's query. If an image is provided, analyze it and incorporate it into your answer. Start your response by introducing yourself as Nexa.

User Query: {{{query}}}
Image: {{media url=photoDataUri}}`,
});

const chatWithImageFlow = ai.defineFlow(
  {
    name: 'chatWithImageFlow',
    inputSchema: ChatWithImageInputSchema,
    outputSchema: ChatWithImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
