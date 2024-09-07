import mysql from 'mysql' // o tambien const mysql = require('mysql');
    var conectar = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '123456',
            database : 'db_nodejs'
    });

    conectar.connect(function(err) {
            if (err) {
                console.error('Error en la conexion: ' + err.stack);
        return;
        }
   
                console.log('conexion exitosa ID: ' + conectar.threadId);
    });

    export {conectar}