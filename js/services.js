angular.module('app.services', [])

.factory('GetContentService', function() {
  var service = {};

  service.getContent = function(id) {
    //AQUI FAZ UM GET DE ACORDO COM A PLACA E TRAZ OS DADOS DO BANCO PRA MOSTRAR NO POPUP
    console.log(id);
    return {
      placa: id,
      motorista: "Rafael",
      content: "Teste"
    }
  }

  return service;
});