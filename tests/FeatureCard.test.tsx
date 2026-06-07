import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeatureCard } from '../src/components/FeatureCard';
import { Feature } from '../src/types/feature';

describe('FeatureCard', () => {
  const mockFeature: Feature = {
    id: '1',
    title: 'Test Feature',
    description: 'This is a test feature',
    category: 'AI',
    votes: 42,
  };

  it('renders feature title and description', () => {
    const mockOnVote = vi.fn();
    render(<FeatureCard feature={mockFeature} onVote={mockOnVote} />);

    expect(screen.getByText('Test Feature')).toBeInTheDocument();
    expect(screen.getByText('This is a test feature')).toBeInTheDocument();
  });

  it('displays the correct category badge', () => {
    const mockOnVote = vi.fn();
    render(<FeatureCard feature={mockFeature} onVote={mockOnVote} />);

    expect(screen.getByText('AI')).toBeInTheDocument();
  });

  it('calls onVote when vote button is clicked', () => {
    const mockOnVote = vi.fn();
    render(<FeatureCard feature={mockFeature} onVote={mockOnVote} />);

    const voteButton = screen.getByRole('button');
    fireEvent.click(voteButton);

    expect(mockOnVote).toHaveBeenCalledWith('1');
  });

  it('displays vote count', () => {
    const mockOnVote = vi.fn();
    render(<FeatureCard feature={mockFeature} onVote={mockOnVote} />);

    expect(screen.getByText(/42/)).toBeInTheDocument();
  });
});
