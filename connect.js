import mysql from "mysql";
// import dotenv from 'dotenv'
// dotenv.config()

// export const db = mysql.createConnection({
//     host: process.env.DB_URL,
//     user: process.env.DB_USER,
//     password: process.env.DB_PWD,
//     database: process.env.DB
// })
export const db = mysql.createConnection({
    host: 'eu-cdbr-west-03.cleardb.net',
    user: 'b99919f2a25e8a',
    password: 'ab7c3830',
    database: 'heroku_077111ef798d288'
})

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
// var db_config = {
//     host: 'eu-cdbr-west-03.cleardb.net',
//     user: 'b99919f2a25e8a',
//     password: 'ab7c3830',
//     database: 'heroku_077111ef798d288'
//   };

//   export var db;

//   function handleDisconnect() {
//     db = mysql.createConnection(db_config); // Recreate the connection, since
//                                                     // the old one cannot be reused.

//     db.connect(function(err) {          // The server is either down
//       if(err) {                                     // or restarting (takes a while sometimes).
//         console.log('error when connecting to db:', err);
//         setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//       }
//       console.log('connected');                               // to avoid a hot loop, and to allow our node script to
//     });                                     // process asynchronous requests in the meantime.
//                                             // If you're also serving http, display a 503 error.
//     db.on('error', function(err) {
//       console.log('db error', err);
//       if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//         handleDisconnect();                         // lost due to either server restart, or a
//       } else {                                      // connnection idle timeout (the wait_timeout
//         throw err;                                  // server variable configures this)
//       }
//     });
//   }

//   handleDisconnect();
