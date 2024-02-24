const bcrypt = require("bcrypt");
const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const User = require("../models/user");
const { usersInDb } = require("./test_helper");

const api = supertest(app);
// initi one user in db
beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });
  await user.save();
});

test("ex.4.15-create successfully a user", async () => {
  const usersAtStart = await usersInDb();
  const newUser = {
    username: "jothebug1",
    name: "Josephere March",
    password: "thelittlewomen",
  };
  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await usersInDb();
  assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length);

  const usernames = usersAtEnd.map((u) => u.username);
  assert(usernames.includes(newUser.username));
});

describe("ex: 4.16", () => {
  test("create fails with invalid password", async () => {
    const newUser = {
      username: "jothebug1",
      password: "te",
      name: "jo",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    assert(
      result.body.error.includes("The length of password is bigger than 3")
    );
  });

  test("create fails with invalid username", async () => {
    await api
      .post("/api/users")
      .send({
        username: "j",
        password: "test",
        name: "jo",
      })
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("create fails with username already taken", async () => {
    const usersAtStart = await usersInDb();
    const newUser = {
      username: "root",
      password: "testpassword",
      name: "Jo",
    };
    const res = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const usersAtEnd = await usersInDb();
    assert(res.body.error.includes("expected `username` to be unique"));
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => await mongoose.connection.close());
