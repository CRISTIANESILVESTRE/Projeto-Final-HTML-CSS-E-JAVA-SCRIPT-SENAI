// ===================== CARROSSEL =====================

const carrossel = document.getElementById("track");
const cartoes = document.querySelectorAll(".card");
const areaPontinhos = document.getElementById("dots");

let posicaoAtual = 0;

// quantos cartões aparecem por vez, de acordo com o tamanho da tela
function cartoesPorTela() {
    if (window.innerWidth >= 700) {
        return 3;
    } else {
        return 1;
    }
}

// quantas "paradas" o carrossel tem
function totalDeParadas() {
    let total = cartoes.length - cartoesPorTela() + 1;
    if (total < 1) {
        total = 1;
    }
    return total;
}

// cria as bolinhas embaixo do carrossel
function criarPontinhos() {
    areaPontinhos.innerHTML = "";

    for (let i = 0; i < totalDeParadas(); i++) {
        const ponto = document.createElement("button");
        ponto.classList.add("dot");

        if (i === posicaoAtual) {
            ponto.classList.add("active");
        }

        ponto.addEventListener("click", function () {
            posicaoAtual = i;
            atualizarCarrossel();
        });

        areaPontinhos.appendChild(ponto);
    }
}

// move o carrossel visualmente até a posição atual
function atualizarCarrossel() {
    const deslocamento = posicaoAtual * (100 / cartoesPorTela());
    carrossel.style.transform = "translateX(-" + deslocamento + "%)";

    const pontinhos = document.querySelectorAll(".dot");
    pontinhos.forEach(function (ponto, i) {
        ponto.classList.toggle("active", i === posicaoAtual);
    });
}

// avança (1) ou volta (-1) um cartão - chamado pelas setas no HTML
function mover(direcao) {
    const ultimaParada = totalDeParadas() - 1;
    posicaoAtual += direcao;

    if (posicaoAtual < 0) posicaoAtual = ultimaParada;
    if (posicaoAtual > ultimaParada) posicaoAtual = 0;

    atualizarCarrossel();
}

// recalcula tudo quando a tela muda de tamanho
window.addEventListener("resize", function () {
    posicaoAtual = 0;
    criarPontinhos();
    atualizarCarrossel();
});

// arrastar com o mouse pra trocar de card
let posicaoInicialMouse = 0;
let arrastando = false;

carrossel.addEventListener("mousedown", function (evento) {
    arrastando = true;
    posicaoInicialMouse = evento.clientX;
});

window.addEventListener("mouseup", function (evento) {
    if (!arrastando) return;
    arrastando = false;

    const distancia = evento.clientX - posicaoInicialMouse;
    const minimoParaTrocar = 60;

    if (distancia < -minimoParaTrocar) {
        mover(1);
    } else if (distancia > minimoParaTrocar) {
        mover(-1);
    }
});

criarPontinhos();
atualizarCarrossel();


// ===================== FORMULÁRIO (Fale com Sonora) =====================
// SEM ALTERAÇÃO

let form = document.getElementById('Fale com Sonora')

form.addEventListener('submit', function (event) {

    let nome = document.getElementById('nome').value
    // previne o comportamento padrão
    event.preventDefault()

    console.log("SUA SOLICITACAO FOI ENVIADA!")

    // alert(" foi enviado com sucesso!")
    alert(`Olá ${nome} sua solicitacao foi enviada com sucesso!`)

    form.reset()

})