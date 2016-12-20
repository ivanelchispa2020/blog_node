var express = require('express');
var router = express.Router();
var Articulo=require("../models/articulos.js");


/* GET home page. */
router.get('/', function(req, res, next) {	

	var total_articulos=0;
	Articulo.find().count().then((data)=>{
		 total_articulos=data;
	}, (err)=>{
		res.render('index',{err,err})
	})

	Articulo.find().limit(5).sort({Fecha:-1}).then((data)=>{
		 res.render('index', { articulos:data,total:total_articulos});
	}, (err)=>{
		res.render('index',{err,err})
	})
});

router.post('/',(req,res,next)=>{

			// CATEGORIAS
	  if(req.query.cat && req.query.cat>0){
			var total_articulos=0;
				Articulo.find({id_categoria:req.query.cat}).count().then((data)=>{
					 total_articulos=data;
						}, (err)=>{
					res.render('index',{err,err})
				})

         var skip=(req.query.pag - 1 ) * 5;
         var num_pag=parseInt(req.query.pag);


	Articulo.find({id_categoria:req.query.cat}).skip(skip).limit(5).sort({Fecha:-1}).then((data)=>{
					 res.render('pagina_principal/body_principal', { articulos:data,total:total_articulos,num_pag:num_pag,cat:req.query.cat});
					}, (err)=>{
					res.render('pagina_principal/body_principal',{err,err})
				})

	  }else if(req.query.busc && req.query.busc!=0 && req.query.busc!='0' && req.query.busc!="'0'"){

	  		var busca=new RegExp(req.query.busc,"gi");

	  		var total_articulos=0;
				Articulo.find({$or:[{Titulo:busca},{Parrafo:busca},{Parrafo_principal:busca}]}).count().then((data)=>{
					 total_articulos=data;
						}, (err)=>{
					res.render('index',{err,err})
				})

         var skip=(req.query.pag - 1 ) * 5;
         var num_pag=parseInt(req.query.pag);

	Articulo.find({$or:[{Titulo:busca},{Parrafo:busca},{Parrafo_principal:busca}]}).skip(skip).limit(5).sort({Fecha:-1}).then((data)=>{
					 res.render('pagina_principal/body_principal', { articulos:data,total:total_articulos,num_pag:num_pag,busc:req.query.busc});
						}, (err)=>{
					res.render('pagina_principal/body_principal',{err,err})
				})


	  }else{

	  	// NORMAL
		var total_articulos=0;
				Articulo.find().count().then((data)=>{
					 total_articulos=data;
						}, (err)=>{
					res.render('index',{err,err})
				})

         var skip=(req.query.pag - 1 ) * 5;
         var num_pag=parseInt(req.query.pag);

	Articulo.find().skip(skip).limit(5).sort({Fecha:-1}).then((data)=>{
					 res.render('pagina_principal/body_principal', { articulos:data,total:total_articulos,num_pag:num_pag});
					}, (err)=>{
					res.render('pagina_principal/body_principal',{err,err})
				})

	  }


});

module.exports = router;
