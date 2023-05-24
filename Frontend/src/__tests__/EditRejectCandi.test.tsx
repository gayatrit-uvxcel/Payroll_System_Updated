import React from "react";
import { render, screen, fireEvent, getByText ,waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import EditRejectCandi from "../pages/HR Management/editRejectCandi";

describe("Hr Edit reject candidate page test case", () => {
  test("rendering edit reject candidate page", () => {
    render(<EditRejectCandi />);
  });

  test("rendering table on page", () => {
    const { getByTestId } = render(<EditRejectCandi />);
    expect(getByTestId("editRejectTable")).toBeInTheDocument();
  });

  test("checking back arrow on screen", () => {
    const { getByTestId } = render(<EditRejectCandi />);
    expect(getByTestId("arrowBtn")).toBeInTheDocument();
  });

  test("checking number of columns in the table", () => {
    const { getAllByRole } = render(<EditRejectCandi />);
    const AllColumns = getAllByRole("column");
    expect(AllColumns).toHaveLength(10);
  });

  test("checking heading of the table on the screen", () => {
    const { getByTestId } = render(<EditRejectCandi />);
    expect(getByTestId("tableHeading")).toHaveTextContent(
      "View and Edit Rejected Candidates"
    );
  });

  // test.only("should render save button on edit button click ", async() => {
  //   const { getByRole } = render(<EditRejectCandi />);
  //   const edit = screen.getByRole("editBtn");
  //   // console.log(edit);
  //   fireEvent.click(edit);
  //   await waitFor(() => expect(edit).toBeInTheDocument());
  //   // expect(getByRole("saveBtn")).toBeInTheDocument();
  // });

});
