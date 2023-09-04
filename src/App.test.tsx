import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import familyTreeData from "./data/familyTreeData.json";

const mockFamilyTreeData = familyTreeData;
jest.spyOn(React, "useState").mockReturnValue([mockFamilyTreeData, jest.fn()]);

test("renders App component with family tree data", () => {
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockReturnValue([mockFamilyTreeData, jest.fn()]);

  render(<App />);

  const familyTreeHeader = screen.getByText("Family Tree");
  expect(familyTreeHeader).toBeInTheDocument();
});

test("renders a message when root member is not found", () => {
  jest.spyOn(React, "useState").mockReturnValue([null, jest.fn()]);
  render(<App />);
  const message = screen.queryByText("Root member not found");
  expect(message).toBeNull();
});

test("renders the root member correctly", () => {
  jest
    .spyOn(React, "useState")
    .mockReturnValue([mockFamilyTreeData, jest.fn()]);

  render(<App />);

  const rootMemberName = screen.getByText(/King Shan/);
  const rootMemberSpouse = screen.getByText(/Queen Anga/);

  expect(rootMemberName).toBeInTheDocument();
  expect(rootMemberSpouse).toBeInTheDocument();
});
