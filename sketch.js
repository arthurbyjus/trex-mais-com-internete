//cria as variáveis
var trex, trexCorrendo;
var solo,imagem;
var inv;
var nuvem;
var nuvemm;
var obs1,obs2,obs3,obs4,obs5,obs6;
var pontos;
var grupodenuvens;
var grupodeobs;
var jogando = 1;
var morreu = 0;
var estado = jogando;
var f;
var gameover;
var gameoverfoto;
var resetar;
var resetarimagem;
var pulo,morte,point;
function preload(){
//Carrega as imagens para a animação do T-rex
trexCorrendo = loadAnimation("trex1.png","trex3.png","trex4.png");
imagem=loadImage("ground2.png"); 
nuvemm=loadImage("cloud.png");
obs1=loadImage("obstacle1.png");
obs2=loadImage("obstacle2.png");
obs3=loadImage("obstacle3.png");
obs4=loadImage("obstacle4.png");
obs5=loadImage("obstacle5.png");
obs6=loadImage("obstacle6.png");
f=loadAnimation("trex_collided.png");
gameoverfoto=loadImage("gameOver.png");
resetarimagem=loadImage("restart.png");
pulo=loadSound("jump.mp3");
morte=loadSound("die.mp3");
point=loadSound("checkPoint.mp3");
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
trex.addAnimation("f",f);
//cria as bordas
borda = createEdgeSprites();

inv=createSprite(200,390,400,10);
inv.visible=false

pontos = 0;
//var numero = Math.round(random(1,50));
//console.log(numero);

grupodenuvens = new Group();
grupodeobs = new Group();

trex.debug = false;
trex.setCollider("circle", 0, 0, 40);
gameover=createSprite(300,100);
gameover.addImage(gameoverfoto);
resetar=createSprite(300,140);
resetar.addImage(resetarimagem);
}
function draw(){
//console.log(trex.y); 
//pinta o fundo da tela do jogo de branco
background("black");
text("Pontuação:"+pontos, 500,50);
if(estado === jogando){
    solo.velocityX=-(4+pontos/100);
    pontos = pontos + Math.round(frameCount/60);
    if(pontos%100   ===0&& pontos>0){
    point.play();
    }
    if(solo.x<0){
        solo.x=solo.width/2;
        }
    //Faz o trex pular quando aperta a tecla espaço
if(keyDown("space")&&trex.y>=300){
    trex.velocityY = -15;
    pulo.play();
    }  
      //Sistema degravidade
trex.velocityY = trex.velocityY + 1;
//chamar uma função que desenha as nuvens
gerarNuvens();
gerarobs();
if(grupodeobs.isTouching(trex)){
    estado=morreu;
    morte.play();
}
} else if(estado === morreu){
    solo.velocityX = 0;
    trex.velocityY=0;
    trex.changeAnimation("f",f);
    grupodenuvens.setVelocityXEach(0);
    grupodeobs.setVelocityXEach(0);
    grupodenuvens.setLifetimeEach(-1);
    grupodeobs.setLifetimeEach(-1);
}
//Impede que o T-rex caia da tela
trex.collide(inv);
//Desenha todos os sprites
drawSprites();
}

function gerarNuvens(){
if(frameCount%119   ===0){
    nuvem=createSprite(1200,100,40,10) ;
    nuvem.addImage(nuvemm);
    nuvem.y=Math.round(random(10,200));
    nuvem.velocityX=-6;  
    nuvem.depth=trex.depth;
    trex.depth=trex.depth+1
    nuvem.lifetime=499; 
    grupodenuvens.add(nuvem);
}
 
}
function gerarobs(){
    if(frameCount%119   ===0){
       var  obs =createSprite(1200,365,10,40) ;
        obs      .velocityX=-(6+pontos/100);
var numero= Math.round(random(1,6));
switch (numero) {
    case 1:obs.addImage(obs1); 
        break;
        case 2:obs.addImage(obs2); 
      
        break;
        case 3:obs.addImage(obs3); 
        break;case 4:obs.addImage(obs4); 
        break;case 5:obs.addImage(obs5); 
        break;case 6:obs.addImage(obs6); 
        break;
    default:
        break;
}
obs.lifetime=499; 
grupodeobs.add(obs);
        } 
}