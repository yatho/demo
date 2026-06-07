import { describe, it, expect } from 'vitest';
import { filterFeaturesByCategory, getTotalVotes, getMostPopularFeature } from '../src/utils/featureUtils';
import { Feature } from '../src/types/feature';

describe('featureUtils', () => {
  const mockFeatures: Feature[] = [
    {
      id: '1',
      title: 'Feature 1',
      description: 'Description 1',
      category: 'AI',
      votes: 100,
    },
    {
      id: '2',
      title: 'Feature 2',
      description: 'Description 2',
      category: 'Platform',
      votes: 50,
    },
    {
      id: '3',
      title: 'Feature 3',
      description: 'Description 3',
      category: 'AI',
      votes: 75,
    },
  ];

  describe('filterFeaturesByCategory', () => {
    it('returns all features when category is null', () => {
      const result = filterFeaturesByCategory(mockFeatures, null);
      expect(result).toHaveLength(3);
    });

    it('filters features by category', () => {
      const result = filterFeaturesByCategory(mockFeatures, 'AI');
      expect(result).toHaveLength(2);
      expect(result[0].category).toBe('AI');
    });
  });

  describe('getTotalVotes', () => {
    it('calculates total votes correctly', () => {
      const result = getTotalVotes(mockFeatures);
      expect(result).toBe(225);
    });

    // TODO: Add test for empty features array
  });

  describe('getMostPopularFeature', () => {
    it('returns the feature with the most votes', () => {
      const result = getMostPopularFeature(mockFeatures);
      expect(result?.id).toBe('1');
      expect(result?.votes).toBe(100);
    });

    // TODO: Add test for tie scenarios
    // TODO: Add test for empty array
  });
});
