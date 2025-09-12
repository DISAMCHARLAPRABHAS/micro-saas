'use server';

import {
  recommendMaterials,
  type MaterialRecommendationInput,
  type MaterialRecommendationOutput,
} from '@/ai/flows/material-recommendation';

export async function getMaterialRecommendationAction(
  input: MaterialRecommendationInput
): Promise<{ data: MaterialRecommendationOutput | null; error: string | null }> {
  try {
    const data = await recommendMaterials(input);
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: 'Failed to get material recommendations.' };
  }
}
