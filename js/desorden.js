// Si el orden de las ips se ingresan de forma aleatoria

var final_primera=true;
var ips_calculadas=[];

function main_revuelto() {
	var asi_de_ips=Number(capturar_cuantas_ips());
	console.log("---------------------------N0. IPS: ",asi_de_ips,"-------------------------")
	
	var txts = $("<br></br>"); 
	$('#resultado_ipsx').append(txts); 
	txts=$("<div></div>").text("-----------------N0. IPS: "+asi_de_ips+"---------").css("color","red");
	$('#resultado_ipsx').append(txts); 


	var pot_resultado=elevar(asi_de_ips); //array de elevado y resultado
	que_rango_mascara(Number(pot_resultado.potencia));
	ip_inicial_revuelto();
	ip_final_revuelto(pot_resultado.resultado_potencia);
}

function ip_inicial_revuelto() {
	if (primera_vez) {
		console.log("%cESTE ES VALIDO","color:orange");
		primera_vez=false;
		imprimirj("Ip inicial ",ip_red,mascara,"green");
		ip_red[3]=ip_red[3]+1;
		imprimirj("1st valida: ",ip_red,mascara,"blue");
		ip_red[3]=ip_red[3]+1;
		imprimirj("2nd valida: ",ip_red,mascara,"blue");
	}
}

function ip_final_revuelto(elmultiplo) {
	if (final_primera) {
		final_primera=false;
		if (elmultiplo<255) {
			
				if ((ip_red[3]+(elmultiplo-1)) <= 255)   {
				ip_red[3]=(elmultiplo-1);
				imprimirj("Ip final ",ip_red,mascara,'green');
				
			}else{
				console.log('Algo anda mal');
			}
		}else{
			console.log('Algo anda mal');
		}
		
		
	}else{
		if (elmultiplo<=256) {
			imprimirj("Incrementa ip en ",("0.0.0."+(elmultiplo-1)),mascara,"green");
		}else{
			var mod_this=rango_modificar(elmultiplo);
			imprimirj("Incrementa ip en ",("0.0.0."+(mod_this)+".255"),mascara,"green");
		}	
	}
}