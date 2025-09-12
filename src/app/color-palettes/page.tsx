import { ColorPaletteGenerator } from '@/components/features/color-palette-generator';
import { PageHeader } from '@/components/page-header';

export default function ColorPalettesPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Professional Color Palettes"
        description="Download ready-to-use color schemes with hex codes for your dream house"
      />
      <div className="flex-1 overflow-y-auto p-6 pt-0">
        <ColorPaletteGenerator />
      </div>
    </div>
  );
}
