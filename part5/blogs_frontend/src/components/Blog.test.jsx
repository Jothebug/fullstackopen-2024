/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "test title",
    url: "http:// test",
    likes: 1,
    author: "Jo",
  };

  render(<Blog item={blog} />);

  const element = screen.getByText(
    "Component testing is done with react-testing-lib"
  );
  expect(element).toBeDefined();
});
