var express = require('express');
var router = express.Router();
var Articulo=require("../models/articulos.js");
var Comentario=require("../models/comentarios.js");
var Encuesta=require("../models/encuestas.js");
var mv = require("mv"); 




router.get('/', function(req, res, next) {
		var total_articulos=0;
		Articulo.find().count().then((data)=>{
			 total_articulos=data;
			}, (err)=>{
		   res.render('index',{err,err})
		})
		Articulo.find().limit(5).sort({Fecha:-1}).then((data)=>{
			 res.render('index', { articulos:data,total:total_articulos,num_pag:1,busc:null,cat:null});
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



router.get('/:id', function(req, res, next) {

	var total_articulos=0;
	Articulo.find().count().then((data)=>{
		 total_articulos=data;
		}, (err)=>{
		res.render('index',{err,err})
	})

	var ultimos_articulos={};
	Articulo.find().limit(5).sort({Fecha:-1}).then((data)=>{
						 ultimos_articulos=data;
						},(err)=>{
						res.render('index',{err,err})
					});


	var id=parseInt(req.params.id);
	if(isNaN(id)){
		id=0
	}else{
		id=id;
	}

				var total_comentarios=0;
				Comentario.find({id_articulo:id}).count().then((com)=>{
						total_comentarios=com;
				},(err)=>{
							res.render('index',{err,err})
				})

					var comen="";
				Comentario.find({id_articulo:id}).then((comentarios)=>{
						comen=comentarios;
				},(err)=>{
							res.render('index',{err,err})
				})

			var encuestas="";
			Encuesta.find({id_articulo:id}).then((enc)=>{
					encuestas=enc;
			}, (err)=>{
					res.render('index',{err,err});
			});

	Articulo.find({id_articulo:id}).then((data)=>{
						 res.render('index', {articulos:data,id:id,ultimos_articulos:ultimos_articulos,total_articulos:total_articulos,comen:comen,total_comentarios:total_comentarios,encuestas:encuestas,existe_id:"existe"});
					},(err)=>{
						res.render('index',{err,err})
					});

});






router.post('/:id',function(req,res, next) {

		

var ultimos_articulos={};
	Articulo.find().limit(5).sort({Fecha:-1}).then((data)=>{
						 ultimos_articulos=data;
					},(err)=>{
						res.render('index',{err,err})
					});

						if(req.body.radio){
							var valor_encuesta=req.body.radio;
								if(valor_encuesta=="Poco_interesante"){
									Encuesta.update({id_articulo:req.params.id},{$inc:{Poco_interesante:1}}).then((enc)=>{
													console.log(enc);
										}, (err)=>{
											res.render('index',{err,err})
									})
								}
									if(valor_encuesta=="Regular"){
								Encuesta.update({id_articulo:req.params.id},{$inc:{Regular:1}}).then((enc)=>{
												console.log(enc);
									}, (err)=>{
										res.render('index',{err,err})
								})
							}
								if(valor_encuesta=="Bueno"){
								Encuesta.update({id_articulo:req.params.id},{$inc:{Bueno:1}}).then((enc)=>{
												console.log(enc);
									}, (err)=>{
										res.render('index',{err,err})
								})
							}
								if(valor_encuesta=="Util"){
								Encuesta.update({id_articulo:req.params.id},{$inc:{Util:1}}).then((enc)=>{
												console.log(enc);
									}, (err)=>{
										res.render('index',{err,err})
								})
							}
								if(valor_encuesta=="Excelente"){
								Encuesta.update({id_articulo:req.params.id},{$inc:{Excelente:1}}).then((enc)=>{
												console.log(enc);
									}, (err)=>{
										res.render('index',{err,err})
								})
							}






						}




					if(req.body.file_imagen !=null){
                	

				// formulario comentarios
			  var data = req.body.file_imagen;
          var nombres=[];

          nombres.push(data.File);

         var nombre_de_imagen=data.path;
         var nombre_de_la_imagen=data.name

			var extension=nombre_de_imagen.split(".").pop()

			console.log("***********************************")
			console.log(nombre_de_imagen)
			console.log(nombre_de_la_imagen)


				if(extension=="png" || extension=="jpg" || extension=="gif"){
								var comentario=new Comentario({
								 Nombre:req.body.txt_nombre,
		  						 Correo:req.body.txt_correo,
		  						 Sitio:req.body.txt_sitio,
		 						 Comentario:req.body.txt_comentario,
		  						Fecha:new Date(),
		  						id_articulo:req.body.id_articulo,
		  						nombre_imagen:nombre_de_la_imagen,
		  						extension:extension
						});


        console.log("esta por entrar al mv")
			mv(nombre_de_imagen, "public/images/avatares/" +req.body.txt_correo +"_" + nombre_de_la_imagen, function(err){
          if(err){
            console.log("***********")
            console.log(err)
          }
          console.log("Fichero copiado correctamente...")
        });
 					console.log("salio del mv")
								
				}else{
						var comentario=new Comentario({
						 Nombre:req.body.txt_nombre,
  						 Correo:req.body.txt_correo,
  						 Sitio:req.body.txt_sitio,
 						 Comentario:req.body.txt_comentario,
  						Fecha:new Date(),
  						id_articulo:req.body.id_articulo
						});
				}

          
					if(req.body.id_respuesta){
						Comentario.update({_id:''+req.body.id_respuesta+''},{$push:{respuestas:comentario}}).then((comen)=>{
								
							console.log("*****************")
							console.log("RESPUESTA   ")
							console.log(req.body.id_respuesta)
							

								},(err)=>{
									res.render('index',{err,err})
								});
					}else{

					comentario.save().then((comen)=>{
						  
									},(err)=>{
									 res.render('index',{err,err})
						});
					}


					///////**************

	var total_articulos=0;
	Articulo.find().count().then((data)=>{
		 total_articulos=data;
	}, (err)=>{
		res.render('index',{err,err})
})

	var ultimos_articulos={};
	Articulo.find().limit(5).sort({Fecha:-1}).then((data)=>{
						 ultimos_articulos=data;
					},(err)=>{
						res.render('index',{err,err})
					});

	} // si existe imagen

	var id=parseInt(req.params.id);
	if(isNaN(id)){
		id=0
	}else{
		id=id;
	}

				var total_comentarios=0;
				Comentario.find({id_articulo:id}).count().then((com)=>{
						total_comentarios=com;
				},(err)=>{
							res.render('index',{err,err})
				})

			var encuestas="";
			Encuesta.find({id_articulo:id}).then((enc)=>{
					encuestas=enc;
			}, (err)=>{
					res.render('index',{err,err});
			});
					var comen="";
				Comentario.find({id_articulo:id}).sort( { _id: -1 } ).then((comentarios)=>{
						comen=comentarios;
				},(err)=>{
							res.render('index',{err,err})
				})

	Articulo.find({id_articulo:id}).then((data)=>{
						 res.render('index', {articulos:data,id:id,ultimos_articulos:ultimos_articulos,total_articulos:total_articulos,comen:comen,total_comentarios:total_comentarios,encuestas:encuestas});
					},(err)=>{
						res.render('index',{err,err})
					});

});


module.exports = router;
