var express=require("express");
var ruta=express.Router();
var app=express();

var mongo=require("mongoose");
mongo.connect("mongodb://contacto:abc123@ds161764.mlab.com:61764/contactos").then(db=>console.log('DB esta Conectado')).catch(error=>console.log(error));

app.get("/",function(req,res){
	res.send("Conectado");
});

var contact=require("./dao/contacto");
app.use(express.json());
app.use("/api/contacto",contact);

app.listen(3001,function(){
	console.log("Corriendo en 3001");
});