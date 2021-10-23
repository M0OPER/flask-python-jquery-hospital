from flask import Flask, session
import bcrypt

def verificarSesion():
	if "tipo_usuario" in session:
		msg = session["tipo_usuario"]
	else:
		session["tipo_usuario"] = "INVITADO"
		session["online"] = False
		msg = "Bienvenido al sistema"
	return msg

def iniciarSesion(tip, name, estado, id):
	try:
		session["tipo_usuario"] = tip
		session["name"] = name
		session["estado"] = estado
		session["id_usuario"] = id
		session["online"] = True
		if tip == "PACIENTE":
			session["rol"] = "pac"
			session["usuario"] = "pacientes"
		elif tip == "MEDICO":
			session["rol"] = "med"
			session["usuario"] = "medicos"
		elif tip == "ADMINISTRADOR":
			session["rol"] = "adm"
			session["usuario"] = "administradores"
	except Exception as e:
		return e

def crear_hash(password):
	salt = bcrypt.gensalt()
	msg = bcrypt.hashpw(password.encode(), salt)
	return msg