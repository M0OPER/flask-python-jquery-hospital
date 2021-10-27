import funciones, consultas, os, secrets, yagmail as yagmail, time, bcrypt
from flask import Flask, render_template, flash, request, session, Markup, redirect
import sys

app = Flask(__name__)
app.secret_key = os.urandom(24)
yag = yagmail.SMTP('godred12994@gmail.com', 'Easy1234#') 

@app.errorhandler(500)
def internal_error(error):
	return render_template("error_500.html"), 500

@app.errorhandler(404)
def page_not_found(error):
	return render_template("error_404.html"), 404

@app.route('/')
def raiz():
	return redirect('inicio')

@app.route('/inicio/')
def inicio():
	botonesSesion()
	token = secrets.token_hex(40)
	return render_template("inicio.html")

@app.route('/iniciarSesion', methods=['POST'])
def iniciarSesion():
	try:
		tip                = ""
		name               = ""
		msg                = "Acceso concedido" 
		sts                = "OK"
		session["paneles"] = Markup('<li class="nav-item"><a class="nav-link active" id="citas-tab" data-toggle="tab" href="#citas" role="tab" aria-controls="citas" aria-selected="true">CITAS</a></li>')
		email              = request.form['email']
		password           = request.form['password']
		datos              = consultas.qry_iniciar_sesion(email)
		id     						 = datos[0]
		hash_db            = datos[1]
		apellidos          = datos[2]
		tip_usuario        = datos[3]
		estado             = datos[4]
		if bcrypt.checkpw(password.encode(), hash_db.encode()):
			if tip_usuario == "ADMINISTRADOR":
				session["paneles"] = Markup('<li class="nav-item"><a class="nav-link active" id="citas-tab" data-toggle="tab" href="#citas" role="tab" aria-controls="citas" aria-selected="true">CITAS</a></li><li class="nav-item"><a class="nav-link" id="medicos-tab" data-toggle="tab" href="#medicos" role="tab" aria-controls="medicos" aria-selected="false">MEDICOS</a></li><li class="nav-item"><a class="nav-link" id="pacientes-tab" data-toggle="tab" href="#pacientes" role="tab" aria-controls="pacientes" aria-selected="false">PACIENTES</a></li>')
			sts = "OK"
			msg = "Bienvenido al sistema"
			funciones.iniciarSesion(tip_usuario, apellidos, estado, id)
		else:
			sts = "FAIL"
			msg = "Correo o contraseña incorrecta"
		return ({'status':sts,'msg':msg})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/cerrarSesion', methods=['POST'])
def cerrarSesion():
	try:
		session.clear()
		msg = "Sesion cerrada con exito"
		sts = "OK"
		return ({'status':sts,'msg':msg})
	except Exception as e:
		msg = e
		return ({'status':'FAIL','msg':msg})

@app.route('/recuperar_password/')
def recuperar_password():
	botonesSesion()
	return render_template("recuperar_password.html")

@app.route('/registro/')
def registro():
	botonesSesion()
	tipo_docs = consultas.qry_soporte("DOCS")
	return render_template("registro.html", tipo_docs = tipo_docs)

@app.route('/registrarUsuario', methods=['POST'])
def registrar():
	try:
		nombres   = request.form['nomb']
		apellidos = request.form['apel']
		#tipo_doc  = request.form['tipd']
		num_doc   = request.form['numd']
		email     = request.form['emai']
		telefono  = request.form['tele']
		direccion = request.form['dire']
		password  = request.form['pass']
		fecha   = time.strftime("%Y-%m-%d")
		token   = bcrypt.gensalt().decode("utf-8")
		hash    = funciones.crear_hash(password).decode("utf-8")
		last_id = consultas.qry_registrar_usuario(email, token, hash, fecha, "5", "8")
		consultas.qry_registrar_userId(str(last_id), "pacientes", "pac", num_doc, "1", nombres, apellidos, telefono, direccion)
		yag.send(to=email, subject='Activa tu cuenta', contents='Bienvenido, usa este link para activar tu cuenta: http://127.0.0.1:5000/activar/?token=' + email + ':::' + token)
		msg = "Revisa tu correo para activar tu cuenta"
		sts = "OK"
		return ({'status':sts,'msg':msg})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/registrarMedico', methods=['POST'])
