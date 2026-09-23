const audioContext = new AudioContext();

let audioBuffer = null;
let sourceAtual = null;

// Pré-carrega e decodifica o MP3
async function carregarAudio() {
  const resposta = await fetch("comentar.ogg");
  const arrayBuffer = await resposta.arrayBuffer();

  audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  console.log("Áudio carregado!");
}

carregarAudio();

function tocar() {
  if (!audioBuffer) return;

  // Interrompe o áudio anterior
  if (sourceAtual) {
    sourceAtual.stop();
  }

  // Cria uma nova reprodução
  sourceAtual = audioContext.createBufferSource();

  sourceAtual.buffer = audioBuffer;
  sourceAtual.connect(audioContext.destination);

  // Começa do início
  sourceAtual.start(0);
}

document
  .querySelector("#btnVamos")
  .addEventListener("pointerdown", tocar);