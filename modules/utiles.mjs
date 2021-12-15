export function dameId(codigo) { //funcion que extrae las ids de las casillas y las devuelve como dos numeros ej: "8-12" -> 8, 12

    let encontrado = false;
    let id1 = "";
    let id2 = "";

    for (let i = 0; i < codigo.length; i++) {

        if (codigo[i] === '-') {

            encontrado = true;

        } else {

            if (encontrado) {

                id2 = id2 + codigo[i];

            } else {

                id1 = id1 + codigo[i];

            }

        }

    }

    return [id1, id2];

}

export function cambiarCasilla(codigo, modo, mapa) { //funcion que cambia dos casillas. la casilla se cambiará al tipo de casilla contenida en "modo"

    let info = dameId(codigo);

    let x = info[0];
    let y = info[1];

    if (mapa[x][y] != modo && (mapa[x][y] != 's') && (mapa[x][y] != 'e')) {

        mapa[x][y] = modo;

        if (modo === '#') {

            $("#" + codigo).removeClass("animacionHaciaNaranjaCasilla");
            $("#" + codigo).removeClass("animacionHaciaAmarilloCasilla");
            $("#" + codigo).removeClass("animacionHaciaBlancoCasilla");
            $("#" + codigo).addClass("animacionHaciaAzulCasilla")

        }

        if (modo === '.') {

            $("#" + codigo).removeClass("animacionHaciaNaranjaCasilla");
            $("#" + codigo).removeClass("animacionHaciaAmarilloCasilla");
            $("#" + codigo).removeClass("animacionHaciaAzulCasilla");
            $("#" + codigo).addClass("animacionHaciaBlancoCasilla")

        }

    }

}

export function searchNodeByPos(posX, posY, nodosConserve) {

    let indx = 0;

    for (let i = 0; i < nodosConserve.length; i++) {

        if (nodosConserve[i].posX === posX && nodosConserve[i].posY === posY) {

            indx = i;

        }

    }

    return indx;

}

export function paintReturn(nodosConserve) { //funcion para rehacer los pasos del final hasta el origen

    let indx = 0;

    for (let i = 0; i < nodosConserve.length; i++) {

        if (nodosConserve[i].end === true) {

            indx = i;

        }

    }

    let aniTiming = 0;

    let nodo = nodosConserve[indx];

    while (nodo != undefined) {

        aniTiming++;

        $("#" + (nodo.posX) + "-" + (nodo.posY)).removeClass("animacionHaciaAmarilloCasilla");

        $("#" + (nodo.posX) + "-" + (nodo.posY)).delay((aniTiming * 20) + 100)
            .delay((aniTiming * 20) + 100)
            .queue(function (next) {
                $(this).addClass("animacionHaciaNaranjaCasilla");
                next();
            });

        if (nodo === nodosConserve[searchNodeByPos(nodo.fatherPosX, nodo.fatherPosY, nodosConserve)]) {

            break;
        }

        nodo = nodosConserve[searchNodeByPos(nodo.fatherPosX, nodo.fatherPosY, nodosConserve)]

    }

    return (aniTiming * 20) + 100;

}

export function clearPathfinding(height, width) {

    for (let i = 0; i < height; i++) {

        for (let j = 0; j < width; j++) {

            $("#" + i + "-" + j).removeClass("animacionHaciaAmarilloCasilla");
            $("#" + i + "-" + j).removeClass("animacionHaciaNaranjaCasilla");

        }
    }
}

export function clearBlock(height, width, mapa) {

    for (let i = 0; i < height; i++) {

        for (let j = 0; j < width; j++) {

            $("#" + i + "-" + j).removeClass("animacionHaciaAzulCasilla");

            if (mapa[i][j] === '#') {

                mapa[i][j] = '.';

            }

        }
    }
}

export function dameIndice(x, y, nodos) { //funcion que devuelve el indice en una array de nodos a partir de unas coordenadas

    for (let i = 0; i < nodos.length; i++) {

        if (nodos[i].posX === x && nodos[i].posY === y) {

            return i;

        }

    }

}
