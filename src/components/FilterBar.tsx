import type { Category } from '../types/feature';
import '../styles/FilterBar.css';

interface FilterBarProps {
  selectedCategory: Category | null;
  onCategoryChange: (category: Category | null) => void;
}

const categories: (Category | null)[] = [null, 'AI', 'Platform', 'Mobile', 'Security'];

export const FilterBar = ({ selectedCategory, onCategoryChange }: FilterBarProps) => {
  return (
    <div className="filter-bar">
      {categories.map(category => (
        <button
          key={category || 'all'}
          className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category || 'All Categories'}
        </button>
      ))}
    </div>
  );
};
