import { PlanningIdeasGenerator } from '@/components/features/planning-ideas-generator';
import { PageHeader } from '@/components/page-header';

export default function PlanningIdeasPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Elevation and Planning Ideas"
        description="Describe your preferences to generate elevation ideas and smart planning suggestions."
      />
      <div className="flex-1 overflow-y-auto p-6 pt-0">
        <PlanningIdeasGenerator />
      </div>
    </div>
  );
}
