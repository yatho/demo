import React from "react";
import { render, screen, within } from "@testing-library/react";
import { Dashboard } from "../src/components/Dashboard";
import type { Feature } from "../src/types/feature";

describe("Dashboard", () => {
  test("renders zeros and N/A when no features", () => {
    render(<Dashboard features={[]} />);

    const totalLabel = screen.getByText("Total Requests");
    const totalCard = totalLabel.closest(".stat-card") as HTMLElement;
    expect(within(totalCard).getByText("0")).toBeInTheDocument();

    const votesLabel = screen.getByText("Total Votes");
    const votesCard = votesLabel.closest(".stat-card") as HTMLElement;
    expect(within(votesCard).getByText("0")).toBeInTheDocument();

    const mostLabel = screen.getByText("Most Popular");
    const mostCard = mostLabel.closest(".stat-card") as HTMLElement;
    expect(within(mostCard).getByText("N/A")).toBeInTheDocument();
  });

  test("shows totals and featured most popular with truncation", () => {
    const longTitle =
      "This is a very long feature title that should be truncated";
    const features: Feature[] = [
      { id: "1", title: "Short", description: "", category: "AI", votes: 2 },
      {
        id: "2",
        title: longTitle,
        description: "",
        category: "Platform",
        votes: 5,
      },
    ];

    render(<Dashboard features={features} />);

    const totalLabel = screen.getByText("Total Requests");
    const totalCard = totalLabel.closest(".stat-card") as HTMLElement;
    expect(within(totalCard).getByText("2")).toBeInTheDocument();

    const votesLabel = screen.getByText("Total Votes");
    const votesCard = votesLabel.closest(".stat-card") as HTMLElement;
    expect(within(votesCard).getByText("7")).toBeInTheDocument();

    const mostLabel = screen.getByText("Most Popular");
    const mostCard = mostLabel.closest(".stat-card") as HTMLElement;
    // truncated to 17 chars + '...'
    const expectedTruncated = `${longTitle.substring(0, 17)}...`;
    expect(within(mostCard).getByText(expectedTruncated)).toBeInTheDocument();
    expect(within(mostCard).getByText("5 votes")).toBeInTheDocument();
    expect(mostCard.classList.contains("stat-card-featured")).toBe(true);
  });
});
