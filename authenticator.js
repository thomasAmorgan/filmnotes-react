const bcrypt = require('bcryptjs');
const User = require('./models/User');

exports.authenticate = (email, password) => {
  return new Promise((resolve, reject) => {
    try {
      User.findOne({ email })
        .then((user) => {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              resolve(user);
            } else {
              reject('Authentication failed');
            }
          });
        })
        .catch((err) => { reject(err) });
    } catch (err) {
      reject('Authentication failed');
    }
  });
}