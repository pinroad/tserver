const { users } = require("../../models");

// method 3 : async & await - findOrcreate
module.exports = {
  post: async (req, res) => {
    const { email, username, password } = req.body;
    const [result, created] = await users.findOrCreate({
      where: { email },
      defaults: {
        username,
        password,
      },
    });

    created
      ? res.status(200).json(result)
      : res.status(409).send("Already exists user");
  },
};

// method 2 : async & await - findOne
// module.exports = {
//   post: async (req, res) => {
//     // TODO : 유저가 회원가입을 했을 때, 회원정보를 데이터베이스에 저장하도록 구현하세요.
//     const { email, username, password } = req.body;
//     // findOne으로 데이터를 찾는다.
//     let getData = await users.findOne({ where: { email } });
//     // getData는 프로미스 객체로 반환된 값을 받는다.
//     if (!getData) {
//       // getData가 false면 중복값이 존재하지 않는다.
//       let createData = await users.create({
//         email,
//         username,
//         password,
//       });
//       res.status(200).json(createData);
//     } else {
//       // getData가 true면 중복 값이 있다
//       res.status(409).send("Already exists user");
//     }
//   },
// };

// method 1
// module.exports = {
//   post: (req, res) => {
//     // TODO : 유저가 회원가입을 했을 때, 회원정보를 데이터베이스에 저장하도록 구현하세요.
//     const { email, username, password } = req.body;

//     users
//       .findOrCreate({
//         where: {
//           email: email,
//         },
//         defaults: {
//           username,
//           password,
//         },
//       })
//       .then(([result, created]) => {
//         if (!created) {
//           return res.status(409).send("Already exists user");
//         }
//         res.status(200).json(result); // Created
//       })
//       .catch((error) => {
//         console.log(error);
//         res.sendStatus(500); // Server error
//       });
//   },
// };
