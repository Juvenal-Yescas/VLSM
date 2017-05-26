// Si el orden de las ips se ingresan de mayor a menor

var ip_red;
var normal=true;
var primera_vez=true;
var mascara="";
var tipo_enruta="";
var ip_ini_enruta="";
var las_ips;
var leyenda_uno=true;

var principalj,insertar_comandosj,imprimirj;
$().ready(function(){
	principalj = function(){
	alert(" _msg ");
	}

	imprimirj = function(tipoip,mip,maskara,color){
		var este_ip=tipoip+remplazador(mip)+" "+maskara;
		var txt2 = $("<div></div>").text(este_ip).css('color',color); 
		$('#resultado_ipsx').append(txt2); 
		console.log("%c"+tipoip+remplazador(mip)+" "+maskara,"color:"+color);
	}

	insertar_comandosj = function(){
	var text="";
	switch (tipo_enruta) {

    case "rip":
    	if (leyenda_uno) {
    		text="<div><br/> conf t<br/>\n router rip <br/>\n version 2<br/>\n </div>";
    		$('#comandos').html(text);
    		leyenda_uno=false;
    	}
    	text =" <div> <br/>\n ["+las_ips+"] "+"Network "+ip_ini_enruta +"</div>";
    	$( ".comandos_cisco" ).html(text);
        break; 

    case "eigrp":
    	if (leyenda_uno) {
    		text="<br/> conf t<br/>\n router eigrp "+$( "#autonomo" ).val();
    		$('#comandos').html(text);
    		leyenda_uno=false;
    	}
    	text ="<br/>\n ["+las_ips+"] "+"Network "+ip_ini_enruta;
        $( ".comandos_cisco" ).append(text);
        break; 

    case "estatico":
    	if (leyenda_uno) {
    		text="<br/> conf t <br/>\n";
    		$('#comandos').html(text);
  			leyenda_uno=false;
    	}
        text ="<br/>\n ["+las_ips+"] "+"ip route "+ip_ini_enruta+" "+mascara+" [puerto_salida]";
        $( ".comandos_cisco" ).append(text);
        break; 

    case "ospf":
    	if (leyenda_uno) {
    		text="<br/> conf t<br/>\n router ospf "+$( "#autonomo" ).val();
    		$('#comandos').html(text);
    		leyenda_uno=false;
    	}
    	
        text = "<br/>\n ["+las_ips+"] "+"Network "+ip_ini_enruta+" "+mascara+" a "+$( "#area" ).val();
        $( ".comandos_cisco" ).append(text);
        break; 

    default: 
        text = "ERROR, ALGO ANDA MAL";
}
	}
})

$(document).ready(function(){

    $.lilita = function(parametro){
		 console.log(parametro);
	}
});


function principal() {
	var asi_de_ips=Number(capturar_cuantas_ips());
	las_ips=asi_de_ips;
	console.log("---------------------------N0. IPS: ",asi_de_ips,"-------------------------")
	
	var txts = $("<br></br>"); 
	$('#resultado_ipsx').append(txts); 
	txts=$("<div></div>").text("-----------------N0. IPS: "+asi_de_ips+"---------").css("color","red");
	$('#resultado_ipsx').append(txts); 

	var pot_resultado=elevar(asi_de_ips);
	que_rango_mascara(Number(pot_resultado.potencia));
	calcula_ip_inicial();
	insertar_comandosj();
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
	ip_ini_enruta=remplazador(ip_red);
	imprimirj("Ip red: ",ip_red,mascara,"green");
	var ipmod=ip_red.slice();;
	ipmod[3]=ipmod[3]+1;
	imprimirj("1st valida: ",ipmod,mascara,"blue");
	ipmod[3]=ipmod[3]+1;
	imprimirj("2nd valida: ",ipmod,mascara,"blue");
}

function remplazador(argument) {
	return argument.toString().replace(/,/g,".");
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
	
	imprimirj("Ip broadcast ",ip_red,"","green");

	

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