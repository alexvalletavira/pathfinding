import {cambiarCasilla} from "./utiles.mjs";

export function buildMaze(width, height, mapa) {

    let divisiones = [];

    divisiones.push({
        x1: 1,
        x2: width - 1,
        y1: 1,
        y2: height - 1,
    });

    for (let i = 0; i < width; i++) {

        cambiarCasilla(0 + "-" + i, '#', mapa);
        cambiarCasilla((height - 1) + "-" + i, '#', mapa)

    }

    for (let i = 0; i < height; i++) {

        cambiarCasilla(i + "-" + 0, '#', mapa);
        cambiarCasilla(i + "-" + (width - 1), '#', mapa)

    }


    let xa = 0;

    while (divisiones.length != 0 && xa < 100) {

        divide(divisiones, width, height, mapa);

        xa++
    }

}


function divide(divisiones, width, height, mapa) {

    let division = divisiones[0];

    if (division.x2 - division.x1 > 3 && division.y2 - division.y1 > 3) {

        let divWidth = randomNumber((((division.x2 - division.x1) / 2) + division.x1) * 1, (((division.x2 - division.x1) / 2) + division.x1) * 1.0, -1);

        divWidth = Math.round(divWidth);

        let divHeight = randomNumber((((division.y2 - division.y1) / 2) + division.y1) * 1, (((division.y2 - division.y1) / 2) + division.y1) * 1.0, -1);

        divHeight = Math.round(divHeight);

        for (let i = division.x1; i < division.x2; i++) {

            cambiarCasilla(divHeight + "-" + i, '#', mapa)

        }

        for (let i = division.y1; i < division.y2; i++) {

            cambiarCasilla(i + "-" + divWidth, '#', mapa)

        }

        cambiarCasilla(divHeight + "-" + divWidth, '#', mapa);

        let randomDecision = randomNumber(0, 100, -1);

        if (!(randomDecision >= 0 && randomDecision < 25)) {

            cambiarCasilla((randomNumber(0, 100) % 2 === 0 ? division.y1 + 1 : divHeight - 1) + "-" + divWidth, '.', mapa);
        }

        if (!(randomDecision >= 25 && randomDecision < 50)) {

            cambiarCasilla((randomNumber(0, 100) % 2 === 0 ? divHeight + 1 : division.y2 - 1) + "-" + divWidth, '.', mapa);

        }

        if (!(randomDecision >= 50 && randomDecision < 75)) {

            cambiarCasilla(divHeight + "-" + (randomNumber(0, 100) % 2 === 0 ? divWidth + 1 : division.x2 - 1), '.', mapa);

        }

        if (!(randomDecision >= 75 && randomDecision < 100)) {

            cambiarCasilla(divHeight + "-" +  (randomNumber(0, 100) % 2 === 0 ? division.x1 + 1 : divWidth - 1), '.', mapa);

        }

        divisiones.push({
            x1: division.x1,
            x2: divWidth,
            y1: division.y1,
            y2: divHeight,
        });

        divisiones.push({
            x1: divWidth,
            x2: division.x2,
            y1: division.y1,
            y2: divHeight,
        });

        divisiones.push({
            x1: division.x1,
            x2: divWidth,
            y1: divHeight,
            y2: division.y2,
        });

        divisiones.push({
            x1: divWidth,
            x2: division.x2,
            y1: divHeight,
            y2: division.y2,
        });

    }

    divisiones.splice(0, 1)

}


export function randomNumber(min, max, bannedNum) {

    let generatedNumber = Math.floor((Math.random() * (max - min)) + min);

    while (generatedNumber === bannedNum) {

        generatedNumber = Math.floor((Math.random() * (max - min)) + min)

    }

    return generatedNumber;
}
