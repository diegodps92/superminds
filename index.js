const express = require ('express');
const sql = require('mssql');
//const datastore = require ('nedb');

const app = express ();
//var Db  = require('./dboperations');
//const database = new Datastore ('database.db')
//database.loadDatabase();
//database.insert ({razonSocial:'GAZ ET L ENERGIE S.A.C.', RUC: '20522662462'})
const dboperations = require('./dboperations');
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Starting server at ${port}`);
  });
app.use (express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.post('/apis', (request, response)=>{ 
    const data = request.body;
    dboperations.addOrder(data).then(result => {
       response.status(201).json(result);
       
    })
})
app.get('/api-enviar-disponibilidaddb', (request, response)=>{ 
    console.log(request.body);
    dboperations.getCourses().then(result => {
        response.json(result[0]);
     })
})
app.get('/api-enviar-buddydb', (request, response)=>{ 
    dboperations.getBuddy().then(result => {
        response.json(result[0]);
     })
})

app.get('/api-mes', (request, response)=>{ 
    dboperations.getMonth().then(result => {
        response.json(result[0]);
     })
})

app.get('/api-obt-empresas', (request, response)=>{ 
    dboperations.getEmpresas().then(result => {
        response.json(result[0]);
     })
})

app.post('/api-actualiza-stock', (request, response)=>{ 
    const datas = request.body;
    dboperations.updateStock(datas).then(result => {
       response.status(201).json(result);
    })
})

app.post('/api-consulta-stock', (request, response)=>{ 
    const data = request.body;
    dboperations.getStock(data).then(result => {
       response.status(201).json(result);
    })
})
app.post('/api-nueva-cotizacion', (request, response)=>{ 
    const data = request.body;
    dboperations.addQuote(data).then(result => {
       response.status(201).json(result);
    })
})


//