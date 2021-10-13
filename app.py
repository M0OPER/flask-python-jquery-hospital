import os
import yagmail as yagmail
import funciones
from flask import Flask, render_template, flash, request, session, Markup

app = Flask(__name__)
app.secret_key = os.urandom(24)

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
		email    = request.form['email'];
		password = request.form['password'];
		if email == "pac123@gmail.com":
			msg = "Acceso concedido"
			sts = "OK"
			tip = "PACIENTE"
			name = "EDWIN MONTES MEZA"
		else:
			msg = "Usuario o contraseña incorrecta"
			sts = "FAIL"
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
	return render_template('panel.html')

@app.route('/usuario/')
def usuario():
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
	botonesDeNavegacion = Markup('<button class="btn btn-light">PRUEBA</button>')
	if sesion == "INVITADO":
		botonesDeSesion = Markup('<button id="btnIniciarSesion" type="button" class="btn btn-light" data-toggle="modal" data-target="#modalIniciarSesion">Iniciar sesion</button><a href="/usuario"><i class="bi bi-gear-fill close manita" aria-label="Close"></i></a>')
	elif sesion == "MEDICO":
		botonesDeSesion = Markup('<button id="csCerrarSesion" type="button" class="btn btn-light">Cerrar sesion</button><a href="/usuario"><i class="bi bi-gear-fill close manita" aria-label="Close"></i></a>')
	flash(botonesDeNavegacion, "botonesDeNavegacion")
	flash(botonesDeSesion, "botonesDeSesion")
	