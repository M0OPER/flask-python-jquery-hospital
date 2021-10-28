  $(function() {

    $('#regRegistrar').bind('click', function() {
      if ($("#regNombres").val() == "" || $("#regApellidos").val() == "" || $("#regNumeroDocumento").val() == "" || $("#regEmail").val() == "" || $("#regTelefono").val() == "" || $("#regDireccion").val() == "" || $("#regPassword1").val() == "" || $("#regPassword2").val() == "") {
        $("#msgRegistro #mensajeFail").text("Hay campos necesarios sin rellenar");
          showMensaje("#msgRegistro", "Fail");
      }else{
      $.ajax({
            url: '/registrarUsuario',
            data: { nomb : $("#regNombres").val(),
                    apel : $("#regApellidos").val(),
                    //tipd : tipDocumento,
                    numd : $("#regNumeroDocumento").val(),
                    emai : $("#regEmail").val(),
                    tele : $("#regTelefono").val(),
                    dire : $("#regDireccion").val(),
                    pass : $("#regPassword2").val()},
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
      }
      return false;
    });

    $("#regPassword1, #regPassword2").keyup(function(event){
      $("#msgRegistro #mensajeFail").text("Las contraseñas no coinciden");
      if ($('input[id="regPassword1"]').val().length > 7 && $('input[id="regPassword2"]').val().length > 7) {
        if ($('input[id="regPassword1"]').val() != $('input[id="regPassword2"]').val()) {
          showMensaje("#msgRegistro", "Fail");
          $("#regRegistrar").attr("disabled", true);
        }else{
          $("#msgRegistro #mensajeOk").text("Las contraseñas  coinciden!");
          showMensaje("#msgRegistro", "Ok");
          $('button[id="regRegistrar"]').removeAttr('disabled');
        }
      }
    }); 

  });
