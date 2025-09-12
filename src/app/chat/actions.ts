'use server';

import { chatBotAssistance } from '@/ai/flows/chatbot-assistance';
import { chatWithImage } from '@/ai/flows/chat-with-image';
import { z } from 'zod';

const schema = z.object({
  query: z.string(),
  photoDataUri: z.string().optional(),
});

export async function getChatbotResponse(input: { query: string, photoDataUri?: string }) {
  const validatedInput = schema.parse(input);
  try {
    if (validatedInput.photoDataUri) {
      const result = await chatWithImage(validatedInput as { query: string, photoDataUri: string });
      return { answer: result.answer };
    }
    const result = await chatBotAssistance({ query: validatedInput.query });
    return { answer: result.answer };
  } catch (error) {
    console.error(error);
    return { error: 'An error occurred while getting the response.' };
  }
}
