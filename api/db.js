import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "crud2"
});

/* -- table: usuarios in mysql
CREATE TABLE usuarios (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    fone VARCHAR(255) NOT NULL,
    data_nascimento VARCHAR(255) NOT NULL
);

*/

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
        console.log("Conectado ao banco de dados MySQL!");
    }
});
