$(function() {

  $(document).on('keyup', "#pnlBuscarCitasAdministradores", function() {
    $.ajax({
          url: '/listarCitasAdministradores',
          data: { text : $(this).val(),
                  sele : $("#pnlBuscarSeleccionCitas").val() },
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
  });

});