import React from "react";
import { render, screen } from "@testing-library/react";
import GitHubSearcher from "./GitHubSearcher";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => ({
    items: [
      {
        title: "string",
        watchers_count: 12,
        stargazers_count: 12,
        updated_at: "string",
        language: "string",
        id: 123,
        description: "string",
        owner: {},
        forks_count: 12,
        issues: 12,
        link: "string",
        full_name: "srting",
        html_url: "string",
      },
    ],
    isLoading: false,
    error: false,
  }),
}));

describe("GitHubSearcher", () => {
  it("Renders <GitHubSearcher /> component correctly", () => {
    render(<GitHubSearcher />);
    expect(screen.getByText(/GitHub Searcher/i)).toBeInTheDocument();
  });

  it("should render a list of cards", () => {
    const { getByTestId } = render(<GitHubSearcher />);
    expect(getByTestId("card-list")).toBeTruthy();
  });
  it("should render a repo card", () => {
    const { getByTestId } = render(<GitHubSearcher />);
    expect(getByTestId("repo-card")).toBeTruthy();
  });
});
