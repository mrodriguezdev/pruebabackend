// Creando constante para requerir el modulo de express
const express = require('express')

// Constante para modulo Mysql y modulo expressMyconnection
const mysql = require('mysql')
const myconn = require('express-myconnection')

// Requiriendo constante routes
const routes = require('./routes')

// Importando cors 
const cors = require('cors')

// Creando constante para la app
const app = express()


app.use(cors())
app.set('port', 9000)

const optionsdb = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'dbpruebatecnica'
}

//Middleware para la conexion con la base
app.use(myconn(mysql, optionsdb, 'single'))

// Middleware para comprender el formato de los datos
app.use(express.json())

// Agregando ruta principal de nuestra aplicacion
app.get('/', (req, res) => {
    res.send('Welcome to mi API!')
})

app.use('/api', routes)

// Servidor corriendo
app.listen(app.get('port'), ()=>{
    console.log('Server running on port ', app.get('port'))
})

