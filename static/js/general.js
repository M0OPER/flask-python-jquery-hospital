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
                window.location.href = '/panel';
              }else if(response.status == "FAIL"){
                $("#msgIngresar #mensajeFail").text(response.msg);
                showMensaje("#msgIngresar", "Fail");
              }
            },
            error: function(error) {
              console.log(error)
              showMensaje("#msgIngresar", "Server");
            }
        });
      return false;
    });

    $('#csCerrarSesion').bind('click', function() {
      $.ajax({
            url: '/cerrarSesion',
            type: 'post',
            success: function(response) {
              location.reload();
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
      	INICIO DE SESION<i class="bi bi-x-circle-fill close manita" data-dismiss="modal" aria-label="Close"></i>
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
  	<div><a href="/recuperar_password">¿Olvidó su contraseña?</a></div>    
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

`);

function showMensaje(id, tip) {
        $(id + " #mensaje" + tip).fadeIn(); setTimeout(function() {
        $(id + " #mensaje" + tip).fadeOut();
        },2500);
      }
      
$(document).ready(function(){
  
});