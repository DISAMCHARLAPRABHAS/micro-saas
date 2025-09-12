'use client';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type StarRatingProps = {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: 'sm' | 'default';
  className?: string;
};

export function StarRating({ rating, onRatingChange, size = 'default', className }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const isEditable = !!onRatingChange;

  const starSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            starSize,
            'transition-colors',
            isEditable ? 'cursor-pointer' : 'cursor-default',
            (hoverRating >= star || (!hoverRating && rating >= star))
              ? 'text-yellow-500 fill-yellow-500'
              : 'text-muted-foreground/50'
          )}
          onClick={() => onRatingChange?.(star)}
          onMouseEnter={() => isEditable && setHoverRating(star)}
          onMouseLeave={() => isEditable && setHoverRating(0)}
        />
      ))}
    </div>
  );
}
