import jwt from 'jsonwebtoken'

export const tokenGen = (id) => {

    return jwt.sign({ id }, process.env.SECRET);
};


export const cookie = (user, statusCode, res) => {
    const token = tokenGen(user._id);
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res.cookie('token', token, { httpOnly: true, expires: expiryDate });
    user.password = undefined;
    res.status(statusCode).json({
        status: "success",
        token: token,
        data: user,
    })

    return;
};