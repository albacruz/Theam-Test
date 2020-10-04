import { Role } from "../../entities/User";

export const user1 = {
  username: "user1",
  password: "passwd",
  role: Role.USER,
};

export const userUpdated = {
  username: "newuser",
};

export const userJWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsYmFjcnV6Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MDE4MzQ5OTJ9.AV3EXmeJliuE6FsBcKu4Be2jybvG-maupOfDl0XGDzQ";

export const adminJWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGJhY3J1eiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwMTgzOTA2Mn0.UtReZjNQWQ_tnCLD64VQvqhmnqfiNxUQYzYBlFFUUAc";
