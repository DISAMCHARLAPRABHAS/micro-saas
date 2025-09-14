
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { ChatHistory } from './chat-history';
import { ChatInterface, type Message } from './chat-interface';
import { useAuth } from '@/hooks/use-auth';
import { getChatMessages, createChat, getChats, type Chat } from '@/lib/firebase';
import { LoaderCircle } from 'lucide-react';

export function ChatLayout() {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchChats = useCallback(async () => {
    if (user) {
      setIsLoading(true);
      const userChats = await getChats(user.uid);
      setChats(userChats);
      if (userChats.length > 0 && !activeChatId) {
        setActiveChatId(userChats[0].id);
      }
      setIsLoading(false);
    }
  }, [user, activeChatId]);

  const fetchMessages = useCallback(async () => {
    if (activeChatId) {
      setIsLoading(true);
      const chatMessages = await getChatMessages(activeChatId);
      setMessages(chatMessages);
      setIsLoading(false);
    } else {
      setMessages([]);
    }
  }, [activeChatId]);

  useEffect(() => {
    fetchChats();
  }, [user]);

  useEffect(() => {
    fetchMessages();
  }, [activeChatId]);

  const handleNewChat = async () => {
    if(user) {
        const newChatId = await createChat(user.uid, 'New Chat');
        await fetchChats();
        setActiveChatId(newChatId);
    }
  };

  const handleMessageSent = () => {
    fetchMessages(); // Refetch messages after sending a new one
    // Potentially refetch chats if the title might change, but not essential
  };

  if (isLoading && chats.length === 0) {
      return (
          <div className="flex h-full items-center justify-center">
              <LoaderCircle className="h-8 w-8 animate-spin" />
          </div>
      )
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <ChatHistory
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId}
          onNewChat={handleNewChat}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <ChatInterface 
            chatId={activeChatId}
            messages={messages}
            onMessageSent={handleMessageSent}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
