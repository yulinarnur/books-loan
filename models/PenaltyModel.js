import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Peminjaman from "./PeminjamanModel.js";

const { DataTypes } = Sequelize;

const Penalty = db.define('penalty', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    peminjaman_id: {
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

Peminjaman.hasMany(Penalty, { foreignKey: 'peminjaman_id' });
Penalty.belongsTo(Peminjaman, { foreignKey: 'peminjaman_id' });

export default Penalty;