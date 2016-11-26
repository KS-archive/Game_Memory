$(document).ready(function(){
	
	var licznik_c = 0;
	var klasa1;
	var licznik_globalny = 0;
	
	// Tworzenie div dla zawartosci
	var zawartosc = "";
	for (var i=0; i<96; i++){
		zawartosc += '<div class="card" id="card'+i+'"></div>';
	}
	$("#board").html(zawartosc);
	
	//Tworzenie tablicy z numerami grafik
	var grafika = new Array(109);
	for (var j=0;j<109;j++){
		grafika[j] = j;	
	}
	shuffle(grafika);
	
	//Tworzenie tablicy z numerami div
	var divy = new Array(96);
	for (var k=0;k<96;k++){
		divy[k] = k;	
	}
	shuffle(divy);
	
	//Dodawanie grafik do div
	for(var l=0; l<48; l++){
	var karta = "#card"+divy[l];
	var karta2 = "#card"+divy[l+48];
	var obrazekp = 'img/img (' +grafika[l]+').png';
	var obrazek = '<img draggable="false" class="img' + l + ' card_h" src="' + obrazekp + '"/>';
	$(karta).html(obrazek);
	$(karta2).html(obrazek);
	}
	
	//Inicjowanie gry gracza 1
	$("#player1").addClass("aktywny1");
	punkty1 = 0;
	punkty2 = 0;
	aktywny = "gracz1";
	
	//Odsłanianie kart przy kliknięciu
	$(".card_h").click(function(){
		$(this).addClass("card_v").removeClass("card_h");
		licznik_c++;
		
		if(licznik_c == 1){
			klasa1 = $(this).attr("class");
		}
		//Reakcje po odslonieciu 2 kart	
		if(licznik_c == 2){
			// Karty są identyczne
			if(klasa1 == $(this).attr("class")){
				
				var dlugosc = klasa1.length;
				if(dlugosc == 12){
					klasa_uchwyt = "." + klasa1.slice(0,5);
				}else{
					klasa_uchwyt = "." + klasa1.slice(0,4);
				}
				
				$('*').addClass('dez');
				setTimeout(usun,750);
				function usun(){
				$(klasa_uchwyt).addClass("szara").removeClass("card_v");
				licznik_c = 0;
				licznik_globalny++;
				zmien_gracza_punkt();
				sprawdz_licznik_globalny(licznik_globalny);
				$('*').removeClass('dez');
			}}
			// Karty są różne
			else{
				$('*').addClass('dez');
				setTimeout(sprawdzenie,1000);
				function sprawdzenie(){
					$(".card_v").addClass("card_h").removeClass("card_v");
					licznik_c = 0;
					zmien_gracza();
					$('*').removeClass('dez');
				}
			}}
	});
});
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
function sprawdz_licznik_globalny(x){
	if(x == 48){
		if(punkty1>punkty2){
		$("#board").html('<div id="container_end"><div id="element1">Koniec gry!</div><div id="element2_1">Wygrywa gracz 1</div><div id="element3" onclick="location.reload()">Jeszcze raz?</div></div>');}
		else if (punkty2>punkty1){
		$("#board").html('<div id="container_end"><div id="element1">Koniec gry!</div><div id="element2_2">Wygrywa gracz 2</div><div id="element3" onclick="location.reload()">Jeszcze raz?</div></div>');}
		else if(punkty2==punkty1){$("#board").html('<div id="container_end"><div id="element1">Koniec gry!</div><div id="element2_3">Macie remis</div><div id="element3" onclick="location.reload()">Jeszcze raz?</div></div>');}
	}
}
function zmien_gracza_punkt(){
	if(aktywny == "gracz1"){
		punkty1++;
		var punktacja = punkty1 + " pkt.";
		$("#p1Bottom").html(punktacja);
	}else{
		punkty2++;
		var punktacja = punkty2 + " pkt.";
		$("#p2Bottom").html(punktacja);
	}
}
function zmien_gracza(){
	if(aktywny == "gracz1"){
		aktywny = "gracz2";
		$("#player1").removeClass("aktywny1");
		$("#player2").addClass("aktywny2");
	}else{
		aktywny = "gracz1";
		$("#player2").removeClass("aktywny2");
		$("#player1").addClass("aktywny1");
	}
}