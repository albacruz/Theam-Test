import { User } from "../entities/User";
import { getConnection } from "typeorm";
import { Role } from "../entities/User";

function filterUserData(user) {
  const filteredUser = {
    id: user.id,
    username: user.username,
    role: user.role,
    isDeleted: user.isDeleted,
  };
  return filteredUser;
}

export async function createUser(req, res) {
  if (req.user.role == Role.ADMIN) {
    const newUser = new User();
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.role = req.body.role as Role;
    await getConnection()
      .manager.save(newUser)
      .then(() => {
        res.send(newUser);
      })
      .catch((error) => console.log(error));
  } else {
    res.status(403);
    res.json({
      status: 403,
      error: "Forbidden",
    });
  }
}

export async function getAllUsers(req, res) {
  if (req.user.role == Role.ADMIN) {
    await getConnection()
      .manager.find(User, { where: { isDeleted: false } })
      .then((users) => {
        const usersToSend = users.map(filterUserData);
        res.send(usersToSend);
      })
      .catch((error) => console.log(error));
  } else {
    res.status(403);
    res.json({
      status: 403,
      error: "Forbidden",
    });
  }
}

export async function getUser(req, res) {
  if (req.user.role == Role.ADMIN) {
    await getConnection()
      .manager.findOne(User, req.params.id)
      .then((user) => {
        const userToSend = filterUserData(user);
        res.send(userToSend);
      })
      .catch((error) => console.log(error));
  } else {
    res.status(403);
    res.json({
      status: 403,
      error: "Forbidden",
    });
  }
}

export async function deleteUser(req, res) {
  if (req.user.role == Role.ADMIN) {
    await getConnection()
      .manager.update(User, req.params.id, { isDeleted: true })
      .then((response) => {
        console.log(response);
        res.send(response);
      })
      .catch((error) => console.log(error));
  } else {
    res.status(403);
    res.json({
      status: 403,
      error: "Forbidden",
    });
  }
}

export async function updateUser(req, res) {
  if (req.user.role == Role.ADMIN) {
    await getConnection()
      .manager.update(User, req.params.id, req.body)
      .then((response) => {
        console.log(response);
        res.send(response);
      })
      .catch((error) => console.log(error));
  } else {
    res.status(403);
    res.json({
      status: 403,
      error: "Forbidden",
    });
  }
}
