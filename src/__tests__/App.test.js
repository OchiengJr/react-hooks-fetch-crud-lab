import React from "react";
import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "../mocks/server";
import App from "../components/App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays question prompts after fetching", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/));
  expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/g)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);
  await screen.findByText(/lorem testum 1/g);
  fireEvent.click(screen.getByText("New Question"));
  fireEvent.change(screen.getByLabelText(/Prompt/), { target: { value: "Test Prompt" } });
  fireEvent.change(screen.getByLabelText(/Answer 1/), { target: { value: "Test Answer 1" } });
  fireEvent.change(screen.getByLabelText(/Answer 2/), { target: { value: "Test Answer 2" } });
  fireEvent.change(screen.getByLabelText(/Correct Answer/), { target: { value: "1" } });
  fireEvent.submit(screen.getByText(/Add Question/));
  fireEvent.click(screen.getByText(/View Questions/));
  expect(await screen.findByText(/Test Prompt/g)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
});

test("deletes the question when the delete button is clicked", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/));
  await screen.findByText(/lorem testum 1/g);
  fireEvent.click(screen.getAllByText("Delete Question")[0]);
  await waitForElementToBeRemoved(() => screen.getByText(/lorem testum 1/g));
  expect(screen.queryByText(/lorem testum 1/g)).not.toBeInTheDocument();
});

test("updates the answer when the dropdown is changed", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/));
  await screen.findByText(/lorem testum 2/g);
  fireEvent.change(screen.getAllByLabelText(/Correct Answer/)[0], { target: { value: "3" } });
  expect(screen.getAllByLabelText(/Correct Answer/)[0].value).toBe("3");
});
