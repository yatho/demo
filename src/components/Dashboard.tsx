import type { Feature } from '../types/feature';
import { getTotalVotes, getMostPopularFeature } from '../utils/featureUtils';
import '../styles/Dashboard.css';

interface DashboardProps {
  features: Feature[];
}

// TODO: Refactor this component - it has nested conditionals, duplicated code, and poor naming
// Consider extracting StatCard component and using it for all stat displays
export const Dashboard = ({ features }: DashboardProps) => {
  const totalReqs = features.length;
  const allVotes = getTotalVotes(features);
  const mostPopular = getMostPopularFeature(features);

  return (
    <div className="dashboard">
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <div className="stat-label">Total Requests</div>
            <div className="stat-value">{totalReqs}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🗳️</div>
          <div className="stat-content">
            <div className="stat-label">Total Votes</div>
            <div className="stat-value">{allVotes}</div>
          </div>
        </div>

        {mostPopular ? (
          <div className="stat-card stat-card-featured">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <div className="stat-label">Most Popular</div>
              <div className="stat-value-text">
                {mostPopular && mostPopular.title && mostPopular.title.length > 20
                  ? mostPopular.title.substring(0, 17) + '...'
                  : mostPopular && mostPopular.title
                  ? mostPopular.title
                  : 'N/A'}
              </div>
              <div className="stat-subtext">
                {mostPopular && mostPopular.votes ? mostPopular.votes + ' votes' : '0 votes'}
              </div>
            </div>
          </div>
        ) : (
          <div className="stat-card">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <div className="stat-label">Most Popular</div>
              <div className="stat-value-text">N/A</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
