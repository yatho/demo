import { useEffect, useState } from 'react';
import type { Feature } from '../types/feature';
import '../styles/VoteButton.css';
import { hasVoted } from '../utils/voteStorage';

interface VoteButtonProps {
  feature: Feature;
  onVote: (featureId: string) => boolean;
}

export const VoteButton = ({ feature, onVote }: VoteButtonProps) => {
  const [voted, setVoted] = useState<boolean>(() => {
    try {
      return typeof window !== 'undefined' && hasVoted(feature.id);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // Keep local state in sync if the feature prop changes (unlikely) or when component mounts
    setVoted(typeof window !== 'undefined' && hasVoted(feature.id));
  }, [feature.id]);

  const handleClick = () => {
    if (voted) {
      // Friendly feedback when already voted
      // Keep UX simple: alert. If you prefer a different UX (toast/snackbar) I can implement it.
      alert('Vous avez déjà voté depuis ce navigateur.');
      return;
    }

    const accepted = onVote(feature.id);
    if (accepted) {
      setVoted(true);
    } else {
      alert('Vous avez déjà voté depuis ce navigateur.');
    }
  };

  return (
    <button
      className="vote-button"
      onClick={handleClick}
      aria-label={`Vote for ${feature.title}`}
      disabled={voted}
      title={voted ? 'Vous avez déjà voté depuis ce navigateur.' : `Vote for ${feature.title}`}
    >
      👍 {feature.votes}
    </button>
  );
};
