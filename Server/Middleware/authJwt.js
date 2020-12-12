import jwt from 'jsonwebtoken';


//토큰 검증 모듈 구현
exports.verifyToken = async(req, res, next) => {
    // read the token from header or url
    const token = req.headers['x-access-token'] || req.query.token;

    // token does not exist
    if (!token) {
        return res.status(403).json({
            response: 'No token provided!',
        });
    }

    await jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                response: 'Unauthorized! This token has a problem!',
            });
        } else {
            req.decoded = decoded;
            return res.status(200).json({
                response: 'Success',
                decoded: decoded
            })

        }

        next();
    });
};