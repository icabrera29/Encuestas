/*
 * Modelo
 */
var Modelo = function() {
  this.localStorage = JSON.parse(localStorage.getItem('preguntas'));
  if(this.localStorage != null){
    this.preguntas = this.localStorage;
  }else{
    this.preguntas = [];
  }  
  //this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
  this.ultimoId = 0;

  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.todasBorradas = new Evento(this);
  this.votoAgregado = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var maxId = -1;
    for(var i=0;i<this.preguntas.length;++i){
      if(this.preguntas[i].id > maxId)
        maxId = this.preguntas[i].id;
    }
    return maxId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    if(nombre && respuestas){
      var id = this.obtenerUltimoId();
      id++;
      var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
      this.preguntas.push(nuevaPregunta);    
      this.guardar();  
      this.preguntaAgregada.notificar();  
    }    
  },
  borrarPregunta: function(id){
    this.preguntas.splice(id,1);    
    this.guardar();
    this.preguntaBorrada.notificar();
  },
  editarPregunta: function(id, preguntaEditada){
    if(preguntaEditada){
      this.preguntas[id].textoPregunta = preguntaEditada;    
      this.guardar();
      this.preguntaEditada.notificar();
    }    
  },
  borrarTodo: function(){
    this.preguntas = [];       
    localStorage.clear();
    this.todasBorradas.notificar();
  },
  obtenerPregunta: function(nombrePregunta){
    return this.preguntas.filter(p => p.textoPregunta == nombrePregunta);
  },
  agregarVoto: function(pregunta, respuestaSeleccionada, nombreUsuario){
    if(pregunta, respuestaSeleccionada, nombreUsuario){
      var i = 0;
      var respuesta = pregunta[i].cantidadPorRespuesta.filter(resp => resp.textoRespuesta == respuestaSeleccionada);
      respuesta[i].cantidad += 1; 
      this.guardar();
      this.votoAgregado.notificar();
    }   
  },
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },
};
