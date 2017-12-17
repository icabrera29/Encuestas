/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(id){
	  this.modelo.borrarPregunta(id);
  },
  editarPregunta: function(id, preguntaEditada){
  	this.modelo.editarPregunta(id, preguntaEditada);
  },
  borrarTodo: function(){
  	this.modelo.borrarTodo();
  },
  agregarVoto: function(pregunta, respuestaSeleccionada){
    this.modelo.agregarVoto(pregunta, respuestaSeleccionada);
  }	
};
