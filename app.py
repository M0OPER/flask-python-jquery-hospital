import funciones, consultas, os, secrets, yagmail as yagmail
from flask import Flask, render_template, flash, request, session, Markup, redirect
import sys, bcrypt

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
		tip = ""
		name = ""
		msg = "Acceso concedido" 
		sts = "OK"
		session["paneles"] = Markup('<li class="nav-item"><a class="nav-link active" id="citas-tab" data-toggle="tab" href="#citas" role="tab" aria-controls="citas" aria-selected="true">CITAS</a></li>')
		email    = request.form['email']
		password = request.form['password']
		hash_db = consultas.qry_iniciar_sesion(email)
		if bcrypt.checkpw(password.encode(), hash_db[0].encode()):
				print("IGUAL", file=sys.stderr)
		else:
				print("NO IGUAL", file=sys.stderr)
		if email == "pac123@gmail.com" and password == "pac12022":
			tip = "PACIENTE"
			name = "EDWIN MONTES MEZA"
		elif email == "med45@hotmail.com":
			tip = "MEDICO"
			name = "JAIME POLO"
		elif email == "admin@simon_bolivar.com":
			tip = "ADMINISTRADOR"
			name = "BEIMAN JOSÉ"
			session["paneles"] = Markup('<li class="nav-item"><a class="nav-link active" id="citas-tab" data-toggle="tab" href="#citas" role="tab" aria-controls="citas" aria-selected="true">CITAS</a></li><li class="nav-item"><a class="nav-link" id="medicos-tab" data-toggle="tab" href="#medicos" role="tab" aria-controls="medicos" aria-selected="false">MEDICOS</a></li><li class="nav-item"><a class="nav-link" id="pacientes-tab" data-toggle="tab" href="#pacientes" role="tab" aria-controls="pacientes" aria-selected="false">PACIENTES</a></li>')
		else:
			msg = "Usuario o contraseña incorrecta"
			sts = "FAIL"
		funciones.iniciarSesion(tip, name)
		return ({'status':sts,'msg':msg,'tip':tip, 'name':name});
	except Exception as e:
		return ({'status':'FAIL','msg':e});

@app.route('/cerrarSesion', methods=['POST'])
def cerrarSesion():
	try:
		session.clear()
		msg = "Sesion cerrada con exito"
		sts = "OK"
		return ({'status':sts,'msg':msg});
	except Exception as e:
		msg = e
		return ({'status':'FAIL','msg':msg});

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
		token = bcrypt.gensalt().decode("utf-8")
		hash = funciones.crear_hash(password).decode("utf-8")
		consultas.qry_registrar_usuario(nombres, apellidos, "1", num_doc, email, telefono, direccion, token, hash, "5", "8")
		yag.send(to=email, subject='Activa tu cuenta', contents='Bienvenido, usa este link para activar tu cuenta: http://127.0.0.1:5000/activar/?token=' + email + ':::' + token)
		msg = "Revisa tu correo para activar tu cuenta"
		sts = "OK"
		return ({'status':sts,'msg':msg})
	except Exception as e:
		print(e, file=sys.stderr)
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
		flash(session["paneles"], "paneles")
		if session["tipo_usuario"] == "ADMINISTRADOR":
			return render_template('/administrador.html')
		elif session["tipo_usuario"] == "MEDICO":
			return render_template('/medicos.html')
		elif session["tipo_usuario"] == "PACIENTE":
			return render_template('/pacientes.html')
			
@app.route('/panel/administrador')
def panel_administrador():
	botonesSesion()
	return render_template("administrador.html")

@app.route('/panel/medicos')
def panel_medicos():
	botonesSesion()
	return render_template("medicos.html")

@app.route('/panel/pacientes')
def panel_pacientes():
	botonesSesion()
	return render_template("pacientes.html")

@app.route('/usuario/')
def usuario():
	botonesSesion()
	if session["online"] == False:
		return redirect("/inicio")
	return render_template('usuario.html')

@app.route('/contactos/')
def contactos():
	botonesSesion()
	return render_template('contactos.html')

@app.route('/servicios/')
def servicios():
	botonesSesion()
	return render_template('servicios.html')

def botonesSesion():
	session.pop('_flashes', None)
	sesion = funciones.verificarSesion()
	botonBienvenido = ("Bienvenido al sistema")
	botonPanel = Markup('<a href="/panel"><button type="button" class="btn btn-info d-none">DASHBOARD</button></a>')
	botonesDeSesion = Markup('<button id="btnIniciarSesion" type="button" class="btn btn-light" data-toggle="modal" data-target="#modalIniciarSesion">Iniciar sesion</button>')
	if sesion == "PACIENTE" or sesion == "MEDICO" or sesion == "ADMINISTRADOR":
		botonBienvenido = (	session["name"] + "-" + sesion)
		botonPanel = Markup('<a href="/panel"><button type="button" class="btn btn-info">DASHBOARD</button></a>')
		botonesDeSesion = Markup('<button id="csCerrarSesion" type="button" class="btn btn-light">Cerrar sesion</button><a href="/usuario"><i class="bi bi-gear-fill close manita" aria-label="Close"></i></a>')
	flash(botonPanel, "botonPanel")
	flash(botonesDeSesion, "botonesDeSesion")
	flash(botonBienvenido, "botonBienvenido")
	
