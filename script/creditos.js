function cred() {
    //Canvas e contexto
    var canvas = document.getElementById("jogo");
    var context = canvas.getContext("2d");

    canvas.width = 320;
    canvas.height = 480;

    var sour = ["images/1.png", "images/2.png", "images/3.png", "images/4.png"];
    var nav = 0;
    var bg = new Image;

    var btn = [{
        src: "images/menu.png"
        , x: 30
        , y: 430
        , w: 64
        , h: 39
    }, {
        src: "images/prox.png"
        , x: 224
        , y: 430
        , w: 64
        , h: 39
    }];

    var img = [];

    var newImages = function (src) {
        var img = new Image;
        img.src = src
        return img;
    };

    //inicializar o jogo
    function init() {

        //Eventos de Mouse
        canvas.addEventListener("mousedown", onMouseDown);

        for (var i = 0; i < btn.length; i++) {
            img.push(newImages(btn[i].src));
        }

        //Função de loopMain
        main(0);
    }

    var vari;
    //Main Loop
    function main(tframe) {
        vari = window.requestAnimationFrame(main);

        bg.src = sour[nav];

        //Update e renderização do jogo
        render();
        console.log(window.troca);
    }

    function render() {
        //Desenha o quadro
        drawFrame();
    }

    //Tela
    function drawFrame() {
        context.drawImage(bg, 0, 0, canvas.width, canvas.height);
        for (var i = 0; i < btn.length; i++) {
            if (nav < 3) {
                context.drawImage(img[i], btn[i].x, btn[i].y, btn[i].w, btn[i].h);
            } else {
                context.drawImage(img[0], btn[0].x, btn[0].y, btn[0].w, btn[0].h);
            }
        }
    }

    function onMouseDown(e) {
        //Verificação de clique nos botões
        var pos = getMousePos(canvas, e);
        for (var i = 0; i < btn.length; i++) {
            if (pos.x >= btn[i].x && pos.x < btn[i].x + btn[i].w &&
                pos.y >= btn[i].y && pos.y < btn[i].y + btn[i].h) {
                switch (i) {
                case 0:
                    window.cancelAnimationFrame(vari);
                    canvas.removeEventListener("mousedown", onMouseDown);
                    window.nav = 3;
                    window.troca = 0;
                    break;
                case 1:
                    if (nav < 3)
                        nav++;
                    break;
                }
            }
        }
    }

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