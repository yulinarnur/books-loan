import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import BorrowedBooks from "./BorrowedBooksModel.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Penalty = db.define('penalty', {
    user_id: {
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
    is_sanctioned: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    end_date_sanctioned: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true,
});

BorrowedBooks.hasMany(Penalty, { foreignKey: 'borrower_id' });
Penalty.belongsTo(BorrowedBooks, { foreignKey: 'borrower_id' });
Users.hasMany(Penalty, { foreignKey: 'user_id' });
Penalty.belongsTo(Users, { foreignKey: 'user_id' });

export default Penalty;