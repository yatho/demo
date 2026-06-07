export type Category = 'AI' | 'Platform' | 'Mobile' | 'Security';

export interface Feature {
  id: string;
  title: string;
  description: string;
  category: Category;
  votes: number;
}
