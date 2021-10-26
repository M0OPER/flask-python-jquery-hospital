$(function() {

$(document).on('click', ".detallesCita", function() {
  $(".cancelarCita").attr("idcita", $(this).attr("idcita"));
    $.ajax({
          url: '/detallesCitaPaciente',
          data: { idCita : $(this).attr('idCita')},
          type: 'post', 
          success: function(response) { 
            if (response.status == "OK") {
              $("#msgDetallesCita #mensajeOk").text(response.msg);
              $("#dcPaciente").val(response.datos[3] + " " + response.datos[4]);
              $("#dcMedico").val(response.datos[1] + " " + response.datos[2]);
              $("#dcFecha").val(response.datos[5].substring(0, 10));
              $("#dcHora").val(response.datos[5].substring(10, 16));
              $("#dcDetalles").val(response.datos[6]);
              $("#dcHistoria").val(response.datos[7]);
              $("#dcComentarioPaciente").val(response.datos[8]);
              $("#dcComentarioMedico").val(response.datos[9]);
              $('#modalDetallesCita').modal('show');
              showMensaje("#msgDetallesCita", "Ok");
            }else if(response.status == "FAIL"){
              $("#msgDetallesCita #mensajeFail").text(response.msg);
              showMensaje("#msgDetallesCita", "Fail");
            }
          },
          error: function(error) {
            console.log(error)
            showMensaje("#msgDetallesCita", "Server");
          }
      });
    return false;
});

$(document).on('click', ".comentarCita", function() {
  $("#ccComentar").attr("idcita", $(this).attr("idcita"));
  $.ajax({
    url: '/cargarComentarios',
    data: { cita  : $(this).attr('idcita')},
    type: 'post', 
    success: function(response) { 
      if (response.status == "OK") {
        $("#msgPanel #mensajeOk").text(response.msg);
        showMensaje("#msgPanel", "Comentarios cargados");
        $("#ccComentarioMedico").val(response.datos[2]);
        $("#ccComentarioPaciente").val(response.datos[1]);
        $("#dcDetalles").val(response.datos[6]);
        $('#modalComentarCita').modal('show');
      }else if(response.status == "FAIL"){
        $("#msgPanel #mensajeFail").text(response.msg);
        showMensaje("#msgPanel", "Fail");
      }
    },
    error: function(error) {
      console.log(error)
      showMensaje("#msgPanel", "Server");
    }
});
return false;
 
});

$(document).on('click', "#ccComentar", function() {
  $.ajax({
    url: '/actualizarComentarios',
    data: { cita : $(this).attr('idcita'),
            paci : $("#ccComentarioPaciente").val(),
            medi : $("#ccComentarioMedico").val()},
    type: 'post', 
    success: function(response) { 
      if (response.status == "OK") {
        location.reload();
      }else if(response.status == "FAIL"){
        $("#msgComentarCita #mensajeFail").text(response.msg);
        showMensaje("#msgComentarCita", "Fail");
      }
    },
    error: function(error) {
      console.log(error)
      showMensaje("#msgComentarCita", "Server");
    }
});
return false;
});

$(document).on('click', ".aceptarCita", function() {
  $("#aceAceptar").attr("idcita", $(this).attr("idcita"));
  $("#aceDenegar").attr("idcita", $(this).attr("idcita"));
  $('#modalAceptarCita').modal('show');
  return false;
});

$(document).on('click', "#aceAceptar", function() {
  $.ajax({
        url: '/aceptarCita',
        data: { cita  : $(this).attr('idcita')},
        type: 'post', 
        success: function(response) { 
          if (response.status == "OK") {
            $("#msgPanel #mensajeOk").text(response.msg);
            showMensaje("#msgPanel", "Ok");
            location.reload();
          }else if(response.status == "FAIL"){
            $("#msgAtenderCita #mensajeFail").text(response.msg);
            showMensaje("#msgAtenderCita", "Fail");
          }
        },
        error: function(error) {
          console.log(error)
          showMensaje("#msgAtenderCita", "Server");
        }
    });
  return false;
});

$(document).on('click', "#aceDenegar", function() {
  $.ajax({
        url: '/cancelarCita',
        data: { cita  : $(this).attr('idcita')},
        type: 'post', 
        success: function(response) { 
          if (response.status == "OK") {
            $("#msgPanel #mensajeOk").text(response.msg);
            showMensaje("#msgPanel", "Ok");
            location.reload();
          }else if(response.status == "FAIL"){
            $("#msgAtenderCita #mensajeFail").text(response.msg);
            showMensaje("#msgAtenderCita", "Fail");
          }
        },
        error: function(error) {
          console.log(error)
          showMensaje("#msgAtenderCita", "Server");
        }
    });
  return false;
});

});
document.write(`

<!-- Modal Cancelar Cita-->
<div class="modal fade" id="modalCancelarCita" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modalHead">
        CANCELAR CITA #1<i class="bi bi-x-circle-fill close manita" data-dismiss="modal" aria-label="Close"></i>
      </div>
      <div class="modal-body">
        <form>
  <div class="form-group">
    <label for="exampleInputEmail1">¿Está seguro de cancelar la cita?</label>
    
  </div>
</form>
      </div>
      <div class="modal-footer modalFoot" align="center">
        <div id="msgCancelarCita"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button idcita="" type="button" class="btn btn-verde cancelarCitaBoton">CANCELAR CITA</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Aceptar Cita-->
<div class="modal fade" id="modalAceptarCita" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modalHead">
        ACEPTAR CITA<i class="bi bi-x-circle-fill close manita" data-dismiss="modal" aria-label="Close"></i>
      </div>
      <div class="modal-body">
        <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Cuando acepte la cita será asignada a la fecha y hora, por favor verifique los detalles del paciente. Si no la acepta el paciente tendrá que volver a solicitar una cita.</label>
  </div>
</form>
      </div>
      <div class="modal-footer modalFoot" align="center">
        <div id="msgAceptarCita"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button id="aceAceptar" idcita="" type="button" class="btn btn-verde">ACEPTAR CITA</button>
        <button id="aceDenegar" idcita="" type="button" class="btn btn-danger">DENEGAR CITA</button>
      </div>
    </div>
  </div>
</div>

`);
