"use strict";

const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: () => {
          //가입시 해싱
          var shasum = crypto.createHmac("sha512", "thisismysecretkey");
          shasum.update(data.password);
          data.password = shasum.digest("hex");
        },
        beforeFind: (data) => {
          //로그인 시 해싱
          if (data.where.password) {
            var shasum = crypto.createHmac("sha512", "thisismysecretkey");
            shasum.update(data.where.password);
            data.password = shasum.digest("hex");
          }
        },
      },
    }
  );
  users.associate = function (models) {
    // associations can be defined here
  };
  return users;
};
