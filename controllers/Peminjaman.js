import Peminjaman from "../models/PeminjamanModel.js";

export const getPeminjamans = async (req, res) => {
    try {
        const books = await Peminjaman.findAll({
            attributes: ['book_id', 'borrower_id']
        });
        res.status(200).json(books);
    } catch(error){
        res.status(500).json({msg: error.message});
    }
}