let pontos = document.getElementById("score");
let canvas = document.getElementById("meuCanvas");
let ctx = canvas.getContext("2d");

let score = 0;
let velocidade = 5;
let tamanho = 20,
  vxcobra = 0,
  vycobra = 0,
  corpo = [[12, 11]],
  rastro = [];

let maca = [
  Math.floor(Math.random() * (canvas.width / tamanho)),
  Math.floor(Math.random() * (canvas.width / tamanho)),
];

for (let c = 0; c < corpo.length - 1; c++) {
  rastro.push(corpo[c]);
}

function desenhaCobra() {
  comeu();
  ctx.fillStyle = "white";
  for (let c = 0; c < corpo.length - 1; c++) {
    rastro.push(corpo[c]);
  }
  corpo[0][0] += vxcobra;
  corpo[0][1] += vycobra;
  gameOver();
  corpo = [[corpo[0][0], corpo[0][1]], ...rastro];
  limites();
  corpo.forEach((item) => {
    ctx.fillRect(item[0] * tamanho, item[1] * tamanho, tamanho, tamanho);
  });
  rastro = [];
}

function comeu() {
  let con = corpo[0][0] === maca[0] && corpo[0][1] === maca[1];
  if (con) {
    score += 1;
    randomMaca();
    adicionaGomo();
    velocidade += 1;
    clearInterval(meuIntervalo);
    meuIntervalo = setInterval(() => main(), 1000 / velocidade);
  }
}

function adicionaGomo() {
  if (vycobra === 1) {
    corpo.push([corpo[corpo.length - 1][0], corpo[corpo.length - 1][1] - 1]);
  } else if (vycobra === -1) {
    corpo.push([corpo[corpo.length - 1][0], corpo[corpo.length - 1][1] + 1]);
  } else if (vxcobra === 1) {
    corpo.push([corpo[corpo.length - 1][0] - 1, corpo[corpo.length - 1][1]]);
  } else if (vxcobra === -1) {
    corpo.push([corpo[corpo.length - 1][0] + 1, corpo[corpo.length - 1][1]]);
  }
}

function randomMaca() {
  maca = [
    Math.floor(Math.random() * (canvas.width / tamanho)),
    Math.floor(Math.random() * (canvas.width / tamanho)),
  ];
}

function desenhaMaca() {
  ctx.fillStyle = "red";
  ctx.fillRect(maca[0] * tamanho, maca[1] * tamanho, tamanho, tamanho);
}

function desenhaFundo() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function limpar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function limites() {
  if (vxcobra !== 0 || vycobra !== 0) {
    if (corpo[0][0] === canvas.width / tamanho) {
      corpo[0][0] = -1;
    } else if (corpo[0][0] === -1) {
      corpo[0][0] = canvas.width / tamanho;
    } else if (corpo[0][1] === -1) {
      corpo[0][1] = canvas.height / tamanho;
    } else if (corpo[0][1] === canvas.height / tamanho) {
      corpo[0][1] = -1;
    }
  }
}

function gameOver() {
  if (vycobra !== 0 || vxcobra !== 0) {
    for (let c = 1; c < corpo.length; c++) {
      let teste = corpo[0][0] === corpo[c][0] && corpo[0][1] === corpo[c][1];
      if (teste) {
        start();
      }
    }
  }
}

function controles() {
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (
          vycobra !== 1 &&
          corpo[0][0] !== canvas.width / tamanho &&
          corpo[0][0] !== -1 &&
          corpo[0][1] !== -1 &&
          corpo[0][1] !== canvas.height / tamanho
        ) {
          vycobra = -1;
          vxcobra = 0;
        }
        break;
      case "ArrowDown":
        if (
          vycobra !== -1 &&
          corpo[0][0] !== canvas.width / tamanho &&
          corpo[0][0] !== -1 &&
          corpo[0][1] !== -1 &&
          corpo[0][1] !== canvas.height / tamanho
        ) {
          vycobra = 1;
          vxcobra = 0;
        }
        break;
      case "ArrowLeft":
        if (
          vxcobra !== 1 &&
          corpo[0][0] !== canvas.width / tamanho &&
          corpo[0][0] !== -1 &&
          corpo[0][1] !== -1 &&
          corpo[0][1] !== canvas.height / tamanho
        ) {
          vxcobra = -1;
          vycobra = 0;
        }
        break;
      case "ArrowRight":
        if (
          vxcobra !== -1 &&
          corpo[0][0] !== canvas.width / tamanho &&
          corpo[0][0] !== -1 &&
          corpo[0][1] !== -1 &&
          corpo[0][1] !== canvas.height / tamanho
        ) {
          vxcobra = 1;
          vycobra = 0;
        }
        break;
    }
  });
}
function main() {
  pontos.textContent = `Pontuação: ${score}`;
  limpar();
  desenhaFundo();
  desenhaCobra();
  desenhaMaca();
}

function start() {
  score = 0;
  velocidade = 5;
  tamanho = 20;
  vxcobra = 0;
  vycobra = 0;
  corpo = [[12, 11]];
  rastro = [];

  maca = [
    Math.floor(Math.random() * (canvas.width / tamanho)),
    Math.floor(Math.random() * (canvas.width / tamanho)),
  ];

  for (let c = 0; c < corpo.length - 1; c++) {
    rastro.push(corpo[c]);
  }

  clearInterval(meuIntervalo);
  meuIntervalo = setInterval(() => main(), 1000 / velocidade);

  main();
  controles();
}

let meuIntervalo = setInterval(() => main(), 1000 / velocidade);

start();
