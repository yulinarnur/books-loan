import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Books from "./BookModel.js";

const { DataTypes } = Sequelize;

const BorrowedBooks = db.define('borrowed_books', {
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    borrower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    loan_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "aktif",
        validate: {
            notEmpty: true
        }
    },
    return_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    borrower_return_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    freezeTableName: true,
});

Books.hasMany(BorrowedBooks, { foreignKey: 'book_id' });
Users.hasMany(BorrowedBooks, { foreignKey: 'borrower_id' });
BorrowedBooks.belongsTo(Books, { foreignKey: 'book_id' });
BorrowedBooks.belongsTo(Users, { foreignKey: 'borrower_id' });

export default BorrowedBooks;