import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const posts = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("pages/index.ejs", {posts: posts});
  });

  app.get("/home", (req,res) => {
    res.render("pages/index.ejs");
  })

  app.get("/about", (req,res) => {
    res.render("pages/about.ejs");
  })

  app.get("/contact", (req,res) => {
    res.render("pages/contact.ejs");
  })
  
  app.post("/", (req, res) => {

    let postContent = {
        title: req.body.postTitle,
        body: req.body.postBody
    }

    let post = {
        id: Date.now(),
        postTitle: postContent.title,
        postBody: postContent.body
    }
    posts.push(post);
    res.redirect("/");
    console.log(posts);
  });


  app.get("/post-template/:id", (req,res) => {
    res.render("pages/post-template.ejs", {posts: posts});
    
    if (posts.length === 0) {
      console.log(posts[0].postTitle);
    } else {
      console.log(posts[posts.length - 1].postTitle);
    }

    console.log(req.params.id);

  })


  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });