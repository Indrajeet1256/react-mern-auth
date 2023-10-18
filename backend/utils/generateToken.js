import jwt from "jsonwebtoken";

const COOKIE_EXPIRE = 30 * 24 * 60 * 60 * 1000;

const generateToken = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET_TOKEN, {
		expiresIn: "30d",
	});
	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: COOKIE_EXPIRE,
	});
};

export default generateToken;
