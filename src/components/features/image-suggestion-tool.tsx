'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { getSuggestionsAction } from '@/app/design-suggestions/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, LoaderCircle, Lightbulb, Download } from 'lucide-react';
import type { ImageBasedDesignSuggestionsOutput } from '@/ai/flows/image-based-design-suggestions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    if (!file) {
      toast({
        title: 'Upload an image first',
        description: 'You need to upload an image to generate ideas.',
        variant: 'destructive',
      });
      return;
    }

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
    <div className="grid lg:grid-cols-3 gap-8">
      <div className='lg:col-span-1 space-y-6'>
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
              <div className="mt-4 rounded-lg bg-muted p-2">
                <div className="relative aspect-video w-full">
                  <Image src={preview} alt="Preview" fill className="rounded-md object-contain" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <div>
                  <label className="text-sm font-medium">Style</label>
                  <Select>
                      <SelectTrigger><SelectValue placeholder="Select style" /></SelectTrigger>
                      <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="traditional">Traditional</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
              <div>
                  <label className="text-sm font-medium">House Type</label>
                   <Select>
                      <SelectTrigger><SelectValue placeholder="Select house type" /></SelectTrigger>
                      <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="duplex">Duplex</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
              <div>
                  <label className="text-sm font-medium">Budget Level</label>
                   <Select>
                      <SelectTrigger><SelectValue placeholder="Select budget level" /></SelectTrigger>
                      <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
          </CardContent>
        </Card>
         <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
          {isLoading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2"/>}
          {isLoading ? 'Generating...' : 'Generate Ideas'}
        </Button>
        <Button variant="outline" className="w-full" onClick={() => toast({ title: 'Coming Soon!' })}>
          <Download className="mr-2"/>
          Download Design
        </Button>
      </div>
      
      <div className="lg:col-span-2 space-y-4">
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
                    <CardTitle>AI Design Cards</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                    <Card>
                        <Image src="https://picsum.photos/seed/design1/600/400" alt="AI Design Idea 1" width={600} height={400} className="rounded-t-lg object-cover" data-ai-hint="modern minimal" />
                        <CardContent className="pt-4">
                            <p className="font-semibold">Modern minimal 2-floor elevation with glass balcony</p>
                            <div className="flex flex-wrap gap-2 text-xs mt-2">
                                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full">Style: Modern</span>
                                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full">Budget: Mid-range</span>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <Image src="https://picsum.photos/seed/design2/600/400" alt="AI Design Idea 2" width={600} height={400} className="rounded-t-lg object-cover" data-ai-hint="concrete glass" />
                        <CardContent className="pt-4">
                            <p className="font-semibold">Concrete & Glass facade concept</p>
                             <div className="flex flex-wrap gap-2 text-xs mt-2">
                                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full">Materials: Concrete + Glass</span>
                                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full">Budget: Premium</span>
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Smart Planning Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Optimize Room Layout</h4>
                   <p className="text-muted-foreground whitespace-pre-line">{result.designSuggestions}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Lighting Ideas</h4>
                   <p className="text-muted-foreground whitespace-pre-line">{result.colorSuggestions}</p>
                </div>
                 <div>
                  <h4 className="font-semibold">Space-saving recommendations</h4>
                   <p className="text-muted-foreground whitespace-pre-line">{result.elevationSuggestions}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
