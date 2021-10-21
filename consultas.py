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
    qry = "SELECT usu_id, usu_hash_pass, pac_apellidos, sop_datos, usu_estado FROM usuarios, soporte INNER JOIN pacientes on usu_id = pac_usuario_id WHERE usu_email = '" + email + "' AND usu_tipo_usu = sop_id UNION SELECT usu_id, usu_hash_pass, med_apellidos, sop_datos, usu_estado FROM usuarios, soporte INNER JOIN medicos on usu_id = med_usuario_id WHERE usu_email = '" + email + "' AND usu_tipo_usu = sop_id UNION SELECT usu_id, usu_hash_pass, adm_apellidos, sop_datos, usu_estado FROM usuarios, soporte INNER JOIN administradores on usu_id = adm_usuario_id WHERE usu_email = '" + email + "' AND usu_tipo_usu = sop_id"
    con = sql_connection()
    cursorObj = con.cursor()
    cursorObj.execute(qry)
    result = cursorObj.fetchone()
    return result
  except Error as e:
    print(e, file=sys.stderr)
    return "Error al guardar datos"

def qry_session_id(id, rol, usuario):
  try:
    qry = "SELECT " + usuario + "_id FROM usuarios, " + rol + " WHERE usu_id = '" + id + "' AND usu_id = " + usuario + "_usuario_id"
    con = sql_connection()
    cursorObj = con.cursor()
    cursorObj.execute(qry)
    result = cursorObj.fetchone()
    return result
  except Error as e:
    return "Error al cargar datos"

def qry_registrar_usuario(email, token, hash, fecha, rol, estado):
  try:
    qry = "INSERT INTO usuarios (usu_email, usu_token, usu_hash_pass, usu_created_at, usu_tipo_usu, usu_estado) VALUES ('" + email + "', '" + token + "', '" + hash + "', '" + fecha + "', " + rol + ", " + estado + ");"
    con = sql_connection()
    cursorObj = con.cursor()
    cursorObj.execute(qry)
    last_id = cursorObj.lastrowid
    con.commit()
    con.close()
    return last_id
  except Error as e:
    print(e, file=sys.stderr)

def qry_registrar_userId(id, rol, usuario, num_doc, tipo_doc, nombres, apellidos, telefono, direccion):
  try:
    qry = "INSERT INTO " + rol + " (" + usuario + "_usuario_id, pac_identificacion, pac_tipo_identificacion, pac_nombres, pac_apellidos, pac_telefono, pac_direccion) VALUES (" + id + ", " + num_doc + ", " + tipo_doc + ", '" + nombres + "', '" + apellidos + "', " + telefono + ", '" + direccion + "');"
    con = sql_connection()
    cursorObj = con.cursor()
    cursorObj.execute(qry)
    con.commit()
    con.close()
    return "Guardada con exito"
  except Error as e:
    print("error", file=sys.stderr)

def qry_verificar_token(email, token):
  try:
    qry = "SELECT usu_email, usu_token FROM usuarios WHERE usu_email = '" + email + "' AND usu_token = '" + token + "'"
    con = sql_connection()
    cursorObj = con.cursor()
    cursorObj.execute(qry)
    result = cursorObj.fetchone()
    print(result, file=sys.stderr)
    return result
  except Error as e:
    return "Error al guardar datos"

def qry_activar_cuenta(email, token):
  try:
    qry = "UPDATE usuarios SET usu_estado = 10, usu_token = '' WHERE usu_email = '" + email + "' AND usu_token = '" + token + "'"
    con = sql_connection()
    cursorObj = con.cursor()
    cursorObj.execute(qry)
    con.commit()
    con.close()
    return "Tu cuenta ha sido activada"
  except Error as e:
    return "Error al guardar datos"

def qry_listar_citas_paciente(id, tipo, texto):
  try:
    qry = "SELECT cit_id, sop_datos, med_apellidos, cit_fecha_hora FROM citas, medicos, soporte WHERE cit_paciente_id = 1 AND cit_medico_id = '" + id + "' AND cit_medico_id = med_id AND cit_estado = sop_id"
    con = sql_connection()
    cursorObj = con.cursor()
    cursorObj.execute(qry)
    result = cursorObj.fetchall()
    print(result, file=sys.stderr)
    return result
  except Error as e:
    print(e, file=sys.stderr)
    return "Error al cargar datos"
    