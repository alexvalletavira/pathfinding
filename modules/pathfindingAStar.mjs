import {dameIndice, paintReturn} from "./utiles.mjs";

export function aStar(nodos, nodosConserve, aniNode, mapaInvestigado, height, width, startX, startY, endX, endY, mapa) { //astar pathfinding

    let found = false;

    for (let i = 0; i < height; i++) {

        var filaInvestigado = [];

        for (let j = 0; j < width; j++) {

            filaInvestigado.push('.');
        }

        mapaInvestigado.push(filaInvestigado)

    }

    nodos.push({
        posX: startX,
        posY: startY,
        fatherPosX: startX,
        fatherPosY: startY,
        valor: distancia(startX, startX, startY, startY) + distancia(startX, endX, startY, endY),
        distaciaNodos: 0,
    });

    nodosConserve.push({
        posX: startX,
        posY: startY,
        fatherPosX: startX,
        fatherPosY: startY,
    });

    let check = 0; //indice para obtener el indice del nodo correspondiende. En A star es la funcion heuristica.

    while (nodos.length != 0) {

        aniNode++;

        if (mapa[nodos[check].posX][nodos[check].posY] === 'e') {

            found = true;
            break;
        }

        mapaInvestigado[nodos[check].posX][nodos[check].posY] = 'i';

        for (let i = -1; i <= 1; i++) {

            for (let j = -1; j <= 1; j++) {

                if ((i != 0 || j != 0) && (i == 0 || j == 0)) {

                    found = addNodeAStar(nodos[check], i, j, height, width, mapa, nodos, nodosConserve, mapaInvestigado, aniNode, startX, startY, endX, endY);
                    if (found) break;

                }

            }

        }

        if (found) break;

        nodos.splice(check, 1);

        if (nodos.length != 0) check = getLowestValue(nodos);

    }

    let aniTiming = 0;

    if (found) aniTiming = paintReturn(nodosConserve);

    return aniTiming;


}

function addNodeAStar(nodo, direccionX, direccionY, height, width, mapa, nodos, nodosConserve, mapaInvestigado, aniNode, startX, startY, endX, endY) {

    if ((nodo.posX + direccionX) >= 0 && (nodo.posX + direccionX) < height && (nodo.posY + direccionY) >= 0 && (nodo.posY + direccionY) < width) {

        if (mapa[nodo.posX + direccionX][nodo.posY + direccionY] != '#') {
            if (mapaInvestigado[nodo.posX + direccionX][nodo.posY + direccionY] != 'i') {
                let nodo2 = {
                    posX: nodo.posX + direccionX,
                    posY: nodo.posY + direccionY,
                    fatherPosX: nodo.posX,
                    fatherPosY: nodo.posY,
                    end: true,
                    valor: nodo.valor + distancia(nodo.posX + direccionX, nodo.posX, nodo.posY + direccionY, nodo.posY) + distancia(nodo.posX + direccionX, endX, nodo.posY + direccionY, endY),
                    distaciaNodos: nodo.distaciaNodos + 1,
                };

                if (mapa[nodo.posX + direccionX][nodo.posY + direccionY] === 'e') {

                    nodos.unshift(nodo2);

                } else {

                    nodos.push(nodo2);

                }

                nodosConserve.push({
                    posX: nodo.posX + direccionX,
                    posY: nodo.posY + direccionY,
                    fatherPosX: nodo.posX,
                    fatherPosY: nodo.posY,
                    end: mapa[nodo.posX + direccionX][nodo.posY + direccionY] === 'e' ? true : undefined,
                });


                mapaInvestigado[nodo.posX + direccionX][nodo.posY + direccionY] = 'i';

                $("#" + (nodo.posX + direccionX) + "-" + (nodo.posY + direccionY)).removeClass("animacionHaciaBlancoCasilla");

                $("#" + (nodo.posX + direccionX) + "-" + (nodo.posY + direccionY)).delay(aniNode)
                    .delay(aniNode)
                    .queue(function (next) {
                        $(this).addClass("animacionHaciaAmarilloCasilla");
                        next();
                    });

                return mapa[nodo.posX + direccionX][nodo.posY + direccionY] === 'e'; //retornamos si es final

            } else checkFather(direccionX, direccionY, nodo, nodosConserve);

        }

    }

}

function getLowestValue(nodos) { //funcion que obtiene el valor mas pequeño heuristico, utilziado para saber que nodo usar ahora.

    let indx = 0;
    let min = nodos[0].valor;

    for (let i = 0; i < nodos.length; i++) {

        if (nodos[i].valor < min) {

            indx = i;
            min = nodos[i].valor;

        }

    }

    return indx;

}

function distancia(x1, x2, y1, y2) { //funcion que calcula la distancia de dos puntos

    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

}

function checkFather(direccionX, direccionY, nodo, nodosArray) { //funcion que se reorganiza los padres de los nodos

    let nodoCheckearIndx = dameIndice(nodo.posX + direccionX, nodo.posY + direccionY, nodosArray);

    if (nodosArray[nodoCheckearIndx].distaciaNodos > nodo.distaciaNodos) {

        if (!(nodosArray[nodoCheckearIndx].posX === nodo.fatherPosX && nodosArray[nodoCheckearIndx].posY === nodo.fatherPosY)) { //si nodo no tiene como padre nodo a checkear, nodo será padre de nodo a checkear

            nodosArray[nodoCheckearIndx].fatherPosX = nodo.posX;
            nodosArray[nodoCheckearIndx].fatherPosY = nodo.posY;

        }

    }
}

