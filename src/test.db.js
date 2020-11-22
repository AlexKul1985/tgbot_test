const { Client } = require('pg')
// const conString = 'postgres://alex_kul1985:21365sanshoy;AK@localhost/ak85_tel_bot_data'
 // Убедитесь, что вы указали данные от вашей базы данных
 var con = new Client({
  host: 'localhost',
  port: 5432,
  user: 'alex_kul1985',
  password: '21365sanshoy;AK',
  database: 'ak85_tel_bot_data',
})
con.connect( function (err) {
  if (err) {
    return console.error('error fetching client from pool', err)
  }
  con.query('SELECT * FROM users', null, function (err, result) {
   
    if (err) {
      return console.error('error happened during query', err)
    }
    console.log(result.rows[0])
    process.exit(0)
  })
})