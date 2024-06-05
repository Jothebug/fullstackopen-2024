/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "test title",
    author: "Jo",
    url: "http://test",
    like: 1,
  };

  const { container } = render(<Blog item={blog} />);
  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("test title");
  expect(div).toHaveTextContent("Jo");
  expect(div).not.toHaveProperty("url");
  expect(div).not.toHaveProperty("like");
});

test("click the View button", async () => {
  const blog = {
    title: "test title 1",
    author: "Jo",
    url: "http://test",
    like: 1,
  };

  const { container } = render(<Blog item={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const element = container.querySelector(".blog");
  expect(element).toHaveTextContent("http://test");
  expect(element).toHaveTextContent(1);
});
