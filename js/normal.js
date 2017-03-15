var ip_red;
var normal=true;
var primera_vez=true;
var mascara="";

function main() {
	console.clear();
	if (document.getElementById('normal').checked != true) {
		normal=false; console.log("Manual, trabajando para automatico ;)");
	}
	ip_red = document.getElementById("ip_red").value;
	ip_red= ip_red.split(".").map(Number);
    for_numero_redes(document.getElementById("num_redes").value);
}

function principal() {
	var asi_de_ips=Number(capturar_cuantas_ips());
	console.log("---------------------------N0. IPS: ",asi_de_ips,"-------------------------")
	var pot_resultado=elevar(asi_de_ips);
	que_rango_mascara(Number(pot_resultado.potencia));
	calcula_ip_inicial();
	calcula_ip_final(pot_resultado.resultado_potencia);
	
}

function calcula_ip_inicial() {
	if (primera_vez) {
		primera_vez=false;
	}else{
		ip_red[3]=ip_red[3]+1;
		if ((ip_red[3]+3)>255) {
			ip_red[2]=ip_red[2]+1; ip_red[3]=0;
		}
	}
	imprimir("ip inicial: ",ip_red,mascara,"green");
	var ipmod=ip_red.slice();;
	ipmod[3]=ipmod[3]+1;
	imprimir("1st valida: ",ipmod,mascara,"blue");
	ipmod[3]=ipmod[3]+1;
	imprimir("2nd valida: ",ipmod,mascara,"blue");
}

function imprimir(tipoip,mip,maskara,color) {
	console.log("%c"+tipoip+(mip.toString()).replace(/,/g,".")+" "+maskara,"color:"+color);
}

function calcula_ip_final(elmultiplo){
	if (elmultiplo<=256) {
		ip_red[3]=ip_red[3]+ (elmultiplo-1); 
			if (ip_red[3]>255) {
				console.log("%cAlgo anda mal, hacerlo manual, o pregunta a Manuel","color:red")
			}
	}else{
		if (ip_red[2]<255) {
			ip_red[2]=ip_red[2]+(rango_modificar(elmultiplo));
			ip_red[3]=255;
		}else{
			console.log("%cFalta validar esto... ERROR","color:red");
		}
	}
	
	imprimir("Ip final ",ip_red,"","green");
}

function que_rango_mascara(la_potencia) {
	var cual=0000;
	if (la_potencia==8) { cual=8; }
	if (la_potencia<=7) { cual=1; }
	if (la_potencia>8) { cual=2; }
	switch (cual) {
	    case 1:
	    	mascara="255.255.255."+(calcula_mascara(la_potencia).toString());
	        break;
	    case 2:
	    	mascara="255.255."+(calcula_mascara(la_potencia-8).toString())+".0";
	        break;
	    case 8:
	    	mascara="255.255.255.0";
	    	break;
	    default: 
	    	mascara="ERROR Mascara : Algo anda mal";
	}
}

function calcula_mascara(potencia_cayo) {
	var total=0;
		for (var i = 7; i >= potencia_cayo; i--) {
		total+=Math.pow(2,i);
		}
	return total;
}

function rango_modificar(argument) {
	return ((argument/256)-1);
}

function elevar(tantos_ips) {
	var estado=true;
	var elevado_A=0;
	var resultado_elevado;
	while(estado){
		resultado_elevado=Math.pow(2,elevado_A);
		if (resultado_elevado>=(tantos_ips+2)){
			estado=false; 
		}
		elevado_A++;
	}
	return {
		potencia: (elevado_A-1),
 		resultado_potencia: resultado_elevado
 	};
}

function capturar_cuantas_ips() {
	return prompt("Ingresa el numero de ip");
}

function for_numero_redes(argument) {
	for (var i =  0; i < argument; i++) {
		if (normal) {
			principal();
		}else{
			main_revuelto();
		}
	}
}

document.onkeydown=function(evt){  // Para cuando se presiona ENTER
	var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
	if(keyCode == 13)
		main();
}

function myFunction() {
    var enrutamiento = document.forms[0];
    var txt = "";
    var i;
    for (i = 0; i < enrutamiento.length; i++) {
        if (enrutamiento[i].checked) {
            txt = txt + enrutamiento[i].value + " ";
        }
    }
    console.log(txt);
}
