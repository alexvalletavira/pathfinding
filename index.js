import {cambiarCasilla, dameId, clearPathfinding, clearBlock} from './modules/utiles.mjs';
import {dijkstra} from './modules/pathfindingDijkstra.mjs';
import {aStar} from './modules/pathfindingAStar.mjs';
import {greedyFirstBest} from "./modules/pathfindingGreedyBestFirst.mjs";
import {depthFirst} from "./modules/pathFindingDepthFirst.mjs";
import {BFS} from "./modules/pathfindingBFS.mjs";
import {buildMaze} from './modules/mazeBuilder.mjs';
import {sidewinder} from "./modules/sidewinder.mjs";
import {randommMaze} from "./modules/randomMaze.mjs";

var height = 20;
var width = 60;
var mapa = [];

var string = "";
var stringFinal = "";

var mousedown = false;

var toggleDibujar = "azul";

var modo = '#';

var startX = 1;
var startY = 1;

var endX = 3;
var endY = 3;

var processing = true;

var mapaInvestigado;
var nodos = [];
var nodosConserve = [];

var aniNode = 0;

var selectedMode = "Dijkstra";

$(document).ready(function () {

    initialize();

    //evento para gestionar el clic sobre casillas, para empezar a poder pintar
    $(".casilla").on('click', function () {

        if (processing === false) {

            mousedown = !mousedown;

            if (mousedown) {

                cambiarCasilla($(this).attr("id"), modo, mapa);

                if (modo === '#') {

                    $(".casilla").css('cursor', 'url(brush1.png), auto');

                } else {

                    $(".casilla").css('cursor', 'url(brush2.png), auto');

                }

            } else {

                $(".casilla").css('cursor', 'auto');

            }

        }

    });

    //evento para pintar mientras está el brush activado y pasamos por una casilla
    $(".casilla").on('mouseenter', function () {

        if (processing === false) {

            if (mousedown) {

                cambiarCasilla($(this).attr("id"), modo, mapa);
            }

        }

    });

    //evento por si salimos de las casillas cuando estamos pintando, que dejemos de pintar
    $("#primary").on('mouseleave', function () {

        $(".casilla").css('cursor', 'auto');

        mousedown = false;

    });

    //evento para boton para cambiar el tipo de dibujo
    $(".toggleDibujar").on('click', function () {

        if (processing === false) {

            if (toggleDibujar === "blanco") {

                $("#toggleDibujar").removeClass("animacionHaciaAzulToggleDibujar");
                $("#toggleDibujar").addClass("animacionHaciaBlancoToggleDibujar");
                $("#toggleDibujar").html("<img src=\"brushToggle1.png\">");


                toggleDibujar = "azul";
                modo = '#';

            } else {

                $("#toggleDibujar").removeClass("animacionHaciaBlancoToggleDibujar");
                $("#toggleDibujar").addClass("animacionHaciaAzulToggleDibujar");
                $("#toggleDibujar").html("<img src=\"brushToggle2.png\">");

                toggleDibujar = "blanco";
                modo = '.';

            }

        }

    });

    //funcion para poder hacer drag del start
    $("#startN").draggable({
        appendTo: "body",
        cursor: "move",
        revert: "invalid"
    });

    //funcion para poder hacer drag del end
    $("#endN").draggable({
        appendTo: "body",
        cursor: "move",
        revert: "invalid"
    });

    //funcion para poder dropear el end y el start
    $(".casilla").droppable({
        accept: "#endN, #startN",
        drop: function (event, ui) {

            clearPathfinding(height, width)

            let idDroppedItem = ui.draggable.attr("id");

            let info = dameId($(this).attr("id"));

            if (idDroppedItem === "startN") {

                if (mapa[info[0]][info[1]] != 'e') {

                    $("#startN").css("top", $(this).css("top"));
                    $("#startN").css("left", $(this).css("left"));

                    mapa[startX][startY] = '.';

                    cambiarCasilla($(this).attr("id"), '.', mapa);
                    cambiarCasilla($(this).attr("id"), 's', mapa);

                    startX = parseInt(info[0]);
                    startY = parseInt(info[1]);

                } else {

                    let str1 = 100 + (31 * startX);
                    let str2 = 30 + (31 * startY);

                    $("#startN").css("top", str1 + "px");
                    $("#startN").css("left", str2 + "px");

                }
            }

            if (idDroppedItem === "endN") {

                if (mapa[info[0]][info[1]] != 's') {

                    $("#endN").css("top", $(this).css("top"));
                    $("#endN").css("left", $(this).css("left"));

                    mapa[endX][endY] = '.';

                    cambiarCasilla($(this).attr("id"), '.', mapa);
                    cambiarCasilla($(this).attr("id"), 'e', mapa);

                    endX = parseInt(info[0]);
                    endY = parseInt(info[1]);

                } else {

                    let str1 = 100 + (31 * endX);
                    let str2 = 30 + (31 * endY);

                    $("#endN").css("top", str1 + "px");
                    $("#endN").css("left", str2 + "px");

                }
            }

        }

    });

    $("#start").on('click', function () {

        if(!processing) start(nodos, nodosConserve, aniNode, mapaInvestigado, height, width, startX, startY, endX, endY, mapa);

    })

    $("#clearPath").on('click', function () {

        if(!processing) clearPathfinding(height, width)

    })

    $("#clearBlock").on('click', function () {

        if(!processing) clearBlock(height, width, mapa)

    })

    $(".itemDrop").on('click', function () {

        if(processing === false) {

            if ($(this).attr("id") != "basicMaze" && $(this).attr("id") != "sidewinder" && $(this).attr("id") != "iterative") {

                selectedMode = $(this).attr("id");

            } else {

                clearBlock(height, width, mapa);

                switch ($(this).attr("id")) {

                    case "basicMaze":
                        randommMaze(mapa, height, width)
                        break;

                    case "sidewinder":
                        sidewinder(mapa, height, width)
                        break;

                    case "iterative":
                        buildMaze(width, height, mapa)
                        break;

                }

            }


            $(".dropdown-content").css("display", "none");

            setTimeout(
                function () {

                    $(".dropdown-content").css("display", "");

                }, 0);

        }

    });

    $( window ).resize(function() {
        location.reload();
    });

    $("#buttonTutorial").on('click', function () {
        processing = false;
        $("#tutorial").css("display", "none");
    });


});

