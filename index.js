

require ("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require ("mongoose");
const PORT = process.env.PORT || 3000;

const homeStartingContent = " Howdy! Welcome to your safe space where you can freely share your thoughts and ideas with no fear or judgment! ";
const aboutContent = "This project was created by Almira as part of an exercise to reinforce the concepts learned such as MongoDB, API, and EJS. I hope you enjoyed it as much as I did!";
const contactContent = "If you would like to share something in private or would like to give me advise or pointers to improve this website, please feel free to reach out to me at almira199625@gmail.com"
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-almira:Password.1@cluster0.lh5mzy0.mongodb.net/blogDB");

const postSchema = {
  titile: String,
  content: String
};

const Post = mongoose.model("Post",postSchema);



app.get("/", function(req, res){
  Post.find().then(posts =>{
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
  });

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save().then(function(post){
    res.redirect("/");
  }).catch(function(err){
    console.log(err);
  })
});

app.get("/posts/:postId", function(req, res){
  const requestedPostId =req.params.postId;

  Post.findOne({_id: requestedPostId}).then(function(post){
    res.render("post", {
      title: post.title,
      content: post.content
    })
  }).catch(function(err){console.log (err)})

});

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});

