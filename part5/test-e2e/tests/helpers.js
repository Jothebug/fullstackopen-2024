const loginWith = async ({ page, username, password }) => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async ({ page, title, author, url }) => {
  await page.getByTestId("title").fill(title);
  await page.getByTestId("author").fill(author);
  await page.getByTestId("url").fill(url);
  await page.getByRole("button", { name: "create" }).click();
};

const BLOGS = [
  {
    title: "test 1",
    author: "JoTheBug",
    url: "test1.com",
    likes: 5,
  },
  {
    title: "test 2",
    author: "JoTheBug",
    url: "test2.com",
    likes: 6,
  },
  {
    title: "test 3",
    author: "JoTheBug",
    url: "test3.com",
    likes: 2,
  },
];

export { loginWith, createBlog, BLOGS };
