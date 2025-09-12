import { ChatInterface } from '@/components/features/chat-interface';
import { PageHeader } from '@/components/page-header';

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="NexaHome Chat"
        description="Ask me anything about home construction, materials, design, and budgeting."
      />
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
}
