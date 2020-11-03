const { users } = require("../../models");
// method 2 : async & await
module.exports = {
  get: async (req, res) => {
    // TODO : 유저의 session을 이용하여, 데이터베이스에 있는 정보를 제공하도록 구현하세요.
    // session id가 있냐 없냐로 결과를 나타낸다.
    if (req.session.userid) {
      let result = await users.findOne({ where: { id: req.session.userid } });
      res.status(200).send(result);
    } else {
      res.status(401).send("need user session");
    }
  },
};

// error
// UnhandledPromiseRejectionWarning: Error: WHERE parameter "id" has invalid "undefined" value
// if문으로 session.userid 가 있냐 없냐로 id 값을 결정해주지 않으면
// where문 안에 정의되지 않은 값이 들어가서 나는 오류(PromiseReject)

// method 1
// module.exports = {
//   get: (req, res) => {
//     // TODO : 유저의 session을 이용하여, 데이터베이스에 있는 정보를 제공하도록 구현하세요.
//     const session = req.session;
//     users
//       .findOne({
//         where: {
//           id: session.userId,
//           // SELECT id FRPOM users WHERE id = ses.userId
//         },
//       })
//       .then((data) => {
//         res.status(200).send(data);
//       })
//       .catch((err) => {
//         res.status(401).send("need user session");
//       });
//     // 1.POST 보낸다 - signin 로그인했을 때
//     // 2.session.userId = 1 → 조건문으로 쓸 수 있다.
//     // 3.있으면 DB 정보를 보낸다
//     // 4.없으면 401 - need user session
//   },
// };
