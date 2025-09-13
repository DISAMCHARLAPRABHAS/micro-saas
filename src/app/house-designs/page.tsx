import { PageHeader } from '@/components/page-header';
import { PlanCard } from '@/components/features/plan-card';
import { housePlans } from '@/lib/placeholder-plans';

export default function HouseDesignsPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="House Designs"
        description="Explore a collection of house plans suitable for Indian families."
      />
      <div className="flex-1 overflow-y-auto p-6 pt-0">
        <div className="space-y-8">
          {housePlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}
