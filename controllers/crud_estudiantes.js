import { conectar } from "../models/db_conectar.js";

var crud_estudiantes =({});
crud_estudiantes.leer = (req, res) => {
    conectar.query(`
        SELECT e.*, t.sangre 
        FROM estudiantes e
        JOIN tipos_sangre t ON e.id_tipo_sangre = t.id_tipo_sangre
    `, (error, results) => {
        if (error) {
            throw error;
        } else {
            // Consulta los tipos de sangre para el formulario
            conectar.query('SELECT * FROM tipos_sangre', (error, tiposSangre) => {
                if (error) {
                    throw error;
                } else {
                    res.render('estudiantes/index', { resultado: results, tiposSangre });
                }
            });
        }
    });
};

// Actualiza estudiante
crud_estudiantes.actualizar = (req, res) => {
    const { txt_id, txt_carne, txt_nombres, txt_apellidos, txt_direccion, txt_telefono, txt_correo, txt_fn, txt_sangre } = req.body;
    const query = `
        UPDATE estudiantes SET 
        carne = ?, nombres = ?, apellidos = ?, direccion = ?, telefono = ?, correo_electronico = ?, fecha_nacimiento = ?, id_tipo_sangre = ?
        WHERE id_estudiante = ?;
    `;
    conectar.query(query, [txt_carne, txt_nombres, txt_apellidos, txt_direccion, txt_telefono, txt_correo, txt_fn, txt_sangre, txt_id], (error, results) => {
        if (error) {
            res.status(500).send('Error al actualizar el estudiante.');
            throw error;
        }
        res.send('Estudiante actualizado con éxito.');
    });
};

// Elimina estudiante
crud_estudiantes.eliminar = (req, res) => {
    const { txt_id } = req.body;
    const query = `DELETE FROM estudiantes WHERE id_estudiante = ?`;
    conectar.query(query, [txt_id], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar el estudiante.');
            throw error;
        }
        res.send('Estudiante eliminado con éxito.');
    });
};
   
crud_estudiantes.cud = (req,res)=>{
    const btn_crear = req.body.btn_crear;
    const btn_actualizar = req.body.btn_actualizar;
    const btn_borrar = req.body.btn_borrar;
    const id_estudiante = req.body.txt_id;
    const carne = req.body.txt_carne;
    const nombres = req.body.txt_nombres;
    const apellidos = req.body.txt_apellidos;
    const direccion = req.body.txt_direccion;
    const telefono = req.body.txt_telefono;
    const correo_electronico = req.body.txt_correo;
    const fecha_nacimiento = req.body.txt_fn;
    const id_tipo_sangre = req.body.txt_sangre;
    const carnetPattern = /^E[0-9]{3}$/; // Expresión regular para validar el formato E001 a E999


    if (!carnetPattern.test(carne)) {
        return res.status(400).send('El formato del carnet debe ser E001 a E999.');
    }
  
    if (btn_crear){
        conectar.query('insert into estudiantes SET ?',{carne:carne,nombres:nombres, apellidos:apellidos,direccion:direccion,telefono:telefono,correo_electronico:correo_electronico,fecha_nacimiento:fecha_nacimiento,id_tipo_sangre:id_tipo_sangre}, (error, results)=>{
            if(error){
                console.log(error);
            }else{
                 
                res.redirect('/');         
            }
        });
       
    }

    if (btn_actualizar){
        conectar.query('update estudiantes SET ? where id_estudiante = ?',[{carne:carne,nombres:nombres, apellidos:apellidos,direccion:direccion,telefono:telefono,correo_electronico:correo_electronico,fecha_nacimiento:fecha_nacimiento,id_tipo_sangre:id_tipo_sangre},id_estudiante], (error, results)=>{
            if(error){
                console.log(error);
            }else{
                 
                res.redirect('/');         
            }
        });
       
    } 
    if (btn_borrar){
        conectar.query('delete from estudiantes where id_estudiante = ?',[id_estudiante], (error, results)=>{
            if(error){
                console.log(error);
            }else{
                 
                res.redirect('/');         
            }
        });
       
    }

};

export {crud_estudiantes}