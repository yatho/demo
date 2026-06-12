import type { Feature } from '../types/feature';
import { VoteButton } from './VoteButton';
import '../styles/FeatureCard.css';

interface FeatureCardProps {
  feature: Feature;
  onVote: (featureId: string) => boolean;
}

export const FeatureCard = ({ feature, onVote }: FeatureCardProps) => {
  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      AI: '#9333ea',
      Platform: '#3b82f6',
      Mobile: '#ec4899',
      Security: '#ef4444',
    };
    return colors[category] || '#6b7280';
  };

  return (
    <div className="feature-card">
      <div className="card-header">
        <h3 className="feature-title">{feature.title}</h3>
        <span
          className="category-badge"
          style={{ backgroundColor: getCategoryColor(feature.category) }}
        >
          {feature.category}
        </span>
      </div>
      <p className="feature-description">{feature.description}</p>
      <div className="card-footer">
        <VoteButton feature={feature} onVote={onVote} />
      </div>
    </div>
  );
};
