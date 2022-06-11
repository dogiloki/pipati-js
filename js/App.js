var imagenes=[
	"img/Piedra.png",
	"img/Papel.png",
	"img/Tijera.png"
];
var casilla_jugador=document.getElementById('casilla-jugador');
var casilla_cpu=document.getElementById('casilla-cpu');
var content_optiones=document.getElementById('content-optiones');
var aviso=document.getElementById('aviso');
var btn1=document.getElementById('op1');
var btn2=document.getElementById('op2');
var btn3=document.getElementById('op3');

document.addEventListener("DOMContentLoaded",()=>{
	btn1.setAttribute("src",this.imagenes[0]);
	btn2.setAttribute("src",this.imagenes[1]);
	btn3.setAttribute("src",this.imagenes[2]);
});

function tirada(btn){
	this.opciones(false);
	this.casilla_jugador.setAttribute("src",btn.getAttribute("src"));
	this.contador=0;
	let tiradas=this.tiroCpu();
	let intervalo=setInterval(()=>{tiradas.next();},100);
	setTimeout(()=>{
		clearInterval(intervalo);
		this.opciones(true);
	},1500);
}

function *tiroCpu(){
	let tiro_anterior;
	while(true){
		let tiro;
		do{
			tiro=Math.round(Math.random()*2);
		}while(tiro_anterior==tiro);
		casilla_cpu.setAttribute("src",this.imagenes[tiro]);
		tiro_anterior=tiro;
		yield;
	}
}

function opciones(mostrar){
	this.aviso.innerHTML=mostrar?esGanador():"";
	content_optiones.style.display=(mostrar?"":"none");
}

function esGanador(){
	let tiro1=this.casilla_jugador.getAttribute("src");
	let tiro2=this.casilla_cpu.getAttribute("src");
	return (tiro1==tiro2)?"Empate":
			(tiro1==this.imagenes[0] && tiro2==this.imagenes[2])?"Ganaste":
			(tiro1==this.imagenes[1] && tiro2==this.imagenes[0])?"Ganaste":
			(tiro1==this.imagenes[2] && tiro2==this.imagenes[1])?"Ganaste":"Perdiste";
}