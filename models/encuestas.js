var mongoose=require("mongoose");  // requiero la libreria moongoose
mongoose.Promise = require('bluebird');  // necesario para no aparezcan errores
var Schema=mongoose.Schema;


var encuestas_schema=new Schema({  // creo esquema de la bbdd
  Poco_interesante:{type:Number},
  Regular:{type:Number},
  Bueno:{type:Number},
  Util:{type:Number},
  Excelente:{type:Number},
  id_articulo:{type:Number,required:true},
  Fecha:{type:Date,required:true}
});

var Encuesta=mongoose.model("encuesta",encuestas_schema); // creo un modelo

module.exports=Encuesta;

/*
var encuesta={
  Poco_interesante:2,
  Regular:3,
  Bueno:11,
  Util:4,
  Excelente:9,
  id_articulo:20,
  Fecha:new Date()
}

db.encuestas.insert(encuesta);

*/


