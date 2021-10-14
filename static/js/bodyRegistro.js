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