def registrarMedico():
	try:
		nombres      = request.form['nomb']
		apellidos    = request.form['apel']
		num_doc      = request.form['numd']
		email        = request.form['emai']
		telefono     = request.form['tele']
		direccion    = request.form['dire']
		password     = request.form['pass']
		especialidad = request.form['espe']
		fecha        = time.strftime("%Y-%m-%d")
		token        = bcrypt.gensalt().decode("utf-8")
		hash         = funciones.crear_hash(password).decode("utf-8")
		last_id      = consultas.qry_registrar_medico(email, token, hash, fecha, "5", "8")
		consultas.qry_registrar_userIdMedico(str(last_id), "medicos", "med", num_doc, "1", nombres, apellidos, telefono, direccion, especialidad)
		yag.send(to=email, subject='Activa tu cuenta', contents='Bienvenido, usa este link para activar tu cuenta: http://127.0.0.1:5000/activar/?token=' + email + ':::' + token)
		msg = "Revisa tu correo para activar tu cuenta"
		sts = "OK"
		return ({'status':sts,'msg':msg})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/activar/', methods=['GET'])
def activarCuenta():
	try:
		if request.method == 'GET':
			token = request.args.get('token')
			datos = token.split(":::")
			email = datos[0]
			token = datos[1]
			result = consultas.qry_verificar_token(email, token)
			if result:
				msg = consultas.qry_activar_cuenta(email, token)
			else:
				msg = "El token de acceso ha expirado o no existe"
			return msg
		else:
			return "Error en el sistema, reintentelo mas tarde"
	except Exception as e:
		return "Error en el sistema, reintentelo mas tarde"

@app.route('/panel/')
def panel():
	botonesSesion()
	if session["online"] == False:
		return redirect("/inicio")
	else:
		boton = '<a href="/inicio"><button type="button"><h2>REGRESAR A INICIO</h2></button></a>'
		if session["estado"] == 8:
			session.clear()
			return boton + '<h3>Usted no ha activado su cuenta, el link de activacion fue enviado a su cuenta de correo electronico registrada</h3>'
		elif session["estado"] == 9:
			session.clear()
			sesion = funciones.verificarSesion()
			return boton + '<h3>Usuario bloqueado, intente contactar via correo con el administrador</h3>'
		else:
			flash(session["paneles"], "paneles")
			if session["tipo_usuario"] == "ADMINISTRADOR":
				session["codigo"] = consultas.qry_session_id(str(session["id_usuario"]), "administradores", "adm")[0]
				tipo_citas        = consultas.qry_soporte("CITD")
				tipo_medicos      = consultas.qry_soporte("MEDA")
				tipo_pacientes    = consultas.qry_soporte("PACA")
				tipo_docs 				= consultas.qry_soporte("DOCS")
				tipo_especialidad = consultas.qry_soporte("ESPE")
				listado_citas     = consultas.qry_listar_citas_administrador("")
				listado_medicos   = consultas.qry_listar_medicos_administrador("")
				listado_pacientes = consultas.qry_listar_pacientes_administrador("")
				return render_template('administrador.html', tipo_docs = tipo_docs, tipo_especialidad = tipo_especialidad, tipo_citas = tipo_citas, tipo_medicos = tipo_medicos, tipo_pacientes = tipo_pacientes, listado_citas = listado_citas, listado_medicos = listado_medicos, listado_pacientes = listado_pacientes)
			elif session["tipo_usuario"] == "MEDICO":
				session["codigo"] = consultas.qry_session_id(str(session["id_usuario"]), "medicos", "med")[0]
				tipo_citas = consultas.qry_soporte("CITM")
				listado_citas = consultas.qry_listar_citas_medico(str(session["codigo"]), "estado_id", "")
				return render_template("medicos.html", tipo_citas = tipo_citas, listado_citas = listado_citas, nombre = session["name"])
			elif session["tipo_usuario"] == "PACIENTE":
				session["codigo"] = consultas.qry_session_id(str(session["id_usuario"]), "pacientes", "pac")[0]
				tipo_citas = consultas.qry_soporte("CITP")
				listado_citas = consultas.qry_listar_citas_paciente(str(session["codigo"]), "")
				return render_template("pacientes.html", tipo_citas = tipo_citas, listado_citas = listado_citas, nombre = session["name"])
			else:
				return "Error dentro del servidor"

