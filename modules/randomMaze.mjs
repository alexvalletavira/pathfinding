import {cambiarCasilla} from "./utiles.mjs";
import {randomNumber} from "./mazeBuilder.mjs";

export function randommMaze(mapa, height, width) {

    for (let i = 0; i < height; i++) {

        for (let j = 0; j < width; j++) {

            if(i === 0 || i === height - 1 || j === 0 || j === width - 1) {

                cambiarCasilla(i + "-" + j, '#', mapa);

            }else {

                if (randomNumber(0, 100) > 50) {

                    cambiarCasilla(i + "-" + j, '#', mapa);

                } else {

                    cambiarCasilla(i + "-" + j, '.', mapa)

                }

            }

        }

    }

}
