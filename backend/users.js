const express = require("express");
const usersRoutes = express.Router();
const fs = require("fs");
const dataPath = "./db/users.json";

const saveUserData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};
const getUserData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

// CRUD (Create, Read, Update, Delete)
usersRoutes.get("/users/list", (req, res) => {
  const users = getUserData();
  let filteredUsers = [];
  const reqQueryObject = req.query;

  // setting queris
  let sort = reqQueryObject.sort || "1";
  let programmer = reqQueryObject.pro || "all";
  let age = [reqQueryObject.agemin, reqQueryObject.agemax] || [0, 100];

  // filtering
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].age < age[0] ||
      users[i].age > age[1] ||
      (programmer == "true" && users[i].isprogrammer == "false") ||
      (programmer == "false" && users[i].isprogrammer == "true")
    )
      continue;
    filteredUsers.push(users[i]); // adding to array filtered user
  }

  // sorting
  if (sort == 1) {
    // ascending
    filteredUsers.sort((a, b) => (a.age > b.age ? 1 : -1));
  } else {
    // descending
    filteredUsers.sort((a, b) => (b.age > a.age ? 1 : -1));
  }

  res.send(filteredUsers);
});

usersRoutes.post("/users/adduser", (req, res) => {
  let users = getUserData();

  // creating new user
  let newUserId,
    flag = true;
  // creating absolutely unique ID
  while (true) {
    newUserId = Math.floor(100000 + Math.random() * 900000);
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == newUserId) {
        flag = false;
        break;
      }
    }
    if (flag) break;
    flag = true;
  }
  let newUser = { ...req.body, id: newUserId };

  // adding it to list
  users.push(newUser);
  users = JSON.stringify(users);

  // rewriting file
  fs.writeFile(dataPath, users, (err) => {
    if (err) throw err;
    console.log("New data added");
  });

  res.send({ success: true, msg: "user added successfully" });
});

usersRoutes.put("/users/update/:id", (req, res) => {
  let users = getUserData();
  const userId = req.params["id"];

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == userId) {
      // finding user by id
      // changing body
      users[i] = { ...req.body, id: userId };
    }
  }
  saveUserData(users); // saving changed data to database
  res.send(`users has been updated`);
});

usersRoutes.delete("/users/delete/:id", (req, res) => {
  let users = getUserData();
  const userId = req.params["id"];

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == userId) {
      // finding user by id
      users.splice(i, 1); // cutting it
      break;
    }
  }

  // saving changed data
  users = JSON.stringify(users);
  fs.writeFile(dataPath, users, (err) => {
    if (err) throw err;
    console.log("New data added");
  });

  res.send(`accounts with id ${userId} has been deleted`);
});

module.exports = usersRoutes;
