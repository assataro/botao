const audioContext = new AudioContext();

let audioBuffer = null;
let sourceAtual = null;

const botao = document.querySelector("#btnVamos");

async function carregarAudio() {
    try {
        const response = await fetch("./comentar.ogg");
        const arrayBuffer = await response.arrayBuffer();

        // Aguarda o áudio ser completamente decodificado
        audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        console.log("Áudio carregado!");

        // Agora pode mostrar o botão
        botao.hidden = false;

    } catch (erro) {
        console.error("Erro ao carregar áudio:", erro);
    }
}

async function tocar() {
    if (!audioBuffer) return;

    if (audioContext.state === "suspended") {
        await audioContext.resume();
    }

    // Interrompe imediatamente a reprodução anterior
    if (sourceAtual) {
        try {
            sourceAtual.stop();
        } catch {}
    }

    sourceAtual = audioContext.createBufferSource();
    sourceAtual.buffer = audioBuffer;
    sourceAtual.connect(audioContext.destination);

    // Começa no primeiro segundo
    sourceAtual.start(0, 1);
}

botao.addEventListener("pointerdown", tocar);

carregarAudio();