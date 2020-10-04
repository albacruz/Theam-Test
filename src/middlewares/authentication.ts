import * as jwt from "jsonwebtoken";

const accessTokenSecret = "0123456789";

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    res.status(401);
    res.json({
      status: 401,
      error: "Unauthorized",
    });
  } //Unauthorized
  else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403); //Forbidden
      }
      req.user = user;
      next();
    });
  }
};
