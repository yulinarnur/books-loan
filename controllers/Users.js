import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['uuid', 'fullname', 'username']
        });
        res.status(200).json(users);
    } catch(error){
        res.status(500).json({msg: error.message});
    }
}

export const Register = async(req, res) => {
    const {fullname, username, password, confPassword} = req.body;
    const existingUser = await Users.findOne({ where: { username: username } });
        if (existingUser) {
            return res.status(409).json({msg: "Username sudah digunakan"});
        }
    if (password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await Users.create({
            fullname: fullname,
            username: username,
            password: hashPassword
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const Login = async(req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!user) return res.status(404).json({ msg: "Username tidak ditemukan" });

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(400).json({ msg: "Wrong Password" });   
        const uuid = user.uuid;
        const fullname = user.fullname;
        const username = user.username;
        const accessToken = jwt.sign(
            { uuid, fullname, username }, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: "30s",
            }
        );
        const refreshToken = jwt.sign(
            { uuid, fullname, username }, process.env.REFRESH_TOKEN_SECRET, {
              expiresIn: "1d",
            }
        );
        await Users.update({refresh_token: refreshToken }, {
            where: {
                uuid: uuid,
            }
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    const users = await Users.findAll({
        where: {
        refresh_token: refreshToken,
        },
    });
    if (users.length === 0) return res.sendStatus(204);
    const userId = users[0].id;
    await Users.update({ refresh_token: null },{
        where: {
            id: userId,
        },
    });

    res.clearCookie('refreshToken');
    return res.status(200).json({ msg: "OK! Anda berhasil logout"});;
}