//import express from "express";
const express = require('express');
//import cors from "cors";
const cors = require('cors');
//import axios from "axios";
const axios = require('axios');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", async (req, res) => {
  try {
    let resposta = [];
    let arquivo_json = {};
    let { data } = await axios(
      "https://api.github.com/users/takenet/repos?&type=public&sort=created&direction=asc&per_page=50"

    );
    console.log("resposta");
    //console.log(data);
    var filtrado = data.filter((item) => {
      return item.language == "C#";
    });
    for (let i = 0; i < 5; i++) {
      arquivo_json = {
        name: filtrado[i].name,
        full_name: filtrado[i].full_name,
        description: filtrado[i].description,
        language: filtrado[i].language,
        created_at: filtrado[i].created_at,
        avatar_url: filtrado[i].owner.avatar_url,
      };
      resposta.push(arquivo_json);
    }
    console.log("final");
    return res.status(200).json(resposta)
  } catch (error) {
    console.log(error);
    return res.status(404).json({message:'Não encontrado.'})
  }
});

app.listen(port,()=>{console.log("Servidor Online")})