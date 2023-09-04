import React, { useState } from "react";
import RelationshipDropdown from "./Brothers";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import familyTreeData from "./../data/familyTreeData.json";
const mockTreeData = familyTreeData;

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

const mockSetState = jest.fn();
jest.spyOn(React, "useState");

describe("RelationshipDropdown Component", () => {
  beforeEach(() => {
    (React.useState as jest.Mock).mockClear();
    mockSetState.mockClear();
  });

  it("displays the default message", () => {
    // Mock the initial state of relationships with a valid array

    (React.useState as jest.Mock).mockReturnValue(["", mockSetState]);

    render(<RelationshipDropdown treeData={mockTreeData} />);
    const defaultMessage = screen.getByText("Select Person:");
    expect(defaultMessage).toBeInTheDocument();
  });
  it("populates relationship options when a person is selected", () => {
    (React.useState as jest.Mock).mockReturnValue(["", mockSetState]);

    render(<RelationshipDropdown treeData={mockTreeData} />);

    const selectPersonDropdown = screen.getByLabelText("Select Person:");
    fireEvent.change(selectPersonDropdown, {
      target: { value: "Chit" },
    });

    const selectRelationshipDropdown = screen.getByLabelText(
      "Select Relationship:"
    );

    expect(selectRelationshipDropdown).toHaveTextContent("Select Relationship");
  });
});
