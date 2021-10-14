from flask import Flask, session

def verificarSesion():
	if "tipo_usuario" in session:
		msg = session["tipo_usuario"]
	else:
		session["tipo_usuario"] = "INVITADO"
		session["online"] = False
		msg = "Bienvenido al sistema"
	return msg

def iniciarSesion(tip, name):
	try:
		session["tipo_usuario"] = tip
		session["name"] = name
		session["online"] = True
	except Exception as e:
		return e