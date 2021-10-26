
var canvas = document.getElementById("MyCanvas")
var ctx = canvas.getContext("2d")

var tecla = {} //será usada no add event listener

var player1 = {
    x : 375,
    y : 225,
    w : 50,
    h : 50,
    vidas : 10,
}
var player2 = {
    x: 225,
    y: 225,
    w: 50,
    h: 50,
    vidas : 10,
}
//__________________________________________________________________________________
//4 OBSTÁCULOS, 1 DE CADA DIREÇÃO
var o_Esq = {
    x : -20,
    y : Math.floor(Math.random() * 501), //numero aleatório *501 (altura do canvas)
    w : 40,
    h : 40,


}
var o_dir = {
    x : 920,
    y : Math.floor(Math.random() * 501), //numero aleatório *501 (altura do canvas)
    w : 40,
    h : 40,


}

var o_baixo = {
    y : 520,
    x : Math.floor(Math.random() * 901), //numero aleatório *501 (altura do canvas)
    w : 40,
    h : 40,


}
var o_cima = {
    y : -20,
    x : Math.floor(Math.random() * 901), //numero aleatório *501 (altura do canvas)
    w : 40,
    h : 40,
//______________________________________________________________________________________

}
//imagens bloquins
let img_verde = new Image()
img_verde.src="img/blocoverde.png"

let img_roxo = new Image()
img_roxo.src="img/blocoroxo.png"


//keydown pra quando a tecla estiver pressionada//
document.addEventListener("keydown", function(e) {
    tecla[e.keyCode] = true;
}, false);

//keyup pra quando a tecla não estiver pressionada//
document.addEventListener("keyup", function(e) {
    delete tecla[e.keyCode];
}, false);

//_______________________________________________________________________
//INÍCIO DAS FUNÇÕES
// moveblocos() para representar o movimento dos players
// 4 funções inverte para representar o movimento dos obstáculos
// função movimentaobstaculos() para unir as 4 acima

function moveblocos() {

    //PLAYER 1//
    //tecla A - pra esquerda//
    if (65 in tecla && player1.x >= 0) {
        player1.x = player1.x - 2.5;
    }
    //tecla W -  pra cima//
    else if (87 in tecla && player1.y >= 0){
        player1.y = player1.y - 2.5;} //quadrado1.y = quadrado1.y - 1;


    //tecla D - pra direita//
    else if (68 in tecla && player1.x <= 850){
        player1.x = player1.x + 2.5;
    }

    //tecla S -  pra baixo//
    else if (83 in tecla && player1.y <= 450) {
        player1.y = player1.y + 2.5;
    }
    //____________________________________________________________________//
    //PLAYER 2//
    //tecla j - pra esquerda//
    if (74 in tecla && player2.x >= 0)
        player2.x = player2.x - 2.5;


    //tecla i -  pra cima//
    else if (73 in tecla && player2.y >= 0)
        player2.y = player2.y - 2.5; //quadrado1.y = quadrado1.y - 1;

    //tecla l - pra direita//
    else if (76 in tecla && player2.x <= 850)
        player2.x = player2.x + 2.5;


    //tecla k -  pra baixo//
    else if (75 in tecla && player2.y <= 450)
        player2.y = player2.y + 2.5;

}

function invertedireita(){
    if (o_dir.x < -40) {
        o_dir.x = 940;
        o_dir.y = Math.floor(Math.random() * 501);

    }
    else{
        o_dir.x = o_dir.x -3;
    }
}

function inverteesquerda(){
    if (o_Esq.x > 940) {
        o_Esq.x = -20;
        o_Esq.y = Math.floor(Math.random() * 501);
    }
    else
        o_Esq.x = o_Esq.x +3;
}

function invertebaixo(){
    if (o_baixo.y<-40){
        o_baixo.y = 540;
        o_baixo.x = Math.floor(Math.random() * 901)
    }
    else{
        o_baixo.y= o_baixo.y - 3;
    }
}

function invertecima(){
    if(o_cima.y>540){
        o_cima.y = -40
        o_cima.x = Math.floor(Math.random() * 901)
    }
    else{
        o_cima.y = o_cima.y + 3
    }
}

function movimentaObstaculos(){
    invertedireita()
    inverteesquerda()
    invertebaixo()
    invertecima()
}
//_______________________________________________________________________

//CHAMANDO NO CANVAS

//chamando os obstáculos
function chamarobstaculo(){

    ctx.fillStyle = "red";
    ctx.fillRect(o_Esq.x, o_Esq.y, o_Esq.w, o_Esq.h);

    ctx.fillStyle = "red";
    ctx.fillRect(o_dir.x, o_dir.y, o_dir.w, o_dir.h);

    ctx.fillStyle = "red";
    ctx.fillRect(o_cima.x, o_cima.y, o_cima.w, o_cima.h)

    ctx.fillStyle = "red";
    ctx.fillRect(o_baixo.x, o_baixo.y, o_baixo.w, o_baixo.h)



}

//chamando os players
function chamarbloquin(){

    ctx.drawImage(img_verde,player1.x, player1.y, player1.w, player1.h)
    ctx.drawImage(img_roxo,player2.x, player2.y, player2.w, player2.h);
}

//_______________________________________________________________________

