var config = require('./dbconfig');
const sql = require('mssql');

async function getCourses() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from buddydetailcourse");
        return products.recordsets;
    } 
    catch (error) {
        console.log(error);
    }
}


async function getBuddy() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from disponibilidadbuddy");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getEmpresas() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT razonSocial, entRUC, sector from enterprise.enterprisedetail");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getEmpresasbyRUC(data) {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
        .input('input_parameter', sql.NVarChar, data.custID)
        .query("SELECT razonSocial, entRUC, sector from enterprise.enterprisedetail where entRUC = @input_parameter");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}


async function getStock(data) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, data.month)
            .input('input_parameter2', sql.NVarChar, data.availableday)
            .input('input_parameter3', sql.NVarChar, data.buddyCompleteName)
            .input('input_parameter4', sql.Int, data.initialHour)
            .query("SELECT * from disponibilidadbuddy where month = @input_parameter and availableday = @input_parameter2 and buddyCompleteName = @input_parameter3 and initialHour = @input_parameter4");  
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
} 

async function addOrder(data) {

    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('date', sql.NVarChar, data.currentdate)
            .input('idLead', sql.NVarChar, data.idlead)
            .input('names', sql.NVarChar, data.nom)
            .input('surName', sql.NVarChar, data.surName)
            .input('course', sql.NVarChar, data.curso)
            .input('courseCode', sql.NVarChar, data.currentdate)
            .input('detailCodeCourse', sql.NVarChar,data.currentdate)
            .input('courseAge', sql.NVarChar, data.edad)
            .input('buddyName', sql.NVarChar, data.buddyCompleteName)
            .input('buddyCode', sql.NVarChar, data.currentdate)
            .input('day', sql.NVarChar, data.availableday)
            .input('hour', sql.NVarChar, data.initialHour)
            .execute('insertRegistroReserva');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

async function addDetailQuote(data) {

    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
        .input('idquote', sql.NVarChar, data.comod)
            .input('course', sql.NVarChar, data.course)
            .input('coursecode', sql.NVarChar, data.comod)
            .input('detailcoursecode', sql.NVarChar, data.comod)
            .input('age', sql.NVarChar, data.age)
            .input('cost', sql.NVarChar, data.cost)
            .input('creationdate', sql.NVarChar, data.comod)
            .input('editiondate', sql.NVarChar, data.comod)
            .input('hourqty', sql.Int, data.hourqty)
            .execute('enterprise.insertdetailquote');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

async function addQuote(data) {

    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('entRUC', sql.NVarChar, data.entRUC)
            .input('dateQuote', sql.NVarChar, data.dateQuote)
            .input('entCompleteName', sql.NVarChar, data.entCompleteName)
            //.input('telcontacto', sql.NVarChar, data.telcontacto)
            .input('entContact', sql.NVarChar, data.entContact)
            .input('entTelContact', sql.NVarChar, data.entTelContact)
            .input('quoteAmount', sql.Float, data.quoteAmount)
            .input('numChild', sql.Int, data.numChild)
            .input('numHour', sql.Float, data.numHour)
            .input('costperHourBuddy', sql.Float, data.costperHourBuddy)
            .input('numZoom', sql.Int, data.numZoom)
            .input('costZoom', sql.Float, data.costZoom)
            .input('numLiscKydemy', sql.Int, data.numLiscKydemy)
            .input('costKydemy', sql.Float, data.costKydemy )
            .input('numModerador', sql.Int, data.numModerador)
            .input('costPerModerador', sql.Float, data.costPerModerador )
            .input('otherCost', sql.Float, data.otherCost)
            .input('totalCost', sql.Float, data.totalCost )
            .input('BeginigDate', sql.NVarChar, data.BeginigDate)
            .input('FinishDate', sql.NVarChar, data.FinishDate)
            .input('IDdetail', sql.Int, data.IDdetail)
            .input('programa', sql.NVarChar, data.programa)
            .input('especificacion', sql.NVarChar, data.especificacion)
            .input('area', sql.NVarChar, data.area)
            .execute('enterprise.insertRegistrocotizacion');
        return insertProduct.recordsets;
        
    }
    catch (err) {
        console.log(err);
    }

}


async function editQuote(data) {

    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('quoteID', sql.Float, data.idquote)
            .input('entTelContact', sql.NVarChar, data.entelcontacto)
            .input('quoteAmount', sql.Float, data.BidmontoventaEmp)
            .input('numChild', sql.Int, data.BNumHorEmpC)
            .input('numHour', sql.Float, data.BNumNinEmpC)
            .input('costperHourBuddy', sql.Float, data.BCosBudEmpC)
            .input('numZoom', sql.Int, data.BNumZoomEmpC)
            .input('costZoom', sql.Float, data.BCosZoomEmpC)
            .input('numLiscKydemy', sql.Int, data.BNumKydemiEmpC)
            .input('costKydemy', sql.Float, data.BCosKydemiEmpC )
            .input('numModerador', sql.Int, data.BNumModEmpC)
            .input('costPerModerador', sql.Float, data.BCosModEmpC)
            .input('otherCost', sql.Int, data.BotroCosEmpC)
            .input('totalCost', sql.Float, data.TotalCosEmpC)
            .input('editdate', sql.Date, data.date)
            .input('estado', sql.NVarChar, data.estado)
            .execute('enterprise.updatequote')
        return insertProduct.recordsets;
        
    }
    catch (err) {
        console.log(err);
    }

}

