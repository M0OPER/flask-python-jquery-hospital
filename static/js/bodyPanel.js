document.write(`
<ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
  <li class="nav-item">
   <a class="nav-link active" id="citas-tab" data-toggle="tab" href="#citas" role="tab" aria-controls="citas" aria-selected="true">CITAS</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="medicos-tab" data-toggle="tab" href="#medicos" role="tab" aria-controls="medicos" aria-selected="false">MEDICOS</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="pacientes-tab" data-toggle="tab" href="#pacientes" role="tab" aria-controls="pacientes" aria-selected="false">PACIENTES</a>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="citas" role="tabpanel" aria-labelledby="citas-tab">
    <div class="modal-body">
      <div class="form-group">
        <div class="row">
          <div class="col-4">
            <input id="pnlBuscar" name="pnlBuscar" type="text" class="form-control" placeholder="BUSCAR CITAS...">
          </div>
          <div class="col-2">
            <select class="form-control text-white bg-dark manita" id="exampleFormControlSelect1">
           <option>Medicos</option>
           <option>Fecha</option>
           <option>Hora</option>
          </select>
          </div>
          <div class="col-2 ">
            <i class="bi bi-search close manita float-left" aria-label="Close"></i>
          </div>
        </div>
        <hr>
        <h6>LISTADO CITAS</h6>
        <hr>
        <div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">MEDICO</th>
                <th scope="col">FECHA</th>
                <th scope="col">HORA</th>
                <th scope="col">DETALLES</th>
                <th scope="col">EDITAR</th>
                <th scope="col">CANCELAR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>JUANCHO POLO GRACIAS</td>
                <td>12/12/2020</td>
                <td>12:00 PM</td>
                <td><i class="bi bi-eye-fill close manita float-left detalles" data-toggle="modal" data-target="#modalDetallesCita" aria-label="Close"></i></td>
                <td><i class="bi bi-pencil-fill close manita float-left editar" aria-label="Close"></i></td>
                <td><i class="bi bi-x-square-fill close manita float-left cancelar" data-toggle="modal" data-target="#modalCancelarCita" aria-label="Close"></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="tab-pane fade" id="medicos" role="tabpanel" aria-labelledby="medicos-tab">
    <div class="modal-body">
      <div class="form-group">
        <div class="row">
          <div class="col-4">
            <input id="pnlBuscar" name="pnlBuscar" type="text" class="form-control" placeholder="BUSCAR MEDICOS...">
          </div>
          <div class="col-2 ">
            <i class="bi bi-search close manita float-left" aria-label="Close"></i>
          </div>
        </div>
        <hr>
        <h6>LISTADO MEDICOS</h6>
        <hr>
        <div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">NOMBRES</th>
                <th scope="col">CEDULA</th>
                <th scope="col">CITAS ASIGNADAS</th>
                <th scope="col">DETALLES</th>
                <th scope="col">EDITAR</th>
                <th scope="col">BLOQUEAR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>JUANCHO POLO GRACIAS</td>
                <td>12/12/2020</td>
                <td>12:00 PM</td>
                <td><i class="bi bi-eye-fill close manita float-left" aria-label="Close"></i></td>
                <td><i class="bi bi-pencil-fill close manita float-left" aria-label="Close"></i></td>
                <td><i class="bi bi-x-square-fill close manita float-left" aria-label="Close"></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="tab-pane fade" id="pacientes" role="tabpanel" aria-labelledby="pacientes-tab">
    <div class="modal-body">
      <div class="form-group">
        <div class="row">
          <div class="col-4">
            <input id="pnlBuscar" name="pnlBuscar" type="text" class="form-control" placeholder="BUSCAR PACIENTES...">
          </div>
          <div class="col-2 ">
            <i class="bi bi-search close manita float-left" aria-label="Close"></i>
          </div>
        </div>
        <hr>
        <h6>LISTADO PACIENTES</h6>
        <hr>
        <div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">NOMBRES</th>
                <th scope="col">CEDULA</th>
                <th scope="col">CITAS ASIGNADAS</th>
                <th scope="col">DETALLES</th>
                <th scope="col">EDITAR</th>
                <th scope="col">BLOQUEAR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>JUANCHO POLO GRACIAS</td>
                <td>12/12/2020</td>
                <td>12:00 PM</td>
                <td><i class="bi bi-eye-fill close manita float-left" aria-label="Close"></i></td>
                <td><i class="bi bi-pencil-fill close manita float-left" aria-label="Close"></i></td>
                <td><i class="bi bi-x-square-fill close manita float-left" aria-label="Close"></i></td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td><i class="bi bi-eye-fill close manita float-left" aria-label="Close"></i></td>
                <td><i class="bi bi-pencil-fill close manita float-left" aria-label="Close"></i></td>
                <td><i class="bi bi-x-square-fill close manita float-left" aria-label="Close"></i></td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                <td><i class="bi bi-eye-fill close manita float-left" aria-label="Close"></i></td>
                <td><i class="bi bi-pencil-fill close manita float-left" aria-label="Close"></i></td>
                <td><i class="bi bi-x-square-fill close manita float-left" aria-label="Close"></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

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
