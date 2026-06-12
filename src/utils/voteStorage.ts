export const VOTE_STORAGE_KEY = 'votedFeatures';

export function getVotedFeatures(): string[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(VOTE_STORAGE_KEY) : null;
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function hasVoted(featureId: string): boolean {
  return getVotedFeatures().includes(featureId);
}

export function markVoted(featureId: string): void {
  try {
    const current = getVotedFeatures();
    if (!current.includes(featureId)) {
      current.push(featureId);
      localStorage.setItem(VOTE_STORAGE_KEY, JSON.stringify(current));
    }
  } catch {
    // ignore storage failures (e.g., private mode)
  }
}