//clear rect pra atualizar as posições
function limpa(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

//_______________________________________________________________________

//função que vai detectar os encontros/colisões
function colisao() {
    //COLISÕES DO PLAYER 1
    // com o obstáculo que sai da esquerda
    if ((player1.x < o_Esq.x + o_Esq.w &&
        player1.x + player1.w > o_Esq.x &&
        player1.y < o_Esq.y + o_Esq.h &&
        player1.y + player1.h > o_Esq.y)

        //com o que sai da direita
        || (player1.x < o_dir.x + o_dir.w &&
            player1.x + player1.w > o_dir.x &&
            player1.y < o_dir.y + o_dir.h &&
            player1.y + player1.h > o_dir.y)

        //com o que sai de cima
        || (player1.x < o_cima.x + o_cima.w &&
            player1.x + player1.w > o_cima.x &&
            player1.y < o_cima.y + o_cima.h &&
            player1.y + player1.h > o_cima.y)

        //com o que sai de baixo
        || (player1.x < o_baixo.x + o_baixo.w &&
            player1.x + player1.w > o_baixo.x &&
            player1.y < o_baixo.y + o_baixo.h &&
            player1.y + player1.h > o_baixo.y)) {

        //se for atingido, renascer em local aleatório
        player1.x = Math.floor(Math.random() * 901)
        player1.y = Math.floor(Math.random() * 501)

        //subtrair uma vida e atualizar a função das vidas
        player1.vidas = player1.vidas - 1
        textovidas()
    }
//______________________________________________________________
    //COLISÕES DO PLAYER 2
    // com o obstáculo que sai da esquerda
    if((o_Esq.w + o_Esq.x >player2.x  &&
        player2.x+ player2.w >  o_Esq.x &&
        player2.y < o_Esq.y + o_Esq.h &&
        player2.y + player2.h > o_Esq.y)

        //com o que sai da direita
        ||(player2.x < o_dir.x + o_dir.w &&
            player2.x+ player2.w >  o_dir.x &&
            player2.y < o_dir.y + o_dir.h &&
            player2.y + player2.h > o_dir.y)

        //com o que sai de cima
        ||(player2.x < o_cima.x + o_cima.w &&
            player2.x+ player2.w >  o_cima.x &&
            player2.y < o_cima.y + o_cima.h &&
            player2.y + player2.h > o_cima.y)

        //com o que sai de baixo
        ||(player2.x < o_baixo.x + o_baixo.w &&
            player2.x+ player1.w >  o_baixo.x &&
            player2.y < o_baixo.y + o_baixo.h &&
            player2.y + player2.h > o_baixo.y)) {

        //se for atingido, renascer em local aleatório
        player2.x = Math.floor(Math.random() * 901)
        player2.y = Math.floor(Math.random() * 501)

        //subtrair uma vida e att a função
        player2.vidas = player2.vidas - 1
        textovidas()
    }
}

//_______________________________________________________________________

// inserir o "painel" de vidas no canvas
function textovidas(){
    ctx.fillStyle = "white"
    ctx.font = "20px Arial"
    ctx.fillText( "Jogador 1", 50, 50)

    ctx.fillStyle = "white"
    ctx.font = "20px Arial"
    ctx.fillText( player1.vidas+" vidas", 50, 80)

    ctx.fillStyle = "white"
    ctx.font = "20px Arial"
    ctx.fillText( "Jogador 2", 760, 50)

    ctx.fillStyle = "white"
    ctx.font = "20px Arial"
    ctx.fillText( player2.vidas+" vidas", 760, 80)
}

//_______________________________________________________________________

//inserir texto de vencedor para o que não perder primeiro
function vencedor() {

    //se a vida chegar a 0
    if (player1.vidas < 1) {

        //obstáculos somem do mapa
        o_dir.x = -40
        o_Esq.x = -40
        o_cima.y = -40
        o_baixo.y = -40

        ctx.clearRect(0,0,canvas.weight,canvas.height)

        //texto aparece
        ctx.fillStyle = "white"
        ctx.font = "40px Arial"
        ctx.textAlign = "center"
        ctx.fillText( "Jogador 2 venceu " , canvas.width/2 ,canvas.height / 2)

        ctx.fillStyle = "white"
        ctx.font = "25px Arial"
        ctx.textAlign = "center"
        ctx.fillText( "Atualize a página para jogar novamente " , canvas.width/2 ,(canvas.height / 2+60))

    }

    //se a vida chegar a 0
    if (player2.vidas < 1) {

        //obstáculos somem do mapa
        o_dir.x = -50
        o_Esq.x = -50
        o_cima.y = -50
        o_baixo.y = -40

        ctx.clearRect(0,0,canvas.weight,canvas.height)

        //texto aparece
        ctx.fillStyle = "white"
        ctx.font = "40px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Jogador 1 venceu ", canvas.width/2, canvas.height / 2)

        ctx.fillStyle = "white"
        ctx.font = "25px Arial"
        ctx.textAlign = "center"
        ctx.fillText( "Atualize a página para jogar novamente " , canvas.width/2 ,(canvas.height / 2+60))
    }
}

//_______________________________________________________________________

//função que chama tudo
function desenho() {
    limpa()
    chamarobstaculo()
    movimentaObstaculos()
    chamarbloquin()
    moveblocos();
    colisao()
    textovidas()
    requestAnimationFrame(desenho);
    vencedor()
}

//função que conecta tudo ao botão do html
function main() {
    desenho();
}
