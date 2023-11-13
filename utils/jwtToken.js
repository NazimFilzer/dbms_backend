const jwt = require("jsonwebtoken");



// this function to create jwt that will use verify
const generateVerificationJwt = (payload) => {
    const token = jwt.sign({
        payload
    }, process.env.VERIFICATION_JWT_SECRET, { expiresIn: '1h' });
    return token
}

const generateAccessJwt = (payload) => {
    const token = jwt.sign({
        payload
    }, process.env.JWT_SECRET, { expiresIn: '10d' });
    return token
}

const verifyJwtToken = (token, next) => {
    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        return userId;
    } catch (err) {
        next(err);
    }
};

module.exports = { verifyJwtToken, generateVerificationJwt, generateAccessJwt }