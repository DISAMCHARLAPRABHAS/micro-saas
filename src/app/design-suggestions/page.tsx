import { ImageSuggestionTool } from '@/components/features/image-suggestion-tool';
import { PageHeader } from '@/components/page-header';

export default function DesignSuggestionsPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Image-Based Design Suggestions"
        description="Provide an image of a home or design style to get design, elevation, and color suggestions."
      />
      <div className="flex-1 overflow-y-auto p-6 pt-0">
        <ImageSuggestionTool />
      </div>
    </div>
  );
}