@app.route('/listarCitasPacientes', methods=['POST'])
def listarCitasPacientes():
	try:
		texto = "AND med_apellidos LIKE '%" + request.form['text'] + "%'"
		datos = consultas.qry_listar_citas_paciente(str(session["codigo"]), texto)
		msg 	= "Datos cargados correctamente"
		sts	  = "OK"
		return ({'status':sts,'msg':msg, 'datos':datos})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/listarCitasAdministradores', methods=['POST'])
def listarCitasAdministradores():
	try:
		texto = "AND " + request.form['sele'] + " LIKE '%" + request.form['text'] + "%'"
		datos = consultas.qry_listar_citas_administrador(texto)
		msg 	= "Datos cargados correctamente"
		sts	  = "OK"
		return ({'status':sts,'msg':msg, 'datos':datos})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/listarMedicosAdministradores', methods=['POST'])
def listarMedicosAdministradores():
	try:
		texto = "AND " + request.form['sele'] + " LIKE '%" + request.form['text'] + "%'"
		datos = consultas.qry_listar_medicos_administrador(texto)
		msg 	= "Datos cargados correctamente"
		sts	  = "OK"
		return ({'status':sts,'msg':msg, 'datos':datos})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/listarPacientesAdministradores', methods=['POST'])
def listarPacientesAdministradores():
	try:
		texto = "AND " + request.form['sele'] + " LIKE '%" + request.form['text'] + "%'"
		datos = consultas.qry_listar_pacientes_administrador(texto)
		msg 	= "Datos cargados correctamente"
		sts	  = "OK"
		return ({'status':sts,'msg':msg, 'datos':datos})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/usuario/')
def usuario():
	botonesSesion()
	if session["online"] == False:
		return redirect("/inicio")
	else:
		datos = consultas.qry_cargar_usuario(str(session["codigo"]), str(session["rol"]), str(session["usuario"]))
		return render_template("usuario.html", datos = datos)

@app.route('/detallesUsuario', methods=['POST'])
def detallesUsuario():
	try:
		id	 		= request.form['id']
		rol 		= request.form['rol']
		usuario = request.form['usua']
		datos = consultas.qry_detalles_usuario(id, rol, usuario)
		msg = "Datos cargados con exito"
		sts = "OK"
		return ({'status':sts,'msg':msg, 'datos': datos})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/actualizarUsuario', methods=['POST'])
def actualizarUsuario():
	try:
		nombres 				 = request.form['nomb']
		apellidos 			 = request.form['apel']
		telefono 			 	 = request.form['tele']
		direccion 		 	 = request.form['dire']
		fecha_nacimiento = request.form['fech']
		edad 	 					 = request.form['edad']
		sexo 	 					 = request.form['sexo']
		consultas.qry_actualizar_usuario(str(session["codigo"]), str(session["rol"]), str(session["usuario"]), nombres, apellidos, telefono, direccion, fecha_nacimiento, edad, sexo)
		msg = "Datos guardados con exito"
		sts = "OK"
		return ({'status':sts,'msg':msg})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/bloquearUsuario', methods=['POST'])
def bloquearUsuario():
	try:
		usua = request.form['usua']
		consultas.qry_bloquear_usuario(usua)
		msg = "Usuario bloqueado"
		sts = "OK"
		return ({'status':sts,'msg':msg})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/desbloquearUsuario', methods=['POST'])
def desbloquearUsuario():
	try:
		usua = request.form['usua']
		consultas.qry_desbloquear_usuario(usua)
		msg = "Usuario desbloqueado"
		sts = "OK"
		return ({'status':sts,'msg':msg})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/contactos/')
def contactos():
	botonesSesion()
	return render_template('contactos.html')

@app.route('/servicios/')
def servicios():
	botonesSesion()
	return render_template('servicios.html')

@app.route('/preguntas/')
def	preguntas():
	botonesSesion()
	return render_template('preguntas.html')

