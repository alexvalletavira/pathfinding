import {paintReturn} from './utiles.mjs';

export function BFS(nodos, nodosConserve, aniNode, mapaInvestigado, height, width, startX, startY, mapa) { //dijkstra pathfinding

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
    });

    nodosConserve.push({
        posX: startX,
        posY: startY,
        fatherPosX: startX,
        fatherPosY: startY,
    });


    while (nodos.length != 0) {

        aniNode++;

        if (mapa[nodos[0].posX][nodos[0].posY] === 'e') {

            found = true;
            break;
        }

        mapaInvestigado[nodos[0].posX][nodos[0].posY] = 'i';

        for (let i = -1; i <= 1; i++) {

            for (let j = -1; j <= 1; j++) {

                if ((i != 0 || j != 0) && (i == 0 || j == 0)) {

                    found = addBFS(nodos[0], i, j, height, width, mapa, nodos, nodosConserve, mapaInvestigado, aniNode);

                    if (found) break;

                }
            }

            if (found) break;

        }

        if (found) break;

        nodos.splice(0, 1);

    }

    let aniTiming = 0;

    if (found) aniTiming = paintReturn(nodosConserve);

    return aniTiming;

}


function addBFS(nodo, direccionX, direccionY, height, width, mapa, nodos, nodosConserve, mapaInvestigado, aniNode) {

    if ((nodo.posX + direccionX) >= 0 && (nodo.posX + direccionX) < height && (nodo.posY + direccionY) >= 0 && (nodo.posY + direccionY) < width) {

        if (mapa[nodo.posX + direccionX][nodo.posY + direccionY] != '#' && mapaInvestigado[nodo.posX + direccionX][nodo.posY + direccionY] != 'i') {

            let nodo2 = {
                posX: nodo.posX + direccionX,
                posY: nodo.posY + direccionY,
                fatherPosX: nodo.posX,
                fatherPosY: nodo.posY,
                end: mapa[nodo.posX + direccionX][nodo.posY + direccionY] === 'e' ? true : undefined,
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
        }

    }

}

