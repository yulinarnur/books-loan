import Books from "../models/BookModel.js";

export const getBooks = async (req, res) => {
    try {
        const books = await Books.findAll({
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