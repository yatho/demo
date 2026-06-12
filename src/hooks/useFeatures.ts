import { useState } from 'react';
import type { Feature } from '../types/feature';
import { mockFeatures } from '../data/mockFeatures';
import { hasVoted, markVoted } from '../utils/voteStorage';

export const useFeatures = () => {
  const [features, setFeatures] = useState<Feature[]>(mockFeatures);

  // Returns true if the vote was accepted, false if the navigator already voted for this feature
  const voteForFeature = (featureId: string): boolean => {
    // Guard for storage-based "already voted" check
    if (typeof window !== 'undefined' && hasVoted(featureId)) {
      return false;
    }

    setFeatures(prev =>
      prev.map(feature =>
        feature.id === featureId ? { ...feature, votes: feature.votes + 1 } : feature
      )
    );

    // Persist the fact this navigator voted for the feature
    if (typeof window !== 'undefined') {
      markVoted(featureId);
    }

    return true;
  };

  return {
    features,
    voteForFeature,
  };
};
