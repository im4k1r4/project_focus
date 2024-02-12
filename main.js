const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const image = document.querySelector('.app__image')
const texto = document.querySelector('.app__title')
const buttons = document.querySelectorAll('.app__card-button')
const tempoTela = document.querySelector('#timer')
const startPauseBt = document.querySelector('#start-pause span')
const startPauseIcon = document.querySelector('.app__card-primary-butto-icon')
const musica = new Audio ('/sons/luna-rise-part-one.mp3')
const musicaFocoInput = document.querySelector('#alternar-musica')
const audioPlay = new Audio ('/sons/play.wav')
const audioPause = new Audio ('/sons/pause.mp3')
const audioTempoFinalizado = new Audio ('/sons/beep.mp3')

let tempoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', ()=>{
    tempoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', ()=> {
    tempoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', ()=> {
    tempoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    html.setAttribute('data-contexto', contexto)
    image.setAttribute('src', `/imagens/${contexto}.png`)
    buttons.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    switch (contexto) {
        case "foco":
            texto.innerHTML = 
            `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto": 
            texto.innerHTML = 
            `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
        case "descanso-longo": 
            texto.innerHTML = 
            `Hora de voltar à superficie,<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break
    }
}

const contagemRegressiva = ()=>{
    if (tempoEmSegundos <= 0){
        audioTempoFinalizado.play()
        zerar()
        return
    }
    tempoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        audioPause.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    startPauseBt.textContent = 'Pausar'
    startPauseIcon.setAttribute('src', '/imagens/pause.png')
}

function zerar(){
    clearInterval(intervaloId)
    startPauseBt.textContent = 'Começar'
    startPauseIcon.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()