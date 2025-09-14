'use client';
import { ChatInterface } from '@/components/features/chat-interface';
import { PageHeader } from '@/components/page-header';

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="NexaHome Chat"
        description="Your AI assistant for home construction, materials, and design."
      />
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
}
