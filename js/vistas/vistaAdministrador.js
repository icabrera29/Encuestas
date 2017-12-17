/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaBorrada.suscribir(function() {
    contexto.borrarElementoPregunta();
  });
  this.modelo.preguntaEditada.suscribir(function() {
    contexto.editarElementoPregunta();
  });
  this.modelo.todasBorradas.suscribir(function(){
    contexto.borrarTodosElementosPregunta();
  })
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem = $('<li class="list-group-item" id="'+ pregunta.id +'"></li>');
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    //console.log(pregunta.cantidadPorRespuesta.textoRespuesta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){      
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },
  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function() {
         respuestas.push({'textoRespuesta': $(this).val(), 'cantidad': 0}); 
      });
     
      //Hacer validacion para que no se cree un elemento vacio
      contexto.controlador.agregarPregunta(value, respuestas);
      contexto.limpiarFormulario();
      });
    //asociar el resto de los botones a eventos
    e.botonBorrarPregunta.click(function(){
        var id = $('.list-group-item.active').attr('id');
        contexto.controlador.borrarPregunta(id);
      });
    e.botonAgregarRespuesta.click(function(){
        $('.botonAgregarRespuesta').before("<div class='form-group answer' id='optionTemplate'> <input class='form-control' type='text' name='option[]' /> <button type='button' class='btn btn-default botonBorrarRespuesta'><i class='fa fa-minus'></i></button></div>");
      });
    e.contenedorBotonBorrarRespuesta.on('click', '.botonBorrarRespuesta', function(){
      $(this).parent().remove();
      });  
    e.botonEditarPregunta.click(function(){
      var id = $('.list-group-item.active').attr('id');
      if(id != null){        
        var preguntaEditada = prompt("Please enter your name", "");        
        contexto.controlador.editarPregunta(id, preguntaEditada);
        }      
      });    
    e.botonBorrarTodo.click(function(){
      contexto.controlador.borrarTodo();
    });
  },
  editarElementoPregunta:function(){
    var id = $('.list-group-item.active').attr('id');    
    $('.list-group-item.active').find('h5').text(this.modelo.preguntas[id].textoPregunta);
  },
  borrarElementoPregunta: function(){
    $('.list-group-item.active').remove();
  },
  borrarTodosElementosPregunta: function(){
    $('#lista').children().remove();
  },
  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
