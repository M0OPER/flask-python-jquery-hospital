$(function() {

  $(document).on('keyup', "#pnlBuscarCitasMedicos", function() {
    $.ajax({
          url: '/listarCitasMedicos',
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
                if (response.datos[index][1] == "PENDIENTE"){
                  citas += '<td><i idCita="' + response.datos[index][0] + '" class="bi bi-question-square-fill close manita float-left aceptarCita" aria-label="Close"></i></td>'
                }else{
                  citas += '<td></td>'
                }
                if (response.datos[index][1] == "ASIGNADA") {
                  citas += '<td><i idCita="' + response.datos[index][0] + '" name="{% print(datos[2]) %}" class="bi bi-arrow-up-right-square-fill close manita float-left atenderCita" aria-label="Close"></i></td>'
                }else{
                  citas += '<td></td>'
                }
                if (response.datos[index][1] == "FINALIZADA") {
                  citas += '<td><i idCita="' + response.datos[index][0] + '" class="bi bi-chat-square-text-fill close manita float-left comentarCita" aria-label="Close"></i></td>'
                }else{
                  citas += '<td></td>'
                }
                citas += '</tr>'
              }
              $("#tblCitasMedicos").html(citas);
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

  $(document).on('click', "#acEnviar", function() {
      $.ajax({
            url: '/atenderCita',
            data: { cita  : $(this).attr('idcita'),
                    hist : $("#acHistoria").val()},
            type: 'post', 
            success: function(response) { 
              if (response.status == "OK") {
                $("#msgPanel #mensajeOk").text(response.msg);
                showMensaje("#msgPanel", "Ok");
                location.reload();
              }else if(response.status == "FAIL"){
                $("#msgAtenderCita #mensajeFail").text(response.msg);
                showMensaje("#msgAtenderCita", "Fail");
              }
            },
            error: function(error) {
              console.log(error)
              showMensaje("#msgAtenderCita", "Server");
            }
        });
      return false;
  });

  $(document).on('click', ".atenderCita", function() {
    $("#acPaciente").val($(this).attr("name"));
    $("#acEnviar").attr("idcita", $(this).attr("idcita"));
    $('#modalAtenderCita').modal('show');
    return false;
  });

});
document.write(`

<div class="modal fade" id="modalAtenderCita" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modalHead">
        ATENDER CITA<i class="bi bi-x-circle-fill close manita" data-dismiss="modal" aria-label="Close"></i>
      </div>
      <div class="modal-body">
        <form>
          <fieldset>
            <div class="form-group">
              <label for="acPaciente">Paciente</label>
              <input type="text" id="acPaciente" class="form-control" disabled>
            </div>
            <div class="form-group">
              <label for="acHistoria">Detalles/Hisotria clinica</label>
              <textarea id="acHistoria" class="form-control" rows="2">
              </textarea>
            </div>
          </fieldset>
        </form>
      </div>
      <div class="modal-footer modalFoot" align="center">
        <div id="msgAtenderCita"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button id="acEnviar" type="button" class="btn btn-verde">ENVIAR</button>
      </div>
    </div>
  </div>
</div>

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
              <textarea id="ccComentarioMedico" class="form-control" rows="2" placeholder="Califica la cita como te pareció."></textarea>
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
