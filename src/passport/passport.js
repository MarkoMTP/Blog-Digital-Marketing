const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");

let JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

let options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwtPayload.id },
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Unauthorized - User not found" });
      }
    } catch (err) {
      console.error("🔥 Error during authentication:", err); // Log the error
      return done(err, false, { message: "Authentication failed" });
    }
  })
);

module.exports = passport;
