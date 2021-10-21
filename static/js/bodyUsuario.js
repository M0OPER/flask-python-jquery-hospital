document.write(`

<!-- Modal Modificar Contraseña-->
<div class="modal fade" id="modalModificarPassword" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modalHead">
      	MODIFICAR CONTRASEÑA<i class="bi bi-x-circle-fill close manita" data-dismiss="modal" aria-label="Close"></i>
      </div>
      <div class="modal-body">
        <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Contraseña actual</label>
    <input id="isEmail" type="password" class="form-control"  aria-describedby="emailHelp">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Contraseña nueva</label>
    <input id="isEmail" type="password" class="form-control"  aria-describedby="emailHelp">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Confirma tu contraseña nueva</label>
    <input id="isEmail" type="password" class="form-control"  aria-describedby="emailHelp">
  </div>
</form>
      </div>
      <div class="modal-footer modalFoot" align="center">
        <div id="msgIngresar"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button id="isIngresar" type="button" class="btn btn-verde">GUARDAR CAMBIOS</button>
      </div>
    </div>
  </div>
</div>

`);
