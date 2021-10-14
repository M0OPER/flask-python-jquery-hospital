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
          <input id="email" name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Correo electronico">
    <small id="emailHelp" class="form-text text-muted">No compartiremos tu correo con nadie más.</small>
         </div>
        </div>
       </div>

       <div class="form-group">
        <div class="row">
         <div class="col">
          <input id="email" name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="identidadHelp" placeholder="Numero de identificacion">
    <small id="identidadHelp" class="form-text text-muted">El numero de identificacion asociado a su cuenta.</small>
         </div>
        </div>
       </div>

       
      </div>
      <div class="modal-footer modalFoot" align="center">
       <div id="msgRecuperacion"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button id="recuperacion" type="" class="btn btn-verde">ENVIAR CORREO DE RECUPERACION</button>
      </div>
    </div>
  </div>
</div>

`);