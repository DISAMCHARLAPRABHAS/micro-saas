export type HousePlan = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  tag: 'Popular' | 'New' | 'Trending';
  area: string;
  bedrooms: string;
  facing: string;
  floor: string;
};

export const housePlans: HousePlan[] = [
  {
    id: 'plan-1',
    title: 'Compact 2BHK with Pooja Room',
    description:
      'A practical design for smaller plots, featuring two bedrooms, a living area, kitchen, and a dedicated pooja (prayer) room, which is a common requirement in Indian homes.',
    imageUrl: 'https://picsum.photos/seed/plan-1-vertical/300/400',
    imageHint: 'house floor plan',
    tag: 'Popular',
    area: '1200 sqft',
    bedrooms: '2 BHK',
    facing: 'East',
    floor: 'Ground Floor',
  },
  {
    id: 'plan-2',
    title: 'Modern 1BHK for Small Family',
    description:
      'An efficient and modern 1BHK layout perfect for a small family or a couple. It maximizes space with an open-plan kitchen and living area.',
    imageUrl: 'https://picsum.photos/seed/plan-2-vertical/300/400',
    imageHint: 'modern apartment floor plan',
    tag: 'New',
    area: '800 sqft',
    bedrooms: '1 BHK',
    facing: 'West',
    floor: 'Ground Floor',
  },
  {
    id: 'plan-3',
    title: 'Spacious 3BHK Duplex',
    description:
      'A luxurious G+1 or G+2 duplex plan with three spacious bedrooms, multiple balconies, and a separate family lounge area for comfort.',
    imageUrl: 'https://picsum.photos/seed/plan-3-vertical/300/400',
    imageHint: 'duplex floor plan',
    tag: 'Trending',
    area: '1500 sqft',
    bedrooms: '3 BHK',
    facing: 'North',
    floor: 'G +2 Floors',
  },
];
