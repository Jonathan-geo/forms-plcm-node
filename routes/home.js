const express = require('express');
const router = express.Router();
require('../config/databaseConfig');

router.get('/', (req, res)=>{
    res.render("index")
})

router.get('/dashVisitas', (req, res)=>{
    res.render("dashVisitas")
})

router.get('/dashSegmento', (req, res)=>{
    res.render("dashSegmento")
})


/*
*
*
//==================cadProduto======================
//==================ROTA CONSULTA PRODUTO======================
*
*
*/
router.get('/cadProduto', (req, res) =>{
    global.conn.request()
    //QUERY SELECT GRUPO EMPRESARIAL
    .query('SELECT DISTINCT [Grupo Empresarial] FROM FormEntrada_CadastroOS ORDER BY [Grupo Empresarial] ASC')
    .then(grupoEmpresarial => {
        global.conn.request()
        //QUERY SELECT ACCOUNT EXECUTIVE (AE)
        .query('SELECT [Account Executive] FROM FormEntrada_AccountExecutive_carga ORDER BY [Account Executive] ASC')
        .then(accountExecutive => {
            global.conn.request()
            //QUERY SELECT PRODUTO
            .query('SELECT produto FROM FormEntrada_Produto_carga ORDER BY produto ASC')
            .then(produto => {
                global.conn.request()
                //QUERY SELECT GESTOR CLIENTE SONDA - ATUAL GESTOR DE PLCM (ANTIGO AM)
                .query('SELECT * FROM FormEntrada_AM_carga ORDER BY AM ASC')
                .then(gestorPLCM => {
                    global.conn.request()
                    //QUERY SELECT GESTOR DE CONTA (GR)
                    .query('SELECT * FROM FormEntrada_GestorConta_carga ORDER BY Gestor_Conta ASC')
                    .then(gestorContaGR => {
                        res.render("cadProduto", {
                            grupoEmpresarial: grupoEmpresarial.recordset, 
                            accountExecutive: accountExecutive.recordset,
                            produtos: produto.recordset,
                            gestorPLCM: gestorPLCM.recordset,
                            gestorContaGR: gestorContaGR.recordset
                        })
                    })
                    .catch(error => {
                        res.status(500).send(error);
                        console.log("Erro ao consultar a categoria GESTOR DE CONTA (GR)");
                    });   
                })
                .catch(error => {
                    res.status(500).send(error);
                    console.log("Erro ao consultar a categoria GESTOR CLIENTE SONDA (PLCM)");
                });
            })
            .catch(error => {
                res.status(500).send(error);
                console.log("Erro ao consultar a categoria PRODUTO");
            });
        })
        .catch(error => {
            res.status(500).send(error);
            console.log("Erro ao consultar a categoria ACCOUNT EXECUTIVE (AE)");
        });
    })
    .catch(error => {
        res.status(500).send(error);
        console.log("Erro ao consultar a categoria GRUPO EMPRESARIAL");
    });
})


//==================ROTA CONSULTA CLIENTE======================
router.post('/tcliente', (req, res) =>{
    //console.log("SQL Recebe Grupo de Axios: " + req.body.grupo)
    global.conn.request()
    .query("SELECT DISTINCT ds_Cliente FROM FormEntrada_CadastroOS WHERE [Grupo Empresarial] LIKE '%"+req.body.grupo+"%'")
    .then(clienteLike => {
        if(clienteLike.recordset.length == 0) {
            global.conn.request()
            .query("SELECT DISTINCT ds_Cliente FROM FormEntrada_CadastroOS WHERE [Grupo Empresarial] = '"+req.body.grupo+"'")
            .then(clienteNull => {
                //console.log("SQL Envia Array clienteNull para Axios: ");
                //console.log(clienteNull.recordset);
                res.json(clienteNull.recordset)
            })
            .catch(error => {
                res.status(500).send(error);
                console.log("Erro ao consultar o Cliente 2º query");
            });
        }else{
            //console.log("SQL Envia Array clienteLike para Axios: ");
            //console.log(clienteLike.recordset);
            res.json(clienteLike.recordset)
        }
    })
    .catch(error => {
        res.status(500).send(error);
        console.log("Erro ao consultar o Cliente 1º query");
    });
})



