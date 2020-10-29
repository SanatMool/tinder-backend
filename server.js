import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Cards from "./models/dbCards.js";

// App Config
const app = express(); // creating an instance
const port = process.env.PORT || 8080;
const connection_url = `mongodb+srv://tinder-admin:lyWjjf7eqClqdfSv@cluster0.p35qg.mongodb.net/tinder?retryWrites=true&w=majority`;

// Middlewares
app.use(express.json());
app.use(cors());

// DB CONFIG
mongoose.connect(connection_url, {
  // to smooth the connection since mongoose is under development and constant evolvation
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//API Endpoints
app.get("/", (req, res) => res.status(200).send("HELLO PROGRAMMERS"));

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    }

    res.status(201).send(data);
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    }

    res.status(200).send(data);
  });
});

// Listener
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
