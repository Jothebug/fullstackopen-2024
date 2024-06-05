/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "test title",
    url: "",
    author: "Jo",
  };

  render(<Blog item={blog} />);

  const hasTitle = screen.getByText("test title");
  expect(hasTitle).toBeDefined();

  const hasAuthor = screen.getByText("Jo");
  expect(hasAuthor).toBeDefined();

  const hasNoUrl = screen.getByText("");
  expect(hasAuthor).toBeDefined();

  const hasNoLike = screen.getByText(0);
  expect(hasNoLike).toBeNotDefined();
});
