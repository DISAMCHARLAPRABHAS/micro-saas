'use client';

import { getChatbotResponse } from '@/app/chat/actions';
import { AppLogo } from '@/components/app-logo';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { CornerDownLeft, LoaderCircle, Paperclip, X } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}


export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      fileToBase64(file).then(setImage);
    }
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.webp'] },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((!input.trim() && !image) || isLoading) return;

    const userMessage: Message = { role: 'user', content: input, image: image || undefined };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setImage(null);
    setIsLoading(true);

    const response = await getChatbotResponse({ query: input, photoDataUri: image || undefined });

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
    <div className="h-full flex flex-col p-6 pt-0" {...getRootProps()}>
      <input {...getInputProps()} />
      <ScrollArea className="flex-1 mb-4" ref={scrollAreaRef}>
        <div className="space-y-6 pr-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground pt-10">
              <AppLogo className="mx-auto h-10 w-10 mb-4" />
              <p className="font-headline">Welcome to NexaHome Chat</p>
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
                  <AvatarFallback><AppLogo /></AvatarFallback>
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
                {message.image && (
                  <div className="relative aspect-video mb-2 rounded-md overflow-hidden">
                    <Image src={message.image} alt="User upload" layout="fill" objectFit="cover" />
                  </div>
                )}
                {message.content && <p className="whitespace-pre-wrap">{message.content}</p>}
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
                <AvatarFallback><AppLogo /></AvatarFallback>
              </Avatar>
              <div className="rounded-lg p-3 bg-card border">
                <LoaderCircle className="animate-spin w-5 h-5 text-primary" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="relative">
         {image && (
          <div className="relative w-24 h-24 mb-2 p-2 border rounded-md">
            <Image src={image} alt="Preview" layout="fill" objectFit="cover" className="rounded-md" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
              onClick={() => setImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI or drop an image..."
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
           <Button type="button" size="icon" variant="ghost" disabled={isLoading} onClick={open}>
              <Paperclip />
            </Button>
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || (!input.trim() && !image)}
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
