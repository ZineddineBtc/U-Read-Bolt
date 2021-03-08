//jshint esversion:6
require("dotenv").config();
const fs = require("fs");
const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local");
const User = require("./models/user");
//const randomSentence = require("./models/sentences");
var PDFParser = require("pdf2json/pdfparser");
const nodemailer = require("nodemailer");

mongoose.connect("mongodb+srv://admin-zineddine:adminpassword@u-read-bolt-users.s5w0z.mongodb.net/MyDatabase", 
                {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(fileUpload());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialize: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/index",
    passReqToCallback: true,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function(request, accessToken, refreshToken, profile, done) {
        User.findOrCreate({
            username: profile.emails[0].value, 
            googleId: profile.id,
            name: profile.displayName
        }, function (err, user) {return done(err, user);});
  }
));

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "feedback.ureadbolt@gmail.com",
      pass: "Ualwaysreadbolt@2506"
    }
});

app.get("/", function(req, res){
    res.redirect("/index");
});

app.get("/index", function(req, res){
    if(!req.isAuthenticated()){
        res.render("index", {
            view: "index",
            isAuthenticated: false, 
            name: null
        }); 
    } else {
        res.render("index", {
            view: "index",
            isAuthenticated: true, 
            name: req.user.name
        });
    } 
});

app.get("/login/:view", function(req, res){
    res.render("login", {view: req.params.view}); 
});

app.get("/register/:view", function(req, res){
    res.render("register", {view: req.params.view}); 
});

app.get("/auth/google", passport.authenticate("google", {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
             'https://www.googleapis.com/auth/userinfo.email']
}));

app.get("/auth/google/index",
    passport.authenticate( "google", {
        successRedirect: "/",
        failureRedirect: "/login"
})); 

app.get("/upload", function(req, res){
    if(!req.isAuthenticated()){
        res.render("upload", {
            view: "upload",
            isAuthenticated: false, 
            name: null
        }); 
    } else {
        res.render("upload", {
            view: "upload",
            isAuthenticated: true, 
            name: req.user.name
        });
    }
});

app.get("/game", function(req, res){
    if(!req.isAuthenticated()){
        res.render("game", {
            view: "game",
            isAuthenticated: false, 
            name: null, 
            points: 0,
        }); 
    } else {
        if(!req.user.points) req.user.points = 0;
        res.render("game", {
            view: "game",
            isAuthenticated: true, 
            name: req.user.name, 
            points: req.user.points
        });
    }
});

app.post("/game/:points", function(req, res){
    if(req.isAuthenticated()){
        User.findOneAndUpdate({_id: (req.user._id)}, 
            {$set: {points: Number(req.params.points)}}, 
            function(error, doc){
                if(error){
                    console.log(error);
                }   
            }
        );
    }
});

/* app.post("/game/sentence", function(req, res){
    console.log("game sentence");
    const response = {
        success: randomSentence()
    }
    console.log(JSON.stringify(response));
    res.end(JSON.stringify(response));
}); */

var text = "empty";
app.post("/upload", function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    const uploadedFile = req.files.file;
    var uploadPath = __dirname +"/" + uploadedFile.name;
    // Use the mv() method to place the file somewhere on server
    uploadedFile.mv(uploadPath, function(error) {
        if (error) return res.status(500).send(error);
        const textPath = __dirname + "/MYTEXT.txt"
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
                                res.redirect("/viewer");
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
    res.redirect("/viewer");
});

app.get("/viewer", function(req, res){
    if(text === "empty"){
        res.redirect("/upload");
    } else {
        if(!req.isAuthenticated()){
            res.render("viewer", {
                view: "viewer",
                isAuthenticated: false, 
                name: null, 
                text: text
            }); 
        } else {
            res.render("viewer", {
                view: "viewer",
                isAuthenticated: true, 
                name: req.user.name, 
                text: text
            }); 
        }
    }
}); 

app.get("/feedback", function(req, res){
    if(!req.isAuthenticated()){
        res.render("feedback", {
            view: "feedback",
            isAuthenticated: false, 
            name: null
        }); 
    } else {
        res.render("feedback", {
            view: "feedback",
            isAuthenticated: true, 
            name: req.user.name
        }); 
    }
    
}); 

app.post("/feedback", function(req, res){
    let mailBody;
    if(req.isAuthenticated()) {
        mailBody = "Username: "+ req.user.username + "\n" +
                   "Name: "+ req.user.name + "\n";
    } else {
        mailBody = "No Username, no name \n";
    }
    mailBody += req.body.feedbackDescription;
    const mailOptions = {
        from: "feedback.ureadbolt@gmail.com",
        to: "feedback.ureadbolt@gmail.com",
        subject: req.body.feedbackTitle,
        text: mailBody
    };  
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);  
            res.redirect("/feedback-sent");
        }
    });
});

app.get("/feedback-sent", function(req, res){
    if(!req.isAuthenticated()){
        res.render("feedback-sent", {
            view: "feedback-sent",
            isAuthenticated: false, 
            name: null
        }); 
    } else {
        res.render("feedback-sent", {
            view: "feedback-sent",
            isAuthenticated: true, 
            name: req.user.name
        }); 
    }
    
}); 

app.get("/logout/:view", function(req, res){
    req.logout();
    res.redirect("/"+req.params.view);
});

app.post("/login/:view", 
        passport.authenticate("local",{failureRedirect: "/login"}),
        function(req, res){
            if(req.params.view === "viewer"){
                res.redirect("/upload");
            } else {
                res.redirect("/"+req.params.view);
            }
        }
);

app.post("/register/:view", function(req, res){
    User.register(
        new User({
            username: req.body.username, 
            name:req.body.name, 
            points: 0
        }), 
        req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            if(req.params.view === "viewer"){
                res.redirect("/upload");
            } else {
                res.redirect("/"+req.params.view);
            }
        });
    });
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server running on port 3000");
});