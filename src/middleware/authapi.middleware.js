const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../newmodel/user.model");

module.exports.isUserAuth = (req, res, next) => {

    const authHeader = req.headers.authorization;
    const bearer = 'Bearer ';

    if (!authHeader || !authHeader.startsWith(bearer)) {
        res.status(401).json({
            message: 'Access denied. No credentials sent!'
        });
        return;
    }
    const token = authHeader.replace(bearer, '');
    jwt.verify(
        token,
        process.env.SECRET_JWT,
        async function (err, decoded) {
            if (err || !decoded) {
                res.json({
                    message: "Error",
                    Detail: "Malformed JWT"
                });
                return;
            }
            const data = decoded;
            console.log(data.phone_number);
            const phone_number = data.phone_number;
            req.user = phone_number;
            next();

        }
    );

};

module.exports.isAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const bearer = 'Bearer ';
   console.log(authHeader)
    if (!authHeader || !authHeader.startsWith(bearer)) {
        res.status(401).json({
            message: 'Access denied. No credentials sent!'
        });
        return;
    }
    const token = authHeader.replace(bearer, '');
    jwt.verify(
        token,
        process.env.SECRET_JWT,
        async function (err, decoded) {
            if (err || !decoded) {
                res.json({
                    message: "Error",
                    Detail: "Malformed JWT"
                });
                return;
            }
            const data = decoded;
            const user = await User.findOne({
                zodiac_id: data.zodiac_id
            }, {});

            req.user = user;

            if (user.role == "admin") {
                next();
            } else {
                res.send("Wrong");
                //return res.redirect("/login");
            }
        }
    );
};

module.exports.isAstrologer = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const bearer = 'Bearer ';

    if (!authHeader || !authHeader.startsWith(bearer)) {
        res.status(401).json({
            message: 'Access denied. No credentials sent!'
        });
        return;
    }
    const token = authHeader.replace(bearer, '');
    jwt.verify(
        token,
        process.env.SECRET_JWT,
        async function (err, decoded) {
            if (err || !decoded) {
                res.json({
                    message: "Error",
                    Detail: "Malformed JWT"
                });
                return;
            }
            const data = decoded;
            const user = await User.findOne({
                zodiac_id: data.zodiac_id
            }, {});

            req.user = user;

            if (user.role == "astrologer") {
                next();
            } else {
                return res.status(401).json({
                    message: "Unathorized - Role incorrect"
                });
            }
        }
    );
};

module.exports.Authenticate = async (req, res, next) => {
    console.log(req.cookies)
  
    try {
      token = req.cookies.koram
    
      const compair = await jwt.verify(token, process.env.SECRETKEY);
      console.log(compair,"hii")
      const email = compair.email
      User.findOne({
        email: req.body.email
  
      },
        function (err, result) {
          console.log("login Success", result)
          if (err) throw err;
          next();
        });
    }
    catch (err) {
      res.status(400).json('please lOGIN')
    }
  }

  