const crypto = require("crypto");

function hashPassword(password, salt) {
    let hash = crypto.createHmac("sha512", salt);
    hash.update(password);
    return hash.digest("hex");
  }

async function loginUser() {
    const password = "123"
    const hashedPassword = hashPassword(password, "abcdefghyjklmnopqrstuvwxyz");
    return hashedPassword;
}

console.log(loginUser());