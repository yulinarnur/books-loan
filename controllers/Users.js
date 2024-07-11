import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
    try {
        const users = await Users.findAll();
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