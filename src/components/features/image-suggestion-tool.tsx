'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { getSuggestionsAction } from '@/app/design-suggestions/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, LoaderCircle, Lightbulb } from 'lucide-react';
import type { ImageBasedDesignSuggestionsOutput } from '@/ai/flows/image-based-design-suggestions';

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export function ImageSuggestionTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ImageBasedDesignSuggestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.webp'] },
    multiple: false,
  });

  async function handleSubmit() {
    if (!file) return;

    setIsLoading(true);
    setResult(null);

    try {
      const photoDataUri = await fileToBase64(file);
      const { data, error } = await getSuggestionsAction({ photoDataUri });
      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
      } else {
        setResult(data);
      }
    } catch (e) {
      toast({
        title: 'Error processing file',
        description: 'Could not read the selected file.',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Upload Your Inspiration</CardTitle>
            <CardDescription>Drag & drop or click to upload an image.</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-primary bg-accent' : 'border-border'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <UploadCloud className="w-12 h-12" />
                {isDragActive ? (
                  <p>Drop the image here...</p>
                ) : (
                  <p>Drag 'n' drop an image here, or click to select one</p>
                )}
              </div>
            </div>

            {preview && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Image Preview:</p>
                <div className="relative aspect-video w-full">
                  <Image src={preview} alt="Preview" fill className="rounded-lg object-cover" />
                </div>
              </div>
            )}
            
            <Button onClick={handleSubmit} disabled={!file || isLoading} className="w-full mt-6">
              {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              Get Suggestions
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        {isLoading && (
          <Card className="flex items-center justify-center min-h-[400px]">
            <div className="text-center text-muted-foreground space-y-2">
                <LoaderCircle className="mx-auto h-8 w-8 animate-spin" />
                <p>Analyzing your image...</p>
            </div>
          </Card>
        )}
        {!isLoading && !result && (
            <Card className="flex items-center justify-center min-h-[400px] border-dashed">
                <div className="text-center text-muted-foreground space-y-2">
                    <Lightbulb className="mx-auto h-8 w-8" />
                    <p>Your AI-powered suggestions will appear here.</p>
                </div>
            </Card>
        )}
        {result && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Design Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{result.designSuggestions}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Elevation Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="whitespace-pre-line">{result.elevationSuggestions}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Color Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{result.colorSuggestions}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