async function updateStock(data) {
    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('month', sql.NVarChar, data.month)
            .input('year', sql.NVarChar, data.year)
            .input('availableday', sql.NVarChar, data.availableday)
            .input('buddyCompleteName', sql.NVarChar, data.buddyCompleteName)
            .input('initialHour', sql.NVarChar, data.initialHour)
            .execute('updateStock');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}


async function getMonth() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from mes");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getEntStatus() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT estado from enterprise.estadocot");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getLeadFuente() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT fuente from enterprise.fuentelead");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getQuotes() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT top 20 format(dateQuote, 'dd-MM-yy') as dateQuote, quoteID, entCompleteName,numChild, numHour, totalCost, quoteAmount from enterprise.enterprisequote group by dateQuote, quoteID, entCompleteName,numChild, numHour, totalCost, quoteAmount order by dateQuote desc");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getDetailQuote(data) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, data.custID)
            .query("SELECT * from [enterprise].[enterprisequote] where quoteID = @input_parameter");  
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
} 

async function getDetailQuotesbyRuc(data) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.NVarChar, data.custID)
            .query("SELECT * from [enterprise].[enterprisequote] where entRUC = @input_parameter");  
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
} 

async function addNewLeadB2B(data) {

    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('creationdate', sql.NVarChar, data.idrubro)
            .input('ruc', sql.NVarChar, data.ruc)
            .input('razonsocial', sql.NVarChar, data.razonsocial)
            .input('rubro', sql.NVarChar, data.rubro)
            .input('fuente', sql.NVarChar, data.fuente)
            .input('cargo', sql.NVarChar, data.cargo)
            .input('area', sql.NVarChar, data.area)
            .input('nomcontacto', sql.NVarChar, data.nomcontacto)
            .input('telcontacto', sql.NVarChar, data.telcontacto)
            .input('programa',sql.NVarChar, data.programa)
            .input('especificacion',sql.NVarChar, data.especificacion)
            .execute('enterprise.insertarleads');
        return insertProduct.recordsets;
        
    }
    catch (err) {
        console.log(err);
    }

}

async function getLeadArea() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT area from enterprise.areas");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getLeadPrograma() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT programa from enterprise.programa");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getLeadEspecificacion() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT especificacion from enterprise.programaEspecificacion");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getFuenteLeadB2C() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT NombreFuente from dbo.Leadfuente");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function addNewLeadB2C(data) {

    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('creationdate', sql.NVarChar, data.creationdate)
            .input('mothernames', sql.NVarChar, data.mothernames)
            .input('parentSurNameP', sql.NVarChar, data.parentSurNameP)
            .input('NombreFuente', sql.NVarChar, data.NombreFuente)
            .input('names', sql.NVarChar, data.names)
            .input('surNameP', sql.NVarChar, data.surNameP)
            .input('edad', sql.int, data.edad)
            .input('parentCellphone', sql.int, data.parentCellphone)
            .input('parentcorreo', sql.NVarChar, data.parentcorreo)
            .input('fecharegistro', sql.datetime, data.fecharegistro)
            .execute('personas.insertarleadsB2C');
        return insertProduct.recordsets;
        
    }
    catch (err) {
        console.log(err);
    }

}


module.exports = {
    getCourses: getCourses,
    getBuddy: getBuddy,
    getStock : getStock,
    addOrder : addOrder,
    updateStock: updateStock,
    getMonth: getMonth,
    getEmpresas: getEmpresas,
    addQuote: addQuote,
    getQuotes:getQuotes,
    getDetailQuote:getDetailQuote,
    getDetailQuotesbyRuc:getDetailQuotesbyRuc,
    addDetailQuote:addDetailQuote,
    editQuote:editQuote,
    getEntStatus:getEntStatus,
    getEmpresasbyRUC:getEmpresasbyRUC,
    getLeadFuente:getLeadFuente,
    addNewLeadB2B:addNewLeadB2B,
    getLeadPrograma:getLeadPrograma,
    getLeadArea:getLeadArea,
    getLeadEspecificacion:getLeadEspecificacion,
    getFuenteLeadB2C:getFuenteLeadB2C,
    addNewLeadB2C:addNewLeadB2C
}