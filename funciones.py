from flask import Flask, session

def verificarSesion():
	if "tipo_usuario" in session:
		return session["tipo_usuario"]
	else:
		session["tipo_usuario"] = "INVITADO"
		session["online"] = False
		return session["tipo_usuario"]

def iniciarSesion(tip, name):
	try:
		session["tipo_usuario"] = tip
		session["name"] = name
		session["online"] = True
	except Exception as e:
		return e