//=======================ROTA CONSULTA CNPJ=====================
router.post('/tcnpj', (req, res) =>{
    //console.log("SQL Recebe Cliente de Axios: " + req.body.cliente)
    global.conn.request()
    .query("SELECT DISTINCT ds_CNPJCliente FROM FormEntrada_CadastroOS WHERE ds_Cliente LIKE '%"+req.body.cliente+"%'")
    .then(cnpjLike => {
        if(cnpjLike.recordset.length == 0) {
            global.conn.request()
            .query("SELECT DISTINCT ds_CNPJCliente FROM FormEntrada_CadastroOS WHERE ds_Cliente = '"+req.body.cliente+"'")
            .then(cnpjNull => {
                //console.log("SQL Envia Array cnpjNull para Axios: ");
                //console.log(cnpjNull.recordset);
                res.json(cnpjNull.recordset)
            })
            .catch(error => {
                res.status(500).send(error);
                console.log("Erro ao consultar o CNPJ 2º query");
            });
        }else{
            //console.log("SQL Envia Array cnpjLike para Axios: ");
            //console.log(cnpjLike.recordset);
            res.json(cnpjLike.recordset)
        }
    })
    .catch(error => {
        res.status(500).send(error);
        console.log("Erro ao consultar o CNPJ 1º query");
    });
})



//===============ROTA CONSULTA OS==================
router.post('/tos', (req, res) =>{
    //console.log("SQL Recebe CNPJ de Axios: " + req.body.cnpj)
    global.conn.request()
    .query("SELECT DISTINCT OS FROM FormEntrada_CadastroOS WHERE ds_CNPJCliente LIKE '%"+req.body.cnpj+"%'")
    .then(osLike => {
        if(osLike.recordset.length == 0) {
            global.conn.request()
            .query("SELECT DISTINCT OS FROM FormEntrada_CadastroOS WHERE ds_CNPJCliente = '"+req.body.cnpj+"'")
            .then(osNull => {
                //console.log("SQL Envia Array osNull para Axios: ");
                //console.log(osNull.recordset);
                res.json(osNull.recordset)
            })
            .catch(error => {
                res.status(500).send(error);
                console.log("Erro ao consultar a OS 2º query");
            });
        }else{
            //console.log("SQL Envia Array osLike para Axios: ");
            //console.log(osLike.recordset);
            res.json(osLike.recordset)
        }
    })
    .catch(error => {
        res.status(500).send(error);
        console.log("Erro ao consultar a OS 1º query");
    });
})


//==================cadProduto======================
//==================ROTA INSERT PRODUTO======================
router.post('/cadProduto', (req, res) =>{
       
    let item_os = req.body.item_os;
    let item_cliente = req.body.item_cliente;
    let item_grupo = req.body.item_grupo;
    let item_cnpj = req.body.item_cnpj;
    let item_ae = req.body.item_ae;
    let item_gc = req.body.item_gc;
    let item_plcm = req.body.item_plcm;
    let item_produto = req.body.item_produto;
    let item_nome = req.body.item_nome;
    let item_email = req.body.item_email;
    let item_telefone = req.body.item_telefone;
    let item_frente = req.body.item_frente;


    //INSERT PRODUTOS
    global.conn.request()
    .query(
        `INSERT INTO FormOut_ProdutosDev (Grupo_Empresarial, Cliente, CNPJ, OS, Produtos) 
            VALUES( '${item_grupo}','${item_cliente}','${item_cnpj}','${item_os}','${item_produto}')`
    )
    .then(resp => {
        //INSERT GESTOR
        global.conn.request()
        .query(
            `INSERT INTO FormOut_GestaoSondaDev (Grupo_Empresarial, Cliente, CNPJ, OS, Account_Executive_AE, Gestor_de_Conta, Gestor_Cliente_Sonda) 
                VALUES ('${item_grupo}','${item_cliente}','${item_cnpj}','${item_os}','${item_ae}','${item_gc}','${item_plcm}')`
        )
        .then(resp => {
            for(let i = 0; i<item_nome.length; i++){
                //INSERT CONTATOS
                global.conn.request()
                .query(
                    `INSERT INTO FormOut_ContatoClienteDev (Grupo_Empresarial, Cliente, CNPJ, OS, nome_contato_cliente, email_contato_cliente, telefone_contato_cliente, frente_contato_cliente) 
                        VALUES ('${item_grupo}','${item_cliente}','${item_cnpj}','${item_os}','${item_nome[i]}','${item_email[i]}','${item_telefone[i]}','${item_frente[i]}')`
                )
                .then(resp => {
                    res.send('Dados Inseridos com Sucesso!')
                })
                .catch(error => {
                    res.status(500).send(error);
                    console.log("Erro ao inserir dados na tabela FormOut_ContatoClienteDev");
                });
            }
        })
        .catch(error => {
            res.status(500).send(error);
            console.log("Erro ao inserir dados na tabela FormOut_GestaoSondaDev");
        });
    })
    .catch(error => {
        res.status(500).send(error);
        console.log("Erro ao inserir dados na tabela FormOut_ProdutosDev");
    });

})





