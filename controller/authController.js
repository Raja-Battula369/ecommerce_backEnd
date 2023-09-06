import express from 'express'
import Auth from '../model/auth.model.js';
import { catchAsync } from '../lib/catchAsync.js';
import AppError from '../lib/appError.js';
import bcrypt from 'bcrypt'
import { cookie } from '../lib/jwtToken.js';
import jwt from 'jsonwebtoken'
import { nodemailerConfig } from '../lib/emailSend.js'
export const register = catchAsync(async (req, res, next) => {

    const { name, email, password, passwordmatch } = req.body;

    if (!name || !email || !password || !passwordmatch) return next(new AppError('fill all the fields', 401))


    if (password === passwordmatch) {

        const salt = await bcrypt.genSalt(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new Auth({
            name, email, password: hash
        });

        try {
            await newUser.save();
            res.status(200).json({ 'success': true, 'response': 'register successful' });
        } catch (error) {
            console.log(error);
        }
    }
});

export const login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) return next(new AppError('Please enter a email or password', 401));

    const user = await Auth.findOne({ email: email });
    if (!user) return next(new AppError('user not found', 401));
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return next(new AppError('password mismatch', 401))

    if (email === user.email) {
        cookie(user, 201, res);
    };


});
export const sendRestToken = catchAsync(async (req, res, next) => {

    const { email } = req.body;

    const user = await Auth.findOne({ email: email });

    if (!user) return next(new AppError('user not found', 401));

    const secret = user._id + process.env.SECRET;
    const token = jwt.sign({ userID: user._id }, secret, { expiresIn: "15m" });

    const link = `https://ecommerce-nine-jet.vercel.app/reset/${user._id}/${token}`;
    // console.log(link.replace(/\./g, "token"));
    // console.log(link);

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Password Reset Link",
        html: `<a href=${link}>Click Here</a> to Reset Your Password`
    }

    nodemailerConfig.sendMail(mailOptions, (err, res) => {
        if (err) return console.log(err);
        console.log('successfully mail sent to' + res.response);
    });

    res.status(200).json({ success: true, message: 'reset password sent' });

})
export const restPassword = catchAsync(async (req, res, next) => {
    const { password, passwordmatch } = req.body;
    const { id } = req.params;
    const { token } = req.params;

    if (!password || !passwordmatch) return next(new AppError('fill all the fields', 401));

    if (!id || !token) return next(new AppError('Invalid', 404));

    const user = await Auth.findById(id);

    if (!user) return next(new AppError('user not found', 404));

    const secret = user._id + process.env.SECRET;

    jwt.verify(token, secret);

    if (password !== passwordmatch) return next(new AppError('password mismatch', 401));

    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(password, salt);
    await Auth.findByIdAndUpdate(id, { $set: { password: hash } });
    res.status(201).json({ success: true, message: "Password is updated successfully" });




})

