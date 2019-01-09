var express=require('express');
var ruta=express.Router();
const MContacto=require('../modelo/mcontacto');

ruta.get('/lista',async(req,res)=>{
	const list=await MContacto.find({});
	res.json({c:list});
});

ruta.post('/save',async(req,res)=>{
	const {nombre,telefono}=req.body;
	let contacto=new MContacto({nombre,telefono});
	await contacto.save();
	res.json({msg:'Guardado Correctamente'});
});

ruta.delete('/del/:id',async(req,res)=>{
	await MContacto.findByIdAndRemove(req.params.id);
	res.json({msg:'Eliminado Correctamente'});
});

ruta.get('/busca/:id',async(req,res)=>{
	const con=await MContacto.findById(req.params.id);
	res.json(con);
});

ruta.put('/up/:id',async(req,res)=>{
	const {nombre,telefono}=req.body;
	let con={nombre,telefono};
	await MContacto.findByIdAndUpdate(req.params.id,con);
	res.json({msg:'Actualizado Correctamente'});
});


module.exports=ruta;