'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import type { MaterialRecommendationOutput } from '@/ai/flows/material-recommendation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, XCircle, HelpCircle, Star, MessageSquare, LoaderCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { StarRating } from '../ui/star-rating';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';


type Review = {
    name: string;
    rating: number;
    comment: string;
    date: string;
}

const initialReviews: Review[] = [
    { name: 'Rohan Sharma', rating: 5, comment: 'Excellent durability and consistent quality. Worth the premium price for critical structural work.', date: '2 weeks ago'},
    { name: 'Priya Singh', rating: 4, comment: 'Good material, but availability can be an issue in my region. Performance is solid otherwise.', date: '1 month ago'},
];


type LearnMoreSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  material: MaterialRecommendationOutput['recommendations'][0];
};

export function LearnMoreSheet({
  isOpen,
  onClose,
  material,
}: LearnMoreSheetProps) {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewRating === 0 || !newReviewComment.trim()) {
      toast({
        title: 'Incomplete Review',
        description: 'Please provide a rating and a comment.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
      const newReview: Review = {
        name: 'You',
        rating: newReviewRating,
        comment: newReviewComment,
        date: 'Just now',
      };
      setReviews([newReview, ...reviews]);
      setNewReviewRating(0);
      setNewReviewComment('');
      setIsSubmitting(false);
      toast({
        title: 'Review Submitted!',
        description: 'Thank you for your feedback.',
      });
    }, 1000);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>{material.rating} / 5</span>
          </div>
          <SheetTitle className="text-2xl font-bold font-headline">{material.name}</SheetTitle>
          <SheetDescription>{material.description}</SheetDescription>
           <div className="flex flex-wrap gap-2 pt-2">
            {material.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
           </div>
        </SheetHeader>

        <div className="space-y-6">
            <div>
                <h4 className="font-semibold mb-2">Pros & Cons</h4>
                <div className="grid gap-2">
                    {material.pros.map((pro, i) => (
                        <div key={`pro-${i}`} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0"/>
                            <span>{pro}</span>
                        </div>
                    ))}
                     {material.cons.map((con, i) => (
                        <div key={`con-${i}`} className="flex items-start gap-2 text-sm">
                            <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0"/>
                            <span>{con}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-semibold mb-2">Technical Details</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li><span className="font-medium text-foreground">Durability:</span> {material.durability}</li>
                    <li><span className="font-medium text-foreground">Warranty:</span> {material.warranty}</li>
                </ul>
            </div>

            <div>
                <h4 className="font-semibold mb-2">Usage Tips</h4>
                <p className="text-sm text-muted-foreground">{material.usageTips}</p>
            </div>

            {material.faqs.length > 0 && (
                <div>
                <h4 className="font-semibold mb-2">Frequently Asked Questions</h4>
                <Accordion type="single" collapsible className="w-full">
                    {material.faqs.map((faq, i) => (
                    <AccordionItem value={`item-${i}`} key={i}>
                        <AccordionTrigger className="text-sm text-left">
                            <div className="flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 shrink-0"/>
                                {faq.question}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                        {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
                </div>
            )}

            <div className="border-t pt-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2"><MessageSquare className="w-5 h-5"/> User Reviews ({reviews.length})</h4>
                 <div className="space-y-4">
                    {reviews.map((review, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <Avatar>
                                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold">{review.name}</p>
                                    <span className="text-xs text-muted-foreground">{review.date}</span>
                                </div>
                                <StarRating rating={review.rating} size="sm" />
                                <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Write a Review</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="review-rating" className="mb-2 block">Your Rating</Label>
                    <StarRating rating={newReviewRating} onRatingChange={setNewReviewRating} />
                  </div>
                  <div>
                    <Label htmlFor="review-comment">Your Review</Label>
                    <Textarea
                      id="review-comment"
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Share your experience with this material..."
                      rows={4}
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? <LoaderCircle className="animate-spin" /> : 'Submit Review'}
                  </Button>
                </form>
              </CardContent>
            </Card>
        </div>

        <SheetFooter className="mt-8 gap-2 sm:flex-col">
          <Button className="w-full" onClick={() => toast({ title: 'Coming soon!'})}>
            Add to Project
          </Button>
          <Button variant="outline" className="w-full" onClick={() => toast({ title: 'This would open the get quote modal.'})}>
            Request Quote
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
