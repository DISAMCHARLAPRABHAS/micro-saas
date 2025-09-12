import { ColorPaletteGenerator } from '@/components/features/color-palette-generator';
import { PageHeader } from '@/components/page-header';

export default function ColorPalettesPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Downloadable Color Palettes"
        description="Generate color palettes with HEX/RGB codes for different design schemes."
      />
      <div className="flex-1 overflow-y-auto p-6 pt-0">
        <ColorPaletteGenerator />
      </div>
    </div>
  );
}
