$(function() {

  $('#rcRecuperarPassword').bind('click', function() {
    if ($("#rcEmail").val() == "") {
      $("#msgRecuperarPassword #mensajeFail").text("Hay campos necesarios sin rellenar");
        showMensaje("#msgRecuperarPassword", "Fail");
    }else{
    $.ajax({
          url: '/recuperarPassword',
          data: { emai : $("#rcEmail").val()},
          type: 'post',
          success: function(response) {
            if (response.status == "OK") {
              $("#msgRecuperarPassword #mensajeOk").text(response.msg);
              showMensaje("#msgRecuperarPassword", "Ok");
            }else if(response.status == "FAIL"){
              $("#msgRecuperarPassword #mensajeOk").text(response.msg);
              showMensaje("#msgRecuperarPassword", "Ok");
            }
          },
          error: function(error) {
            $("#msgRecuperarPassword #mensajeOk").text(response.msg);
            showMensaje("#msgRecuperarPassword", "Ok");
          }
      });
    }
    return false;
  });

});

document.write(`

<div class="" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header modalHead">
        RECUPERACION DE CONTRASEÑA
      </div>
      <div class="modal-body">

       <div class="form-group">
        <div class="row">
         <div class="col">
          <input id="rcEmail" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Correo electronico">
    <small id="emailHelp" class="form-text text-muted">No compartiremos tu correo con nadie más.</small>
         </div>
        </div>
       </div>
       
      </div>
      <div class="modal-footer modalFoot" align="center">
       <div id="msgRecuperarPassword"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button id="rcRecuperarPassword" type="" class="btn btn-verde">ENVIAR CORREO DE RECUPERACION</button>
      </div>
    </div>
  </div>
</div>

`);