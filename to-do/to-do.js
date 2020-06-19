

const fs = require('fs');


let listadoPorHacer = [];
// ============================================
//	función para guardar las tareas en un JSON
// ============================================
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
};
// ====================================================
//	función para cargar las tareas guardadas en el JSON
// ====================================================
const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');               
    } catch (error) {
        listadoPorHacer = [];
    }

    


};
// =======================================
//	función para crear una tarea por hacer
// =======================================
const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push( porHacer );
    guardarDB();

    return porHacer;
};

// =================================
//	función para listar las tareas
// =================================

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
};

// ==================================
//	función para actualizar el estado
// ==================================

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion);

    if ( index >= 0 ) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
};

// =================================
//	funcion para borrar un tarea
// =================================

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion);
    if (index>=0) {
        listadoPorHacer.splice(index,1);
        guardarDB();
        return true;
    } else {
        return false;
    }
    
};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};