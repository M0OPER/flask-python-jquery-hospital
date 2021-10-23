document.write(`

<!-- Modal Cancelar Cita-->
<div class="modal fade" id="modalCancelarCita" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modalHead">
        CANCELAR CITA #1<i class="bi bi-x-circle-fill close manita" data-dismiss="modal" aria-label="Close"></i>
      </div>
      <div class="modal-body">
        <form>
  <div class="form-group">
    <label for="exampleInputEmail1">¿Está seguro de cancelar la cita?</label>
    
  </div>
</form>
      </div>
      <div class="modal-footer modalFoot" align="center">
        <div id="msgCancelarCita"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button idcita="" type="button" class="btn btn-verde cancelarCita">CANCELAR CITA</button>
      </div>
    </div>
  </div>
</div>

`);
