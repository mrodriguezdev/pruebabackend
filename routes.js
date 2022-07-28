// Creando constante para requerir el modulo de express
const express = require('express')

// Metodo express router 
const routes = express.Router()

// Agregando rutas que a su vez son las consultas a la base de datos del

/* METODO PARA LOGIN */
routes.post("/login",(request,response) => {

    request.getConnection((error, connection) =>{

        if(error) return response.send(error)
        connection.query('select * from usuarios where NOMBREUSUARIO = ? and CLAVE = ?', [request.body.usuario, request.body.password], (error, filas)=>{
            if(error) return response.send(error)

            if (filas != null){
                res.json({
                    status: '200',
                    items: filas
                });
            } else {
                res.json(404, {status: err});
            }

        })
    })
    

});

/* Metodo para obtener el ID del cliente que se acaba de crear */
routes.get('/maxIdCliente', (req, res) => {
    req.getConnection((error, connection) =>{

        if(error) return res.send(error)
        connection.query('select max(IDCLIENTE) from clientes', (error, filas)=>{
            if(error) return res.send(error)

            res.json(filas)
        })
    })
})


/* Metodo para obtener una lista de los clientes y su informacion */
routes.get('/listadoclientes', (req, res) => {
    req.getConnection((error, connection) =>{

        if(error) return res.send(error).status(403)
        connection.query('select * from vw_listadoclientes', (error, filas)=>{
            if(error) return res.send(error)

            res.json(filas)
        })
    })
})


/* METODOS PARA REGISTRAR LOS DATOS DEL CLIENTE */
/* Metodo que registrar los datos del cliente en tabla clientes */
routes.post('/registrarCliente', (req, res) => {
    req.getConnection((error, connection) =>{

        if(error) return res.send(error)


        connection.query('insert into clientes set ?', [req.body], (error, filas)=>{
            if(error) return res.send(error)

            res.send('Cliente registrado!')
        })
    })
})

/* Metodo que registrar los datos del cliente en tabla domicilios */
routes.post('/registrarDomicilio', (req, res) => {
    req.getConnection((error, connection) =>{

        if(error) return res.send(error)


        connection.query('insert into domicilios set ?', [req.body], (error, filas)=>{
            if(error) return res.send(error)

            res.send('Domicilio registrado!')
        })
    })
})

/* Metodo que regsitra los datos del cliente en tabla documentos */
routes.post('/registrarDocumento', (req, res) => {
    req.getConnection((error, connection) =>{

        if(error) return res.send(error)


        connection.query('insert into documentos set ?', [req.body], (error, filas)=>{
            if(error) return res.send(error)

            res.send('Documento registrado!')
        })
    })
})


/* METODOS PARA OBTENER LA INFORMACION DE UN CLIENTE */
routes.get('/infoCliente/:id', (req, res) => {
    req.getConnection((error, connection) =>{

        if(error) return res.send(error)
        connection.query('select * from clientes where IDCLIENTE = ?', [req.params.id], (error, filas)=>{
            if(error) return res.send(error)

            res.json(filas)
        })
    })
})

routes.get('/infoClienteDom/:id', (req, res) => {
    req.getConnection((error, connection) =>{

        if(error) return res.send(error)
        connection.query('select * from domicilios where IDCLIENTE = ?', [req.params.id], (error, filas)=>{
            if(error) return res.send(error)

            res.json(filas)
        })
    })
})

routes.get('/infoClienteDoc/:id', (req, res) => {
    req.getConnection((error, connection) =>{

        if(error) return res.send(error)
        connection.query('select * from documentos where IDCLIENTE = ?', [req.params.id], (error, filas)=>{
            if(error) return res.send(error)

            res.json(filas)
        })
    })
})


/* METODOS PARA ACTUALIZAR LA INFORMACION DE UN CLIENTE */
/* Metodo que modifica los datos del cliente en tabla clientes */
routes.put('/modificarCliente/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE clientes set ? WHERE IDCLIENTE = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Cliente actualizado!')
        })
    })
})

/* Metodo que modifica los datos del cliente en tabla domicilios */
routes.put('/modificarDomicilio/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE domicilios set ? WHERE IDCLIENTE = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Domicilio actualizado!')
        })
    })
})

/* Metodo que modifica los datos del cliente en tabla documentos */
routes.put('/modificarDocumento/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE documentos set ? WHERE IDCLIENTE = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Documento actualizado!')
        })
    })
})


/* METODO PARA ELIMINAR UN CLIENTE */
routes.delete('/eliminarCliente/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM clientes WHERE IDCLIENTE = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Cliente actualizado!')
        })
    })
})


// Exportando metodo 
module.exports = routes