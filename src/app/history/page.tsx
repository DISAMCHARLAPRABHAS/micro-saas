import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { History } from 'lucide-react';

export default function HistoryPage() {
  return (
    <div className="h-full">
      <PageHeader
        title="History"
        description="Review your saved designs, chat history, and uploaded files."
      />
      <div className="p-6 pt-0">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
              <div className="p-4 bg-secondary rounded-full">
                <History className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-headline font-semibold">Coming Soon</h3>
              <p className="text-muted-foreground max-w-md">
                This space will allow you to save your design drafts, chat history, and uploaded files for future reference.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
