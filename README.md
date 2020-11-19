<h1 align="center">FORMS-NODE</h1> 

<p align="center">
  <img src="https://img.shields.io/static/v1?label=JavaScript&message=EXPRESS&color=blue&style=for-the-badge&logo=JAVASCRIPT"/>

   <img src="http://img.shields.io/static/v1?label=STATUS&message=PROJETO%20MODELO&color=RED&style=for-the-badge"/>
</p>


### Tópicos 

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

:small_blue_diamond: [Funcionalidades](#funcionalidades)

:small_blue_diamond: [Link da Aplicação](#link-da-aplicação)

:small_blue_diamond: [Arquitetura](#arquitetura)

... 

## Descrição do projeto 

<p align="justify">
  Este projeto é um esqueleto de um site/formulário desenvolvido para coleta de dados de clientes de uma empresa. O objetivo é alimentar um banco de dados hospedado no Azure, que posteriormente será consumido por uma ferramenta de ETL e BI. 
</p>

## Funcionalidades

:heavy_check_mark: Um formulário de coleta de dados.


## Link da Aplicação

> Link da aplicação: não disponível.


## Arquitetura

<h4>NPM</h4> 

- npm install -S express
- npm install -S axios
- npm install -S express-handlebars
- npm install --save-dev nodemon
- npm install -S body-parser
- npm install -S mssql

## Configuração de Data Base

Criar uma pasta config com um arquivo: databaseConfig.js

```javascript

const sql = require("mssql");
const hostAz = "string de conexão";
const databaseAz = "******";
const userAz = "*******";
const passwordAz = "**********";

let databaseConfig = {
   user: userAz,
   password: passwordAz,
   server: hostAz,
   database: databaseAz,
   "options": {
   "encrypt": true,
   "enableArithAbort": true
   },
};

//fazendo a conexão global
sql.connect(databaseConfig)
   .then(conn => global.conn = conn)
   .catch(err => console.log(err));



module.exports = databaseConfig;

```

## Referências 

> explooosion /Node.js-Express-With-MSSQL 

https://github.com/explooosion/Node.js-Express-With-MSSQL/blob/master/express-mssql/routes/index.js


> Axios Lib

https://github.com/axios/axios


> Tutorial Node.js com MS SQL Server

https://www.luiztools.com.br/tag/mssql/


> Lib de Alerts

https://sweetalert2.github.io/#examples