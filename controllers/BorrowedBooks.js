import BorrowedBooks from "../models/BorrowedBooksModel.js";
import Books from "../models/BookModel.js";
import Penalty from "../models/PenaltyModel.js";

export const getBorrowedBooks = async (req, res) => {
    try {
        const books = await BorrowedBooks.findAll({
            attributes: ['book_id', 'borrower_id']
        });
        res.status(200).json(books);
    } catch(error){
        res.status(500).json({msg: error.message});
    }
}

export const createBorrowedBooks = async (req, res) => {
    const { code, title } = req.body;
    const borrower_id = req.userId;

    try {
        const penaltyUser = await Penalty.findOne({ where: {user_id: borrower_id} });

        if (penaltyUser) {
            const currentDate = new Date();
            const endSanctionDate = new Date(penaltyUser.end_date_sanctioned);
            const differenceInTime = currentDate.getTime() - endSanctionDate.getTime();
            const differenceInDays = differenceInTime / (1000 * 3600 * 24);

            if (differenceInDays > 3) {
                await penaltyUser.destroy();
            } else {
                return res.status(403).json({msg: "Anggota sedang dikenakan sanksi selama 3 hari"});
            }
            
        }

        const borrowerId = await BorrowedBooks.count({
            where: {
                borrower_id: borrower_id,
                status: "aktif"
            }
        })

        if (borrowerId >= 2) return res.status(403).json({msg: "Anggota tidak boleh meminjam lebih dari 2 buku"})

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

        const newLoan = await BorrowedBooks.create({
            book_id: book.id,
            borrower_id: borrower_id,
            loan_date: newLoanDate,
            return_date: returnDate
        });

        const bookDetails = await Books.findByPk(book.id)

        res.status(201).json({
            msg: "Buku berhasil dipinjam",
            data_peminjaman: {
                id: newLoan.id,
                data_buku: {
                    id: bookDetails.id,
                    code: bookDetails.code,
                    title: bookDetails.title,
                    author: bookDetails.author
                },
                loan_date: newLoan.loan_date,
                return_date: newLoan.return_date
            }
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const bookReturn = async (req, res) => {
    const { code, title } = req.body;
    const borrower_id = req.userId;

    try {
        const datasBorrowedBooks = await BorrowedBooks.findOne({
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
        
        if (!datasBorrowedBooks) return res.status(404).json({ msg: "Data buku peminjaman tidak ditemukan" });
        
        const borrowerReturn = new Date()
        if (borrowerReturn > datasBorrowedBooks.return_date){
            const sanctionEndDate = new Date();
            sanctionEndDate.setDate(sanctionEndDate.getDate() + 3);

            await Penalty.create({
                user_id: borrower_id,
                borrower_id: datasBorrowedBooks.id,
                is_sanctioned: 1,
                end_date_sanctioned: sanctionEndDate
            })
        }
            
        await BorrowedBooks.update(
            {
                status: 'dikembalikan',
                borrower_return_date: borrowerReturn 
            },
            {
                where: {
                    id: datasBorrowedBooks.id
                }
            }
        );

        const book = await Books.findOne({ where: { id: datasBorrowedBooks.book_id } });
        await Books.update(
            { stock: book.stock + 1 },
            { where: { id: datasBorrowedBooks.book_id }}
        )
        res.status(200).json({
            msg: "Buku berhasil dikembalikan",
            book_return: {
                id: datasBorrowedBooks.id,
                status: 'dikembalikan',
                borrower_return_date: borrowerReturn,
                book: {
                    id: datasBorrowedBooks.book.id,
                    code: datasBorrowedBooks.book.code,
                    title: datasBorrowedBooks.book.title,
                    author: datasBorrowedBooks.book.author,
                    stock: book.stock + 1
                }
            }
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
    