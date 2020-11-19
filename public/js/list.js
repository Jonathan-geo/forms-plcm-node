function showResponse(res){
    let dados = res.data;
    dados.forEach(function(arg) {
        document.querySelector('#mensagem').innerHTML += `
        <div id="remove1">

            <pre>NOME: ${arg.nome}</pre>
            <pre>DATA: ${new Date(arg.data).toLocaleDateString()}</pre>
            <pre>SIMULADO: ${arg.simulado}</pre>
            <pre>ACERTOS: ${arg.acerto}</pre>
            <pre>ERROS: ${arg.erro}</pre>
            <hr>
        
        </div>
    
        `;
    });
}

function showResponse2(res){
    let dados = res.data;
    dados.forEach(function(arg) {
        document.querySelector('#mensagem2').innerHTML += `
        <div id="remove2">

            <pre>NOME: ${arg.nome}</pre>
            <pre>DATA: ${new Date(arg.data).toLocaleDateString()}</pre>
            <pre>SIMULADO: ${arg.simulado}</pre>
            <pre>ACERTOS: ${arg.acerto}</pre>
            <pre>ERROS: ${arg.erro}</pre>
            <hr>
        
        </div>
    
        `;
    });
}




function get(){
    axios.get("/pontuacao/api")
        .then(res =>showResponse(res))
}


function getName(){
    var nome = document.querySelector('#nome').value;

    axios.get("/pontuacao/api/"+nome)
        .then(res =>showResponse2(res))
        
}



function limpar(){
    document.getElementById("remove1").outerHTML = "";
    document.getElementById("remove2").outerHTML = "";
}