function initialize() {

    width = Math.max(Math.round( parseInt($(window).width()) /30.96 ) -2, 4); //adaptamos la anchura a la resolución. minimo 4 casillas

    height = Math.max(Math.round( parseInt($(window).height()) /34.61 ) -4, 4) + 1; //adaptamos la altura a la resolución. minimo 4 casillas

    //bucle que genera las casillas
    for (let i = 0; i < height; i++) {

        var stringColumna = "";
        var fila = [];

        for (let j = 0; j < width; j++) {

            string = string + "<div class=\"casilla\" style=\"position: absolute; left: " + (30 + (31 * j)) + "px; top: " + (150 + (31 * i)) + "px\" id=" + i + "-" + j + "> </div>"; //montamos la tabla en bucle
            fila.push('.');
        }

        stringColumna = "<div class='fila'>" + string + "</div>"; //para cada fila, organizamos un div
        string = ""; //limpiamos la string
        stringFinal = stringFinal + stringColumna;
        mapa.push(fila);

    }

    //operacion para añadir nodo de start
    stringFinal += "<div id=\"startN\" style=\"position: absolute; width: 32px; height: 32px; z-index: 99; user-select: none; left: " + (30 + (31 * startX)) + "px; top: " + (150 + (31 * startY)) + "px\"><img src=\"start.png\" alt=\"\" /></div>";

    //operacion para añadir nodo de final
    stringFinal += "<div id=\"endN\" style=\"position: absolute; width: 32px; height: 32px; z-index: 99; user-select: none; left: " + (30 + (31 * endX)) + "px; top: " + (150 + (31 * endY)) + "px\"><img src=\"end.png\" alt=\"\" /></div>";

    //asignamos las casillas creadas por bucle a la sección correspondiente del html
    $("#primary").html(stringFinal);

    mapa[startY][startY] = 's'; //asignamos la casilla tipo s (start) a la casilla donde se empezará la búsqueda

    mapa[endX][endY] = 'e'; //asignamos la casilla tipo s (start) a la casilla donde se empezará la búsqueda
}

function start(nodos, nodosConserve, aniNode, mapaInvestigado, height, width, startX, startY, endX, endY, mapa){

    clearPathfinding(height, width)

    $('#startN').draggable("disable");
    $('#endN').draggable("disable");
    $('#status').html("Status: Processing...");

    processing = true;

    nodos = [];

    mapaInvestigado = [];

    aniNode = 0;

    if (selectedMode === "Dijkstra") {
        aniNode = dijkstra(nodos, nodosConserve, aniNode, mapaInvestigado, height, width, startX, startY, endX, endY, mapa);
    }
    if (selectedMode === "A*") {
        aniNode = aStar(nodos, nodosConserve, aniNode, mapaInvestigado, height, width, startX, startY, endX, endY, mapa);
    }
    if (selectedMode === "greedy") {
        aniNode = greedyFirstBest(nodos, nodosConserve, aniNode, mapaInvestigado, height, width, startX, startY, endX, endY, mapa);
    }
    if (selectedMode === "dfs") {
        aniNode = depthFirst(nodos, nodosConserve, aniNode, mapaInvestigado, height, width, startX, startY, mapa);
    }
    if (selectedMode === "bfs") {
        aniNode = BFS(nodos, nodosConserve, aniNode, mapaInvestigado, height, width, startX, startY, mapa);
    }

    setTimeout(
        function () {
            processing = false;

            $('#startN').draggable("enable");
            $('#endN').draggable("enable");

            $('#status').html("Status: Ready");

        }, aniNode*2);

}



