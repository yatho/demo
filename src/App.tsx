import { useState } from 'react';
import type { Category } from './types/feature';
import { useFeatures } from './hooks/useFeatures';
import { filterFeaturesByCategory } from './utils/featureUtils';
import { Dashboard } from './components/Dashboard';
import { FilterBar } from './components/FilterBar';
import { FeatureList } from './components/FeatureList';
import './App.css';

function App() {
  const { features, voteForFeature } = useFeatures();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filteredFeatures = filterFeaturesByCategory(features, selectedCategory);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🚀 Feature Voting Portal</h1>
          <p className="subtitle">Vote for the features you'd like to see next</p>
        </div>
      </header>

      <main className="app-main">
        <Dashboard features={features} />

        <section className="filter-section">
          <h2>Filter by Category</h2>
          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </section>

        <section className="features-section">
          <h2>
            {selectedCategory ? `${selectedCategory} Features` : 'All Features'}
            <span className="feature-count">({filteredFeatures.length})</span>
          </h2>
          <FeatureList
            features={filteredFeatures}
            onVote={voteForFeature}
          />
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Feature Voting Portal. Built with React + TypeScript.</p>
      </footer>
    </div>
  );
}

export default App;
