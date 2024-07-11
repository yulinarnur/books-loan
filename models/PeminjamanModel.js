import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Books from "./BookModel.js";

const { DataTypes } = Sequelize;

const Peminjaman = db.define('peminjamans', {
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    borrower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
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
}, {
    freezeTableName: true,
});

Books.hasMany(Peminjaman, { foreignKey: 'book_id' });
Users.hasMany(Peminjaman, { foreignKey: 'borrower_id' });
Peminjaman.belongsTo(Books, { foreignKey: 'book_id' });
Peminjaman.belongsTo(Users, { foreignKey: 'borrower_id' });

export default Peminjaman;