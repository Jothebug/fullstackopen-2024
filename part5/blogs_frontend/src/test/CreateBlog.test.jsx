import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlog from "../components/CreateBlog";

test("Ex:5.16 test for the new blog form", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<CreateBlog onCreateBlog={createBlog} />);

  const authorInput = screen.getByPlaceholderText("author");
  const urlInput = screen.getByPlaceholderText("url");
  const titleInput = screen.getByPlaceholderText("title");

  const createButton = screen.getByText("create");

  await user.type(titleInput, "Test blog form to create");
  await user.type(authorInput, "JoHaHa");
  await user.type(urlInput, "http://test");
  await user.click(createButton);

  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog.mock.calls[0][0].data.title).toBe(
    "Test blog form to create"
  );
});
