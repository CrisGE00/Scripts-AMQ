// ==UserScript==
// @name         Shrekificador
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       Alguien
// @match        https://animemusicquiz.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=animemusicquiz.com
// @grant        GM_registerMenuCommand
// @run-at context-menu
// ==/UserScript==

(function() {
	'use strict';
    let puntuacionInicial = 0;
    let check = 0;
    const thinkImg = "https://i.imgur.com/PBljZuE.png";
    const waitImg = "https://i.imgur.com/BIrfyAk.png";
    const correctImg = "https://i.imgur.com/YbweYsc.png";
    const noAnswerImg = "https://i.imgur.com/DYA5PaG.png";
    const wrongImg = "https://i.imgur.com/DYA5PaG.png";

    GM_registerMenuCommand('Shrekificar', setInterval(shrekificar, 200), {
        title: "Shrekificar",
    })

    function shrekificar() {

        // --------- AVATARES -------------

        //Imagen de la esquina
        let contenedorImagenEsquina = document.getElementById("avatarUserImgContainerInner");
        if (typeof(contenedorImagenEsquina) != 'undefined' && contenedorImagenEsquina != null)
        {
            if(contenedorImagenEsquina.firstChild.classList.contains("avatarImage")){
                contenedorImagenEsquina.firstChild.remove();
                let shrekEsquina = document.createElement("img");
                shrekEsquina.src = "https://i.imgur.com/o3vVI7W.png";
                shrekEsquina.style.width = "150px";
                shrekEsquina.style.height = "150px";

                contenedorImagenEsquina.appendChild(shrekEsquina);

            }
        }

        // Imágenes de perfil del lobby
        let perfilesLobby = document.getElementsByClassName("lobbyAvatarImgContainerInner");

        for (let i = 0; i < perfilesLobby.length; i++) {
            if (typeof(perfilesLobby[i]) != 'undefined' && perfilesLobby[i] != null)
            {
                for (let j = 0; j < perfilesLobby[i].childNodes.length; j++) {
                    if(perfilesLobby[i].childNodes[j].classList.contains("avatarImage")){
                        perfilesLobby[i].childNodes[j].remove();
                        let shrekLobby = document.createElement("img");
                        shrekLobby.src = "https://i.imgur.com/o3vVI7W.png";
                        shrekLobby.style.width = "125px";
                        shrekLobby.style.height = "125px";

                        perfilesLobby[i].appendChild(shrekLobby);
                    }
                    if(perfilesLobby[i].childNodes[j].classList.contains("avatarSpineContainer")){
                        perfilesLobby[i].childNodes[j].remove();
                    }
                }
            }
        }

        // Contenedores de imágenes de los avatares en el juego
        let contenedoresAvatarJuego = document.getElementsByClassName("qpAvatarImageInnerContainer");


        for (let i = 0; i < contenedoresAvatarJuego.length; i++) {
            if (typeof(contenedoresAvatarJuego[i]) != 'undefined' && contenedoresAvatarJuego[i] != null)
            {
                for (let j = 0; j < contenedoresAvatarJuego[i].childNodes.length; j++) {
                    if(contenedoresAvatarJuego[i].childNodes[j].classList != 'undefined' && contenedoresAvatarJuego[i].childNodes[j].classList != null){
                        if(contenedoresAvatarJuego[i].childNodes[j].classList.contains("avatarImage")){
                            contenedoresAvatarJuego[i].childNodes[j].remove();
                            let shrekJuego = document.createElement("img");
                            shrekJuego.setAttribute("id","jugador"+i);
                            shrekJuego.src = "https://i.imgur.com/BIrfyAk.png";
                            shrekJuego.style.width = "139px";
                            shrekJuego.style.height = "205px";

                            contenedoresAvatarJuego[i].appendChild(shrekJuego);
                        }

                        if(contenedoresAvatarJuego[i].childNodes[j].classList.contains("avatarSpineContainer")){
                            contenedoresAvatarJuego[i].childNodes[j].remove();
                        }
                    }
                }
            }
        }


         // Comprobación de estados de avatares
        for (let i = 0; i < contenedoresAvatarJuego.length; i++) {
            let jugadorExiste = document.getElementById("jugador"+i);
            if (typeof(jugadorExiste) != 'undefined' && jugadorExiste != null){
                let estadoRespuesta = jugadorExiste.closest(".qpAvatarContainerOuter");

                if(estadoRespuesta.classList.contains("think") && jugadorExiste.src != thinkImg){
                    jugadorExiste.src = thinkImg;
                }else if (estadoRespuesta.classList.contains("wait") && jugadorExiste.src != waitImg){
                    jugadorExiste.src = waitImg;
                }else if (estadoRespuesta.classList.contains("correct") && jugadorExiste.src != correctImg){
                    jugadorExiste.src = correctImg;
                }else if (estadoRespuesta.classList.contains("noAnswer") && jugadorExiste.src != noAnswerImg){
                    jugadorExiste.src = noAnswerImg;
                }else if (estadoRespuesta.classList.contains("wrong") && jugadorExiste.src != wrongImg){
                    jugadorExiste.src = wrongImg;
                }
            }
        }
        if (contenedoresAvatarJuego.length == 0){
            puntuacionInicial = 0;
        }

        // ----- SONIDOS -----
        // Aciertos/Fallos
        let nombreJugador = document.getElementsByClassName("qpsPlayerName");
        for (let i = 0; i < nombreJugador.length; i++) {
            if (typeof(nombreJugador[i]) != 'undefined' && nombreJugador[i] != null){
                if(nombreJugador[i].classList.contains("self")){
                    let puntuacion = parseInt(nombreJugador[i].parentElement.firstChild.textContent);
                    if(puntuacion == puntuacionInicial && document.getElementById("qpAnimeNameHider").classList.contains("hide") && document.getElementById("qpAmqHintContainer").classList.contains("hide") && document.getElementById("qpVideoHider").classList.contains("hide") && check == 0 ){
                        playSound("https://audio.jukehost.co.uk/rLxweLGEGbVQwydtPyi0KHoLNJRAgjLn");
                        check = 1;
                    }else if(puntuacion != puntuacionInicial && document.getElementById("qpAnimeNameHider").classList.contains("hide") && document.getElementById("qpAmqHintContainer").classList.contains("hide") && document.getElementById("qpVideoHider").classList.contains("hide") && check == 0){
                        playSound("https://audio.jukehost.co.uk/8sI6VynlTTzCcc4OlQhA3RVHAdExpGBL");
                        puntuacionInicial = puntuacion;
                        check = 1;
                    }

                    if(!document.getElementById("qpAnimeNameHider").classList.contains("hide") && check == 1){
                        check = 0;
                    }
                }
            }
        }



        // ------------- COSAS RANDOM -------------

        // IMAGEN NOTICIAS
        let imagenesNoticias = document.getElementsByClassName("mpNewsImage");
        for (let i = 0; i < imagenesNoticias.length; i++) {
            if (typeof(imagenesNoticias[i]) != 'undefined' && imagenesNoticias[i] != null){
                imagenesNoticias[i].src = "https://i.imgur.com/H4h2yeA.png";
            }
        }

    }

    function playSound(url) {
        let a = new Audio(url);
        a.volume = 0.2;
        a.play();
    }
})();

