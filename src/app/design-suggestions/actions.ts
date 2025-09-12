'use server';

import {
  getImageBasedDesignSuggestions,
  type ImageBasedDesignSuggestionsInput,
  type ImageBasedDesignSuggestionsOutput,
} from '@/ai/flows/image-based-design-suggestions';
import { z } from 'zod';

const schema = z.object({
  photoDataUri: z.string().startsWith('data:image/'),
});

export async function getSuggestionsAction(
  input: ImageBasedDesignSuggestionsInput
): Promise<{ data: ImageBasedDesignSuggestionsOutput | null; error: string | null }> {
  const validated = schema.safeParse(input);
  if (!validated.success) {
    return { data: null, error: 'Invalid input.' };
  }

  try {
    const data = await getImageBasedDesignSuggestions(validated.data);
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: 'Failed to get suggestions from the image.' };
  }
}
