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
