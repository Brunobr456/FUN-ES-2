const perguntas = [
{
texto: "Você prefere trabalhar sozinho ou em equipe?",
opcoes: ["Sozinho", "Em equipe"]
},
{
texto: "O que você mais valoriza?",
opcoes: ["Dinheiro", "Conhecimento"]
},
{
texto: "Você confiaria totalmente em uma IA?",
opcoes: ["Sim", "Não"]
}
];

let indice = 0;
let pontuacao = 0;

const texto = document.getElementById("texto");
const botao = document.getElementById("botao");

botao.addEventListener("click", iniciar);

function iniciar(){

botao.style.display="none";

mostrarPergunta();

}

function mostrarPergunta(){

texto.innerHTML=`<h2>${perguntas[indice].texto}</h2>`;

perguntas[indice].opcoes.forEach((opcao,posicao)=>{

const b=document.createElement("button");

b.className="opcao";

b.textContent=opcao;

b.onclick=()=>responder(posicao);

texto.appendChild(b);

});

}

function responder(escolha){

if(escolha===0){
pontuacao++;
}

indice++;

if(indice<perguntas.length){

mostrarPergunta();

}else{

resultado();

}

}

function resultado(){

let futuro="";

if(pontuacao==3){

futuro="👑 A IA decidiu que você será o líder da humanidade na era digital.";

}else if(pontuacao==2){

futuro="💻 A IA escolheu você para desenvolver novas tecnologias.";

}else if(pontuacao==1){

futuro="📚 A IA determinou que você viverá estudando para evoluir.";

}else{

futuro="🤖 A IA decidiu assumir todas as suas decisões. Seu futuro será totalmente controlado por algoritmos.";

}

texto.innerHTML=`
<h2>Análise Finalizada</h2>

<p>${futuro}</p>

<br>

<button onclick="location.reload()">🔄 Fazer novamente</button>
`;

}
