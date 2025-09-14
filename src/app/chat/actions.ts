'use server';

import { chatBotAssistance } from '@/ai/flows/chatbot-assistance';
import { chatWithImage } from '@/ai/flows/chat-with-image';
import { addMessage } from '@/lib/firebase';
import { z } from 'zod';

const schema = z.object({
  query: z.string(),
  photoDataUri: z.string().optional(),
  chatId: z.string(),
});

export async function getChatbotResponse(input: { chatId: string, query: string, photoDataUri?: string }) {
  const validatedInput = schema.parse(input);
  try {
    // Save user message to Firestore
    await addMessage(validatedInput.chatId, {
      role: 'user',
      content: validatedInput.query,
      ...(validatedInput.photoDataUri && { image: validatedInput.photoDataUri }),
    });
    
    let result;
    if (validatedInput.photoDataUri) {
      result = await chatWithImage(validatedInput as { query: string, photoDataUri: string });
    } else {
      result = await chatBotAssistance({ query: validatedInput.query });
    }

    // Save assistant response to Firestore
    await addMessage(validatedInput.chatId, {
      role: 'assistant',
      content: result.answer,
    });

    return { answer: result.answer };
  } catch (error) {
    console.error(error);
    const errorMessage = 'An error occurred while getting the response.';
     try {
      await addMessage(validatedInput.chatId, {
        role: 'assistant',
        content: errorMessage,
      });
    } catch (dbError) {
      console.error('Failed to save error message to db', dbError);
    }
    return { error: errorMessage };
  }
}
