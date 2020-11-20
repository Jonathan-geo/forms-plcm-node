
$(document).ready(function(){

    console.log('teste1');
    $('#Grupo').change(function(){
        var selectede = $("#Grupo").val();
        $.ajax({
            url: "_php1/fetch_cliente.php",
            method: "POST",
            data: {selected:selectede},
            success:function(data){
                $('#Cliente').html(data);
                $('#Cliente').trigger('change')
            }
        });
    });

    $('#multiple_select_form').on('submit', function(event){
        event.preventDefault();
        var count_error = 0;

        if($('#Diretoria').val() == null){
            $('#Diretoria_required').text('Selecione um diretor.');
            count_error++;
        }else{
            $('#Diretoria_required').text('');
        }

        if($('#Account_Manager').val() == null){
            $('#Account_Manager_required').text('Selecione um Gestor PLCM.');
            count_error++;
        }else{
            $('#Account_Manager_required').text('');
        }

        if($('#Gestor_Conta').val() == null){
            $('#Gestor_Conta_required').text('Selecione um Gestor de Contas.');
            count_error++;
        }else{
            $('#Gestor_Conta_required').text('');
        }

        if($('#Servico').val() == null){
            $('#Servico_required').text('Selecione um Serviço.');
            count_error++;
        }else{
            $('#Servico_required').text('');
        }

        if($('#Produto').val() == null){
            $('#Produto_required').text('Selecione um Produto.');
            count_error++;
        }else{
            $('#Produto_required').text('');
        }

        if($('#Grupo').val() == null){
            $('#Grupo_required').text('Selecione um Grupo.');
            count_error++;
        }else{
            $('#Grupo_required').text('');
        }

        if($('#Cliente').val() == null){
            $('#Cliente_required').text('Selecione um Cliente.');
            count_error++;
        }else{
            $('#Cliente_required').text('');
        }

        if($('#Partic_Clientes').val() == ''){
            $('#Partic_Clientes_required').text('Insira a Participação do Cliente.');
            count_error++;
        }else{
            $('#Partic_Clientes_required').text('');
        }


        if($('#Partic_Sonda').val() == ''){
            $('#Partic_Sonda_required').text('Insira a Participação da Sonda.');
            count_error++;
        }else{
            $('#Partic_Sonda_required').text('');
        }

        if($('#Motivo_Reuniao').val() == ''){
            $('#Motivo_Reuniao_required').text('Insira o da Motivo da Reunião.');
            count_error++;
        }else{
            $('#Motivo_Reuniao_required').text('');
        }

        if($('#Pontos_Positivos').val() == ''){
            $('#Pontos_Positivos_required').text('Insira um Ponto Positivo.');
            count_error++;
        }else{
            $('#Pontos_Positivos_required').text('');
        }

        if($('#Pontos_Negativos').val() == ''){
            $('#Pontos_Negativos_required').text('Insira um Ponto Negativo.');
            count_error++;
        }else{
            $('#Pontos_Negativos_required').text('');
        }

        if($('#Oportunidades').val() == ''){
            $('#Oportunidades_required').text('Insira uma Oportunidade.');
            count_error++;
        }else{
            $('#Oportunidades_required').text('');
        }

        if($('#Motivo_Satisfeito1').val() == ''){
            $('#Motivo_Satisfeito1_required').text('Insira uma Satisfação.');
            count_error++;
        }else{
            $('#Motivo_Satisfeito1_required').text('');
        }

        if($('#Motivo_Insatisfeito1').val() == ''){
            $('#Motivo_Insatisfeito1_required').text('Insira uma Satisfação.');
            count_error++;
        }else{
            $('#Motivo_Insatisfeito1_required').text('');
        }

        if($('#Canal_visita').val() == null){
            $('#Canal_visita_required').text('Selecione o Canal de visita.');
            count_error++;
        }else{
            $('#Canal_visita_required').text('');
        }

        if($('#Num_pessoas_Aereo_Hotel').val() == null){
            $('#Num_pessoas_Aereo_Hotel_required').text('Selecione a quantidade de pessoas.');
            count_error++;
        }else{
            $('#Num_pessoas_Aereo_Hotel_required').text('');
        }

        if($('#Num_pessoas_Uber_Taxi').val() == null){
            $('#Num_pessoas_Uber_Taxi_required').text('Selecione a quantidade de pessoas.');
            count_error++;
        }else{
            $('#Num_pessoas_Uber_Taxi_required').text('');
        }

        if($('#Tempo_reuniao').val() == null){
            $('#Tempo_reuniao_required').text('Selecione a Duração da reunião.');
            count_error++;
        }else{
            $('#Tempo_reuniao_required').text('');
        }

        if($('#Data_Visita').val() == ''){
            $('#Data_Visita_required').text('Insira a Data da Reunião.');
            count_error++;
        }else{
            $('#Data_Visita_required').text('');
        }

        if($('input[name="Temperatura_Reniao"]').val() == null){
            $('#Temperatura_Reniao_required').text('Selecione uma estrela');
            count_error++;
        }else{
            $('Temperatura_Reniao_required').text('');
        }

        if($('input[name="Grau_Satisfacao_Geral"]').val() == null){
            $('#Grau_Satisfacao_Geral_required').text('Selecione uma estrela.');
            count_error++;
        }else{
            $('#Grau_Satisfacao_Geral_required').text('');
        }
        
        if(count_error == 0){
            $.ajax({
                url:"_php1/insert.php",
                method: "POST",
                data: $(this).serialize(),
                success: function(data){
                    $('.selectpicker').selectpicker('val','');
                    $('#Diretoria').val('');
                    $('#Account_Manager').val('');
                    $('#Gestor_Conta').val('');
                    $('#Servico').val('');
                    $('#Cliente').val('');
                    $('#Produto').val('');
                    $('#Partic_Clientes').val('');
                    $('#Partic_Sonda').val('');
                    $('#Motivo_Reuniao').val('');
                    $('#Pontos_Positivos').val('');
                    $('#Pontos_Negativos').val('');
                    $('#Oportunidadess').val('');
                    $('#Motivo_Satisfeito1').val('');
                    $('#Motivo_Satisfeito2').val('');
                    $('#Motivo_Satisfeito3').val('');
                    $('#Motivo_Insatisfeito1').val('');
                    $('#Motivo_Insatisfeito2').val('');
                    $('#Motivo_Insatisfeito3').val('');
                    $('#Observacao_Satisfacao').val('');
                    $('#Canal_visita').val('');
                    $('#Num_pessoas_Aereo_Hotel').val('');
                    $('#Num_pessoas_Uber_Taxi').val('');
                    $('#Tempo_reuniao').val('');
                    $('#Data_Visita').val('');
                    $('#Temperatura_Reniao').val('');
                    $('#Grau_Satisfacao_Geral').val('');
                
                    alert(data);
                }
            });

        }

    });
});
