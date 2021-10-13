document.write(`

  <!-- Mensaje (informacion, error, warigning) -->
  
  <div id="mensajeOk" class="alert alert-success collapse" role="alert"></div>

  <div id="mensajeFail" class="alert alert-warning collapse" role="alert"></div>

  <div id="mensajeServer" class="alert alert-danger collapse" role="alert">
    <h4 class="alert-heading">Error dentro del servidor!</h4>
		<p>Contacte con el administrador.</p>
		<hr>
		<p class="mb-0">Reintentelo mas tarde.</p>
  </div>

`);