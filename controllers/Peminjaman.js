import Peminjaman from "../models/PeminjamanModel.js";
import Books from "../models/BookModel.js";
import Users from "../models/UserModel.js";

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

export const createPinjam = async (req, res) => {
    const { code, title } = req.body;
    const borrower_id = req.userId;

    try {
        const user = await Users.findOne({ where: {id: borrower_id} });
        if (user.is_sanctioned === 1) return res.status(403).json({msg: "Anggota sedang dikenakan sanksi"});

        const peminjamId = await Peminjaman.count({
            where: {
                borrower_id: borrower_id,
                status: "aktif"
            }
        })
        console.log(peminjamId)

        if (peminjamId >= 2) return res.status(403).json({msg: "Anggota tidak boleh meminjam lebih dari 2 buku"})

        const book = await Books.findOne({
            where: {
                code: code,
                title: title
            }
        });
        if (!book) return res.status(404).json({msg: "Buku tidak ditemukan"})
        if (book.stock <= 0) return res.status(403).json({msg: "Stok buku sedang kosong"})
            try {
                const stockUpdate = book.stock - 1;
                await Books.update(
                    { stock: stockUpdate },
                    {
                        where: {
                            code: code,
                            title: title
                        }
                    }
                )
            } catch (error) {
                res.status(500).json({ msg: error.message });
            }
            
        const newLoanDate = new Date();
        const returnDate = new Date(newLoanDate);
        returnDate.setDate(returnDate.getDate() + 7);

        const newPinjaman = await Peminjaman.create({
            book_id: book.id,
            borrower_id: borrower_id,
            loan_date: newLoanDate,
            return_date: returnDate
        });

        res.status(201).json({
            msg: "Buku berhasil dipinjam",
            loan: newPinjaman
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const pengembalian = async (req, res) => {
    const { code, title } = req.body;
    const borrower_id = req.userId;

    try {
        const peminjaman = await Peminjaman.findOne({
            where: {
                borrower_id: borrower_id,
                status: 'aktif',
            },
            include: [{ 
                model: Books, 
                as: 'book',
                where: {
                    code: code,
                    title: title
                }

             }]
        });
        
        if (!peminjaman) return res.status(404).json({ msg: "Data buku peminjaman tidak ditemukan" });
        
        const borrowerReturn = new Date()
        if (borrowerReturn > peminjaman.return_date)
            await Users.update(
                { is_sanctioned: 1 }, {
                    where: {
                        id: borrower_id}
                })

        await Peminjaman.update(
            {
                status: 'dikembalikan',
                borrower_return_date: borrowerReturn 
            },
            {
                where: {
                    id: peminjaman.id
                }
            }
        );

        const book = await Books.findOne({ where: { id: peminjaman.book_id } });
        await Books.update(
            { stock: book.stock + 1 },
            { where: { id: peminjaman.book_id }}
        )
        res.status(200).json({
            msg: "Buku berhasil dikembalikan",
            book_return: {
                id: peminjaman.id,
                status: 'dikembalikan',
                borrower_return_date: borrowerReturn,
                book: {
                    id: peminjaman.book.id,
                    code: peminjaman.book.code,
                    title: peminjaman.book.title,
                    author: peminjaman.book.author,
                    stock: book.stock + 1
                }
            }
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
    