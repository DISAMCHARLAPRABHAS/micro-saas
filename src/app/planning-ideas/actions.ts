'use server';

import {
  generateElevationAndPlanningIdeas,
  type ElevationAndPlanningIdeasInput,
  type ElevationAndPlanningIdeasOutput,
} from '@/ai/flows/elevation-and-planning-ideas';

export async function getPlanningIdeasAction(
  input: ElevationAndPlanningIdeasInput
): Promise<{ data: ElevationAndPlanningIdeasOutput | null; error: string | null }> {
  try {
    const data = await generateElevationAndPlanningIdeas(input);
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: 'Failed to generate planning ideas.' };
  }
}
