const express = require("express")
const mysql = require("mysql")
const BodyParser = require("body-parser")

const app = express()

app.use(BodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs")
app.set("views", "views")

const db = mysql.createConnection({
    host: "localhost",
    database:"tabel-test",
    user:"root",
    password:""
})

db.connect((err) => {
    if(err) throw err
    console.log("database connected")

    //Get Data / show data
    app.get("/", (req, res) => {
        const sql = "SELECT * FROM school"
        db.query(sql, (err, result) => {
            const users = JSON.parse(JSON.stringify(result))
            res.render("index", {users:users, title:"Database test"})
        })
        
    })

    // post data
    app.post("/tambah", (req, res) => {
        const insertSql = `INSERT INTO school (name, kelas) VALUES('${req.body.name}', '${req.body.kelas}');`
        db.query(insertSql, (err, result) => {
            if(err) throw err
            res.redirect('/')
        })
    })
    
})



app.listen(8000, () => {
    console.log("server Ready")
} )