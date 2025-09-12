'use server';

import {
  generateColorPalette,
  type GenerateColorPaletteInput,
} from '@/ai/flows/downloadable-color-palettes';

export async function generatePaletteAction(
  input: GenerateColorPaletteInput
): Promise<{ data: Awaited<ReturnType<typeof generateColorPalette>> | null; error: string | null }> {
  try {
    const data = await generateColorPalette(input);
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: 'Failed to generate color palette.' };
  }
}
