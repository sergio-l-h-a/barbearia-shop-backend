const pg = require("pg");
require("dotenv").config();

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL
});

client.connect()
  .then(() => {
    console.log("Conectou ao banco com sucesso!");
    return client.end();
  })
  .catch(err => console.error("Erro ao conectar:", err));
