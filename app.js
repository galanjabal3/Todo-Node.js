const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.set('view engine','hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

var koneksi = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'my_todo'
});

koneksi.connect((err) =>{
    if(err) throw err;
    console.log('Koneksi Databases Berhasil tersambung')
});

app.get('/', (req, res) => {
    koneksi.query('SELECT * FROM aktivitas',(err, hasil) => {
        if(err) throw err;
        res.render('home.hbs', {
            title: 'MY TODO',
            data: hasil
        });
    });
});

app.post('/todo', (req, res) =>{
    var detailkegiatan = req.body.inputdetailkegiatan;
    var tanggal = req.body.inputtanggal;
    koneksi.query('INSERT INTO aktivitas(detail_kegiatan, tanggal) values (?,?)',
    [ detailkegiatan, tanggal],
    (err, hasil) =>{
        if(err) throw err;
        res.redirect('/');
    }
    )
});

app.listen(port, () =>{
    console.log(`App berjalan pada port ${port}`);
});