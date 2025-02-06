const Session = require("../models/session.model");
const createError = require("http-errors");

module.exports.checkSession = (req, res, next) => {
  // find session id from cookie. imagine cookie is "session=1234; other=5678"
  const sessionId = req.headers.cookie
    ?.split(";")
    ?.find((cookie) => cookie.includes("session="))
    ?.split("=")?.[1];

  if (!sessionId) {
    next(createError(401, "missing session from cookie header"));
  }

  Session.findById(sessionId)
   .populate("user")
   .then((session) => {
    if (session) {
      if (session.user) {
        session.lastAccess = new Date;
        session.save()

        req.session = session;
        req.user = session.user;

        next()
      } else {
        next(createError(401, "unauthorized. wrong user"));
      }
    } else {
      next(createError(401, "unauthorized. session not found"));
    }
  })
  .catch(next);
};
