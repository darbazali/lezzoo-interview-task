import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

// create connection with mysql driver
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB || 'stores',
})

// open the connection
connection.connect((err) => {
  if (err) {
    if (err) throw err
  } else {
    console.log('MYSQL is connected successfully')
  }
})

setInterval(function () {
  connection.query('SELECT 1')
}, 5000)

export default connection
