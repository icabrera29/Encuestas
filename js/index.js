var modelo = new Modelo();
var vistaAdmin = new VistaAdministrador(modelo, new Controlador(modelo), {
  'lista': $('#lista'),
  'botonEditarPregunta': $('#editarPregunta'),
  'botonBorrarPregunta': $('#borrarPregunta'),
  'botonBorrarTodo': $('#borrarTodo'),
  'contenedorBotonBorrarRespuesta':$('.form-box'),
  'pregunta': $('#pregunta'),
  'respuesta': $('#respuesta'),
  'botonAgregarRespuesta': $('.botonAgregarRespuesta'),
  'formulario': $('localStorageForm'),
  'botonAgregarPregunta': $('#agregarPregunta'),
  'muestraDeRespuestas': $('.panel-body')
});
vistaAdmin.inicializar();
var vistaUsuario = new VistaUsuario(modelo, new Controlador(modelo), {
  'listaPreguntas': $('#preguntas'),
  'botonAgregar': $('#agregarBoton'),
  'nombreUsuario' : $('#nombreUsuario'),
  'graficosDeTorta' : $('#graficosDeTorta'),
});
vistaUsuario.inicializar();