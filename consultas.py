from sqlite3 import Error
import sqlite3, sys
def sql_connection():
    try:
        msg =  sqlite3.connect('hospital.db')
        return msg
    except Error as e:
        return "Error al contactar en la base de datos"

def qry_soporte(cod):
  try:
    qry = "select * FROM soporte WHERE sop_cod = '" + cod + "'"
    con = sql_connection()
    cursorObj = con.cursor()
    cursorObj.execute(qry)
    result = cursorObj.fetchall()
    return result
  except Error as e:
    return "Error al cargar datos"
  
def qry_iniciar_sesion(email):
  try:
    qry = "select usu_hash_pass FROM usuarios WHERE usu_email = '" + email + "'"
    con = sql_connection()
    cursorObj = con.cursor()
    cursorObj.execute(qry)
    result = cursorObj.fetchone()
    return result
  except Error as e:
    return "Error al guardar datos"

def qry_registrar_usuario(nombres, apellidos, tipo_doc, num_doc, email, telefono, direccion, hash, rol, estado):
  try:
    qry = "INSERT INTO usuarios (usu_nombres, usu_apellidos, usu_tipo_doc, usu_identificacion, usu_email, usu_telefono, usu_direccion, usu_hash_pass, usu_tipo_usu, usu_estado) VALUES ('" + nombres + "', '" + apellidos + "', " + tipo_doc + ", " + num_doc + ", '" + email + "', " + telefono + ", '" + direccion + "', '" + hash + "', " + rol + ", " + estado + ");"
    con = sql_connection()
    cursorObj = con.cursor()
    cursorObj.execute(qry)
    con.commit()
    con.close()
  except Error as e:
    print(e, file=sys.stderr)
    