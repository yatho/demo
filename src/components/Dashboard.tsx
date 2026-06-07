import type { Feature } from "../types/feature";
import type { ReactNode } from "react";
import { getTotalVotes, getMostPopularFeature } from "../utils/featureUtils";
import "../styles/Dashboard.css";

interface DashboardProps {
  features: Feature[];
}

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value?: ReactNode;
  subtext?: ReactNode;
  featured?: boolean;
}

const StatCard = ({ icon, label, value, subtext, featured }: StatCardProps) => (
  <div className={`stat-card${featured ? " stat-card-featured" : ""}`}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-content">
      <div className="stat-label">{label}</div>
      {value !== undefined && (
        <div
          className={
            typeof value === "number" ? "stat-value" : "stat-value-text"
          }
        >
          {value}
        </div>
      )}
      {subtext !== undefined && <div className="stat-subtext">{subtext}</div>}
    </div>
  </div>
);

const truncate = (text?: string, max = 20) => {
  if (!text) return "N/A";
  return text.length > max ? `${text.substring(0, max - 3)}...` : text;
};

export const Dashboard = ({ features }: DashboardProps) => {
  const totalRequests = features.length;
  const totalVotes = getTotalVotes(features);
  const mostPopular = getMostPopularFeature(features);

  return (
    <div className="dashboard">
      <div className="stats-container">
        <StatCard icon="📋" label="Total Requests" value={totalRequests} />
        <StatCard icon="🗳️" label="Total Votes" value={totalVotes} />

        {mostPopular ? (
          <StatCard
            icon="⭐"
            label="Most Popular"
            value={truncate(mostPopular.title)}
            subtext={`${mostPopular.votes ?? 0} votes`}
            featured
          />
        ) : (
          <StatCard icon="⚠️" label="Most Popular" value={"N/A"} />
        )}
      </div>
    </div>
  );
};
