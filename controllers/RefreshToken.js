import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken,
            },
        });

        if (!user) return res.sendStatus(403);
        
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
            if (err) return res.sendStatus(403);
            
            const { uuid, fullname, username} = user;
            const accessToken = jwt.sign({ uuid, fullname, username}, process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30s" }
            );
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
};
