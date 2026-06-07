import type { Feature } from '../types/feature';
import { FeatureCard } from './FeatureCard';
import { sortFeaturesByVotes } from '../utils/featureUtils';
import '../styles/FeatureList.css';

interface FeatureListProps {
  features: Feature[];
  onVote: (featureId: string) => void;
}

export const FeatureList = ({ features, onVote }: FeatureListProps) => {
  const sortedFeatures = sortFeaturesByVotes(features);

  if (sortedFeatures.length === 0) {
    return (
      <div className="feature-list-empty">
        <p>No features found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="feature-list">
      {sortedFeatures.map(feature => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          onVote={onVote}
        />
      ))}
    </div>
  );
};
