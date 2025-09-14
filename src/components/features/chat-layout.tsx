
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
  const [isChatsLoading, setIsChatsLoading] = useState(true);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);

  const fetchChats = useCallback(async () => {
    if (user) {
      setIsChatsLoading(true);
      const userChats = await getChats(user.uid);
      setChats(userChats);
      if (userChats.length > 0 && !activeChatId) {
        setActiveChatId(userChats[0].id);
      }
      setIsChatsLoading(false);
    }
  }, [user]);

  const fetchMessages = useCallback(async () => {
    if (activeChatId) {
      setIsMessagesLoading(true);
      setMessages([]);
      const chatMessages = await getChatMessages(activeChatId);
      setMessages(chatMessages);
      setIsMessagesLoading(false);
    } else {
      setMessages([]);
    }
  }, [activeChatId]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleNewChat = async () => {
    if(user) {
        setIsMessagesLoading(true);
        const newChatId = await createChat(user.uid, 'New Chat');
        await fetchChats(); // Refetch chats to include the new one
        setActiveChatId(newChatId); // Set the new chat as active
    }
  };
  
  const handleMessageSent = useCallback(() => {
    fetchMessages(); // Refetch messages after sending a new one
    // We could also update the chat list here if the title changes
    const currentChat = chats.find(c => c.id === activeChatId);
    if (currentChat && messages.length === 0) {
        fetchChats();
    }
  }, [activeChatId, chats, fetchChats, messages.length]);


  if (isChatsLoading) {
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
            isLoading={isMessagesLoading}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

