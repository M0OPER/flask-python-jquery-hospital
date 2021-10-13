  $(function() {
    $('#isIngresar').bind('click', function() {
      email    = $('input[id="isEmail"]').val();
      password = $('input[id="isPassword"]').val();
      $.ajax({
            url: '/iniciarSesion',
            data: { email    : email,
                    password : password },
            type: 'post',
            success: function(response) { 
              if (response.status == "OK") {
                $("#msgIngresar #mensajeOk").text(response.msg);
                $('#modalIniciarSesion').modal('show');
                showMensaje("#msgIngresar", "Ok");
                location.reload();
              }else if(response.status == "FAIL"){
                $("#msgRegistro #mensajeFail").text(response.msg);
                showMensaje("#msgRegistro", "Fail");
              }
            },
            error: function(error) {
              console.log(error)
              showMensaje("#msgIngresar", "Server");
            }
        });
      return false;
    });

    $('#csCerrarSesion').bind('', function() {
      $.ajax({
            url: '/cerrarSesion',
            type: 'post',
            success: function(response) {
              console.log("Sesion finalizada");
            },
            error: function(error) {
              console.log(error)
            }
        });
      return false;
    });

  });

document.write(`

    <!-- Modal Iniciar sesion-->
    <div class="modal fade" id="modalIniciarSesion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modalHead">
      	Inicio de sesion<i class="bi bi-x-circle-fill close manita" data-dismiss="modal" aria-label="Close"></i>
      </div>
      <div class="modal-body">
        <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Usuario</label>
    <input id="isEmail" type="email" class="form-control"  aria-describedby="emailHelp">
    
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Contraseña</label>
    <input id="isPassword" type="password" class="form-control">
    <small id="emailHelp" class="form-text text-muted">Por favor no comparta su contraseña con nadie...</small>
  </div>
  <div class="form-group form-check">
  	<div><a href="/registro">¿No se ha registrado en el sistema?</a></div>
  	<div><a href="">¿Olvidó su contraseña?</a></div>    
  </div>
</form>
      </div>
      <div class="modal-footer modalFoot" align="center">
        <div id="msgIngresar"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button id="isIngresar" type="button" class="btn btn-verde">INGRESAR</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Cancelar Cita-->
    <div class="modal fade" id="modalCancelarCita" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modalHead">
        Cancelar cita #1<i class="bi bi-x-circle-fill close manita" data-dismiss="modal" aria-label="Close"></i>
      </div>
      <div class="modal-body">
        <form>
  <div class="form-group">
    <label for="exampleInputEmail1">¿Está seguro de cancelar la cita?</label>
    
  </div>
</form>
      </div>
      <div class="modal-footer modalFoot" align="center">
        <div id="msgIngresar"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button id="isIngresar" type="button" class="btn btn-verde">CANCELAR CITA</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Detalles Cita-->
    <div class="modal fade" id="modalDetallesCita" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modalHead">
        Detalles cita #1<i class="bi bi-x-circle-fill close manita" data-dismiss="modal" aria-label="Close"></i>
      </div>
      <div class="modal-body">
        <form>
          <fieldset disabled>
            <div class="form-group">
              <label for="dti_paciente">Paciente</label>
              <input type="text" id="dti_paciente" class="form-control" placeholder="Marcos Fernández">
            </div>
            <div class="form-group">
              <label for="dti_medico">Médico</label>
              <input type="text" id="dti_medico" class="form-control" placeholder="Dra. Lucía Guzmán">
            </div>
            <div class="form-group">
              <label for="dti_fecha">Fecha</label>
              <input type="text" id="dti_fecha" class="form-control" placeholder="04/11/2021">
            </div>
            <div class="form-group">
              <label for="dti_hora">Hora</label>
              <input type="text" id="dti_hora" class="form-control" placeholder="10:50 a.m.">
            </div>
            <div class="form-group">
              <label for="dti_detalles">Detalles</label>
              <textarea id="dti_detalles" class="form-control" rows="2">
                Lorem ipsum dolor, sit, amet consectetur adipisicing elit. Autem sapiente voluptatem maiores dolores praesentium illum dolor esse"
              </textarea>
            </div>
          </fieldset>
        </form>
      </div>
      <div class="modal-footer modalFoot" align="center">
        <div id="msgIngresar"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button id="isIngresar" type="button" class="btn btn-verde">CANCELAR CITA</button>
      </div>
    </div>
  </div>
</div>

`);

function showMensaje(id, tip) {
        $(id + " #mensaje" + tip).fadeIn(); setTimeout(function() {
        $(id + " #mensaje" + tip).fadeOut();
        },2500);
      }
      
$(document).ready(function(){
  
});