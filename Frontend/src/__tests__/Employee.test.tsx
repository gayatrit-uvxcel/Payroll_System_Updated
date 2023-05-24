import React from "react";
import * as ReactDOM from "react-dom";
import userEvent from "@testing-library/user-event";
import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Profile from "../pages/Profile1";
import "@testing-library/jest-dom";

describe("Employee profile test cases", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(<Profile />, container);
  });
  test("First test case", () => {
    const text = screen.getByText("My profile");
    expect(text).toBeInTheDocument();
  });

  test("should test checkbox", () => {
    //  const checkBox = container.querySelector("[data-test='check1']")as HTMLElement;
    const check = screen.getByLabelText(
      "Family Information"
    ) as HTMLInputElement;
    check.checked = true;
    expect(check.checked).toEqual(true);
    //expect(screen.getByTestId('famBtn')).toBeInTheDocument();
    // const btn = screen.getByTestId('famCol');
    // expect(btn).toBeInTheDocument();
  });
});
