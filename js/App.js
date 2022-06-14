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
var ganadas=0, perdidas=0, empatadas=0;

// Se ejecura al cargar en DOM
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
	// Ejecución de códgio js cada determinado tiempo (bucle infinto)
	let intervalo=setInterval(()=>{tiradas.next();},100);
	setTimeout(()=>{
		// Elimina la función para repetir código cada cierto tiempo
		clearInterval(intervalo);
		this.opciones(true);
		let mensaje=esGanador();
		switch(mensaje){
			case -1: mensaje="Empataste"; this.empatadas++; break;
			case 0: mensaje="Perdiste"; this.perdidas++; break;
			case 1: mensaje="Ganaste"; this.ganadas++; break;
		}
		this.aviso.innerHTML=mensaje;
		document.getElementById("ganadas").innerHTML=`Ganadas: ${this.ganadas}`;
		document.getElementById("perdidas").innerHTML=`Perdidas: ${this.perdidas}`;
		document.getElementById("empatadas").innerHTML=`Empatadas: ${this.empatadas}`;
	},1500);
}

// Generator
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
	this.aviso.innerHTML="";
	content_optiones.style.display=(mostrar?"":"none");
}

function esGanador(){
	let tiro1=this.casilla_jugador.getAttribute("src");
	let tiro2=this.casilla_cpu.getAttribute("src");
	return (tiro1==tiro2)?-1:
			(tiro1==this.imagenes[0] && tiro2==this.imagenes[2])?1:
			(tiro1==this.imagenes[1] && tiro2==this.imagenes[0])?1:
			(tiro1==this.imagenes[2] && tiro2==this.imagenes[1])?1:0;
}