/*
*
*
*
//==================cadVisitas======================
//==================ROTA CONSULTA VISITAS======================
*
*
*
*/
router.get('/cadVisitas', (req, res) =>{
    global.conn.request()
    //QUERY SELECT GRUPO EMPRESARIA
    .query('SELECT DISTINCT [Grupo Empresarial] FROM FormEntrada_CadastroOS ORDER BY [Grupo Empresarial] ASC')//OK--------------
    .then(grupoEmpresarial => {
        global.conn.request()
        //QUERY SELECT DIRETORIA
        .query('SELECT diretoria FROM FormEntrada_Diretoria_carga ORDER BY diretoria ASC')//OK--------------
        .then(diretoria => {
            global.conn.request()
            //QUERY SELECT PRODUTO
            .query('SELECT produto FROM FormEntrada_Produto_carga ORDER BY produto ASC')//OK--------------
            .then(produto => {
                global.conn.request()
                //QUERY SELECT GESTOR CLIENTE SONDA - ATUAL GESTOR DE PLCM (ANTIGO AM)
                .query('SELECT AM FROM FormEntrada_AM_carga ORDER BY AM ASC')//OK--------------
                .then(gestorPLCM => {
                    global.conn.request()
                    //QUERY SELECT GESTOR DE CONTA (GR)
                    .query('SELECT Gestor_Conta FROM FormEntrada_GestorConta_carga ORDER BY Gestor_Conta ASC')//OK--------------
                    .then(gestorContaGR => {
                        global.conn.request()
                        //QUERY SELECT GESTOR DE CONTA (GR)
                        .query('SELECT servico FROM FormEntrada_Servico_carga ORDER BY servico ASC')//OK--------------
                        .then(servico => {
    
                            global.conn.request()
                            //QUERY SELECT SATISFAÇÃO
                            .query('SELECT * FROM FormEntrada_MotivosSatisfacao_carga')//OK--------------
                            .then(satsfacao => {
        
                                res.render("cadVisitas", {
                                    grupoEmpresarial: grupoEmpresarial.recordset, 
                                    diretoria: diretoria.recordset,
                                    produtos: produto.recordset,
                                    gestorPLCM: gestorPLCM.recordset,
                                    gestorContaGR: gestorContaGR.recordset,
                                    servico: servico.recordset,
                                    satsfacao: satsfacao.recordset
                                })
                            })
                            .catch(error => {
                                res.status(500).send(error);
                                console.log("Erro ao consultar a categoria SATISFACAO");
                            });

                        })
                        .catch(error => {
                            res.status(500).send(error);
                            console.log("Erro ao consultar a categoria SERVICO");
                        });
                    })
                    .catch(error => {
                        res.status(500).send(error);
                        console.log("Erro ao consultar a categoria GESTOR DE CONTA (GR)");
                    });   
                })
                .catch(error => {
                    res.status(500).send(error);
                    console.log("Erro ao consultar a categoria GESTOR CLIENTE SONDA (PLCM)- AM");
                });
            })
            .catch(error => {
                res.status(500).send(error);
                console.log("Erro ao consultar a categoria PRODUTO");
            });
        })
        .catch(error => {
            res.status(500).send(error);
            console.log("Erro ao consultar a categoria ACCOUNT EXECUTIVE (AE)");
        });
    })
    .catch(error => {
        res.status(500).send(error);
        console.log("Erro ao consultar a categoria Grupo Empresarial");
    }); 
})

