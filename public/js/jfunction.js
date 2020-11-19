
$(document).ready(function(){
    
    //POPULANDO O SELECT CLIENTE
    $('#tgrupo').change(function(){
        let selectedeValue = $("#tgrupo").val();
        //console.log("Axios Envia Grupo: " + selectedeValue)
        axios.post('/tcliente', {grupo:selectedeValue})
        .then(function (response) {
            //-----------TESTES
            //console.log("Axios Recebe Array Cliente: "); 
            //console.log(response.data);
            if (response != null) {
                let selectbox = $('#tcliente');
                selectbox.find('option').remove();
                for (i = 0; i < response.data.length; i++) {
                    $('<option>').val(response.data[i].ds_Cliente).text(response.data[i].ds_Cliente).appendTo(selectbox);
                }  
            }
            $('#tcliente').trigger('change')
        })
        .catch(function (error) {
            console.log(error);
            alert("Erro ao consultar o banco de dados para obter os dados [ds_Cliente]")
        });
    });



    //POPULANDO O SELECT CNPJ
    $('#tcliente').change(function(){
        let selectedeValue = $("#tcliente").val();
        //console.log("Axios Envia Cliente: " + selectedeValue)
        axios.post('/tcnpj', {cliente:selectedeValue})
        .then(function (response) {
            //-----------TESTES
            //console.log("Axios Recebe Array CNPJ: ");
            //console.log(response.data);
            if (response != null) {
                let selectbox = $('#tcnpj');
                selectbox.find('option').remove();
                for (i = 0; i < response.data.length; i++) {
                    $('<option>').val(response.data[i].ds_CNPJCliente).text(response.data[i].ds_CNPJCliente).appendTo(selectbox);
                }  
            }
            $('#tcnpj').trigger('change')
        })
        .catch(function (error) {
            console.log(error);
            alert("Erro ao consultar o banco de dados para obter os dados [ds_CNPJCliente]")
        });
    });




    //POPULANDO O SELECT OS
    $('#tcnpj').change(function(){
        let selectedeValue = $("#tcnpj").val();
        //console.log("Axios Envia CNPJ: " + selectedeValue)
        axios.post('/tos', {cnpj:selectedeValue})
        .then(function (response) {
            //-----------TESTES
            //console.log("Axios Recebe Array OS: ");
            //console.log(response.data);
            if (response != null) {
                let selectbox = $('#tos');
                selectbox.find('option').remove();
                for (i = 0; i < response.data.length; i++) {
                    $('<option>').val(response.data[i].OS).text(response.data[i].OS).appendTo(selectbox);
                }  
            }
        })
        .catch(function (error) {
            console.log(error);
            alert("Erro ao consultar o banco de dados para obter os dados [OS]")
        });
    });




    var count = 1;
    $('#add').click(function(){
        count = count + 1;
        var html_code = "<tr id='row"+count+"'>";
        html_code += "<td contenteditable='true' class='item_nome' data-label='NOME'></td>";
        html_code += "<td contenteditable='true' class='item_email' data-label='EMAIL'></td>";
        html_code += "<td contenteditable='true' class='item_telefone' data-label='TELEFONE'></td>";
        html_code += "<td contenteditable='true' class='item_frente' data-label='FRENTE'></td>";
        html_code += "<td><button type='button' name='remove' data-row='row"+count+"' class='btn btn-danger btn-xs remove'>-</button></td>";
        html_code += "</tr>";
        $('#crud_table').append(html_code);

    });

    $(document).on('click', '.remove', function(){
        var delete_row = $(this).data("row");
        $('#' + delete_row).remove();
    });




//----------------FUNCAO SUBMIT DO FORMULARIO---------------------
    
    $('#formId').on('submit', function(event){
        event.preventDefault();
        var count_error = 0;


        // ARMAZENA DADOS DA TABELA EM ARRAY

        var item_nome = [];
        var item_email = [];
        var item_telefone = [];
        var item_frente = [];
        
        var item_grupo = $('#tgrupo').val();
        var item_cliente = $('#tcliente').val();
        var item_cnpj = $('#tcnpj').val();
        var item_os = $('#tos').val();

        var item_ae = $('#ae').val(); // ACCOUNT EXECUTIVE
        var item_gc = $('#gc').val(); // GESTOR DE CONTA
        var item_plcm = $('#plcm').val(); // GESTOR DE PLCM (AM)

        var item_produto = $('#tproduto').val(); //Produtos

        $('.item_nome').each(function(){
            item_nome.push($(this).text());
        });
        $('.item_email').each(function(){
            item_email.push($(this).text());
        });
        $('.item_telefone').each(function(){
            item_telefone.push($(this).text());
        });
        $('.item_frente').each(function(){
            item_frente.push($(this).text());
        });
        

        // VERIFICACAO DE CAMPOS SEM VALORES

            // [[GRUPO]]
        if(item_grupo == null || item_grupo == ""){
            $('#grupo_required').text('Selecione um grupo');
            count_error++;
        }else{
            $('#grupo_required').text('');
        }

            // [[CLIENTE]]
        if(item_cliente == null || item_cliente == ""){
            $('#cliente_required').text('Selecione um cliente');
            count_error++;
        }else{
            $('#cliente_required').text('');
        }

            // [[CNPJ]]
        if(item_cnpj == null || item_cnpj == ""){
            $('#cnpj_required').text('Selecione um cnpj');
            count_error++;
        }else{
            $('#cnpj_required').text('');
        }

            // [[OS]]
        if(item_os == null || item_os == ""){
            $('#os_required').text('Selecione uma OS');
            count_error++;
        }else{
            $('#os_required').text('');
        }

        //--------[PRODUTOS]]-------------
        if(item_produto == null || item_produto == ""){
            $('#produto_required').text('Selecione os produtos');
            count_error++;
        }else{
            $('#produto_required').text('');
        }



  
        
        //--------[[ACCOUNT EXECUTIVE (AE)]]---------------
        if(item_ae == null || item_ae == ""){
            $('#ae_required').text('Insira um account executive');
            count_error++;
        }else{
            $('#ae_required').text('');
        }

        //--------[[GESTOR DE CONTA (GC - GR)]]---------------
        if(item_gc == null || item_gc == ""){
            $('#gc_required').text('Insira um gestor de conta');
            count_error++;
        }else{
            $('#gc_required').text('');
        }

        //--------[[GESTOR CLIENTE SONDA (GESTOR DE PLCM (AM))]]---------------
        if(item_plcm == null || item_plcm == ""){
            $('#plcm_required').text('Insira um gestor de plcm');
            count_error++;
        }else{
            $('#plcm_required').text('');
        }

        //--------[[TABELA -- NOME]]---------------
        if(item_nome[count - 1] == ''){
            $('#item_nome_required').text('Insira um nome');
            count_error++;
        }else{
            $('#item_nome_required').text('');
        }

        //--------[[TABELA -- EMAIL]]---------------
        if(item_email[count - 1] == ''){
            $('#item_email_required').text('Insira um email');
            count_error++;
        }else{
            $('#item_email_required').text('');
        }

        //--------[[TABELA -- TELEFONE]]---------------
        if(item_telefone[count - 1] == ''){
            $('#item_telefone_required').text('Insira um telefone');
            count_error++;
        }else{
            $('#item_telefone_required').text('');
        }

        //--------[[TABELA -- FRENTE]]---------------
        if(item_frente[count - 1] == ''){
            $('#item_frente_required').text('Insira uma frente');
            count_error++;
        }else{
            $('#item_frente_required').text('');
        }


        if(count_error == 0){
            // [[ISERCAO]]
            axios.post('/cadProduto', 
                {item_os:item_os, item_cliente:item_cliente, item_grupo:item_grupo, item_cnpj:item_cnpj, 
                item_ae:item_ae, item_gc:item_gc, item_plcm:item_plcm, item_produto:item_produto,
                item_nome:item_nome, item_email:item_email, item_telefone:item_telefone, item_frente:item_frente}
            )
            .then(function (response) {
                //-----------TESTES
                $("td[contentEditable='true']").text("");
                for(var i=2; i<=count; i++){
                    $('tr#'+i+'').remove();
                }

                //Limpa dados dos campos: tproduto, tgrupo, ae, gc, plcm
                $('.selectpicker').selectpicker('val','');

                $('#tos').val('');
                $('#tcnpj').val('');
                $('#tcliente').val('');

                $('#nome1').val('');
                $('#email1').val('');
                $('#telefone1').val('');
                $('#frente1').val('');
                
                Swal.fire({
                    width: 300,
                    icon: 'success',
                    title: `<h4>${response.data}</h4>`,
                    showConfirmButton: true,
                });

            })
            .catch(function (error) {
                console.log(error);
                $("td[contentEditable='true']").text("");
                for(var i=2; i<=count; i++){
                    $('tr#'+i+'').remove();
                }

                //Limpa dados dos campos: tproduto, tgrupo, ae, gc, plcm
                $('.selectpicker').selectpicker('val','');

                $('#tos').val('Selecione um valor');
                $('#tcnpj').val('Selecione um valor');
                $('#tcliente').val('Selecione um valor');

                $('#nome1').val('');
                $('#email1').val('');
                $('#telefone1').val('');
                $('#frente1').val('');

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

