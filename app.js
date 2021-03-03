//jshint esversion:6
require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const fs = require("fs");
const PDFParser = require("./node_modules/pdf2json/PDFParser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("index"); 
});

app.get("/game", function(req, res){
    res.render("game");
});

var text = "empty";
app.post("/upload", function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    const uploadedFile = req.files.uploadedFile;
    const uploadPath = __dirname + "/public/uploads/" + uploadedFile.name;
  
    // Use the mv() method to place the file somewhere on server
    uploadedFile.mv(uploadPath, function(error) {
        if (error) return res.status(500).send(error);
        const textPath = __dirname + "/public/F1040EZ.txt"
        let pdfParser = new PDFParser(this, 1); 
        pdfParser.on("pdfParser_dataError", errorData => console.error(errorData.parserError));
        pdfParser.on("pdfParser_dataReady", 
            pdfData => {
                fs.writeFile(textPath, pdfParser.getRawTextContent(),
                    function(error, result){
                        if(!error){
                            fs.readFile(textPath, 'utf8', function(error, contents) {
                                text = contents;
                                fs.unlink(textPath, (error) => {
                                    if (error) throw error;
                                    console.log(textPath + " was deleted");
                                }); 
                                res.redirect("/read");
                            });
                        } else {
                            console.log(error);
                        }
                }); 
                fs.unlink(uploadPath, (error) => {
                    if (error) throw error;
                    console.log(uploadPath + " was deleted");
                });
            }
        );
        pdfParser.loadPDF(uploadPath);
        });
});
app.post("/text", function(req, res){
    text = req.body.text;
    res.redirect("/read");
});

app.get("/read", function(req, res){
    if(text === "empty"){
        res.redirect("/");
    } else {
        res.render("viewer", {text: text});
    }
}); 

app.listen(3000, function(){
    console.log("Server running on port 3000");
});