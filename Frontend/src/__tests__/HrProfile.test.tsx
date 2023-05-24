import React from "react";
import { render, screen, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import HRProfile from "../pages/HR Management/hrProfile";

describe("HR Profile page", () => {
  test("HR Profile page loads", () => {
    render(<HRProfile />);
  });
});
