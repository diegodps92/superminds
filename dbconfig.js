require('dotenv').config();
const config = {
    user : process.env.API_KEY_US,
    password : process.env.API_KEY,
    server: process.env.API_KEY_SERV,
    database:'BDSuperminds',
    options:{
        trustedconnection: true,
        enableArithAbort : true, 
    },
    encrypt=true,
    port : 1433
}
module.exports = config; 