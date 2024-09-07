import express from "express"
import { crud_estudiantes } from "./controllers/crud_estudiantes.js"
const app_e = express()

app_e.use(express.urlencoded({extended:false}));
app_e.use(express.json());
app_e.use(express.static('./controllers'))
app_e.use(express.static('./models'))
app_e.use(express.static('./views'))
app_e.set('view engine','ejs')

app_e.listen('5000',function(){ 
    console.log('Aplicacion Iniciada : http://localhost:5000/')
})
app_e.get('/',crud_estudiantes.leer);
app_e.post('/crud_e',crud_estudiantes.cud);
