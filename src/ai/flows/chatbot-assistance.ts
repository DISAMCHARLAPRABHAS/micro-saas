'use server';
/**
 * @fileOverview An AI chatbot to answer user queries about home construction, materials, design, and budgeting.
 *
 * - chatBotAssistance - A function that handles the chatbot assistance process.
 * - ChatBotAssistanceInput - The input type for the chatBotAssistance function.
 * - ChatBotAssistanceOutput - The return type for the chatBotAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatBotAssistanceInputSchema = z.object({
  query: z.string().describe('The user query about home construction, materials, design, or budgeting.'),
});
export type ChatBotAssistanceInput = z.infer<typeof ChatBotAssistanceInputSchema>;

const ChatBotAssistanceOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type ChatBotAssistanceOutput = z.infer<typeof ChatBotAssistanceOutputSchema>;

export async function chatBotAssistance(input: ChatBotAssistanceInput): Promise<ChatBotAssistanceOutput> {
  return chatBotAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatBotAssistancePrompt',
  input: {schema: ChatBotAssistanceInputSchema},
  output: {schema: ChatBotAssistanceOutputSchema},
  prompt: `You are a helpful AI chatbot assistant that answers questions related to home construction, materials, design, and budgeting. Use your knowledge to provide informative and helpful answers to the user's query.\n\nUser Query: {{{query}}}`,
});

const chatBotAssistanceFlow = ai.defineFlow(
  {
    name: 'chatBotAssistanceFlow',
    inputSchema: ChatBotAssistanceInputSchema,
    outputSchema: ChatBotAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
