from flask import Flask, session

def verificarSesion():
	if "tipo_usuario" in session:
		return session["tipo_usuario"]
	else:
		session["tipo_usuario"] = "INVITADO"
		session["online"] = True
		return session["tipo_usuario"]