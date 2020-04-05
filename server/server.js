const express=require("express");
const ruta=express.Router();
const app=express();
const cors = require('cors');
const path = require('path');
const mongo=require("mongoose");
const port = process.env.PORT || 3000;

mongo.connect("mongodb://contacto:abc123@ds161764.mlab.com:61764/contactos",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(db=>console.log('DB esta Conectado')).catch(error=>console.log(error));
//mongo.connect("mongodb://localhost:27017/contactos").then(db=>console.log('DB esta Conectado')).catch(error=>console.log(error));

/*
app.get("/",function(req,res){
	res.send("Conectado");
});*/

var contact=require("./dao/contacto");
app.use(express.json());
app.use(cors());
app.use("/api/contacto",contact);

app.use(express.static(path.join(__dirname, '/../build')));
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../build/index.html'));
});

app.listen(port,function(){
	console.log("Corriendo en "+port);
});