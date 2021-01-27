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

async function addQuote(data) {

    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('dateQuote', sql.NVarChar, data.dateQuote)
            .input('entRUC', sql.NVarChar, data.entRUC)
            .input('entCompleteName', sql.NVarChar, data.entCompleteName)
            .input('entContact', sql.NVarChar, data.entContact)
            .input('entTelContact', sql.Int, data.entTelContact)
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
            .input('otherCost', sql.Int, data.otherCost)
            .input('totalCost', sql.Float, data.totalCost )
            .input('BeginigDate', sql.NVarChar, data.BeginigDate)
            .input('FinishDate', sql.NVarChar, data.FinishDate)
            .input('IDdetail', sql.Int, data.IDdetail)
            .execute('enterprise.insertRegistrocotizacion');
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


module.exports = {
    getCourses: getCourses,
    getBuddy: getBuddy,
    getStock : getStock,
    addOrder : addOrder,
    updateStock: updateStock,
    getMonth: getMonth,
    getEmpresas: getEmpresas,
    addQuote: addQuote
}