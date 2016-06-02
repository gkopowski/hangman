//hasla
var hasla = [];

hasla.push("Co zaszkodziło to nauczyło");
hasla.push("Co zima przychłodzi, lato wynagrodzi");
hasla.push("Czapka na uchu, a wesz na brzuchu");
hasla.push("Czego nie można zmienić, to trzeba polubić");
hasla.push("Czego się Jaś nie nauczy, Jan nie będzie umiał");
hasla.push("Czego się nauczymy, tego nam nikt nie wydrze");
hasla.push("Czego wiosna nie zasiała, jesień nie urodzi");
hasla.push("Człek zdechnie a robota zostanie");
hasla.push("Czuć się jak ryba w wodzie");
hasla.push("Czyja kosa pierwsza, tego miedza szersza");
hasla.push("Czyj nasiew tego plon");
hasla.push("Czyja rola tego wola");

//losowe haslo z tablicy hasel
var losowe_haslo = hasla[Math.floor(Math.random()*hasla.length)];

var haslo = losowe_haslo;
haslo = haslo.toUpperCase();
var zakryte_haslo = "";
var alfabet = "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż".toUpperCase().split('');
var liczba_pomylek = 0;

function start() {
	ustaw_obraz(0);
	zakryj_haslo();
	wpisz_haslo();
	wpisz_litery();
}

function ustaw_obraz(numer) {
	var obrazek = document.getElementById("obrazek");
	obrazek.innerHTML = "<img src=\"img/s" + numer + ".jpg\" />"
}

function wpisz_haslo() {
	var div_haslo = document.getElementById("haslo");
	div_haslo.innerHTML = zakryte_haslo;
}

function zakryj_haslo() {
	var dlugosc = haslo.length;
	
	for (i=0; i<dlugosc; i++) {
		if(haslo.charAt(i)==" ") zakryte_haslo += " ";
		else if (haslo.charAt(i)==",") zakryte_haslo += ",";
		else zakryte_haslo += "-";
	}
}

String.prototype.ustawZnak = function(miejsce, znak) {
	if(miejsce > this.length - 1) return this.toString();
	else return this.substr(0, miejsce) + znak + this.substr(miejsce + 1);
}

function wpisz_litery() {
	var div_alfabet = document.getElementById("alfabet");
	for (i=0; i<alfabet.length; i++) {
		div_alfabet.innerHTML += "<div id=\"p"+i+"\" class=\"litera\" onclick=\"sprawdz("+i+")\">" + alfabet[i] + "</div>";
		if ((i+1) % 7 == 0) div_alfabet.innerHTML += "<div style=\"clear:both\"></div>"
	}
}

function sprawdz(numer) {
	var trafiona = false;
	var przycisk = document.getElementById("p"+numer);
	
	for(i=0; i<haslo.length; i++) {
		if(haslo.charAt(i) == alfabet[numer]) {
			zakryte_haslo = zakryte_haslo.ustawZnak(i, alfabet[numer]);
			trafiona = true;
		}
	}
	
	if (trafiona) {
		przycisk.className += " succes";
		przycisk.setAttribute("onclick", ";");
	}
	else {
		liczba_pomylek++;
		przycisk.className += " failed";
		przycisk.setAttribute("onclick", ";");
		
		ustaw_obraz(liczba_pomylek);	
	}
	wpisz_haslo();
	
	//wygrana
	if (haslo == zakryte_haslo) document.getElementById("alfabet").innerHTML = "Brawo! Odgadłeś hasło: <br/><br/>" + haslo + 
	'<div class="reset" onclick="location.reload()"> Jeszcze raz? </div>';
	
	//przegrana
	if (liczba_pomylek >= 9) document.getElementById("alfabet").innerHTML = "Przegrana! Szukane hasło: <br/><br/>" + haslo + 
	'<div class="reset" onclick="location.reload()"> Jeszcze raz? </div>';
}

window.onload = start;