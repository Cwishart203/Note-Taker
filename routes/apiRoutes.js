const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const db = require("../db/db.json");
const {v4: uuidv4} = require("uuid");

router.get("/notes", (req, res) => {
    return res.json(db)
});

router.post("/notes", (req, res) => {
    const note = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    db.push(note);
    fs.writeFile("./db/db.json", JSON.stringify(db), err => {
        if (err) {
            console.log(err)
        }
        return res.json(db);
    })
})

module.exports = router;