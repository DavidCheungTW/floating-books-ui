import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "../components/App";

describe("App", () => {
  it("Renders as expected", () => {
    const rendered = renderer.create(
      <Router>
        <App />
      </Router>
    );
    expect(rendered).toMatchSnapshot();
  });

  it("Renders as expected", () => {
    render(
      <Router>
        <App />
      </Router>
    );

    const linkElement = screen.getByText(/Floating Books UI/i);
    expect(linkElement).toBeInTheDocument();
  });
});