def botonesSesion():
	session.pop('_flashes', None)
	sesion = funciones.verificarSesion()
	botonBienvenido = ("Bienvenido al sistema")
	botonPanel = Markup('<a href="/panel"><button type="button" class="btn btn-info d-none">DASHBOARD</button></a>')
	botonesDeSesion = Markup('<button id="btnIniciarSesion" type="button" class="btn btn-light" data-toggle="modal" data-target="#modalIniciarSesion">Iniciar sesion</button>')
	if sesion == "PACIENTE" or sesion == "MEDICO" or sesion == "ADMINISTRADOR":
		botonBienvenido = (session["name"] + " - " + sesion)
		botonPanel = Markup('<a href="/panel"><button type="button" class="btn btn-info">DASHBOARD</button></a>')
		botonesDeSesion = Markup('<button id="csCerrarSesion" type="button" class="btn btn-light">Cerrar sesion</button><a href="/usuario"><i class="bi bi-gear-fill close manita" aria-label="Close"></i></a>')
	flash(botonPanel, "botonPanel")
	flash(botonesDeSesion, "botonesDeSesion")
	flash(botonBienvenido, "botonBienvenido")

#DETALLES CITAS
@app.route('/cargarEspecialidadesSolicitarCita', methods=['POST'])
def cargarEspecialidadesSolicitarCita():
	try:
		datos  = consultas.qry_cargar_especialidades_solicitar_cita()
		msg = "Datos cargados correctamente"
		sts = "OK"
		return ({'status':sts,'msg':msg, 'datos':datos})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/cargarMedicosSolicitarCita', methods=['POST'])
def cargarMedicosSolicitarCita():
	try:
		especialidad  = request.form['espe']
		datos  				= consultas.qry_cargar_medicos_solicitar_cita(especialidad)
		msg = "Datos cargados correctamente"
		sts = "OK"
		return ({'status':sts,'msg':msg, 'datos':datos})
	except Exception as e:
		return ({'status':'FAIL','msg':e})
		
@app.route('/detallesCitaPaciente', methods=['POST'])
def detallesCitaPaciente():
	try:
		idCita  = request.form['idCita']
		datos = consultas.qry_detalles_cita_paciente(idCita)
		msg = "Datos cargados correctamente"
		sts = "OK"
		return ({'status':sts,'msg':msg, 'datos':datos})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/solicitarCita', methods=['POST'])
def solicitarCita():
	try:
		medico 			 = request.form['medi']
		fechahora    = request.form['fechaHora']
		fecha   		 = time.strftime("%Y-%m-%d")
		detalle			 = request.form['deta']
		consultas.qry_solicitar_cita(str(session["codigo"]), medico, fechahora, fecha, detalle)
		msg = "Datos cargados correctamente"
		sts = "OK"
		return ({'status':sts,'msg':msg})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/atenderCita', methods=['POST'])
def atenderCita():
	try:
		cita     = request.form['cita']
		historia = request.form['hist']
		consulta = consultas.qry_atender_cita(cita, historia)
		if consulta == "OK":
			consultas.qry_insertar_comentarios(cita)
			consultas.qry_actualizar_estado_cita(cita)
			msg = "Cita atendida"
		else:
			msg = "Error al guardar"
		sts = "OK"
		return ({'status':sts,'msg':msg})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/cancelarCita', methods=['POST'])
def cancelarCita():
	try:
		cita = request.form['cita']
		consultas.qry_cancelar_cita(cita)
		msg = "Cita cancelada"
		sts = "OK"
		return ({'status':sts,'msg':msg})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/aceptarCita', methods=['POST'])
def aceptarCita():
	try:
		cita = request.form['cita']
		consultas.qry_aceptar_cita(cita)
		msg = "Cita aceptada"
		sts = "OK"
		return ({'status':sts,'msg':msg})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/cargarComentarios', methods=['POST'])
def cargarComentarios():
	try:
		cita = request.form['cita']
		datos = consultas.qry_cargar_comentarios(cita)
		msg = "Datos cargados"
		sts = "OK"
		return ({'status':sts,'msg':msg, 'datos': datos})
	except Exception as e:
		return ({'status':'FAIL','msg':e})

@app.route('/actualizarComentarios', methods=['POST'])
def actualizarComentarios():
	try:
		cita 		 = request.form['cita']
		paciente = request.form['paci']
		medico 	 = request.form['medi']
		consultas.qry_actualizar_comentarios(cita, paciente, medico)
		msg = "Datos guardados"
		sts = "OK"
		return ({'status':sts,'msg':msg})
	except Exception as e:
		return ({'status':'FAIL','msg':e})
