const { users } = require("../../models");

module.exports = {
  post: async (req, res) => {
    // TODO : 유저가 로그인을 했을 때, 회원정보를 데이터베이스에서 확인하고,
    //회원의 id를 session에 담아주도록 구현하세요.
    const { email, password } = req.body;
    // 회원정보가 존재하는 것을 담는다.
    let result = await users.findOne({ where: { email, password } });
    if (result) {
      // result 값이 true, 즉 유저정보가 데이터베이스에 있다!
      req.session.userid = result.id;
      res.status(201).send({ id: req.session.userid });
    } else {
      // result 값이 false, 유저정보를 찾을 수 없다.
      res.status(404).send("unvalid user");
    }
  },
};

// method 1
// module.exports = {
//   post: (req, res) => {
//     // TODO : 유저가 로그인을 했을 때, 회원정보를 데이터베이스에서 확인하고,
//     //회원의 id를 session에 담아주도록 구현하세요.
//     // console.log(req.session);
//     let session = req.session;
//     // 1.데이터베이스 shortly users 테이블에서 findOne 이용해서 찾고
//     const { email, password } = req.body;
//     console.log("서버에서받은값", req.body);
//     users
//       .findOne({
//         where: {
//           email: email,
//           password: password,
//         },
//       }) // 2.있으면 그 데이터의 id를 session에 저장한다.
//       .then((data) => {
//         session.userId = data.id;
//         session.save(() => res.status(200).send({ id: session.userId }));
//         console.log("데이터ID", data.id);
//         console.log("세션ID", session.userId);
//       })
//       // .then((result) => {
//       //   console.log(result);
//       //   session.save(() => res.status(200).send({ id: result }));
//       // })
//       .catch(() => {
//         res.status(404).send("unvalid user");
//       });
//   },
// };
