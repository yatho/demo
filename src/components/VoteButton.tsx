import type { Feature } from '../types/feature';
import '../styles/VoteButton.css';

interface VoteButtonProps {
  feature: Feature;
  onVote: (featureId: string) => void;
}

export const VoteButton = ({ feature, onVote }: VoteButtonProps) => {
  return (
    <button
      className="vote-button"
      onClick={() => onVote(feature.id)}
      aria-label={`Vote for ${feature.title}`}
    >
      👍 {feature.votes}
    </button>
  );
};
