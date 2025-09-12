'use server';

import { chatBotAssistance } from '@/ai/flows/chatbot-assistance';
import { z } from 'zod';

const schema = z.object({
  query: z.string(),
});

export async function getChatbotResponse(input: { query: string }) {
  const validatedInput = schema.parse(input);
  try {
    const result = await chatBotAssistance(validatedInput);
    return { answer: result.answer };
  } catch (error) {
    console.error(error);
    return { error: 'An error occurred while getting the response.' };
  }
}
