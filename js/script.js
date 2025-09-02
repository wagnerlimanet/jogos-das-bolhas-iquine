// Wagner Lima | www.wagnerlima.net | @wagnerlimaNET
// Professor de desenvolvimento web e design na escola iwtraining, especialista em mecanismos de 
// buscas (SEO) e graduando em Sistemas e Mídias Digitais na Universidade Federal do Ceará (UFC).

  // Imagens
  const produtos = [
  { imagem: "../imagens/iquine-superpremium-mais3.png", pontos: 3 },

  { imagem: "../imagens/iquine-fosco-duravel-mais2.png", pontos: 2 },
  { imagem: "../imagens/iquine-seda-super-lavavel-mais2.png", pontos: 2 },
  { imagem: "../imagens/iquine-fachada-emborrachada-mais2.png", pontos: 2 },
  { imagem: "../imagens/iquine-dialine-topa-tudo-mais2.png", pontos: 2 },

  { imagem: "../imagens/iquine-sela-e-pinta-mais1.png", pontos: 1 },
  { imagem: "../imagens/iquine-delanil-rende-muito-mais1.png", pontos: 1 },
  { imagem: "../imagens/iquine-semibrilho-mais1.png", pontos: 1 },

  { imagem: "../imagens/rolo-menos1.png", pontos: -1 },
  { imagem: "../imagens/pincel-menos1.png", pontos: -1 },
  { imagem: "../imagens/espátula-menos1.png", pontos: -1 },
  { imagem: "../imagens/bandeja-menos1.png", pontos: -1 },

  { imagem: "../imagens/rolo-menos1b.png", pontos: -1 },
  { imagem: "../imagens/pincel-menos1b.png", pontos: -1 },
  { imagem: "../imagens/espátula-menos1b.png", pontos: -1 },
  { imagem: "../imagens/bandeja-menos1b.png", pontos: -1 }
  ];

    let tempo = 30;
    let pontos = 0;
    let intervalo;

    // Sons
    const somAcerto = new Audio('../sons/acerto.mp3');
    const somErro = new Audio('../sons/erro.mp3');
    const somDeboche = new Audio('../sons/deboche.mp3');
    const somVitoria = new Audio('../sons/vitoria.mp3');

    function formatarTempo(segundos) {
      const minutos = Math.floor(segundos / 60);
      const restoSegundos = segundos % 60;
      return `${String(minutos).padStart(2, '0')}:${String(restoSegundos).padStart(2, '0')}`;
    }

    window.onload = function() {
      iniciarJogo();
    };

    function iniciarJogo() {
      document.getElementById('telaInicio').classList.remove('ativo');
      document.getElementById('telaJogo').classList.add('ativo');
      intervalo = setInterval(() => {
        tempo--;
        document.getElementById('tempo').textContent = formatarTempo(tempo);
        if (tempo <= 0) terminarJogo();
      }, 1000);
      gerarBolhas();
    }

    function gerarBolhas() {
      const area = document.getElementById('areaJogo');
      const criar = setInterval(() => {
        const item = produtos[Math.floor(Math.random() * produtos.length)];
        const bolha = document.createElement('div');
        // bolha.classList.add('bolha');
        bolha.classList.add('bolha');
        bolha.style.animationDuration = (3 + Math.random() * 2) + 's'; // Entre 5s e 7s [velocidade inicial 5]
        bolha.style.left = Math.random() * 90 + '%';
        bolha.style.backgroundImage = `url(${item.imagem})`;
        bolha.dataset.ponto = item.pontos;

        bolha.onclick = () => {
          const valor = parseInt(bolha.dataset.ponto);
          pontos += valor;
          document.getElementById('pontos').textContent = pontos;
          bolha.remove();

          if (valor > 0) {
            somAcerto.currentTime = 0;
            somAcerto.play();
          } else {
            somErro.currentTime = 0;
            somErro.play();
          }
        }


        area.appendChild(bolha);

        setTimeout(() => bolha.remove(), 16000);
      }, 400); //quantidade inicial 800
    }

    function terminarJogo() {
      clearInterval(intervalo);
      document.getElementById('telaJogo').classList.remove('ativo');
      document.getElementById('telaFim').classList.add('ativo');
      document.getElementById('pontuacaoFinal').textContent = `Você fez ${pontos} pontos.`;

      if (pontos >= 70) { //número de pontos [inicial em 50]
        document.getElementById('mensagemFinal').textContent = 'Parabéns, Você ganhou!';
        somVitoria.currentTime = 0;
        somVitoria.play();
        lançarConfetes();
      } else {
        document.getElementById('mensagemFinal').textContent = 'Que pena, não foi dessa vez!';
        somDeboche.currentTime = 0;
        somDeboche.play();
      }
    }

    function lançarConfetes() {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }