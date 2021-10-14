import os
import yagmail as yagmail
import funciones
from flask import Flask, render_template, flash, request, session, Markup, redirect

app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.errorhandler(500)
def internal_error(error):
	return render_template("error_500.html"), 500

@app.errorhandler(404)
def page_not_found(error):
	return render_template("error_404.html"), 404

@app.route('/')
def raiz():
	return render_template('inicio.html')

@app.route('/inicio/')
def inicio():
	botonesSesion()
	return render_template("inicio.html")

@app.route('/iniciarSesion', methods=['POST'])
def iniciarSesion():
	try:
		tip = ""
		name = ""
		msg = "Acceso concedido"
		sts = "OK"
		email    = request.form['email'];
		password = request.form['password'];
		if email == "pac123@gmail.com" and password == "pac12022":
			tip = "PACIENTE"
			name = "EDWIN MONTES MEZA"
			session["paneles"] = Markup('<li class="nav-item"><a class="nav-link" id="citas-tab" data-toggle="tab" href="#citas" role="tab" aria-controls="citas" aria-selected="true">CITAS</a></li>')
		elif email == "med45@hotmail.com":
			tip = "MEDICO"
			name = "JAIME POLO"
			session["paneles"] = Markup('<li class="nav-item"><a class="nav-link" id="citas-tab" data-toggle="tab" href="#citas" role="tab" aria-controls="citas" aria-selected="true">CITAS</a></li></li>')
		elif email == "admin@simon_bolivar.com":
			tip = "ADMINISTRADOR"
			name = "BEIMAN JOSÉ"
			session["paneles"] = Markup('<li class="nav-item"><a class="nav-link" id="citas-tab" data-toggle="tab" href="#citas" role="tab" aria-controls="citas" aria-selected="true">CITAS</a></li><li class="nav-item"><a class="nav-link" id="medicos-tab" data-toggle="tab" href="#medicos" role="tab" aria-controls="medicos" aria-selected="false">MEDICOS</a></li><li class="nav-item"><a class="nav-link" id="pacientes-tab" data-toggle="tab" href="#pacientes" role="tab" aria-controls="pacientes" aria-selected="false">PACIENTES</a></li>')
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

@app.route('/registro/')
def registro():
	botonesSesion()
	return render_template("registro.html")

@app.route('/registrarUsuario', methods=['POST'])
def registrar():
	try:
		email    = request.form['email'];
		password = request.form['password'];
		yag = yagmail.SMTP('godred12994@gmail.com', 'Easy1234#') 
		yag.send(to=email, subject='Activa tu cuenta', contents='Bienvenido, usa este link para activar tu cuenta ')
		msg = "Revisa tu correo para activar tu cuenta"
		sts = "OK"
		return ({'status':sts,'msg':msg,'pass':password});
	except Exception as e:
		msg = e
		return ({'status':'FAIL','msg':msg,'pass':password});

@app.route('/panel/')
def panel():
	botonesSesion()
	if session["online"] == False:
		return redirect("/inicio")
	flash(session["paneles"], "paneles")
	return render_template('panel.html')

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
	