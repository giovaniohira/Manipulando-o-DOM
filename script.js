const html = document.querySelector('html');
const banner = document.querySelector('.app__image');
const texto = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaToggle = document.querySelector('#alternar-musica');
const startPause = document.querySelector('#start-pause');
const icon = document.querySelector('.app__card-primary-butto-icon');

const IniciarEPausarBT = document.querySelector('#start-pause span');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const playE = new Audio('/sons/play.wav');
const pauseE = new Audio('sons/pause.mp3');
const beepE = new Audio('sons/beep.mp3');
musica.loop = true;

let segundosCorridos = 5;
let IntervaloId = null;

focoBt.addEventListener('click', () => {
    alteraContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    alteraContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    alteraContexto('descanso-longo');
   longoBt.classList.add('active');
})

function alteraContexto(contexto) {
    //Passa por cada botão removendo a classe 'active'.
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            texto.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            
            break;
        case "descanso-curto":
            texto.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`;

            break;
        case "descanso-longo":
            texto.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`;

            break;
        default:
            break;
    }
}

musicaToggle.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    }
    else {
        musica.pause();
    }
})

const contagemRegressiva = () => {
    if(segundosCorridos <= 0) {
        parar();
        beepE.play();
        alert('Tempo finalizado!');
        beepE.pause();
        return;
    }
    segundosCorridos -= 1;
    console.log('Temporizador: ' + segundosCorridos);
}

startPause.addEventListener('click', iniciarEPausar)

function iniciarEPausar() {
    if(IntervaloId) {
        parar();
        pauseE.play();
        icon.setAttribute('src', `imagens/play_arrow.png`)
        return;
    }
    playE.play();
    IntervaloId = setInterval(contagemRegressiva, 1000);
    IniciarEPausarBT.textContent = 'Pausar'
    icon.setAttribute('src', `imagens/pause.png`)
}

function parar() {
    clearInterval(IntervaloId);
    IntervaloId = null;
    IniciarEPausarBT.textContent = 'Iniciar'
    icon.setAttribute('src', `imagens/play_arrow.png`)
}