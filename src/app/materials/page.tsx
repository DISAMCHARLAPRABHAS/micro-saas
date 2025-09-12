import { MaterialRecommendationTool } from '@/components/features/material-recommendation-tool';
import { PageHeader } from '@/components/page-header';

export default function MaterialsPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Material Recommendation Tool"
        description="Get recommendations for construction materials based on your project's needs."
      />
      <div className="flex-1 overflow-y-auto p-6 pt-0">
        <MaterialRecommendationTool />
      </div>
    </div>
  );
}
