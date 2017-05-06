$(document).ready(function(){

	// Cuando se presione el boton bt_calcular
	$( "#bt_calcular" ).click(function() {
    	$.main();
	});

	// Funcion principal
	$.main = function(){
		ip_red = $( "#ip_red" ).val();
		ip_red= ip_red.split(".").map(Number);
    	for_numero_redes($( "#num_redes" ).val());
	}

	// Detecta enter
	$(document).keypress(function(e) {
		if(e.which == 13) {
			$.main();
		}
	});

	// Si selecciona el radio boton eigrp
    $('#eigrp').click(function () {
        if ($(this).is(':checked')) {
            tipo_enruta="eigrp";
            document.getElementById('input_num').style.display = "block";
            document.getElementById('input_area').style.display = "none";
        }
    });

    // Si selecciona el radio boton rip
    $('#rip').click(function () {
        if ($(this).is(':checked')) {
            tipo_enruta="rip";
            document.getElementById('input_num').style.display = "none";
            document.getElementById('input_area').style.display = "none";
        }
    });


    $('#estatico').click(function () {
        if ($(this).is(':checked')) {
            tipo_enruta="estatico";
            document.getElementById('input_num').style.display = "none";
            document.getElementById('input_area').style.display = "none";
        }
    });


    $('#ospf').click(function () {
        if ($(this).is(':checked')) {
            tipo_enruta="ospf";
            document.getElementById('input_area').style.display = "block";
            document.getElementById('input_num').style.display = "block";
        }
    });


     $('#revuelto').click(function () {
        if ($(this).is(':checked')) {
            normal=false;
            console.log("Manual, trabajando para automatico ;)");
        }
    });


});