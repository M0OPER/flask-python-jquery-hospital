  $(function() {
    $('#registrar').bind('click', function() {
      a = $('input[name="email"]').val();
      b = $('input[name="password"]').val();
      $.ajax({
            url: '/registrarUsuario',
            data: { email    : a,
                    password : b },
            type: 'post',
            success: function(response) {
              if (response.status == "OK") {
                $("#msgIngresar #mensajeOk").text(response.msg);
                $('#modalIniciarSesion').modal('show');
                showMensaje("#msgIngresar", "Ok");
              }else if(response.status == "FAIL"){
                $("#msgRegistro #mensajeFail").text(response.msg);
                showMensaje("#msgRegistro", "Fail");
              }
            },
            error: function(error) {
              console.log(error)
              showMensaje("#msgRegistro", "Server");
            }
        });
      return false;
    });
  });

document.write(`
  <div class="" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header modalHead">
        Registro al sistema
      </div>
      <div class="modal-body">

        <div class="form-group">
         <div class="row">
         <div class="col">
          <input id="nombres" name="nombres" type="text" class="form-control" placeholder="Nombres">
         </div>
         <div class="col">
          <input id="apellidos" name="apellidos" type="text" class="form-control" placeholder="Apellidos">
         </div>
        </div>
        </div>

        
        <div class="form-group">
        <div class="row">
         <div class="col">
          <select class="form-control" id="exampleFormControlSelect1">
           <option>--Tipo de documento--</option>
           <option>Cedula</option>
           <option>Tarjeta de identidad</option>
           <option>4</option>
           <option>5</option>
          </select>
         </div>
         <div class="col">
          <input type="number" class="form-control" placeholder="Numero de documento">
         </div>
        </div>
       </div>

       <div class="form-group">
        <div class="row">
         <div class="col">
          <input id="email" name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Correo electronico">
    <small id="emailHelp" class="form-text text-muted">No compartiremos tu correo con nadie más.</small>
         </div>
        </div>
       </div>

       <div class="form-group">
        <div class="row">
         <div class="col">
          <input type="number" class="form-control" placeholder="Telefono">
         </div>
         <div class="col">
          <input type="text" class="form-control" placeholder="Direccion">
         </div>
        </div>
       </div>

       <div class="form-group">
        <div class="row">
         <div class="col">
          <input type="password" class="form-control" placeholder="Contraseña">
         </div>
         <div class="col">
          <input id="password" name="password" type="password" class="form-control" placeholder="Confirma contraseña">
         </div>
        </div>
       </div>

       
      </div>
      <div class="modal-footer modalFoot" align="center">
       <div id="msgRegistro"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button id="registrar" type="" class="btn btn-verde">ENVIAR REGISTRO</button>
      </div>
    </div>
  </div>
</div>
`);
