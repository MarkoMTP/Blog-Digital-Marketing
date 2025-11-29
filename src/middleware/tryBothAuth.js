const passport = require("../passport/passport");
const passportAdmin = require("../passport/passportAdmin");

module.exports = function tryBothJWT(req, res, next) {
  passportAdmin.authenticate(
    "admin-jwt",
    { session: false },
    (err, adminUser) => {
      if (err) return next(err);

      if (adminUser) {
        req.user = adminUser; // store admin user
        return next();
      }

      // Try regular user
      passport.authenticate("jwt", { session: false }, (err, normalUser) => {
        if (err) return next(err);

        if (!normalUser) {
          return res
            .status(401)
            .json({ message: "Unauthorized: No valid token" });
        }

        req.user = normalUser;
        next();
      })(req, res, next);
    }
  )(req, res, next);
};
