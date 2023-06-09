let pontos = document.getElementById("score");
let record = document.getElementById("record");
let canvas = document.getElementById("meuCanvas");
let ctx = canvas.getContext("2d");

let quadros = 10;
let score = 0;
let tamanho = 20;
let vcobra = [0, 0];
let corpo = [[12, 11]];
let rastro = [];

let maca = [
  Math.floor(Math.random() * (canvas.width / tamanho)),
  Math.floor(Math.random() * (canvas.width / tamanho)),
];

for (let c = 0; c < corpo.length - 1; c++) {
  rastro.push(corpo[c]);
}

function desenhaCobra() {
  ctx.beginPath();
  comeu();
  for (let c = 0; c < corpo.length - 1; c++) {
    rastro.push(corpo[c]);
  }
  corpo[0][0] += vcobra[0];
  corpo[0][1] += vcobra[1];
  gameOver();
  limites();
  corpo = [[corpo[0][0], corpo[0][1]], ...rastro];
  
  ctx.fillStyle = "green";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  corpo.forEach((item) => {
    ctx.rect(item[0] * tamanho, item[1] * tamanho, tamanho, tamanho);
  });
  ctx.fill();
  ctx.stroke();
  rastro = [];
}

function comeu() {
  let con = corpo[0][0] === maca[0] && corpo[0][1] === maca[1];
  if (con) {
    score += 1;
    randomMaca();
    adicionaGomo();
  }
}

function adicionaGomo() {
  if (vcobra[1] === 1) {
    corpo.push([corpo[corpo.length - 1][0], corpo[corpo.length - 1][1] - 1]);
  } else if (vcobra[1] === -1) {
    corpo.push([corpo[corpo.length - 1][0], corpo[corpo.length - 1][1] + 1]);
  } else if (vcobra[0] === 1) {
    corpo.push([corpo[corpo.length - 1][0] - 1, corpo[corpo.length - 1][1]]);
  } else if (vcobra[0] === -1) {
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
  if (corpo[0][0] > (canvas.width / tamanho) -1) {
    corpo[0][0] = 0;
  } else if (corpo[0][0] < 0) {
    corpo[0][0] = (canvas.width / tamanho) -1;
  } else if (corpo[0][1] < 0) {
    corpo[0][1] = (canvas.height / tamanho) -1;
  } else if (corpo[0][1] > (canvas.height / tamanho) -1) {
    corpo[0][1] = 0;
  }
}

function gameOver() {
  if (vcobra[0] !== 0 || vcobra[1] !== 0) {
    for (let c = 1; c < corpo.length; c++) {
      let teste = corpo[0][0] === corpo[c][0] && corpo[0][1] === corpo[c][1];
      if (teste) {
        let Arecord = localStorage.getItem('record');
        if (Arecord) {
          if (parseInt(Arecord) < score) {
            localStorage.setItem('record', `${score}`);
          }
        } else {
          localStorage.setItem('record', `${score}`);
        }
        start();
      }
    }
  }
}

function controles() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && vcobra[1] !== 1) {
      vcobra[1] = -1;
      vcobra[0] = 0;
    } else if (e.key === "ArrowDown" && vcobra[1] !== -1) {
      vcobra[1] = 1;
      vcobra[0] = 0;
    } else if (e.key === "ArrowLeft" && vcobra[0] !== 1) {
      vcobra[0] = -1;
      vcobra[1] = 0;
    } else if (e.key === "ArrowRight" && vcobra[0] !== -1) {
      vcobra[0] = 1;
      vcobra[1] = 0;
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
  vcobra = [0,0 ]
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
  meuIntervalo = setInterval(() => main(), 1000 / quadros);

  main();
  controles();
  
  let Lrecord = localStorage.getItem('record');
  if (Lrecord) {
    record.textContent = `Recorde: ${Lrecord}`;
  } else {
    record.textContent = `Recorde: 0`;
  }

}

let meuIntervalo = setInterval(() => main(), 1000 / quadros);

start();
