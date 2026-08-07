const jogador = {
    nome: "AGENTE 001",
    nivel: 1,
    pontos: 0,
    inteligencia: 10,
    coragem: 10,
    criatividade: 10,
    determinacao: 10,
    escolhas: []
};

const missoes = [
    {
        titulo: "O PRIMEIRO DESPERTAR",
        texto: "Às 03:17 da manhã, todos os dispositivos do planeta desligam. Uma mensagem aparece: 'VOCÊ FOI SELECIONADO'. O que você faz?",

        opcoes: [
            {
                nome: "Investigar o fenômeno",
                descricao: "Descobrir a verdade.",
                efeito: { inteligencia: 5, coragem: 2 },
                resultado: "A NEXUS percebe sua curiosidade e aumenta sua capacidade de análise."
            },

            {
                nome: "Ignorar a mensagem",
                descricao: "Talvez seja apenas um erro.",
                efeito: { determinacao: 4 },
                resultado: "Você ignora o aviso. A NEXUS registra sua decisão."
            },

            {
                nome: "Aceitar imediatamente",
                descricao: "Você não tem medo do desconhecido.",
                efeito: { coragem: 6 },
                resultado: "A NEXUS detecta um nível incomum de coragem."
            }
        ]
    },

    {
        titulo: "A CIDADE SEM FUTURO",
        texto: "A NEXUS prevê que uma cidade inteira ficará sem energia em 72 horas. Você é a única pessoa que recebeu o alerta.",

        opcoes: [
            {
                nome: "Avisar todos",
                descricao: "Contar o que você descobriu.",
                efeito: { coragem: 3, determinacao: 3 },
                resultado: "Ninguém acredita inicialmente, mas você continua tentando salvar a cidade."
            },

            {
                nome: "Criar uma solução",
                descricao: "Usar seus conhecimentos.",
                efeito: { inteligencia: 6 },
                resultado: "Você encontra uma falha no sistema energético."
            },

            {
                nome: "Observar em silêncio",
                descricao: "Descobrir se a previsão é verdadeira.",
                efeito: { inteligencia: 3, criatividade: 3 },
                resultado: "Você percebe algo estranho: a previsão está mudando."
            }
        ]
    },

    {
        titulo: "O ERRO DA NEXUS",
        texto: "A NEXUS consegue prever milhares de futuros, mas existe um futuro que ela não consegue enxergar: o seu.",

        opcoes: [
            {
                nome: "Questionar a IA",
                descricao: "Perguntar por que seu futuro não pode ser previsto.",
                efeito: { inteligencia: 5, criatividade: 3 },
                resultado: "A NEXUS fica em silêncio. Pela primeira vez, ela não sabe o que responder."
            },

            {
                nome: "Desafiar o sistema",
                descricao: "Recusar que uma IA controle seu destino.",
                efeito: { coragem: 6, determinacao: 4 },
                resultado: "Você fez algo que a NEXUS considerava impossível."
            },

            {
                nome: "Confiar na NEXUS",
                descricao: "Acreditar que a IA sabe o que está fazendo.",
                efeito: { determinacao: 5, inteligencia: 2 },
                resultado: "A NEXUS libera arquivos secretos sobre o futuro."
            }
        ]
    }
];

let missaoAtual = 0;


// INICIAR O SISTEMA
function iniciarSistema() {
    mudarTela("inicio", "sistema");

    atualizarStatus();

    carregarMissao();
}


// TROCAR DE TELA
function mudarTela(atual, proxima) {
    document.getElementById(atual).classList.remove("ativa");
    document.getElementById(proxima).classList.add("ativa");
}


// CARREGAR MISSÃO
function carregarMissao() {

    const missao = missoes[missaoAtual];

    document.getElementById("tituloMissao").textContent =
        missao.titulo;

    document.getElementById("textoMissao").textContent =
        missao.texto;

    const opcoes = document.getElementById("opcoes");

    opcoes.innerHTML = "";


    missao.opcoes.forEach((opcao, indice) => {

        const botao = document.createElement("button");

        botao.className = "opcao";

        botao.innerHTML = `
            <strong>${opcao.nome}</strong>
            <small>${opcao.descricao}</small>
        `;

        botao.onclick = function() {
            escolherOpcao(indice);
        };

        opcoes.appendChild(botao);
    });
}


// ESCOLHER UMA OPÇÃO
function escolherOpcao(indice) {

    const missao = missoes[missaoAtual];

    const escolha = missao.opcoes[indice];

    jogador.escolhas.push(escolha.nome);


    // Aplicar os pontos
    aplicarEfeito(escolha.efeito);


    // Ganhar XP
    jogador.pontos += 100;

    jogador.nivel =
        Math.floor(jogador.pontos / 100) + 1;


    // Mostrar resposta da IA
    document.getElementById("mensagemIA").textContent =
        "> DECISÃO ANALISADA PELA NEXUS";


    document.getElementById("tituloResultado").textContent =
        "DECISÃO REGISTRADA";


    document.getElementById("textoResultado").textContent =
        escolha.resultado;


    document.getElementById("resultado")
        .classList.add("mostrar");


    // Bloquear os botões
    document.querySelectorAll(".opcao").forEach(botao => {
        botao.disabled = true;
        botao.style.opacity = "0.5";
    });


    atualizarStatus();
}


// APLICAR ATRIBUTOS
function aplicarEfeito(efeito) {

    if (efeito.inteligencia) {
        jogador.inteligencia += efeito.inteligencia;
    }

    if (efeito.coragem) {
        jogador.coragem += efeito.coragem;
    }

    if (efeito.criatividade) {
        jogador.criatividade += efeito.criatividade;
    }

    if (efeito.determinacao) {
        jogador.determinacao += efeito.determinacao;
    }
}


// ATUALIZAR STATUS NA TELA
function atualizarStatus() {

    document.getElementById("nivel").textContent =
        jogador.nivel;

    document.getElementById("inteligencia").textContent =
        jogador.inteligencia;

    document.getElementById("coragem").textContent =
        jogador.coragem;

    document.getElementById("criatividade").textContent =
        jogador.criatividade;

    document.getElementById("determinacao").textContent =
        jogador.determinacao;
}


// PRÓXIMA MISSÃO
function proximaMissao() {

    missaoAtual++;

    document.getElementById("resultado")
        .classList.remove("mostrar");


    if (missaoAtual >= missoes.length) {

        finalizarHistoria();

        return;
    }


    carregarMissao();
}


// A IA DECIDE O DESTINO
function determinarDestino() {

    const atributos = {
        inteligencia: jogador.inteligencia,
        coragem: jogador.coragem,
        criatividade: jogador.criatividade,
        determinacao: jogador.determinacao
    };


    let maior = "inteligencia";


    for (let atributo in atributos) {

        if (atributos[atributo] > atributos[maior]) {
            maior = atributo;
        }
    }


    if (maior === "inteligencia") {

        return {
            nome: "ARQUITETO DO FUTURO",

            descricao:
                "A NEXUS descobriu que sua maior habilidade é compreender problemas que ninguém consegue resolver."
        };
    }


    if (maior === "coragem") {

        return {
            nome: "GUARDIÃO DO AMANHÃ",

            descricao:
                "Você se tornou alguém capaz de agir mesmo quando todos têm medo."
        };
    }


    if (maior === "criatividade") {

        return {
            nome: "CRIADOR DE POSSIBILIDADES",

            descricao:
                "Enquanto a NEXUS calcula futuros existentes, você consegue imaginar futuros que nunca foram previstos."
        };
    }


    return {
        nome: "ANOMALIA NEXUS",

        descricao:
            "A NEXUS não conseguiu compreender suas decisões. Seu futuro não pode ser calculado."
    };
}


// FINAL DA HISTÓRIA
function finalizarHistoria() {

    const destino = determinarDestino();

    document.getElementById("classeFinal").textContent =
        destino.nome;

    document.getElementById("descricaoFinal").textContent =
        destino.descricao;

    document.getElementById("nivelFinal").textContent =
        jogador.nivel;

    document.getElementById("pontosFinal").textContent =
        jogador.pontos;


    mudarTela("sistema", "final");
}


// REINICIAR
function reiniciar() {

    jogador.nivel = 1;
    jogador.pontos = 0;

    jogador.inteligencia = 10;
    jogador.coragem = 10;
    jogador.criatividade = 10;
    jogador.determinacao = 10;

    jogador.escolhas = [];

    missaoAtual = 0;

    mudarTela("final", "inicio");
}
