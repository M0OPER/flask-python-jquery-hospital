$(function() {

  $(document).on('click', "#detallesCita", function() {
      $.ajax({
            url: '/detallesCitaPaciente',
            data: { idCita : $(this).attr('idCita')},
            type: 'post', 
            success: function(response) { 
              if (response.status == "OK") {
                $("#msgDetallesCita #mensajeOk").text(response.msg);
                $("#dcPaciente").val(response.datos[3] + " " + response.datos[4]);
                $("#dcMedico").val(response.datos[1] + " " + response.datos[2]);
                $('#modalDetallesCita').modal('show');
                showMensaje("#msgDetallesCita", "Ok");
              }else if(response.status == "FAIL"){
                $("#msgDetallesCita #mensajeFail").text(response.msg);
                showMensaje("#msgDetallesCita", "Fail");
              }
            },
            error: function(error) {
              console.log(error)
              showMensaje("#msgDetallesCita", "Server");
            }
        });
      return false;
  });

  $(document).on('click', "#scSolicitar", function() {
    $.ajax({
          url: '/solicitarCita',
          data: { medi : $("#scMedico").val(),
                  fechaHora : $("#scFecha").val() + " " + $("#scHora").val() + ":00",
                  deta : $("#scDetalles").val()},
          type: 'post', 
          success: function(response) { 
            if (response.status == "OK") {
              $("#msgPanel #mensajeOk").text("Ahora falta a que te acepten la cita pendiente, se te dará un aviso por correo");
              $('#modalSolicitarCita').modal('hide');
              showMensaje("#msgPanel", "Ok");
              location.reload();
            }else if(response.status == "FAIL"){
              $("#msgSolicitarCita #mensajeFail").text(response.msg);
              showMensaje("#msgSolicitarCita", "Fail");
            }
          },
          error: function(error) {
            console.log(error)
            showMensaje("#msgSolicitarCita", "Server");
          }
      });
    return false;
});

$(document).on('click', "#pnlSolicitarCita", function() {
  $.ajax({
        url: '/cargarEspecialidadesSolicitarCita',
        type: 'post', 
        success: function(response) { 
          if (response.status == "OK") {
            var especialidades = "<option value='0'>--Seleccionar--</option>";
            $("#msgSolicitarCita #mensajeOk").text(response.msg);
            for (let index = 0; index < response.datos.length; index++) {
              especialidades += "<option value='" + response.datos[index][0] + "'>" + response.datos[index][1] + "</option>"
            }
            $("#scEspecialidad").html(especialidades);
            $('#modalSolicitarCita').modal('show');
            showMensaje("#msgSolicitarCita", "Ok");
          }else if(response.status == "FAIL"){
            $("#msgSolicitarCita #mensajeFail").text(response.msg);
            showMensaje("#msgSolicitarCita", "Fail");
          }
        },
        error: function(error) {
          console.log(error)
          showMensaje("#msgSolicitarCita", "Server");
        }
    });
  return false;
});

$(document).on('click', ".cancelarCita", function() {
  $.ajax({
        url: '/cancelarCita',
        data: { cita :  $(this).attr("idcita")},
        type: 'post', 
        success: function(response) { 
          if (response.status == "OK") {
            $("#msgPanel #mensajeOk").text("La cita fue cancelada con exito");
            $('#modalCancelarCita').modal('show');
            showMensaje("#msgPanel", "Ok");
            location.reload();
          }else if(response.status == "FAIL"){
            $("#msgCancelarCita #mensajeFail").text(response.msg);
            showMensaje("#msgCancelarCita", "Fail");
          }
        },
        error: function(error) {
          console.log(error)
          showMensaje("#msgCancelarCita", "Server");
        }
    });
  return false;
});


$(document).on('click', "#cancelarCita", function() {
  $(".cancelarCita").attr("idcita", $(this).attr("idcita"));
  $('#modalCancelarCita').modal('show');
  return false;
});

$('#scEspecialidad').on('change', function() {
  $.ajax({
    url: '/cargarMedicosSolicitarCita',
    data: { espe : this.value},
    type: 'post', 
    success: function(response) {   
      if (response.status == "OK") {
        var medicos = "<option value='0'>--Seleccionar--</option>";
        $("#msgSolicitarCita #mensajeOk").text("Ahora seleccione el medico");
        for (let index = 0; index < response.datos.length; index++) {
          medicos += "<option value='" + response.datos[index][0] + "'>" + response.datos[index][1] + "</option>"
        }
        $("#scMedico").html(medicos);
        showMensaje("#msgSolicitarCita", "Ok");
        $("#scMedico").removeAttr('disabled');
      }else if(response.status == "FAIL"){
        $("#msgSolicitarCita #mensajeFail").text(response.msg);
        showMensaje("#msgSolicitarCita", "Fail");
      }
    },
    error: function(error) {
      console.log(error)
      showMensaje("#msgSolicitarCita", "Server");
    }
});
return false;
});

});
document.write(`



`);
