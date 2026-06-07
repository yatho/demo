import type { Feature, Category } from '../types/feature';

export const filterFeaturesByCategory = (features: Feature[], category: Category | null): Feature[] => {
  if (!category) return features;
  return features.filter(feature => feature.category === category);
};

export const getTotalVotes = (features: Feature[]): number => {
  return features.reduce((sum, feature) => sum + feature.votes, 0);
};

export const getMostPopularFeature = (features: Feature[]): Feature | null => {
  if (features.length === 0) return null;
  return features.reduce((max, feature) => (feature.votes > max.votes ? feature : max));
};

export const sortFeaturesByVotes = (features: Feature[]): Feature[] => {
  return [...features].sort((a, b) => b.votes - a.votes);
};
