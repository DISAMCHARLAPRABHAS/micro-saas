'use client';

import { getChatbotResponse } from '@/app/chat/actions';
import { AppLogo } from '@/components/app-logo';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { CornerDownLeft, LoaderCircle, Paperclip } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await getChatbotResponse({ query: input });
    if (response.answer) {
      const assistantMessage: Message = { role: 'assistant', content: response.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } else {
      const errorMessage: Message = {
        role: 'assistant',
        content: response.error || 'Sorry, something went wrong.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);


  return (
    <div className="h-full flex flex-col p-6 pt-0">
      <ScrollArea className="flex-1 mb-4" ref={scrollAreaRef}>
        <div className="space-y-6 pr-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground pt-10">
              <AppLogo className="mx-auto h-12 w-12 mb-4" />
              <p className="font-headline">Welcome to HomeAI Chat</p>
              <p>Start a conversation by typing below or uploading a file.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="w-8 h-8 border">
                  <AvatarFallback><AppLogo className="w-5 h-5"/></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'rounded-lg p-3 max-w-lg',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border'
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                 {message.role === 'assistant' && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => toast({ title: 'Coming Soon!' })}>✅ Save to Project</Button>
                    <Button variant="outline" size="sm" onClick={() => toast({ title: 'Coming Soon!' })}>🎨 Generate Palette</Button>
                    <Button variant="outline" size="sm" onClick={() => toast({ title: 'Coming Soon!' })}>🏠 Show Design Ideas</Button>
                    <Button variant="outline" size="sm" onClick={() => toast({ title: 'Coming Soon!' })}>💰 Estimate Budget</Button>
                  </div>
                )}
              </div>
              {message.role === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3 justify-start">
              <Avatar className="w-8 h-8 border">
                <AvatarFallback><AppLogo className="w-5 h-5"/></AvatarFallback>
              </Avatar>
              <div className="rounded-lg p-3 bg-card border">
                <LoaderCircle className="animate-spin w-5 h-5 text-primary" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI..."
          className="pr-28 min-h-[52px] resize-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e as any);
            }
          }}
          disabled={isLoading}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
           <Button type="button" size="icon" variant="ghost" disabled={isLoading} onClick={() => toast({ title: 'File upload coming soon!' })}>
              <Paperclip />
            </Button>
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <CornerDownLeft />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
