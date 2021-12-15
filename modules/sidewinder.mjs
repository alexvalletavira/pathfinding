import {cambiarCasilla} from "./utiles.mjs";
import {randomNumber} from "./mazeBuilder.mjs";

export function sidewinder(mapa, height, width){

    for (let i = 0; i < height; i++) {

        for (let j = 0; j < width; j++) {

            cambiarCasilla(i + "-" + j, '#', mapa)

        }

    }

    let posX = 1;
    let posY = 1;

    while(posY < height - 1){

        let cut = randomNumber(posX, Math.min(posX + 4, width - 1));

        if(cut === width - 3){

            cut++;

        }

        let north = randomNumber(posX, cut);

        for(posX; posX <= cut; posX++){

            cambiarCasilla(posY + "-" + posX, '.', mapa)

            if(posX === north){

                if(posY != 1) {

                    cambiarCasilla(posY - 1 + "-" + posX, '.', mapa);

                    cambiarCasilla(posY - 2 + "-" + posX, '.', mapa);

                }

            }

        }

        if(posX < width - 1){

            posX += 1;

        }else{

            posX = 1;
            posY += 2;

        }

    }

}
