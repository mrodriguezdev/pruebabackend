// Creando constante para requerir el modulo de express
const express = require('express')

// Metodo express router 
const routes = express.Router()

// Agregando rutas que a su vez son las consultas a la base de datos del

/* METODO PARA LOGIN */
routes.get('/login/:usuario', (req, res) => {
    req.getConnection((error, connection) =>{

        if(error) return res.send(error)
        connection.query('select * from usuarios where NOMBREUSUARIO = ?', [req.params.usuario], (error, filas)=>{
            if(error) return res.send(error)

            res.json(filas)
        })
    })
})

/* METODO PARA OBTENER EL ID DEL CLIENTE CREADO */
routes.get('/maxIdCliente', (req, res) => {
    req.getConnection((error, connection) =>{

        if(error) return res.send(error)
        connection.query('select max(IDCLIENTE) from clientes', (error, filas)=>{
            if(error) return res.send(error)

            res.json(filas)
        })
    })
})

routes.get('/infoClientes', (req, res) => {
    req.getConnection((error, connection) =>{

        if(error) return res.send(error)
        connection.query('select * from clientes', (error, filas)=>{
            if(error) return res.send(error)

            res.json(filas)
        })
    })
})


/* METODOS PARA REGISTRAR LOS DATOS DEL CLIENTE */
routes.post('/registrarCliente', (req, res) => {
    req.getConnection((error, connection) =>{

        if(error) return res.send(error)


        connection.query('insert into clientes set ?', [req.body], (error, filas)=>{
            if(error) return res.send(error)

            res.send('Cliente registrado!')
        })
    })
})

routes.post('/registrarDomicilio', (req, res) => {
    req.getConnection((error, connection) =>{

        if(error) return res.send(error)


        connection.query('insert into domicilios set ?', [req.body], (error, filas)=>{
            if(error) return res.send(error)

            res.send('Domicilio registrado!')
        })
    })
})

routes.post('/registrarDocumentos', (req, res) => {
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
routes.put('/modificarCliente/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE clientes set ? WHERE IDCLIENTE = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Cliente actualizado!')
        })
    })
})

routes.put('/modificarDomicilio/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE domicilios set ? WHERE IDCLIENTE = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Domicilio actualizado!')
        })
    })
})

routes.put('/modificarDocumentos/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE documentos set ? WHERE IDCLIENTE = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Documento actualizado!')
        })
    })
})


/* METODOS PARA ELIMINAR UN CLIENTE */
routes.delete('/eliminarCliente/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM clientes WHERE IDCLIENTE = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Cliente eliminado!')
        })
    })
})


// Exportando metodo 
module.exports = routes