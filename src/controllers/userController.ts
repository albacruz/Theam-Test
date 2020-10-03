import { User } from "../entity/User";
import { getConnection } from "typeorm";

function filterUserData(user) {
  const filteredUser = {
    id: user.id,
    username: user.username,
    role: user.role,
  };
  return filteredUser;
}

export async function createUser(req, res) {
  const newUser = new User();
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  newUser.role = req.body.role;
  await getConnection()
    .manager.save(newUser)
    .then(() => {
      res.send(newUser);
    })
    .catch((error) => console.log(error));
}

export async function getAllUsers(req, res) {
  await getConnection()
    .manager.find(User)
    .then((users) => {
      const usersToSend = users.map((user) => filterUserData(user));
      res.send(usersToSend);
    })
    .catch((error) => console.log(error));
}

export async function getUser(req, res) {
  await getConnection()
    .manager.findOne(User, req.params.id)
    .then((user) => {
      const userToSend = filterUserData(user);
      res.send(userToSend);
    })
    .catch((error) => console.log(error));
}

export async function deleteUser(req, res) {
  await getConnection()
    .manager.delete(User, req.params.id)
    .then(() => {
      res.send(req.params.id);
    })
    .catch((error) => console.log(error));
}

export async function updateUser(req, res) {
  await getConnection()
    .manager.update(User, req.params.id, req.body)
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((error) => console.log(error));
}
