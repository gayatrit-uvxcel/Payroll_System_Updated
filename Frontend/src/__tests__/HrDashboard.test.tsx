import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HrDashboard from "../pages/HR Management/HrDashboard";

describe("Hr dashboard page test case", () => {
  test("rendering Hr dashboard ", () => {
    const hrdashboard = render(<HrDashboard />);
    expect(hrdashboard);
  });

  test("checking text", () => {
    const { getByTestId } = render(<HrDashboard />);
    expect(getByTestId("hrHeading").textContent).toBe("Hr Admin Dashboard");
  });

  test("checking length for card on the page", () => {
    const { getAllByRole } = render(<HrDashboard />);
    const card = getAllByRole("HrCard");
    expect(card).toHaveLength(4);
  });

  test("checking view and edit logo", () => {
    render(<HrDashboard />);
    const testImage = screen.getByAltText("view&edit");
    expect(testImage.getAttribute("src")).toBe("/view&edit.png");
  });

  test("checking view and reject logo", () => {
    render(<HrDashboard />);
    const testImage = screen.getByAltText("edit&reject");
    expect(testImage.getAttribute("src")).toBe("/edit&reject.png");
  });

  test.skip("should check uploadCsv logo", () => {
    render(<HrDashboard />);
    const testImage = screen.getByAltText("uploadCsv");
    expect(testImage.getAttribute("src")).toBe("/uploadCsv.png");
  });
  test("should test PF logo", () => {
    render(<HrDashboard />);
    const testImage = screen.getByAltText("pf");
    expect(testImage.getAttribute("src")).toBe("/pf.jpg");
  });
});
