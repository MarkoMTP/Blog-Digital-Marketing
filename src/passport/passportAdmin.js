const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const passportAdmin = require("passport");

let JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

let options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;
passportAdmin.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    console.log("Decoded JWT Payload:", jwtPayload); // ✅ Add this
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwtPayload.id, isAuthor: true },
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passportAdmin;
