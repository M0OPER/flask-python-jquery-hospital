$(function() {

  $('#rcRestablecerPassword').bind('click', function() {
    if ($("#rcPassword1").val() == "" || $("#rcPassword2").val() == "" ) {
      $("#msgRestablecerPassword #mensajeFail").text("Hay campos necesarios sin rellenar");
        showMensaje("#msgRestablecerPassword", "Fail");
    }else if($("#rcPassword1").val() != $("#rcPassword2").val()){
      $("#msgRestablecerPassword #mensajeFail").text("Las contraseñas no coinciden");
      showMensaje("#msgRestablecerPassword", "Fail");
    }else{
    $.ajax({
          url: '/restablecerPassword',
          data: { pass : $("#rcPassword2").val(),
                  emai : $(this).attr("email"),
                  toke : $(this).attr("token")},
          type: 'post',
          success: function(response) {
            if (response.status == "OK") {
              $("#msgRestablecerPassword #mensajeOk").text(response.msg);
              $('#modalModificarPassword').modal('hide');
              showMensaje("#msgRestablecerPassword", "Ok");
            }else if(response.status == "FAIL"){
              $("#msgRestablecerPassword #mensajeFail").text(response.msg);
              showMensaje("#msgRestablecerPassword", "Ok");
            }
          },
          error: function(error) {
            console.log(error)
            showMensaje("#msgRestablecerPassword", "Ok");
          }
      });
    }
    return false;
  });

});
