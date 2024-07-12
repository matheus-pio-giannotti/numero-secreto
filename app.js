let listaDeNumerosAleatoriosGerados = [];
let limiteDeNumerosAleatoriosGerados = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

let tituloAba = document.querySelector('title');
tituloAba.innerHTML = 'Jogo Do Número Secreto - Versão 1.0';

function exibirTextoNaTela(tag, tituloParagrafo) {
    let textoNaTela = document.querySelector(tag);
    textoNaTela.innerHTML = tituloParagrafo;
    responsiveVoice.speak(tituloParagrafo,'Brazilian Portuguese Female', {rate:1.1});
}

function mensagensNaTela() {
    exibirTextoNaTela('h1', 'Jogo Do Número Secreto');
    exibirTextoNaTela('p', `Escolha Um Número Entre 1 E ${limiteDeNumerosAleatoriosGerados}:`);   
}

mensagensNaTela();

function verificarJogar() {
    let jogar = document.querySelector('input').value;

    if (jogar == numeroSecreto) {
        let palavraTentativas = tentativas > 1 ? 'Tentativas' : 'Tentativa';
        let mensagemTentativas = `Parabéns! Você Descobriu O Número Secreto Com ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela('h1','Você Acertou!');
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (jogar > numeroSecreto) {
            exibirTextoNaTela('h1','Você Errou!');
            exibirTextoNaTela('p', `O Número Secreto É Menor Que ${jogar}.`);
        } else {
            exibirTextoNaTela('h1','Você Errou!');
            exibirTextoNaTela('p', `O Número Secreto É Maior Que ${jogar}.`);
        }
        tentativas++
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroAleatorioGerado = parseInt(Math.random() * limiteDeNumerosAleatoriosGerados + 1);
    let quantidadeDeNumerosAleatoriosGerados = listaDeNumerosAleatoriosGerados.length;
    
    if (quantidadeDeNumerosAleatoriosGerados == limiteDeNumerosAleatoriosGerados) {
        listaDeNumerosAleatoriosGerados = [];
    }
    
    if (listaDeNumerosAleatoriosGerados.includes(numeroAleatorioGerado)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosAleatoriosGerados.push(numeroAleatorioGerado);
        console.log(listaDeNumerosAleatoriosGerados);
        return numeroAleatorioGerado;
    }
}

function limparCampo() {
    jogar = document.querySelector('input');
    jogar.value = '';
}

function iniciarNovoJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagensNaTela();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}