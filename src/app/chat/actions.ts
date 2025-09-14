'use server';

import { chatBotAssistance } from '@/ai/flows/chatbot-assistance';
import { chatWithImage } from '@/ai/flows/chat-with-image';
import { z } from 'zod';

const schema = z.object({
  query: z.string(),
  photoDataUri: z.string().optional(),
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
    image: z.string().optional(),
  }))
});

export async function getChatbotResponse(input: { query: string, photoDataUri?: string, messages: any[] }) {
  const validatedInput = schema.safeParse(input);
  
  if (!validatedInput.success) {
    return { error: 'Invalid input.' };
  }
  
  try {
    const { query, photoDataUri } = validatedInput.data;
    
    let result;
    if (photoDataUri) {
      result = await chatWithImage({ query, photoDataUri });
    } else {
      result = await chatBotAssistance({ query });
    }

    return { answer: result.answer };
  } catch (error) {
    console.error(error);
    return { error: 'An error occurred while getting the response.' };
  }
}
