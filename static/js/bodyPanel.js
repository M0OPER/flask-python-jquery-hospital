document.write(`

<!-- Modal Detalles Cita-->
<div class="modal fade" id="modalDetallesCita" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modalHead">
        DETALLES CITA #1<i class="bi bi-x-circle-fill close manita" data-dismiss="modal" aria-label="Close"></i>
      </div>
      <div class="modal-body">
        <form>
          <fieldset disabled>
            <div class="form-group">
              <label for="dti_paciente">Paciente</label>
              <input type="text" id="dti_paciente" class="form-control" placeholder="Marcos Fernández">
            </div>
            <div class="form-group">
              <label for="dti_medico">Médico</label>
              <input type="text" id="dti_medico" class="form-control" placeholder="Dra. Lucía Guzmán">
            </div>
            <div class="form-group">
              <label for="dti_fecha">Fecha</label>
              <input type="text" id="dti_fecha" class="form-control" placeholder="04/11/2021">
            </div>
            <div class="form-group">
              <label for="dti_hora">Hora</label>
              <input type="text" id="dti_hora" class="form-control" placeholder="10:50 a.m.">
            </div>
            <div class="form-group">
              <label for="dti_detalles">Detalles</label>
              <textarea id="dti_detalles" class="form-control" rows="2">
                Lorem ipsum dolor, sit, amet consectetur adipisicing elit. Autem sapiente voluptatem maiores dolores praesentium illum dolor esse"
              </textarea>
            </div>
          </fieldset>
        </form>
      </div>
      <div class="modal-footer modalFoot" align="center">
        <div id="msgIngresar"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button id="isIngresar" type="button" class="btn btn-verde">CANCELAR CITA</button>
      </div>
    </div>
  </div>
</div>

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
        <div id="msgIngresar"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button id="isIngresar" type="button" class="btn btn-verde">CANCELAR CITA</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Solicitar Cita-->
    <div class="modal fade" id="modalSolicitarCita" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modalHead">
        SOLICITAR CITA<i class="bi bi-x-circle-fill close manita" data-dismiss="modal" aria-label="Close"></i>
      </div>
      <div class="modal-body">
        <form>
          <fieldset>
            <div class="form-group">
              <label for="dti_paciente">Paciente</label>
              <input type="text" id="dti_paciente" class="form-control" placeholder="Marcos Fernández" disabled>
            </div>
            <div class="form-group">
              <label for="scEspecialidad">Especialidad</label>
              <select class="form-control text-white bg-dark manita" id="scEspecialidad">
                <option>ODONTOLOGOS</option>
                <option>CARDIOLOGOS</option>
                <option>PEDIATRAS</option>
               </select>
            </div>
            <div class="form-group">
              <label for="dti_medico">Médico</label>
              <select class="form-control text-white bg-dark manita" id="exampleFormControlSelect1">
                <option>MIGUEL PEREZ --</option>
                <option>JUANCHO JOSÉ</option>
                <option>MARIA BENITEZ</option>
               </select>
            </div>
            <div class="form-group">
              <label for="dti_fecha">Fecha</label>
              <input type="date" id="dti_fecha" class="form-control" placeholder="04/11/2021">
            </div>
            <div class="form-group">
              <label for="dti_detalles">Detalles</label>
              <textarea id="dti_detalles" class="form-control" rows="2">
                Lorem ipsum dolor, sit, amet consectetur adipisicing elit. Autem sapiente voluptatem maiores dolores praesentium illum dolor esse"
              </textarea>
            </div>
          </fieldset>
        </form>
      </div>
      <div class="modal-footer modalFoot" align="center">
        <div id="msgSolicitarr"><script type="text/javascript" src="../static/js/mensaje.js"></script></div>
        <button id="isIngresar" type="button" class="btn btn-verde">SOLICITAR CITA</button>
      </div>
    </div>
  </div>
</div>

`);
