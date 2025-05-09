// ==UserScript==
// @name         Desgificador
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Quita los avatares animados porque AMQ está tan bien programado que consumen un huevo de cpu
// @author       Alguien
// @match        https://animemusicquiz.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=animemusicquiz.com
// @grant        GM_registerMenuCommand
// @run-at context-menu
// ==/UserScript==

(function() {
    'use strict';

    GM_registerMenuCommand('Desgificar', setInterval(desgificar, 400), {
        title: "Desgificar",
    })

    function desgificar() {

        // Imágenes de perfil del lobby
        let perfilesLobby = document.getElementsByClassName("lobbyAvatarImgContainerInner");

        for (let i = 0; i < perfilesLobby.length; i++) {
            if (typeof(perfilesLobby[i]) != 'undefined' && perfilesLobby[i] != null)
            {
                for (let j = 0; j < perfilesLobby[i].childNodes.length; j++) {
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
                        if(contenedoresAvatarJuego[i].childNodes[j].classList.contains("avatarSpineContainer")){
                            contenedoresAvatarJuego[i].childNodes[j].remove();
                        }
                    }
                }
            }
        }
    }
})();