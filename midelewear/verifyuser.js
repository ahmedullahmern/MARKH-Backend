// import jwt from "jsonwebtoken";

// export const verifyUser = (req, res, next) => {
//     const token = req.header("Authorization");
//     if (!token) return res.status(401).json({ error: "Access Denied!" });

//     try {
//         const verified = jwt.verify(token, process.env.AUTH_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).json(err.message);
//     }
// };
