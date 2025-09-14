'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlusCircle, MessageSquare } from 'lucide-react';
import type { Chat } from '@/lib/firebase';
import { formatDistanceToNow } from 'date-fns';

type ChatHistoryProps = {
  chats: Chat[];
  activeChatId: string;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
};

export function ChatHistory({ chats, activeChatId, onSelectChat, onNewChat }: ChatHistoryProps) {
  return (
    <div className="flex h-full flex-col bg-card border-r">
      <div className="p-4 border-b">
        <Button className="w-full justify-start" onClick={onNewChat}>
          <PlusCircle className="mr-2" /> New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
            {chats.length === 0 && (
                <div className="text-center text-sm text-muted-foreground p-4">
                    No chat history. Start a new chat to begin.
                </div>
            )}
          {chats.map(chat => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={cn(
                'w-full text-left p-2 rounded-md transition-colors',
                activeChatId === chat.id
                  ? 'bg-secondary'
                  : 'hover:bg-muted'
              )}
            >
              <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 mt-1 text-muted-foreground shrink-0"/>
                  <div className="flex-1">
                    <p className="text-sm font-medium truncate">{chat.title}</p>
                    {chat.createdAt && (
                        <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(chat.createdAt.seconds * 1000), { addSuffix: true })}
                        </p>
                    )}
                  </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
