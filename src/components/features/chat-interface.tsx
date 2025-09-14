
'use client';

import { getChatbotResponse } from '@/app/chat/actions';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { CornerDownLeft, LoaderCircle, Paperclip, X, Bot } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

export type Message = {
  id?: string;
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

    const currentInput = input;
    const currentImage = image;

    const userMessage: Message = {
        role: 'user',
        content: currentInput,
        ...(currentImage && { image: currentImage }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setImage(null);
    setIsLoading(true);

    try {
        const result = await getChatbotResponse({ 
            query: currentInput, 
            photoDataUri: currentImage || undefined,
            messages: [...messages, userMessage]
        });

        if (result.error) {
             toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            });
             setMessages((prev) => prev.slice(0, -1)); // Remove user message on error
        } else {
            const assistantMessage: Message = {
                role: 'assistant',
                content: result.answer!,
            };
            setMessages((prev) => [...prev, assistantMessage]);
        }
    } catch (error) {
        toast({
            title: "Error",
            description: "Failed to send message. Please try again.",
            variant: "destructive",
        })
        setMessages((prev) => prev.slice(0, -1)); // Remove user message on error
    } finally {
        setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);


  return (
    <div className="h-full flex flex-col p-4 pt-0" {...getRootProps()}>
      <input {...getInputProps()} />
      <ScrollArea className="flex-1 mb-4" ref={scrollAreaRef}>
        <div className="space-y-6 pr-4">
          {messages.length === 0 && !isLoading && (
            <div className="text-center text-muted-foreground pt-10">
              <Bot className="mx-auto h-12 w-12" />
              <h3 className="mt-4 text-lg font-medium">Welcome to NexaHome Chat</h3>
              <p className="mt-1 text-sm">
                Start a conversation by typing below or uploading a file.
              </p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={cn(
                'flex items-start gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="w-8 h-8 border">
                  <AvatarFallback>N</AvatarFallback>
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
                <AvatarFallback>N</AvatarFallback>
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
          placeholder={"Ask AI or drop an image..."}
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
