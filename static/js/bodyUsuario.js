document.write(`
  <div class="modal-body" >
   <h4>MIS DATOS PERSONALES</h4>
   <hr>
       <form>

        <div class="form-group">
         <div class="row">
         <div class="col">
          <label for="exampleInputPassword1">Nombres</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="">
         </div>
         <div class="col">
          <label for="exampleInputPassword1">Apellidos</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="">
         </div>
        </div>
        </div>

        <div class="form-group">
         <div class="row">
         <div class="col">
          <label for="exampleInputPassword1">Tipo de documento</label>
    <select class="form-control" id="exampleFormControlSelect1" disabled>
           <option>Cedula</option>
           <option>Cedula</option>
           <option>Tarjeta de identidad</option>
           <option>4</option>
           <option>5</option>
          </select>
         </div>
         <div class="col">
          <label for="exampleInputPassword1">Numero documento</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="" disabled value="">
         </div>
        </div>
        </div>

        <div class="form-group">
         <div class="row">
         <div class="col">
          <label for="exampleInputPassword1">Telefono</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="">
         </div>
         <div class="col">
          <label for="exampleInputPassword1">Direccion</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="">
         </div>
        </div>
        </div>

        <div class="form-group">
         <div class="row">
         <div class="col">
          <label for="exampleInputPassword1">Fecha de nacimiento</label>
    <input type="date" class="form-control" id="exampleInputPassword1" placeholder="">
         </div>
         <div class="col">
          <label for="exampleInputPassword1">Sexo</label>
          <div>
    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
  <label class="form-check-label" for="exampleRadios1">
    Masculino
  </label>
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
  <label class="form-check-label" for="exampleRadios1">
    Femenino
  </label>
  </div>
         </div>
        </div>
        </div>

        <div class="form-group">
         <div class="row">
         <div class="col">
          <label for="exampleInputPassword1">Correo electronico</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="">
         </div>
         <div class="col">
          <label for="exampleInputPassword1">Contraseña actual</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="">
         </div>
         <div class="col">
          <label for="exampleInputPassword1">&nbsp</label>
          <div><button type="button" class="btn btn-verde">CAMBIA TU CONTRASEÑA</button></div>
         </div>
        </div>
        </div>

       </form>
</div>
`);