//==================cadVisitas======================
//==================ROTA INSERT VISITAS======================
router.post('/cadVisitas', (req, res) =>{

    let Diretoria=req.body.Diretoria;
    let Account_Manager=req.body.Account_Manager;
    let Gestor_Conta=req.body.Gestor_Conta;
    let Grupo=req.body.Grupo;
    let Cliente=req.body.Cliente;
    let Produto=req.body.Produto;
    let Servico=req.body.Servico;
    let Partic_Clientes=req.body.Partic_Clientes;
    let Partic_Sonda=req.body.Partic_Sonda;
    let Motivo_Reuniao=req.body.Motivo_Reuniao;
    let Pontos_Positivos=req.body.Pontos_Positivos;
    let Pontos_Negativos=req.body.Pontos_Negativos;
    let Oportunidades=req.body.Oportunidades;
    let Motivo_Satisfeito1=req.body.Motivo_Satisfeito1;
    let Motivo_Satisfeito2=req.body.Motivo_Satisfeito2;
    let Motivo_Satisfeito3=req.body.Motivo_Satisfeito3;
    let Motivo_Insatisfeito1=req.body.Motivo_Insatisfeito1;
    let Motivo_Insatisfeito2=req.body.Motivo_Insatisfeito2;
    let Motivo_Insatisfeito3=req.body.Motivo_Insatisfeito3;
    let Observacao_Satisfacao=req.body.Observacao_Satisfacao;
    let Canal_visita=req.body.Canal_visita;
    let Num_pessoas_Aereo_Hotel=req.body.Num_pessoas_Aereo_Hotel;
    let Tempo_reuniao=req.body.Tempo_reuniao;
    let Num_pessoas_Uber_Taxi=req.body.Num_pessoas_Uber_Taxi;
    let Data_Visita=req.body.Data_Visita;
    let Temperatura_Reuniao=req.body.Temperatura_Reuniao;
    let Grau_Satisfacao_Geral=req.body.Grau_Satisfacao_Geral;
    
    /*
    const dadosAxios = [{
        'Temperatura_Reuniao':req.body.Temperatura_Reuniao,
        'Grau_Satisfacao_Geral':req.body.Grau_Satisfacao_Geral
    }]
    console.log(dadosAxios);

    res.send('Dados Inseridos com Sucesso!')
    */

    
                    
    //INSERT PRODUTOS
    global.conn.request()
    .query(
        `INSERT INTO FormOut_VisitasDev 
            (
                Grupo_Empresarial, Diretoria, Account_Manager, Gestor_Conta, 
                Cliente, Partic_Clientes, Partic_Sonda, Data_Visita, Servico,

                Produto, Motivo_Reuniao, Pontos_Positivos, Pontos_Negativos, 
                Oportunidades, Temperatura_Reniao, Grau_Satisfacao_Geral,

                Motivo_Satisfeito1, Motivo_Satisfeito2, Motivo_Satisfeito3, 
                Motivo_Insatisfeito1, Motivo_Insatisfeito2, Motivo_Insatisfeito3,

                Observacao_Satisfacao, Canal_visita, Num_pessoas_Aereo_Hotel, 
                Num_pessoas_Uber_Taxi, Tempo_reuniao
            ) 
            VALUES 
            (
                '${Grupo}', '${Diretoria}', '${Account_Manager}', '${Gestor_Conta}', 
                '${Cliente}', '${Partic_Clientes}', '${Partic_Sonda}', '${Data_Visita}', '${Servico}',

                '${Produto}', '${Motivo_Reuniao}', '${Pontos_Positivos}', '${Pontos_Negativos}', 
                '${Oportunidades}', '${Temperatura_Reuniao}', '${Grau_Satisfacao_Geral}',

                '${Motivo_Satisfeito1}', '${Motivo_Satisfeito2}', '${Motivo_Satisfeito3}',
                '${Motivo_Insatisfeito1}', '${Motivo_Insatisfeito2}', '${Motivo_Insatisfeito3}',

                '${Observacao_Satisfacao}', '${Canal_visita}', '${Num_pessoas_Aereo_Hotel}', 
                '${Num_pessoas_Uber_Taxi}', '${Tempo_reuniao}'
            )`
    )                
    .then(resp => {
        res.send('Dados Inseridos com Sucesso!')
    })
    .catch(error => {
        res.status(500).send(error);
        console.log("Erro ao inserir dados na tabela FormOut_ContatoClienteDev");
    });

})




module.exports = router;
