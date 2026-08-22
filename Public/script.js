const botaoC = document.getElementById('botaoCadastrar');
botaoC.addEventListener('click', function() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    console.log(usuario, senha);
    
    fetch('/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, senha })
    })
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(dados) {
        document.getElementById('mensagem').textContent = dados.message;
    });
})

const botaoE = document.getElementById('botaoEntrar');
botaoE.addEventListener('click', function() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    console.log(usuario, senha);
    
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, senha })
    })
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(dados) {
        document.getElementById('mensagem').textContent = dados.message;
    });
})


