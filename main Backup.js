window.onload = function () {
    //Canvas e contexto
    var canvas = document.getElementById("jogo");
    var context = canvas.getContext("2d");

    canvas.width = 320;
    canvas.height = 480;

    //FPS e timing
    var lastFrame = 0;
    var fpsTime = 0;
    var frameCount = 0;
    var fps = 0;

    var b = -1;

    //Imagens
    var level = {
        bg: new Image()
        , hud: new Image()
    }

    //Inicia Imagens
    level.bg.src = "images/cozinha.png"
    level.hud.src = "images/barras.png"

    //Variavel de correção dos tamanhos
    var cx = level.bg.width / canvas.width;
    var cy = level.bg.height / canvas.height;

    var btn = [{
        src: "images/BTN/botao-salas.png"
        , x: 30
        , y: 30
        , w: 0
        , h: 0
        , img: new Image
        , faz: function () {
            this.img.src = this.src;
        }
        }, {
        src: "images/BTN/config.png"
        , x: 600
        , y: 20
        , w: 0
        , h: 0
        , img: new Image
        , faz: function () {
            this.img.src = this.src;
        }
        }, {
        src: "images/BTN/seta-esquerda.png"
        , x: 210
        , y: 850
        , w: 0
        , h: 0
        , img: new Image
        , faz: function () {
            this.img.src = this.src;
        }
        }, {
        src: "images/BTN/seta-direita.png"
        , x: 420
        , y: 850
        , w: 0
        , h: 0
        , img: new Image
        , faz: function () {
            this.img.src = this.src;
        }
        }, {
        src: "images/BTN/botao-sele-ao-comida.png"
        , x: 285
        , y: 835
        , w: 0
        , h: 0
        , img: new Image
        , faz: function () {
            this.img.src = this.src;
        }
        }, {
        src: "images/BTN/moeda.png"
        , x: 30
        , y: 860
        , w: 0
        , h: 0
        , img: new Image
        , faz: function () {
            this.img.src = this.src;
        }
        }]

    var noBug = false;

    //inicializar o jogo
    function init() {

        if (!noBug) {
            noBug = true
            location.reload();
        }

        //Eventos de Mouse
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseout", onMouseOut);

        for (var i = 0; i < btn.length; i++) {
            btn[i].faz;
            btn[i].img.onload = reFaz(btn[i]);
        }

        //Função de loopMain
        main(0);
    }

    //Main Loop
    function main(tframe) {
        window.requestAnimationFrame(main);

        //Update e renderização do jogo
        update(tframe);
        render();
    }

    //Dá update no estado do jogo (FPS)
    function update(tframe) {
        var dt = (tframe - lastFrame) / 1000;
        lastFrame = tframe;

        //Muda o contador de FPS
        updateFPS(dt);
    }

    //Função de contagem do FPS
    function updateFPS(dt) {
        if (fpsTime > 0.25) {
            //Calcula o FPS padrão
            fps = Math.round(frameCount / fpsTime);

            //Reseta o tempo e o contador de frames, para atualizar o fps
            fpsTime = 0;
            frameCount = 0;
        }

        //Acrecenta o tempo e o contador de frames
        fpsTime += dt;
        frameCount++;
    }

    function render() {
        //Desenha o quadro
        drawFrame();
        renderButtons();
    }

    //Tela
    function drawFrame() {
        context.drawImage(level.bg, 0, 0, canvas.width, canvas.height);
        context.drawImage(level.hud, 0, 0, canvas.width, canvas.height);
        for (var i = 0; i < btn.length; i++) {
            context.drawImage(btn[i].img, btn[i].x, btn[i].y, btn[i].w, btn[i].h);
        }
    }

    function renderButtons() {
        var click;
        if (b == 5) {
            if (!click) {
                context.fillStyle = "hsla(0, 26%, 27%, 0.65)"
                context.fillRect(0, 130 / cx, canvas.width, 695 / cy)
                click = true;
            } else if (click) {
                click = false;
                b = -1;
            }
        }
    }

    function reFaz(obj) {
        obj.x = obj.x / cx;
        obj.y = obj.y / cy;
        obj.w = obj.img.width / cx;
        obj.h = obj.img.height / cy;
    }

    // Eventos de Mouse
    function onMouseMove(e) {}

    function onMouseDown(e) {
        //Verificação de clique nos botões
        var pos = getMousePos(canvas, e);
        for (var i = 0; i < btn.length; i++) {
            if (pos.x >= btn[i].x && pos.x < btn[i].x + btn[i].w &&
                pos.y >= btn[i].y && pos.y < btn[i].y + btn[i].h) {
                b = i;
            }
        }
    }

    function onMouseUp(e) {
        b = -1;
    }

    function onMouseOut(e) {}

    //Detectar posição do mouse

    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width)
            , y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
        };
    }

    //Chama a função que inicia o jogo
    init();
}