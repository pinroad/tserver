module.exports = {
  post: (req, res) => {
    // TODO : 유저가 로그아웃했을 때, session 정보를 없애고,
    //'/'로 redirect할 수 있도록 구현하세요.
    if (req.session.usreid) {
      req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/");
      });
    } else {
      res.redirect("/");
    }
  },
};