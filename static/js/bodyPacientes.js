$(function() {

  $(document).on('keyup', "#pnlBuscarCitasPacientes", function() {
    $.ajax({
          url: '/listarCitasPacientes',
          data: { text : $(this).val() },
          type: 'post', 
          success: function(response) {
            if (response.status == "OK") {
              var citas = "";
              $("#msgPanel #mensajeOk").text(response.msg);
              for (let index = 0; index < response.datos.length; index++) {
                citas += '<tr> \
                <th scope="row">' + (index + 1)  + '</th> \
                <td>' + response.datos[index][1] + '</td> \
                <td>' + response.datos[index][2] + '</td> \
                <td>' + response.datos[index][3] + '</td> \
                <td><i idCita="' + response.datos[index][0] + '" class="bi bi-eye-fill close manita float-left detallesCita" aria-label="Close"></i></td>'
                if (response.datos[index][1] == "ASIGNADA") {
                  citas += '<td><i idCita="' + response.datos[index][0] + '" class="bi bi-x-square-fill close manita float-left cancelarCita" aria-label="Close"></i></td>'
                }else if (response.datos[index][1] == "PENDIENTE"){
                  citas += '<td><i idCita="' + response.datos[index][0] + '" class="bi bi-x-square-fill close manita float-left cancelarCita" aria-label="Close"></i></td>'
                }else{
                  citas += '<td></td>'
                }
                if (response.datos[index][1] == "FINALIZADA") {
                  citas += '<td><i idCita="' + response.datos[index][0] + '" class="bi bi-chat-square-text-fill close manita float-left comentarCita" data-toggle="modal" data-target="#modalComentarCita" aria-label="Close"></i></td>'
                }else{
                  citas += '<td></td>'
                }
                citas += '</tr>'
              }
              $("#tblCitasPacintes").html(citas);
              showMensaje("#msgPanel", "Ok");
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

  $(document).on('click', "#scSolicitar", function() {
    if ($("#scMedico").val() == 0) { 
      $("#msgSolicitar #mensajeFail").text("Hay campos necesarios sin rellenar");
        showMensaje("#msgSolicitar", "Fail");
    }else{
      $.ajax({
        url: '/solicitarCita', 
        data: { medi : $("#scMedico").val(),
                fechaHora : $("#scFecha").val() + " " + $("#scHora").val() + ":00",
                deta : $("#scDetalles").val()},
        type: 'post',
        success: function(response) { 
          if (response.status == "OK") {
            $("#msgPanel #mensajeOk").text("Ahora falta a que te acepten la cita pendiente, se te dará un aviso por correo");
            $('#modalSolicitarCita').modal('hide');
            showMensaje("#msgPanel", "Ok");
            location.reload();
          }else if(response.status == "FAIL"){
            $("#msgSolicitar #mensajeFail").text(response.msg);
            showMensaje("#msgSolicitar", "Fail");
          }
        },
        error: function(error) {
          console.log(error)
          showMensaje("#msgSolicitar", "Server");
        }
    });
  return false;
    }
});

$(document).on('click', "#pnlSolicitarCita", function() {
  $.ajax({
        url: '/cargarEspecialidadesSolicitarCita',
        type: 'post', 
        success: function(response) { 
          if (response.status == "OK") {
            var especialidades = "<option value='0'>--Seleccionar--</option>";
            $("#msgSolicitarCita #mensajeOk").text(response.msg);
            for (let index = 0; index < response.datos.length; index++) {
              especialidades += "<option value='" + response.datos[index][0] + "'>" + response.datos[index][1] + "</option>"
            }
            $("#scEspecialidad").html(especialidades);
            $('#modalSolicitarCita').modal('show');
            showMensaje("#msgSolicitarCita", "Ok");
          }else if(response.status == "FAIL"){
            $("#msgSolicitarCita #mensajeFail").text(response.msg);
            showMensaje("#msgSolicitarCita", "Fail");
          }
        },
        error: function(error) {
          console.log(error)
          showMensaje("#msgSolicitarCita", "Server");
        }
    });
  return false;
});

$(document).on('click', ".cancelarCitaBoton", function() {
  $.ajax({
        url: '/cancelarCita',
        data: { cita :  $(this).attr("idcita")},
        type: 'post', 
        success: function(response) { 
          if (response.status == "OK") {
            $("#msgPanel #mensajeOk").text("La cita fue cancelada con exito");
            $('#modalCancelarCita').modal('show');
            showMensaje("#msgPanel", "Ok");
            location.reload();
          }else if(response.status == "FAIL"){
            $("#msgCancelarCita #mensajeFail").text(response.msg);
            showMensaje("#msgCancelarCita", "Fail");
          }
        },
        error: function(error) {
          console.log(error)
          showMensaje("#msgCancelarCita", "Server");
        }
    });
  return false;
});


$(document).on('click', ".cancelarCita", function() {
  $(".cancelarCitaBoton").attr("idcita", $(this).attr("idcita"));
  $('#modalCancelarCita').modal('show');
  return false;
});

$('#scEspecialidad').on('change', function() {
  $.ajax({
    url: '/cargarMedicosSolicitarCita',
    data: { espe : this.value},
    type: 'post', 
    success: function(response) {   
      if (response.status == "OK") {
        var medicos = "<option value='0'>--Seleccionar--</option>";
        $("#msgSolicitarCita #mensajeOk").text("Ahora seleccione el medico");
        for (let index = 0; index < response.datos.length; index++) {
          medicos += "<option value='" + response.datos[index][0] + "'>" + response.datos[index][1] + "</option>"
        }
        $("#scMedico").html(medicos);
        showMensaje("#msgSolicitarCita", "Ok");
        $("#scMedico").removeAttr('disabled');
      }else if(response.status == "FAIL"){
        $("#msgSolicitarCita #mensajeFail").text(response.msg);
        showMensaje("#msgSolicitarCita", "Fail");
      }
    },
    error: function(error) {
      console.log(error)
      showMensaje("#msgSolicitarCita", "Server");
    }
});
return false;
});

});

document.write(`

<div class="modal fade" id="modalComentarCita" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modalHead">
        COMENTAR CITA<i class="bi bi-x-circle-fill close manita" data-dismiss="modal" aria-label="Close"></i>
      </div>
      <div class="modal-body">
        <form>
          <fieldset>
            <div class="form-group">
              <label for="ccComentarioMedico">Comentario del medico</label>
              <textarea id="ccComentarioMedico" class="form-control" rows="2" placeholder="Califica la cita como te pareció." disabled></textarea>
            </div>
            <div class="form-group">
              <label for="ccComentarioPaciente">Comentario del paciente</label>
              <textarea id="ccComentarioPaciente" class="form-control" rows="2" placeholder=""></textarea>
            </div>
          </fieldset>
        </form>
      </div>
      <div class="modal-footer modalFoot" align="center">
        <div id="msgComentarCita"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button id="ccComentar" type="button" class="btn btn-verde">COMENTAR</button>
      </div>
    </div>
  </div>
</div>

`);
