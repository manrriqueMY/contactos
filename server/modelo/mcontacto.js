const mongo=require('mongoose');
const Modelo=mongo.Schema;
const Contacto=new Modelo({
	nombre:String,
	telefono:String
});
module.exports=mongo.model('MContacto',Contacto);