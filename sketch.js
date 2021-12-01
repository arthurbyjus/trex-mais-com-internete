//cria as variáveis
var trex, trexCorrendo;
var solo,imagem;
var inv;
var nuvem;
var nuvemm;
function preload(){
//Carrega as imagens para a animação do T-rex
trexCorrendo = loadAnimation("trex1.png","trex3.png","trex4.png");
imagem=loadImage("ground2.png"); 
nuvemm=loadImage("cloud.png");
}

function setup(){
//Cria a tela do nosso jogo
createCanvas(1200,400);
solo=createSprite(200,380,400,20)
solo.addImage(imagem);
solo.x=solo.width/2;      
//cria o sprite do T-rex e adiciona a animação
trex = createSprite(50,160,20,50);
trex.addAnimation("correndo",trexCorrendo);
//cria as bordas
borda = createEdgeSprites();

inv=createSprite(200,390,400,10);
inv.visible=false

//var numero = Math.round(random(1,50));
//console.log(numero);
}
function draw(){
//pinta o fundo da tela do jogo de branco
background("black");
//console.log(trex.y);     
solo.velocityX=-2;
if(solo.x<0){
solo.x=solo.width/2;
}
//Faz o trex pular quando aperta a tecla espaço
if(keyDown("space")&&trex.y>=300){
trex.velocityY = -13;
}
//Sistema degravidade
trex.velocityY = trex.velocityY + 1;
//Impede que o T-rex caia da tela
trex.collide(inv);
//chamar uma função que desenha as nuvens
gerarNuvens();
//Desenha todos os sprites
drawSprites();
}

function gerarNuvens(){
if(frameCount%119   ===0){
    nuvem=createSprite(1200,100,40,10) ;
    nuvem.addImage(nuvemm);
    nuvem.y=Math.round(random(10,200));
    nuvem.velocityX=-3;  
    nuvem.depth=trex.depth;
    trex.depth=trex.depth+1
}
 
}