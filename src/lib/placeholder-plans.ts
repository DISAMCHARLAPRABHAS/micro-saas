export type HousePlan = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const housePlans: HousePlan[] = [
  {
    id: '2bhk-compact-pooja',
    title: 'Compact 2BHK with Pooja Room',
    description:
      'A practical design for smaller plots, featuring two bedrooms, a living area, kitchen, and a dedicated pooja (prayer) room, which is a common requirement in Indian homes.',
    imageUrl: 'https://picsum.photos/seed/compact-2bhk/600/400',
    imageHint: '2bhk floor plan',
  },
];
