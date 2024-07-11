import Books from "../models/BookModel.js";
import { Sequelize } from "sequelize";

const { Op } = Sequelize;

export const getBooks = async (req, res) => {
    try {
        const books = await Books.findAll({
            where: {
                stock: {
                    [Op.ne]: 0
                }
            },
            attributes: ['code', 'title', 'author', 'stock']
        });
        res.status(200).json(books);
    } catch(error){
        res.status(500).json({msg: error.message});
    }
}

export const createBook = async (req, res) => {
    const {code, title, author, stock} = req.body;
    const existingCode = await Books.findOne({ where: { code: code } });
    if (existingCode) {
        return res.status(409).json({msg: "Username sudah digunakan"});
    }
    if (stock <= 0) return res.status(400).json({msg: "Jumlah buku tidak boleh kosong"});
    
    try {
        const bookNew = await Books.create({
            code: code,
            title: title,
            author: author,
            stock: stock
        });
        res.status(201).json({
            msg: "Buku Berhasil Disimpan",
            book: bookNew
        });
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const getBooksById = async (req, res) => {
    try{
        const book = await Books.findOne({
            where: {
                id: req.params.id,
                stock: {
                    [Op.ne]: 0
                }
            },
            attributes: ['code', 'title', 'author', 'stock']
        });
        if (!book) {
            return res.status(404).json({ msg: "Buku tidak ditemukan atau stok kosong" });
        }
        res.status(200).json(book);
    } catch (error){
        res.status(500).json({ msg: error.message });
    }
}

export const updateBook = async (req, res) => {
    const {code, title, author, stock} = req.body;
    try{
        const bookUpdate = await Books.update({
            code, title, author, stock
        },
        {
            where:{
                id: req.params.id
            }
        });

        if (bookUpdate === 0) {
            return res.status(404).json({ msg: "Buku tidak ditemukan" });
        }

        const updatedBook = await Books.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ['code', 'title', 'author', 'stock']
        });
        res.status(200).json({ msg: "Berhasil mengupdate informasi buku", dataBuku: updatedBook });

    } catch (error){
        res.status(500).json({ msg: error.message });
    }
}