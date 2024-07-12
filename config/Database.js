import { Sequelize } from "sequelize";

const db = new Sequelize("db_books_loan_test", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

export default db;
