var final_primera=true;
var ips_calculadas=[];

function main_revuelto() {
	var asi_de_ips=Number(capturar_cuantas_ips());
	console.log("---------------------------N0. IPS: ",asi_de_ips,"-------------------------")
	var pot_resultado=elevar(asi_de_ips); //array de elevado y resultado
	que_rango_mascara(Number(pot_resultado.potencia));
	ip_inicial_revuelto();
	ip_final_revuelto(pot_resultado.resultado_potencia);
}

function ip_inicial_revuelto() {
	if (primera_vez) {
		console.log("%cESTE ES VALIDO","color:orange");
		primera_vez=false;
		imprimir("Ip inicial ",ip_red,mascara,"green");
		ip_red[3]=ip_red[3]+1;
		imprimir("1st valida: ",ip_red,mascara,"blue");
		ip_red[3]=ip_red[3]+1;
		imprimir("2nd valida: ",ip_red,mascara,"blue");
		/*var arr = [ip_red,0]; //Analisis vectorial función
		ips_calculadas.push(arr);*/
	}
}

function ip_final_revuelto(elmultiplo) {
	if (final_primera) {
		final_primera=false;
		calcula_ip_final(elmultiplo);
	}else{
		if (elmultiplo<=256) {
			imprimir("Incrementa ip en ",("0.0.0."+(elmultiplo-1)),mascara,"green");
		}else{
			var mod_this=rango_modificar(elmultiplo);
			imprimir("Incrementa ip en ",("0.0.0."+(mod_this)+".255"),mascara,"green");
		}	
	}
}