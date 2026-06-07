import { useState } from 'react';
import type { Feature } from '../types/feature';
import { mockFeatures } from '../data/mockFeatures';

export const useFeatures = () => {
  const [features, setFeatures] = useState<Feature[]>(mockFeatures);

  const voteForFeature = (featureId: string) => {
    setFeatures(features.map(feature =>
      feature.id === featureId
        ? { ...feature, votes: feature.votes + 1 }
        : feature
    ));
  };

  return {
    features,
    voteForFeature,
  };
};
