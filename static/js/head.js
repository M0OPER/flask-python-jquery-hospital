document.write(`
  <!--HEAD-->
  <nav id="head" class="navbar navbar-expand-lg navbar-dark bg-primary">
  <button type="button" class="btn btn-light">HOSPITAL SIMON BOLIVAR</button>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <div class="btn-group" role="group" aria-label="Basic example">
  <a href="/inicio"><button type="button" class="btn btn-secondary active">INICIO</button></a>
  <a href="/panel"><button type="button" class="btn btn-light">PANEL</button></a>
  <a href="/contactos"><button type="button" class="btn btn-light">CONTACTOS</button></a>
  <a href="/servicios"><button type="button" class="btn btn-light">SERVICIOS</button></a>
</div>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <button id="btnIniciarSesion" type="button" class="btn btn-light" data-toggle="modal" data-target="#modalIniciarSesion">Iniciar sesion</button><a href="/usuario"><i class="bi bi-gear-fill close manita" aria-label="Close"></i></a>
    </form>
  </div>
</nav>
  <button id="welcome" type="button" class="btn btn-secondary btn-sm">EDWIN MONTES - PACIENTE</button>
`);