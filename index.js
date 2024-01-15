//MODULES

import express from "express";
import bodyParser from "body-parser";

//APP

const app = express();
const port = 3000;

// BLOG POST TEST

const posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// MIDDLEWARE

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET ALL POST

app.get("/", (req, res) => {
  res.render("pages/index.ejs", { posts: posts });
});

// GET A SINGLE POST BY ID

app.get("/post-template/:id", (req, res) => {
  let singlePost = posts.find(({ id }) => id === parseInt(req.params.id));
  res.render("pages/post-template.ejs", { singlePost: singlePost });
});


// EDIT A POST
app.get('/edit-post/:id', (req, res) => {
  let postToEdit = posts.find(({ id }) => id === parseInt(req.params.id));
  res.render("pages/edit-post.ejs", { postToEdit: postToEdit });
})

// UPDATE A POST

app.post('/update', (req, res) => {
  
  let postUpdated = {
    id: parseInt(req.body.id),
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  }

  /* EVERYTHING WORK - YOU ONLY NEED TO REPLACE THE OLD POST IN THE ARRAY */
   
  res.send('<h1>Hello!</h1>')
  console.log(postUpdated);
  console.log(posts);
});


// CREATE A NEW POST

app.post("/", (req, res) => {

  // console.log(req.body.title);

  let newId = lastId += 1;

  let post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date().toDateString(),
  };

  lastId = newId;

  posts.push(post);
  console.log(posts);
  res.redirect("/");

});




// GET SINGLE PAGES

app.get("/home", (req, res) => {
  res.render("pages/index.ejs");
})

app.get("/about", (req, res) => {
  res.render("pages/about.ejs");
})

app.get("/contact", (req, res) => {
  res.render("pages/contact.ejs");
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  
});