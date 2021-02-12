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

app.get('/api-status-emp', (request, response)=>{ 
    dboperations.getEntStatus().then(result => {
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

app.get('/api-obt-cot-total', (request, response)=>{ 
    dboperations.getQuotes().then(result => {
        response.json(result[0]);
     })
})


app.post('/api-obt-det-cot', (request, response)=>{ 
    const datas = request.body;
    dboperations.getDetailQuote(datas).then(result => {
       response.status(201).json(result);
    })
})

app.post('/api-obt-det-cot-byruc', (request, response)=>{ 
    const datas = request.body;
    dboperations.getDetailQuotesbyRuc(datas).then(result => {
       response.status(201).json(result[0]);
    })
})

app.post('/api-post-detailquote', (request, response)=>{ 
    const data = request.body;
    dboperations.addDetailQuote(data).then(result => {
       response.status(201).json(result);
    })
})

app.post('/api-update-quote', (request, response)=>{ 
    const data = request.body;
    dboperations.editQuote(data).then(result => {
       response.status(201).json(result);
    })
})
app.post('/api-getEmpresasbyRUC', (request, response)=>{ 
    const data = request.body;
    dboperations.getEmpresasbyRUC(data).then(result => {
       response.status(201).json(result[0]);
    })
})

app.get('/api-getLeadFuente', (request, response)=>{ 
    const data = request.body;
    dboperations.getLeadFuente(data).then(result => {
       response.status(201).json(result[0]);
    })
})

app.post('/api-addnewlead', (request, response)=>{ 
    const data = request.body;
    dboperations.addNewLeadB2B(data).then(result => {
        console.log(data);
       response.status(201).json(result[0]);
    })
})

app.get('/api-getLeadPrograma', (request, response)=>{ 
    const data = request.body;
    dboperations.getLeadPrograma(data).then(result => {
       response.status(201).json(result[0]);
    })
})

app.get('/api-getLeadEspecificacion', (request, response)=>{ 
    const data = request.body;
    dboperations.getLeadEspecificacion(data).then(result => {
       response.status(201).json(result[0]);
    })
})

//