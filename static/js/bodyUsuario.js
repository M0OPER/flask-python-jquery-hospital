$(function() {

  $('#duActualizar').bind('click', function() {
    if ($("#duNombres").val() == "" || $("#duApellidos").val() == "" || $("#duTelefono").val() == "" || $("#duDireccion").val() == "") {
      $("#msgUsuario #mensajeFail").text("Hay campos necesarios sin rellenar");
        showMensaje("#msgUsuario", "Fail");
    }else{
    $.ajax({
          url: '/actualizarUsuario',
          data: { nomb : $("#duNombres").val(),
                  apel : $("#duApellidos").val(),
                  tele : $("#duTelefono").val(),
                  dire : $("#duDireccion").val(),
                  fech : $("#duFechaNacimiento").val(),
                  edad : $("#duEdad").val(),
                  sexo : $("#duSexo").val()},
          type: 'post',
          success: function(response) {
            if (response.status == "OK") {
              $("#msgUsuario #mensajeOk").text(response.msg);
              showMensaje("#msgUsuario", "Ok");
            }else if(response.status == "FAIL"){
              $("#msgUsuario #mensajeFail").text(response.msg);
              showMensaje("#msgUsuario", "Fail");
            }
          },
          error: function(error) {
            console.log(error)
            showMensaje("#msgUsuario", "Server");
          }
      });
    }
    return false;
  });

  $('#mcCambiarPassword').bind('click', function() {
    if ($("#mcOld").val() == "" || $("#mcNew1").val() == "" || $("#mcNew2").val() == "") {
      $("#msgCambiarPassword #mensajeFail").text("Hay campos necesarios sin rellenar");
        showMensaje("#msgCambiarPassword", "Fail");
    }else if ($("#mcNew1").val() != $("#mcNew2").val()) {
      $("#msgCambiarPassword #mensajeFail").text("Las contraseñas no coinciden");
        showMensaje("#msgCambiarPassword", "Fail");
    }else{
    $.ajax({
          url: '/cambiarPassword',
          data: { old : $("#mcOld").val(),
                  new : $("#mcNew2").val()},
          type: 'post',
          success: function(response) {
            if (response.status == "OK") {
              $("#msgUsuario #mensajeOk").text(response.msg);
              $('#modalModificarPassword').modal('hide');
              showMensaje("#msgUsuario", "Ok");
            }else if(response.status == "FAIL"){
              $("#msgCambiarPassword #mensajeFail").text(response.msg);
              showMensaje("#msgCambiarPassword", "Fail");
            }
          },
          error: function(error) {
            console.log(error)
            showMensaje("#msgCambiarPassword", "Server");
          }
      });
    }
    return false;
  });

});
document.write(`

<!-- Modal Modificar Contraseña-->
<div class="modal fade" id="modalModificarPassword" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modalHead">
      	MODIFICAR CONTRASEÑA<i class="bi bi-x-circle-fill close manita" data-dismiss="modal" aria-label="Close"></i>
      </div>
      <div class="modal-body">
        <form>
  <div class="form-group">
    <label for="mcOld">Contraseña actual</label>
    <input id="mcOld" type="password" class="form-control"  aria-describedby="emailHelp">
  </div>
  <div class="form-group">
    <label for="mcNew1">Contraseña nueva</label>
    <input id="mcNew1" type="password" class="form-control"  aria-describedby="emailHelp">
  </div>
  <div class="form-group">
    <label for="mcNew2">Confirma tu contraseña nueva</label>
    <input id="mcNew2" type="password" class="form-control"  aria-describedby="emailHelp">
  </div>
</form>
      </div>
      <div class="modal-footer modalFoot" align="center">
        <div id="msgCambiarPassword"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button id="mcCambiarPassword" type="button" class="btn btn-verde">GUARDAR CAMBIOS</button>
      </div>
    </div>
  </div>
</div>

`);
