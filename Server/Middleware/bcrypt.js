import bcrypt from 'bcryptjs';
const saltRounds = 20;
//암호화
exports.passwordEncryption = (plainPassword) => {
  console.log('plainPassword', plainPassword);
  bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
    if (err) {
      res.json(err);
    }
    console.log('hashdata', hash);
    return hash;
    // Store hash in your password DB.
  });
};

//복호화
bcrypt.compare = () => {};
