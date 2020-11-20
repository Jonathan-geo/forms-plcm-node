
$(document).ready(function(){

    //POPULANDO O SELECT CLIENTE
    $('#Grupo').change(function(){
        let selectedeValue = $("#Grupo").val();
        //console.log("Axios Envia Grupo: " + selectedeValue)
        axios.post('/tcliente', {grupo:selectedeValue})
        .then(function (response) {
            //-----------TESTES
            //console.log("Axios Recebe Array Cliente: "); 
            //console.log(response.data);
            if (response != null) {
                let selectbox = $('#Cliente');
                selectbox.find('option').remove();
                for (i = 0; i < response.data.length; i++) {
                    $('<option>').val(response.data[i].ds_Cliente).text(response.data[i].ds_Cliente).appendTo(selectbox);
                }  
            }
            $('#Cliente').trigger('change')
        })
        .catch(function (error) {
            console.log(error);
            alert("Erro ao consultar o banco de dados para obter os dados [ds_Cliente]")
        });
    });




    $('#formVisitas').on('submit', function(event){
        event.preventDefault();

        // ARMAZENA DADOS

        let Diretoria = $('#Diretoria').val();
        let Account_Manager = $('#Account_Manager').val();
        let Gestor_Conta = $('#Gestor_Conta').val();
        let Grupo = $('#Grupo').val();
        let Cliente = $('#Cliente').val();

        //const dados1 = [Diretoria, Account_Manager, Gestor_Conta, Grupo, Cliente]
        //console.log(dados1)


        let Produto = $('#Produto').val();
        let Servico = $('#Servico').val();
        let Partic_Clientes = $('#Partic_Clientes').val();
        let Partic_Sonda = $('#Partic_Sonda').val();

        //const dados2 = [Produto, Servico, Partic_Clientes, Partic_Sonda]
        //console.log(dados2)




        let Motivo_Reuniao = $('#Motivo_Reuniao').val();
        let Pontos_Positivos = $('#Pontos_Positivos').val();
        let Pontos_Negativos = $('#Pontos_Negativos').val();
        let Oportunidades = $('#Oportunidades').val();

        //const dados3 = [Motivo_Reuniao, Pontos_Positivos, Pontos_Negativos, Oportunidades]
        //console.log(dados3)



        let Motivo_Satisfeito1 = $('#Motivo_Satisfeito1').val();
        let Motivo_Satisfeito2 = $('#Motivo_Satisfeito2').val();
        let Motivo_Satisfeito3 = $('#Motivo_Satisfeito3').val();

        //const dados4 = [Motivo_Satisfeito1, Motivo_Satisfeito2, Motivo_Satisfeito3]
        //console.log(dados4)


        let Motivo_Insatisfeito1 = $('#Motivo_Insatisfeito1').val();
        let Motivo_Insatisfeito2 = $('#Motivo_Insatisfeito2').val();
        let Motivo_Insatisfeito3 = $('#Motivo_Insatisfeito3').val();

        //const dados5 = [Motivo_Insatisfeito1, Motivo_Insatisfeito2, Motivo_Insatisfeito3]
        //console.log(dados5)


        let Observacao_Satisfacao = $('#Observacao_Satisfacao').val();
        let Canal_visita = $('#Canal_visita').val();
        let Num_pessoas_Aereo_Hotel = $('#Num_pessoas_Aereo_Hotel').val();

        //const dados6 = [Observacao_Satisfacao, Canal_visita, Num_pessoas_Aereo_Hotel]
        //console.log(dados6)


        let Tempo_reuniao = $('#Tempo_reuniao').val();
        let Num_pessoas_Uber_Taxi = $('#Num_pessoas_Uber_Taxi').val();
        let Data_Visita = $('#Data_Visita').val();


        //const dados7 = [Tempo_reuniao, Num_pessoas_Uber_Taxi, Data_Visita]
        //console.log(dados7)



        let Temperatura_Reuniao = $('#legenda1').val()
        let Grau_Satisfacao_Geral = $('#legenda2').val()
        
        //const dados8 = [Temperatura_Reuniao, Grau_Satisfacao_Geral]
        //console.log(dados8)


        let count_error = 0;
        
        if(Diretoria == null || Diretoria == ""){
            $('#Diretoria_required').text('Selecione um diretor.');
            count_error++;
        }else{
            $('#Diretoria_required').text('');
        }

        if(Account_Manager == null || Account_Manager == ""){
            $('#Account_Manager_required').text('Selecione um Gestor PLCM.');
            count_error++;
        }else{
            $('#Account_Manager_required').text('');
        }

        if(Gestor_Conta == null || Gestor_Conta == ""){
            $('#Gestor_Conta_required').text('Selecione um Gestor de Contas.');
            count_error++;
        }else{
            $('#Gestor_Conta_required').text('');
        }

        if(Servico == null || Servico == ""){
            $('#Servico_required').text('Selecione um Serviço.');
            count_error++;
        }else{
            $('#Servico_required').text('');
        }

        if(Produto == null || Produto == ""){
            $('#Produto_required').text('Selecione um Produto.');
            count_error++;
        }else{
            $('#Produto_required').text('');
        }

        if(Grupo == null || Grupo == ""){
            $('#Grupo_required').text('Selecione um Grupo.');
            count_error++;
        }else{
            $('#Grupo_required').text('');
        }

        if(Cliente == null || Cliente == ""){
            $('#Cliente_required').text('Selecione um Cliente.');
            count_error++;
        }else{
            $('#Cliente_required').text('');
        }

        if(Partic_Clientes == null || Partic_Clientes == ""){
            $('#Partic_Clientes_required').text('Insira a Participação do Cliente.');
            count_error++;
        }else{
            $('#Partic_Clientes_required').text('');
        }

        if(Partic_Sonda == null || Partic_Sonda == ""){
            $('#Partic_Sonda_required').text('Insira a Participação da Sonda.');
            count_error++;
        }else{
            $('#Partic_Sonda_required').text('');
        }

        if(Motivo_Reuniao == null || Motivo_Reuniao == ""){
            $('#Motivo_Reuniao_required').text('Insira o da Motivo da Reunião.');
            count_error++;
        }else{
            $('#Motivo_Reuniao_required').text('');
        }

        if(Pontos_Positivos == null || Pontos_Positivos == ""){
            $('#Pontos_Positivos_required').text('Insira um Ponto Positivo.');
            count_error++;
        }else{
            $('#Pontos_Positivos_required').text('');
        }

        if(Pontos_Negativos == null || Pontos_Negativos == ""){
            $('#Pontos_Negativos_required').text('Insira um Ponto Negativo.');
            count_error++;
        }else{
            $('#Pontos_Negativos_required').text('');
        }

        if(Oportunidades == null || Oportunidades == ""){
            $('#Oportunidades_required').text('Insira uma Oportunidade.');
            count_error++;
        }else{
            $('#Oportunidades_required').text('');
        }

        if(Motivo_Satisfeito1 == null || Motivo_Satisfeito1 == ""){
            $('#Motivo_Satisfeito1_required').text('Insira uma Satisfação.');
            count_error++;
        }else{
            $('#Motivo_Satisfeito1_required').text('');
        }

        if(Motivo_Insatisfeito1 == null || Motivo_Insatisfeito1 == ""){
            $('#Motivo_Insatisfeito1_required').text('Insira uma Satisfação.');
            count_error++;
        }else{
            $('#Motivo_Insatisfeito1_required').text('');
        }

        if(Canal_visita == null || Canal_visita == ""){
            $('#Canal_visita_required').text('Selecione o Canal de visita.');
            count_error++;
        }else{
            $('#Canal_visita_required').text('');
        }

        if(Num_pessoas_Aereo_Hotel == null || Num_pessoas_Aereo_Hotel == ""){
            $('#Num_pessoas_Aereo_Hotel_required').text('Selecione a quantidade de pessoas.');
            count_error++;
        }else{
            $('#Num_pessoas_Aereo_Hotel_required').text('');
        }

        if(Num_pessoas_Uber_Taxi == null || Num_pessoas_Uber_Taxi == ""){
            $('#Num_pessoas_Uber_Taxi_required').text('Selecione a quantidade de pessoas.');
            count_error++;
        }else{
            $('#Num_pessoas_Uber_Taxi_required').text('');
        }

        if(Tempo_reuniao == null || Tempo_reuniao == ""){
            $('#Tempo_reuniao_required').text('Selecione a Duração da reunião.');
            count_error++;
        }else{
            $('#Tempo_reuniao_required').text('');
        }

        if(Data_Visita == null || Data_Visita == ""){
            $('#Data_Visita_required').text('Insira a Data da Reunião.');
            count_error++;
        }else{
            $('#Data_Visita_required').text('');
        }

        if(Temperatura_Reuniao == null || Temperatura_Reuniao == ""){
            $('#Temperatura_Reuniao_required').text('Selecione uma estrela');
            count_error++;
        }else{
            $('Temperatura_Reuniao_required').text('');
        }

        if(Grau_Satisfacao_Geral == null || Grau_Satisfacao_Geral == ""){
            $('#Grau_Satisfacao_Geral_required').text('Selecione uma estrela.');
            count_error++;
        }else{
            $('#Grau_Satisfacao_Geral_required').text('');
        }
        
        if(count_error == 0){

            axios.post('/cadVisitas', 
                {
                    Diretoria:Diretoria,
                    Account_Manager:Account_Manager,
                    Gestor_Conta:Gestor_Conta,
                    Grupo:Grupo,
                    Cliente:Cliente,
                    Produto:Produto,
                    Servico:Servico,
                    Partic_Clientes:Partic_Clientes,
                    Partic_Sonda:Partic_Sonda,
                    Motivo_Reuniao:Motivo_Reuniao,
                    Pontos_Positivos:Pontos_Positivos,
                    Pontos_Negativos:Pontos_Negativos,
                    Oportunidades:Oportunidades,
                    Motivo_Satisfeito1:Motivo_Satisfeito1,
                    Motivo_Satisfeito2:Motivo_Satisfeito2,
                    Motivo_Satisfeito3:Motivo_Satisfeito3,
                    Motivo_Insatisfeito1:Motivo_Insatisfeito1,
                    Motivo_Insatisfeito2:Motivo_Insatisfeito2,
                    Motivo_Insatisfeito3:Motivo_Insatisfeito3,
                    Observacao_Satisfacao:Observacao_Satisfacao,
                    Canal_visita:Canal_visita,
                    Num_pessoas_Aereo_Hotel:Num_pessoas_Aereo_Hotel,
                    Tempo_reuniao:Tempo_reuniao,
                    Num_pessoas_Uber_Taxi:Num_pessoas_Uber_Taxi,
                    Data_Visita:Data_Visita,
                    Temperatura_Reuniao:Temperatura_Reuniao,
                    Grau_Satisfacao_Geral:Grau_Satisfacao_Geral
                }
            )
            .then(function (response) {

                //Limpa os campos com a classe selectpicker
                $('.selectpicker').selectpicker('val','');

                $('#Cliente').val('');
                $('#Partic_Clientes').val('');
                $('#Partic_Sonda').val('');
                $('#Motivo_Reuniao').val('');
                $('#Pontos_Positivos').val('');
                $('#Pontos_Negativos').val('');
                $('#Oportunidadess').val('');
                $('#Observacao_Satisfacao').val('');
                $('#Data_Visita').val('');
                $('#Temperatura_Reniao').val('');
                $('#Grau_Satisfacao_Geral').val('');
                $('#legenda1').val('');
                $('#legenda2').val('');
                $('#legenda1').html('');
                $('#legenda2').html('');
                $('#vazio1').prop( "checked", true );
                $('#vazio2').prop( "checked", true );

                Swal.fire({
                    width: 300,
                    icon: 'success',
                    title: `<h4>${response.data}</h4>`,
                    showConfirmButton: true,
                });

            })
            .catch(function (error) {
                console.log(error);


                //Limpa os campos com a classe selectpicker
                $('.selectpicker').selectpicker('val','');

                $('#Cliente').val('');
                $('#Partic_Clientes').val('');
                $('#Partic_Sonda').val('');
                $('#Motivo_Reuniao').val('');
                $('#Pontos_Positivos').val('');
                $('#Pontos_Negativos').val('');
                $('#Oportunidadess').val('');
                $('#Observacao_Satisfacao').val('');
                $('#Data_Visita').val('');
                $('#Temperatura_Reniao').val('');
                $('#Grau_Satisfacao_Geral').val('');
                $('#legenda1').val('');
                $('#legenda2').val('');
                $('#legenda1').html('');
                $('#legenda2').html('');
                $('#vazio1').prop( "checked", true );
                $('#vazio2').prop( "checked", true );


                Swal.fire({
                    width: 300,
                    icon: 'error',
                    title: `<h4>Erro ao inserir os dados no banco!<h4>`,
                    showConfirmButton: true,
                });


            });

        }

    });
});
