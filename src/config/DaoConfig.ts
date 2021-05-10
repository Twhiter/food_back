import * as mariadb from "mariadb"

export const pool = mariadb.createPool({
    user:'twhiter',
    password:'MTWhiter',
    connectionLimit:5,
    database:"pizza"
});


