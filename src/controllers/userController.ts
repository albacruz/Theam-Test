import { User } from "../entities/User";
import { getConnection } from "typeorm";
import { Role } from "../entities/User";
import * as crypto from "crypto";

function generateSalt() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashPassword(password, salt) {
  let hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  return hash.digest("hex");
}
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
    const alreadyExists = await getConnection().manager.find(User, {
      where: { username: req.body.username },
    });

    if (typeof alreadyExists !== "undefined" && alreadyExists.length > 0) {
      res.send("Username already exists");
    } else {
      const newUser = new User();
      newUser.username = req.body.username;
      const userSalt = generateSalt();
      newUser.password = hashPassword(req.body.password, userSalt);
      newUser.salt = userSalt;
      newUser.role = req.body.role as Role;
      await getConnection()
        .manager.save(newUser)
        .then(() => {
          res.send(newUser);
        })
        .catch((error) => console.log(error));
    }
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
