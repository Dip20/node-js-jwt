var jwt = require('jsonwebtoken');

exports.generate_jwt = async (req, res) => {
    let errors = [];
    const user_verify_with_db = true; //later we can connect database and verify user info

    /**
     * basic valdiations here
     */

    if (!req.body?.username || req.body?.username == '') {
        errors.push("username is required");
    }

    if (!req.body?.email || req.body?.email == '') {
        errors.push("email is required");
    }

    if (!req.body?.password || req.body?.password == '') {
        errors.push("password is required");
    }

    if (!user_verify_with_db) {
        errors.push("Invalid credientials");
    }

    if (errors.length > 0) {
        res.status(400).json({ msg: "Bad Request", details: errors })

    } else {
        // new jtw generate
        var token = jwt.sign({
            data: {
                username: req.body.username, email: req.body.email
            },
        }, 'encription-key', { expiresIn: 60 * 60 * 24 });

        res.status(201).json({ token: token, validaity: "24hr" });
    }

}

exports.verify_jwt = async (req, res) => {
    let errors = [];
    /**
     * basic valdiations here
     */

    if (!req.headers?.authorization || req.headers?.authorization == '') {
        res.status(400).json({ msg: "Bad Request! Authorization Required" })
    } else {

        // Verify the token
        jwt.verify(req.headers.authorization, 'encription-key', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }
            res.status(200).json({ msg: "Successfully Verified", data: decoded.data });
        });

    }

}
