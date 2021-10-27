$(function() {

  function listarCitasAdministradores(texto, seleccion) {
    $.ajax({
      url: '/listarCitasAdministradores',
      data: { text : texto,
              sele : seleccion },
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
            <td>' + response.datos[index][4] + '</td> \
            <td><i idCita="' + response.datos[index][0] + '" class="bi bi-eye-fill close manita float-left detallesCita" aria-label="Close"></i></td>'
            if (response.datos[index][1] == "PENDIENTE") {
              citas += '<td><i idCita="' + response.datos[index][0] + '" class="bi bi-question-square-fill close manita float-left aceptarCita" aria-label="Close"></i></td>'
            }else{
              citas += '<td></td>'
            }
            citas += '</tr>'
          }
          $("#tblCitasAdministradores").html(citas);
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
  }

  function listarMedicosAdministradores(texto, seleccion) {
    $.ajax({
      url: '/listarMedicosAdministradores',
      data: { text : texto,
              sele : seleccion },
      type: 'post', 
      success: function(response) {
        if (response.status == "OK") {
          var medicos = "";
          $("#msgPanel #mensajeOk").text(response.msg);
          for (let index = 0; index < response.datos.length; index++) {
            medicos += '<tr> \
            <th scope="row">' + (index + 1)  + '</th> \
            <td>' + response.datos[index][1] + '</td> \
            <td>' + response.datos[index][2] + '</td> \
            <td>' + response.datos[index][3] + '</td> \
            <td><i idusuario="' + response.datos[index][0] + '" class="bi bi-eye-fill close manita float-left detallesUsuario" aria-label="Close"></i></td>'
            if (response.datos[index][4] == 10) {
              medicos += '<td><i idusuario="' + response.datos[index][0] + '" class="bi bi-lock-fill close manita float-left bloquearUsuario" aria-label="Close"></i></td>'
            }else if(response.datos[index][4] == 9){
              medicos += '<td><i idusuario="' + response.datos[index][0] + '" class="bi bi-unlock-fill close manita float-left desbloquearUsuario" aria-label="Close"></i></td>'
            }
            medicos += '</tr>'
          }
          $("#tblMedicosAdministradores").html(medicos);
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
  }

  function listarPacientesAdministradores(texto, seleccion) {
    $.ajax({
      url: '/listarPacientesAdministradores',
      data: { text : texto,
              sele : seleccion },
      type: 'post', 
      success: function(response) {
        if (response.status == "OK") {
          var pacientes = "";
          $("#msgPanel #mensajeOk").text(response.msg);
          for (let index = 0; index < response.datos.length; index++) {
            pacientes += '<tr> \
            <th scope="row">' + (index + 1)  + '</th> \
            <td>' + response.datos[index][1] + '</td> \
            <td>' + response.datos[index][2] + '</td> \
            <td>' + response.datos[index][3] + '</td> \
            <td><i idusuario="' + response.datos[index][0] + '" class="bi bi-eye-fill close manita float-left detallesUsuario" aria-label="Close"></i></td>'
            if (response.datos[index][4] == 10) {
              pacientes += '<td><i idusuario="' + response.datos[index][0] + '" class="bi bi-lock-fill close manita float-left bloquearUsuario" aria-label="Close"></i></td>'
            }else if(response.datos[index][4] == 9){
              pacientes += '<td><i idusuario="' + response.datos[index][0] + '" class="bi bi-unlock-fill close manita float-left desbloquearUsuario" aria-label="Close"></i></td>'
            }
            pacientes += '</tr>'
          }
          $("#tblPacientesAdministradores").html(pacientes);
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
  }
  
  $(document).on('click', ".detallesUsuario", function() {
    $.ajax({
          url: '/detallesUsuario',
          data: { id   : $(this).attr("idusuario"),
                  rol  : $(this).attr("rol"),
                  usua : $(this).attr("usuario")},
          type: 'post', 
          success: function(response) { 
            if (response.status == "OK") {
              $("#msgDetallesUsuario #mensajeOk").text(response.msg);
              $('#msgDetallesUsuario').modal('show');
              showMensaje("#msgDetallesUsuario", "Fail");
            }else if(response.status == "FAIL"){
              $("#msgDetallesUsuario #mensajeFail").text(response.msg);
              showMensaje("#msgDetallesUsuario", "Fail");
            }
          },
          error: function(error) {
            console.log(error)
            showMensaje("#msgDetallesUsuario", "Server");
          }
      });
    return false;
  });

  $(document).on('keyup', "#pnlBuscarCitasAdministradores", function() {
    listarCitasAdministradores( $(this).val(), $("#pnlBuscarSeleccionCitas").val());
  });

  $(document).on('keyup', "#pnlBuscarMedicosAdministradores", function() {
    listarMedicosAdministradores($(this).val(), $("#pnlBuscarSeleccionMedicos").val());
  });

  $(document).on('keyup', "#pnlBuscarPacientesAdministradores", function() {
    listarPacientesAdministradores($(this).val(), $("#pnlBuscarSeleccionPacientes").val());
  });

  $(document).on('click', ".detallesUsuario", function() {
    $("#detallesUsuario").attr("idusuario", $(this).attr("idusuario"));
    $('#modalDetallesUsuario').modal('show');
    return false;
  });

  $(document).on('click', ".bloquearUsuario", function() {
    $("#bloquearUsuario").attr("idusuario", $(this).attr("idusuario"));
    $('#modalBloquearUsuario').modal('show');
    return false;
  });

  $(document).on('click', "#bloquearUsuario", function() {
    $.ajax({
          url: '/bloquearUsuario',
          data: { usua :  $(this).attr("idusuario")},
          type: 'post', 
          success: function(response) { 
            if (response.status == "OK") {
              $('#modalBloquearUsuario').modal('hide');
              listarMedicosAdministradores("", "med_nombres");
              listarPacientesAdministradores("", "pac_nombres");
            }else if(response.status == "FAIL"){
              $("#msgBloquearUsuario #mensajeFail").text(response.msg);
              showMensaje("#msgBloquearUsuario", "Fail");
            }
          },
          error: function(error) {
            console.log(error)
            showMensaje("#msgBloquearUsuario", "Server");
          }
      });
    return false;
  });

  $(document).on('click', ".desbloquearUsuario", function() {
    $("#desbloquearUsuario").attr("idusuario", $(this).attr("idusuario"));
    $('#modalDesbloquearUsuario').modal('show');
    return false;
  });

  $(document).on('click', "#desbloquearUsuario", function() {
    $.ajax({
          url: '/desbloquearUsuario',
          data: { usua :  $(this).attr("idusuario")},
          type: 'post', 
          success: function(response) { 
            if (response.status == "OK") {
              $('#modalDesbloquearUsuario').modal('hide');
              listarMedicosAdministradores("", "med_nombres");
              listarPacientesAdministradores("", "pac_nombres");
            }else if(response.status == "FAIL"){
              $("#msgBloquearUsuario #mensajeFail").text(response.msg);
              showMensaje("#msgBloquearUsuario", "Fail");
            }
          },
          error: function(error) {
            console.log(error)
            showMensaje("#msgBloquearUsuario", "Server");
          }
      });
    return false;
  });

});

document.write(`

<div class="modal fade" id="modalBloquearUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modalHead">
        BLOQUEAR USUARIO<i class="bi bi-x-circle-fill close manita" data-dismiss="modal" aria-label="Close"></i>
      </div>
      <div class="modal-body">
      <form>
     <h6>ADVERTENCIA</h6><hr>
      <div class="form-group">
        <label>Se bloqueará el acceso al sistema de este usuario.</label>
      </div>
    </form>
      </div>
      <div class="modal-footer modalFoot" align="center">
        <div id="msgBloquearUsuario"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button idusuario="" id="bloquearUsuario" type="button" class="btn btn-danger">BLOQUEAR USUARIO</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modalDesbloquearUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modalHead">
        DESBLOQUEAR USUARIO<i class="bi bi-x-circle-fill close manita" data-dismiss="modal" aria-label="Close"></i>
      </div>
      <div class="modal-body">
      <form>
     <h6>ADVERTENCIA</h6><hr>
      <div class="form-group">
        <label>Se desbloqueará el acceso al sistema de este usuario.</label>
      </div>
    </form>
      </div>
      <div class="modal-footer modalFoot" align="center">
        <div id="msgDesbloquearUsuario"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button idusuario="" id="desbloquearUsuario" type="button" class="btn btn-warning">DESBLOQUEAR USUARIO</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Detalles Usuario-->
<div class="modal fade" id="modalDetallesUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header modalHead">
        DETALLES USUARIO<i class="bi bi-x-circle-fill close manita" data-dismiss="modal" aria-label="Close"></i>
      </div>
      <div class="modal-body">
        <form>
          <fieldset disabled>

            <div class="form-group">
              <div class="row">
                <div class="col">
                  <label for="detNombres">Nombres</label>
              <input type="text" id="detNombres" class="form-control" disabled>
                </div>
                <div class="col">
                  <label for="detApellidos">Apellidos</label>
              <input type="text" id="detApellidos" class="form-control" disabled>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <div class="col">
                  <label for="detTipoIdentificacion">Tipo identificacion</label>
              <input type="text" id="detTipoIdentificacion" class="form-control" disabled>
                </div>
                <div class="col">
                  <label for="detNumeroIdentificacion">N° Identificacion</label>
              <input type="text" id="detNumeroIdentificacion" class="form-control" disabled>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <div class="col">
                  <label for="detTelefono">Telefono</label>
              <input type="text" id="detTelefono" class="form-control" disabled>
                </div>
                <div class="col">
                  <label for="detDireccion">Direccion</label>
              <input type="text" id="detDireccion" class="form-control" disabled>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <div class="col">
                  <label for="detEdad">Edad</label>
              <input type="text" id="detEdad" class="form-control" disabled>
                </div>
                <div class="col">
                  <label for="detSexo">Sexo</label>
              <input type="text" id="detSexo" class="form-control" disabled>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <div class="col">
                  <label for="detCorreo">Correo electronico</label>
              <input type="text" id="detCorreo" class="form-control" disabled>
                </div>
                <div class="col">
                  <label for="detFechaNacimiento">Fecha nacimiento</label>
              <input type="text" id="detFechaNacimiento" class="form-control" disabled>
                </div>
              </div>
            </div>

          </fieldset>
        </form>
      </div>
      <div class="modal-footer modalFoot" align="center">
        <div id="msgDetallesUsuario"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
      </div>
    </div>
  </div>
</div>

`);
