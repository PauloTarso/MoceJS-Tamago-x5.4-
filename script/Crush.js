function Crush() {
    //Canvas id e Contexto de formas
    var canvas = document.getElementById("jogo");
    var ctx = canvas.getContext("2d");
    //Altura e Largura do cel
    canvas.width = 320 //window.innerWidth;
    canvas.height = 480 //window.innerHeight;
        //Temporizador e contador de fps
    var lastFrame = 0;
    var fpsTime = 0;
    var frameCount = 0;
    var fps = 0;
    var time = 10;
    var vari;
    //Arrastar do Mouse
    var drag = false;
    //Corretor imagens
    var modX = canvas.width / 8;
    var modY = canvas.width / 7;
    //Audios
    var acerto = new Audio('sounds/ace.wav');
    var erro = new Audio('sounds/err.wav');
    //Imagens
    var HUD = [{
        image: new Image
        , src: "images/background.png"
        , x: 0
        , y: 0
        , w: canvas.width
        , h: canvas.height
    }, {
        image: new Image
        , src: "images/molduras/caixa-principal.png"
        , x: 0
        , y: 0
        , w: canvas.width
        , h: canvas.height - 2 * modY
    }, {
        image: new Image
        , src: "images/molduras/caixa-de-baixo.png"
        , x: 0
        , y: canvas.height - 1.8 * modY
        , w: canvas.width
        , h: 1.8 * modY
    }, {
        image: new Image
        , src: "images/molduras/scorebox.png"
        , x: 2.12 * modX
        , y: canvas.height - 1.4 * modY
        , w: 2.5 * modX
        , h: modY
    }, {
        image: new Image
        , src: "images/molduras/scorebox.png"
        , x: canvas.width - 2.2 * modX
        , y: canvas.height - 1.4 * modY
        , w: 2 * modX
        , h: modY
    }, {
        image: new Image
        , src: "images/Efects/clock.png"
        , x: canvas.width - 2.8 * modX
        , y: canvas.height - 1.1 * modY
        , w: modX / 2
        , h: modX / 2
    }, {
        image: new Image
        , src: "images/Efects/estrela.png"
        , x: 1.5 * modX
        , y: canvas.height - 1.1 * modY
        , w: modX / 2
        , h: modX / 2
    }]

    function makeImage(obj) {
        obj.image.src = obj.src;
    }
    //Espaço jogavel
    var level = {
        x: canvas.width / 43, //Posição x
        y: canvas.height / 58, //Posição y
        columns: 7, //Número de colunas
        rows: 8, //Numero de linhas
        tiles: [], //Array bidimencional que armazena os tiles
        //Objeto que armazena o tile selecionado
        selectedtile: {
            selected: false
            , column: 0
            , row: 0
        }
    };
    level.tilewidth = canvas.width / (1.06 * level.columns); //Largura do tile
    level.tileheight = canvas.height / (1.31 * level.rows); //Altura do tile
    //Imagens dos tiles
    var tileType = ["images/letras/A.png", "images/letras/AB.png", "images/letras/B.png", "images/letras/O.png", "images/letras/rh+.png", "images/letras/rh-.png"];
    var types = [];
    var newImages = function (src) {
        var img = new Image;
        img.src = src;
        return img;
    };
    //Array que armazena matchs e movimentos possiveis
    var clusters = []; // { column, row, length, horizontal }
    var moves = []; // { column1, row1, column2, row2 }
    //Movimetno atual
    var currentMove = {
        column1: 0
        , row1: 0
        , column2: 0
        , row2: 0
    };
    //Estados de jogo
    var gameStates = {
        init: 0
        , ready: 1
        , resolve: 2
    };
    var gameState = gameStates.init;
    //Score
    var score = 0;
    var scoreText = 0;
    var high = 0;
    //Variaveis de animação
    var animationState = 0;
    var animationTime = 0;
    var animationTimeTotal = 0.3;
    //Game Over e outros
    var gameOver = false;
    var pause = false;
    var firsTime = true;
    //Array de botões
    var buttons = [{
            image: new Image
            , src: "images/Efects/pause.png"
            , x: modX / 5
            , y: canvas.height - 1.35 * modY
            , w: modX
            , h: modX
    }, {
            image: new Image
            , src: "images/Efects/menu.png"
            , x: canvas.width / 3 + 3 * modX / 2
            , y: canvas.height - 5.5 * modY
            , w: 1.5 * modX
            , h: 1.5 * modX
    }, {
            image: new Image
            , src: "images/Efects/reset.png"
            , x: canvas.width / 3 - 1.5 * modX / 2
            , y: canvas.height - 5.5 * modY
            , w: 1.5 * modX
            , h: 1.5 * modX
    }, {
            image: new Image
            , src: "images/Efects/play.png"
            , x: canvas.width / 2 - 1.5 * modX / 2
            , y: canvas.height / 3
            , w: 1.5 * modX
            , h: 1.5 * modX
    }]
        //Inicializador do jogo
    function init() {
        if (localStorage.high != undefined) high = localStorage.high;
        //Eventos de mouse
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseout", onMouseOut);
        //Inicializa o array dos tiles
        for (var i = 0; i < level.columns; i++) {
            level.tiles[i] = [];
            for (var j = 0; j < level.rows; j++) {
                //Todos os tiles tem uma variavel de tipo e outra de movimento
                level.tiles[i][j] = {
                    type: 0
                    , shift: 0
                }
            }
        };
        for (var i = 0; i < tileType.length; i++) {
            types.push(newImages(tileType[i]));
        }
        for (var i = 0; i < HUD.length; i++) {
            makeImage(HUD[i]);
        };
        for (var i = 0; i < buttons.length; i++) {
            makeImage(buttons[i]);
        };
        //Novo jogo
        newGame();
        //Entra no loop de jogo
        main(0);
    }
    //Main loop
    function main(tframe) {
        //Inicia o loop
        vari = window.requestAnimationFrame(main);
        //Atualiza posições e animações e renderiza o jogo
        update(tframe);
        render();
        console.log(window.troca);
    }
    //Atualiza os estados de jogo
    function update(tframe) {
        var dt = (tframe - lastFrame) / 1000;
        lastFrame = tframe;
        if (!gameOver && gameState != gameStates.init && !pause) {
            time -= dt + score / 100000;
        }
        //Atualiza o contador de fps
        updateFps(dt);
        if (gameState == gameStates.ready) {
            //Jogo pronto para o jogador
            //Verifica o GameOver
            if (moves.length <= 0) {
                gameOver = true;
            }
            if (time <= 0) {
                gameOver = true;
                time = 0;
            }
        } else if (gameState == gameStates.resolve) {
            //O jogo está realizando consequencias da ação do jogador
            animationTime += dt;
            if (animationState == 0) {
                //Encontra e remove Matchs
                if (animationTime > animationTimeTotal) {
                    //Encontra os Matchs
                    findClusters();
                    if (clusters.length > 0) {
                        //Soma a score
                        for (var i = 0; i < clusters.length; i++) {
                            //Matchs maiores, mais pontos
                            score += 4 * (clusters[i].length - 2);;
                            time += 2;
                        }
                        //Remove o Match que foi contabilizado na score
                        removeClusters();
                        //Animação de descida dos tiles
                        animationState = 1;
                    } else {
                        //Nenhum tile encontrado, pode jogar
                        gameState = gameStates.ready;
                    }
                    animationTime = 0;
                }
            } else if (animationState == 1) {
                //Desce Tiles
                if (animationTime > animationTimeTotal) {
                    //Manda descer
                    shiftTiles();
                    //Encontrar possiveis novos Matchs
                    animationState = 0;
                    animationTime = 0;
                    //Procura Matchs formados
                    findClusters();
                    if (clusters.length <= 0) {
                        //Caso não, animação completa
                        gameState = gameStates.ready;
                    }
                }
            } else if (animationState == 2) {
                //Animaçã de troca de tiles
                if (animationTime > animationTimeTotal) {
                    //Troca tiles
                    swap(currentMove.column1, currentMove.row1, currentMove.column2, currentMove.row2);
                    //Verifica se encontrou um Match
                    findClusters();
                    if (clusters.length > 0) {
                        //Movimento valido, encontre outros matchs
                        //Mudando estado da animação
                        animationState = 0;
                        animationTime = 0;
                        gameState = gameStates.resolve;
                    } else {
                        //Movimento invalido, retorne
                        erro.play();
                        animationState = 3;
                        animationTime = 0;
                        time -= 5;
                    }
                    //Atualiza movimentos e Mathcs
                    findMoves();
                    findClusters();
                }
            } else if (animationState == 3) {
                //Voltando a animação
                if (animationTime > animationTimeTotal) {
                    //Trocando devolta os tiles
                    swap(currentMove.column1, currentMove.row1, currentMove.column2, currentMove.row2);
                    //Animação completa
                    gameState = gameStates.ready;
                }
            }
            //Atualiza movimentos e Matchs
            findMoves();
            findClusters();
        }
    }

    function updateFps(dt) {
        if (fpsTime > 0.25) {
            //Calcula o fps (corrige-o)
            fps = Math.round(frameCount / fpsTime);
            //Reseta o tempo e o contador
            fpsTime = 0;
            frameCount = 0;
        }
        //faz a contagem
        fpsTime += dt;
        frameCount++;
        //Score
        if (score > scoreText) {
            scoreText += 2;
        }
    }
    //Faz um texto no centro
    function drawCenterText(text, x, y, width) {
        var textdim = ctx.measureText(text);
        ctx.fillText(text, x + (width - textdim.width) / 2, y);
    }
    
    //Renderiza o jogo
    function render() {
        //Desenha o quadro maior
        drawFrame();
        //Renderiza os tiles
        renderTiles();
        //Renderiza a indicação de mathc
        renderClusters();
        //Tela de GameOver
        if (gameOver) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.fillRect(level.x, level.y, level.columns * level.tilewidth, level.rows * level.tileheight);
            ctx.fillStyle = "#ffffff";
            ctx.font = (canvas.height / 10) + "px Roboto";
            drawCenterText("Game Over!", level.x, level.y + (level.rows * level.tileheight) / 2 + 10, level.columns * level.tilewidth);
            if (score > high) {
                high = score;
            }
        }
        if (pause) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.fillRect(level.x, level.y, level.columns * level.tilewidth, level.rows * level.tileheight);
            ctx.fillStyle = "#ffffff";
            ctx.font = (canvas.height / 10) + "px Roboto";
            drawCenterText("Pausado", level.x, level.y + (level.rows * level.tileheight) / 2 + 10, level.columns * level.tilewidth);
        }
        //Botão
        drawButtons();
        if (gameState == gameStates.init) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#ffffff";
            ctx.font = (canvas.height / 15) + "px Roboto";
            ctx.font = (canvas.height / 15) + "px Roboto";
            drawCenterText("Tempo", HUD[4].x, HUD[4].y + canvas.height / 14, HUD[4].w);
            drawCenterText("Pontos", HUD[3].x, HUD[3].y + canvas.height / 14, HUD[3].w);
            drawCenterText("Melhor partida:", 0, 6 * canvas.height / 10, canvas.width);
            drawCenterText(high, 0, 7 * canvas.height / 10, canvas.width);
            ctx.drawImage(buttons[3].image, buttons[3].x, buttons[3].y, buttons[3].w, buttons[3].h);
        }
    }
    //Desenha o Quadro principal
    function drawFrame() {
        //Fundo e Caixas
        for (var i = 0; i < HUD.length; i++) {
            ctx.drawImage(HUD[i].image, HUD[i].x, HUD[i].y, HUD[i].w, HUD[i].h);
        }
        //Score
        ctx.fillStyle = "#FFFFFF"
        ctx.font = (canvas.height / 15) + "px Roboto"
        drawCenterText(scoreText, HUD[3].x, HUD[3].y + canvas.height / 14, HUD[3].w);
        //Tepmo
        ctx.fillStyle = "#FFFFFF"
        ctx.font = (canvas.height / 15) + "px Roboto"
        drawCenterText(Math.trunc(time), HUD[4].x, HUD[4].y + canvas.height / 14, HUD[4].w);
        //Debug
        ctx.fillStyle = "#FFFFFF"
        ctx.font = "8px Roboto"
        ctx.fillText("FPS: " + fps, canvas.width / 50, canvas.height - 0.1 * modY);
    }
    //Desenha os botões
    function drawButtons() {
        ctx.drawImage(buttons[0].image, buttons[0].x, buttons[0].y, buttons[0].w, buttons[0].h);
        if (pause || gameOver) {
            for (var i = 1; i < buttons.length - 1; i++) {
                ctx.drawImage(buttons[i].image, buttons[i].x, buttons[i].y, buttons[i].w, buttons[i].h);
            }
            ctx.drawImage(buttons[3].image, buttons[0].x, buttons[0].y, buttons[0].w, buttons[0].h);
        }
    }
    //Renderizar os tiles
    function renderTiles() {
        for (var i = 0; i < level.columns; i++) {
            for (var j = 0; j < level.rows; j++) {
                //Pega quanto o tile deve descer
                var shift = level.tiles[i][j].shift;
                //Calcula as coordenadas do tile
                var coord = getTileCoordinate(i, j, 0, (animationTime / animationTimeTotal) * shift);
                //Verifica se há um tile real ali 
                if (level.tiles[i][j].type >= 0) {
                    //Descobre a cor que ele deve ter
                    var cols = types[level.tiles[i][j].type];
                    //Desenha o tile
                    draw2(cols, coord.tilex, coord.tiley);
                }
            }
        }
        //Animação de troca
        if (gameState == gameStates.resolve && (animationState == 2 || animationState == 3)) {
            //Quanto deve mover em x e y
            var shiftx = currentMove.column2 - currentMove.column1;
            var shifty = currentMove.row2 - currentMove.row1;
            //Tile selecionado primeiro
            var coord1 = getTileCoordinate(currentMove.column1, currentMove.row1, 0, 0);
            var coord1shift = getTileCoordinate(currentMove.column1, currentMove.row1, (animationTime / animationTimeTotal) * shiftx, (animationTime / animationTimeTotal) * shifty);
            var cols1 = types[level.tiles[currentMove.column1][currentMove.row1].type];
            //Segundo tile
            var coord2 = getTileCoordinate(currentMove.column2, currentMove.row2, 0, 0);
            var coord2shift = getTileCoordinate(currentMove.column2, currentMove.row2, (animationTime / animationTimeTotal) * -shiftx, (animationTime / animationTimeTotal) * -shifty);
            var cols2 = types[level.tiles[currentMove.column2][currentMove.row2].type];
            //Desenha Corrige a animação
            drawTile(coord1.tilex, coord1.tiley, 214, 150, 152);
            drawTile(coord2.tilex, coord2.tiley, 214, 150, 152);
            //Dependendo do tipo da animação muda a ordem do movimento
            if (animationState == 2) {
                draw2(cols1, coord1shift.tilex, coord1shift.tiley);
                draw2(cols2, coord2shift.tilex, coord2shift.tiley);
            } else {
                draw2(cols2, coord2shift.tilex, coord2shift.tiley);
                draw2(cols1, coord1shift.tilex, coord1shift.tiley);
            }
        }
    }
    //Coordenadas do tile
    function getTileCoordinate(column, row, columnoffset, rowoffset) {
        var tilex = level.x + (column + columnoffset) * level.tilewidth;
        var tiley = level.y + (row + rowoffset) * level.tileheight;
        return {
            tilex: tilex
            , tiley: tiley
        };
    }
    // Desenha o tile
    function drawTile(x, y, r, g, b) {
        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x + 2, y + 2, level.tilewidth - 4, level.tileheight - 4);
    }

    function draw2(img, x, y) {
        ctx.drawImage(img, x + 1, y + 1, level.tilewidth - 1, level.tileheight - 1);
    }
    //Renderização da indicação dos Matchs
    function renderClusters() {
        for (var i = 0; i < clusters.length; i++) {
            acerto.play();
            //Pega a coordenada dos tiles
            var coord = getTileCoordinate(clusters[i].column, clusters[i].row, 0, 0);
            if (clusters[i].horizontal) {
                //Linha horizontal
                ctx.fillStyle = "#00ff00";
                ctx.fillRect(coord.tilex + level.tilewidth / 2, coord.tiley + level.tileheight / 2 - 4, (clusters[i].length - 1) * level.tilewidth, 8);
            } else {
                //Linha vertical
                ctx.fillStyle = "#0000ff";
                ctx.fillRect(coord.tilex + level.tilewidth / 2 - 4, coord.tiley + level.tileheight / 2, 8, (clusters[i].length - 1) * level.tileheight);
            }
        }
    }
    //inicia um novo jogo
    function newGame() {
        //Reseta a score
        score = 0;
        scoreText = 0;
        //Inicia
        if (!firsTime) {
            gameState = gameStates.ready;
        }
        //Reseta o game over
        gameOver = false;
        pause = false;
        //Tempo
        time = 10;
        //Cria o level
        createLevel();
    }
    //Cria um level randomico e jogavel
    function createLevel() {
        var done = false;
        //Verifica se o level é jogavel
        while (!done) {
            //Randomiza os tiles
            for (var i = 0; i < level.columns; i++) {
                for (var j = 0; j < level.rows; j++) {
                    level.tiles[i][j].type = getRandomTile();
                }
            }
            //Resolve os Matchs iniciais
            resolveClusters();
            //Verifica os movimentos possiveis
            findMoves();
            //Se houver ao menos um movimento, o level é jogavel
            if (moves.length > 0) {
                done = true;
            }
        }
    }
    
    //Randomização dos tiles
    function getRandomTile() {
        return Math.floor(Math.random() * types.length);
    }
    
    //Remove os Matchs encontrados
    function resolveClusters() {
        //Encontra os Matchs
        findClusters();
        //Enquanto houver Matchs
        while (clusters.length > 0) {
            //Remove-os
            removeClusters();
            //Desce os tiles
            shiftTiles();
            //Verifica a formação de mais
            findClusters();
        }
    }
    
    //Encontra Matchs
    function findClusters() {
        //reseta o Array
        clusters = []
            //Encontra Matchs horizontais
        for (var j = 0; j < level.rows; j++) {
            //O contador conta tiles iguais, o 1º é ele propio
            var matchlength = 1;
            for (var i = 0; i < level.columns; i++) {
                var checkcluster = false;
                if (i == level.columns - 1) {
                    //Ultimo tile
                    checkcluster = true;
                } else {
                    //Verifica o tipo do tile vizinho
                    if (level.tiles[i][j].type == level.tiles[i + 1][j].type && level.tiles[i][j].type != -1) {
                        //Se for mesmo que o anterior, soma os tiles iguais
                        matchlength += 1;
                    } else {
                        //Tipo diferente, parte checada
                        checkcluster = true;
                    }
                }
                //Verifica se formou um Match
                if (checkcluster) {
                    if (matchlength >= 3) {
                        //Soma o Match no array
                        clusters.push({
                            column: i + 1 - matchlength
                            , row: j
                            , length: matchlength
                            , horizontal: true
                        });
                    }
                    matchlength = 1;
                }
            }
        }
        //Encontra Machs verticais, vide horizontais
        for (var i = 0; i < level.columns; i++) {
            var matchlength = 1;
            for (var j = 0; j < level.rows; j++) {
                var checkcluster = false;
                if (j == level.rows - 1) {
                    checkcluster = true;
                } else {
                    if (level.tiles[i][j].type == level.tiles[i][j + 1].type && level.tiles[i][j].type != -1) {
                        matchlength += 1;
                    } else {
                        checkcluster = true;
                    }
                }
                if (checkcluster) {
                    if (matchlength >= 3) {
                        clusters.push({
                            column: i
                            , row: j + 1 - matchlength
                            , length: matchlength
                            , horizontal: false
                        });
                    }
                    matchlength = 1;
                }
            }
        }
    }
    //encontra movimentos possiveis
    function findMoves() {
        //Reseta o array
        moves = []
            //Verificação horizontal
        for (var j = 0; j < level.rows; j++) {
            for (var i = 0; i < level.columns - 1; i++) {
                //Troca e detroca os tiles
                swap(i, j, i + 1, j);
                findClusters();
                swap(i, j, i + 1, j);
                //Verifica se a troca fez um Tile
                if (clusters.length > 0) {
                    //Encontrou um movimento
                    moves.push({
                        column1: i
                        , row1: j
                        , column2: i + 1
                        , row2: j
                    });
                }
            }
        }
        //Verificação vertical (vide Horizontal)
        for (var i = 0; i < level.columns; i++) {
            for (var j = 0; j < level.rows - 1; j++) {
                swap(i, j, i, j + 1);
                findClusters();
                swap(i, j, i, j + 1);
                if (clusters.length > 0) {
                    moves.push({
                        column1: i
                        , row1: j
                        , column2: i
                        , row2: j + 1
                    });
                }
            }
        }
        //Reseta o array de Machs
        clusters = []
    }
    // Remove the clusters
    function removeClusters() {
        //Muda o tipo dos tiles para -1 quando é Match
        for (var i = 0; i < clusters.length; i++) {
            var cluster = clusters[i];
            var coffset = 0;
            var roffset = 0;
            for (var j = 0; j < cluster.length; j++) {
                level.tiles[cluster.column + coffset][cluster.row + roffset].type = -1;
                if (cluster.horizontal) {
                    coffset++;
                } else {
                    roffset++;
                }
            }
        }
        //Calcula a quantidade que deve descer
        for (var i = 0; i < level.columns; i++) {
            var shift = 0;
            for (var j = level.rows - 1; j >= 0; j--) {
                //Verifica de baixo pra cima
                if (level.tiles[i][j].type == -1) {
                    //Tile removido, soma um no movimento
                    shift++;
                    level.tiles[i][j].shift = 0;
                } else {
                    //Põe como parametro do tile
                    level.tiles[i][j].shift = shift;
                }
            }
        }
    }
    //MOve os tiles e Cria novos
    function shiftTiles() {
        //Mover
        for (var i = 0; i < level.columns; i++) {
            for (var j = level.rows - 1; j >= 0; j--) {
                //De baixo pra cima
                if (level.tiles[i][j].type == -1) {
                    //Insere um radomico
                    level.tiles[i][j].type = getRandomTile();
                } else {
                    //Move para o valor que está armazenado
                    var shift = level.tiles[i][j].shift;
                    if (shift > 0) {
                        swap(i, j, i, j + shift)
                    }
                }
                //Reseta o movimento daquele tile
                level.tiles[i][j].shift = 0;
            }
        }
    }
    //Descobre o tile que o mouse está sobre
    function getMouseTile(pos) {
        //Sobre qual tile ele está
        var tx = Math.floor((pos.x - level.x) / level.tilewidth);
        var ty = Math.floor((pos.y - level.y) / level.tileheight);
        //Verifica se é um tile valido
        if (tx >= 0 && tx < level.columns && ty >= 0 && ty < level.rows) {
            return {
                valid: true
                , x: tx
                , y: ty
            };
        }
        //Tile não Valido
        return {
            valid: false
            , x: 0
            , y: 0
        };
    }
    //Verifica se os tiles são vizinhos diretos
    function canSwap(x1, y1, x2, y2) {
        if ((Math.abs(x1 - x2) == 1 && y1 == y2) || (Math.abs(y1 - y2) == 1 && x1 == x2)) {
            return true;
        }
        return false;
    }
    //Troca os tiles um com outro
    function swap(x1, y1, x2, y2) {
        var typeswap = level.tiles[x1][y1].type;
        level.tiles[x1][y1].type = level.tiles[x2][y2].type;
        level.tiles[x2][y2].type = typeswap;
    }
    //Ação do jogador pra mover
    function mouseSwap(c1, r1, c2, r2) {
        //Salva os tiles que quer mover
        currentMove = {
            column1: c1
            , row1: r1
            , column2: c2
            , row2: r2
        };
        //Deceleciona os tiles
        level.selectedtile.selected = false;
        //Inicia as animações
        animationState = 2;
        animationTime = 0;
        gameState = gameStates.resolve;
    }
    //Quando o mouse se mover (durante o arrastar)
    function onMouseMove(e) {
        //Posição do mouse
        var pos = getMousePos(canvas, e);
        if (drag && level.selectedtile.selected) {
            //Pega o tile sobre o mouse
            mt = getMouseTile(pos);
            if (mt.valid) {
                //Verifica se pode ser trocado
                if (canSwap(mt.x, mt.y, level.selectedtile.column, level.selectedtile.row)) {
                    //Troca os tiles
                    mouseSwap(mt.x, mt.y, level.selectedtile.column, level.selectedtile.row);
                }
            }
        }
    }
    //Quando o mouse for precionado
    function onMouseDown(e) {
        //Pega a posição
        var pos = getMousePos(canvas, e);
        //Começa o arrastar
        if (gameState == gameStates.ready && !pause && !gameOver) {
            if (!drag) {
                //Tile sob o mouse
                mt = getMouseTile(pos);
                if (mt.valid) {
                    var swapped = false;
                    if (level.selectedtile.selected) {
                        if (canSwap(mt.x, mt.y, level.selectedtile.column, level.selectedtile.row)) {
                            //Pode trocar, mova-os
                            mouseSwap(mt.x, mt.y, level.selectedtile.column, level.selectedtile.row);
                            swapped = true;
                        }
                    }
                    if (!swapped) {
                        //Faz o tile selecionado
                        level.selectedtile.column = mt.x;
                        level.selectedtile.row = mt.y;
                        level.selectedtile.selected = true;
                    }
                } else {
                    //Tile invalido
                    level.selectedtile.selected = false;
                }
                //Começa o arrastar
                drag = true;
            }
        }
        //Verificação de clique nos botões
        if (pos.x >= buttons[0].x && pos.x < buttons[0].x + buttons[0].w && pos.y >= buttons[0].y && pos.y < buttons[0].y + buttons[0].h) {
            if (!gameOver && gameState != gameStates.init) {
                pause = !pause;
            }
        }
        if (gameState == gameStates.init) {
            if (pos.x >= buttons[3].x && pos.x < buttons[3].x + buttons[3].w && pos.y >= buttons[3].y && pos.y < buttons[3].y + buttons[3].h) {
                firsTime = false;
                gameState = gameStates.ready;
            }
        }
        if (pause || gameOver) {
            for (var i = 1; i < buttons.length; i++) {
                if (pos.x >= buttons[i].x && pos.x < buttons[i].x + buttons[i].w && pos.y >= buttons[i].y && pos.y < buttons[i].y + buttons[i].h) {
                    switch (i) {
                    case 1:
                        window.cancelAnimationFrame(vari);
                        window.score = Math.floor(score / 4);
                        if (score > high) localStorage.high = score;
                        canvas.removeEventListener("mousemove", onMouseMove);
                        canvas.removeEventListener("mousedown", onMouseDown);
                        window.nav = 3;
                        window.troca = 2;
                        break;
                    case 2:
                        newGame();
                        firsTime = true;
                        break;
                    case 3:
                        pause = false;
                        break;
                    }
                }
            }
        }
    }

    function onMouseUp(e) {
        //Não arrasta se soltar o mouse
        drag = false;
    }

    function onMouseOut(e) {
        //Não arrasta se tirar da fase
        drag = false;
    }
    //Pega a posição do mouse no canvas
    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width)
            , y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
        };
    }
    //Inicia o jogo
    init();
}