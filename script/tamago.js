function Tamago() {
    //Canvas e contexto
    var canvas = document.getElementById("jogo");
    var context = canvas.getContext("2d");
    canvas.width = 320;
    canvas.height = 480;
    var inits = new Image;
    inits.src = "images/inits.png";
    //FPS e timing
    var lastFrame = 0;
    var fpsTime = 0;
    var frameCount = 0;
    var fps = 0;
    var trueCount = 0;
    //Variavel de botão
    var b = -1;
    var dropdownBTN = false;
    var creditos = new Image;
    creditos.src = "images/BTN/config.png";
    //Variavel de tempo
    var s = 0;
    var cont = 0;
    var cont2 = 0;
    var tmps = 0;
    // MOCE
    var moce;
    //Tutorial
    var navBal = 0;
    var bal = {
        local: ["baloes/Level.png", "baloes/saude.png", "baloes/Energia.png", "baloes/felicidade.png", "baloes/Fome.png", "baloes/loja.png", "baloes/comida.png", "baloes/menu.png"]
        , img: []
    };
    var click = new Audio('sounds/clique.wav');
    var buy = new Audio('sounds/compra.wav');
    var come = new Audio('sounds/comendo.wav');
    var ban = new Audio('sounds/cortina.wav');
    var chuv = new Audio('sounds/banho.wav');
    //Variáveis tamagoshi
    var quarto = true;
    var banho = false;
    var comendo = false;
    var banho = false;
    //Personagem
    var Anim = 0;
    var navSprite = 0;
    var navIdade = 0;
    var hemocinho = [{
            sheet: ["images/Sprites/p-i.png", "images/Sprites/p-c.png", "images/Sprites/p-d.png", "images/Sprites/p-t.png", "images/Sprites/p-s.png", "images/Sprites/p-l.png"]
            , sprite: []
            , animN: 6
            , x: 160
            , y: 360
            , w: 100
            , h: 100
        }, {
            sheet: ["images/Sprites/m-i.png", "images/Sprites/m-c.png", "images/Sprites/m-d.png", "images/Sprites/m-t.png", "images/Sprites/m-s.png", "images/Sprites/m-l.png"]
            , sprite: []
            , animN: 6
            , x: 160
            , y: 360
            , w: 150
            , h: 150
        }, {
            sheet: ["images/Sprites/g-i.png", "images/Sprites/g-c.png", "images/Sprites/g-d.png", "images/Sprites/g-t.png", "images/Sprites/g-s.png", "images/Sprites/g-l.png"]
            , sprite: []
            , animN: 6
            , x: 160
            , y: 360
            , w: 200
            , h: 200
        }]
        //Stats
    var status = new Image;
    status.src = "images/BTN/estados/Status.png";
    var statsBack = new Image;
    statsBack.src = "images/BTN/estados/StatusBar.png";
    //Variaveis de Imagem (navBG navega no array dos backgrounds)
    var navBG = window.nav;
    var bgImages = ["images/bg/banheiro.png", "images/bg/cozinha.png", "images/bg/quarto.png", "images/bg/SALA-01.png", "images/bg/escuro.png"];
    var images = [];
    var btn = [{
        src: "images/BTN/botao-salas.png"
        , x: canvas.width / 18
        , y: canvas.height / 40
        , w: canvas.width / 10
        , h: canvas.height / 16
    }, {
        src: "images/BTN/estados/botaolevel.png"
        , x: canvas.width / 1.28
        , y: canvas.height / -30
        , w: canvas.width / 3.9
        , h: canvas.height / 5.85
    }, {
        src: "images/BTN/moeda.png"
        , x: canvas.width / 27
        , y: canvas.height / 1.13
        , w: canvas.width / 10
        , h: canvas.height / 12
    }, {
        src: ""
        , x: canvas.width / 1.3
        , y: canvas.height / 1.15
        , w: canvas.width / 6.4
        , h: canvas.height / 9.6
    }, {
        src: "images/BTN/botao-sele-ao-comida.png"
        , x: canvas.width / 2.37
        , y: canvas.height / 1.15
        , w: canvas.width / 6.4
        , h: canvas.height / 9.6
    }, {
        src: "images/BTN/seta-direita.png"
        , x: canvas.width / 1.68
        , y: canvas.height / 1.14
        , w: canvas.width / 10
        , h: canvas.height / 12
    }, {
        src: "images/BTN/seta-esquerda.png"
        , x: canvas.width / 3.2
        , y: canvas.height / 1.14
        , w: canvas.width / 10
        , h: canvas.height / 12
    }];
    var loja_open = false;
    var loja_menu = new Image;
    loja_menu.src = "images/DropDown/menu2final.png";
    //Depois fazer a versão resposiva.
    var obj_itens = [
        {
            x: 30
            , y: 80
            , w: 51
            , h: 51
            , preco: 25
            , saude: 10
            , aptit: 10
            , felicidade: 0
            , energia: 5
        }, {
            x: 100
            , y: 80
            , w: 51
            , h: 51
            , preco: 30
            , saude: 10
            , aptit: 10
            , felicidade: 0
            , energia: 5
        }, {
            x: 170
            , y: 80
            , w: 51
            , h: 51
            , preco: 50
            , saude: 10
            , aptit: 10
            , felicidade: 0
            , energia: 5
        }, {
            x: 240
            , y: 80
            , w: 51
            , h: 51
            , preco: 15
            , saude: 10
            , aptit: 10
            , felicidade: 0
            , energia: 5
        }, {
            x: 30
            , y: 150
            , w: 51
            , h: 51
            , preco: 7
            , saude: 10
            , aptit: 10
            , felicidade: 0
            , energia: 5
        }, {
            x: 100
            , y: 150
            , w: 51
            , h: 51
            , preco: 33
            , saude: 10
            , aptit: 10
            , felicidade: 0
            , energia: 5
        }, {
            x: 170
            , y: 150
            , w: 51
            , h: 51
            , preco: 13
            , saude: 10
            , aptit: 10
            , felicidade: 0
            , energia: 5
        }, {
            x: 240
            , y: 150
            , w: 51
            , h: 51
            , preco: 27
            , saude: 10
            , aptit: 10
            , felicidade: 0
            , energia: 5
        }, {
            x: 30
            , y: 220
            , w: 51
            , h: 51
            , preco: 10
            , saude: 10
            , aptit: 10
            , felicidade: 0
            , energia: 5
        }, {
            x: 100
            , y: 220
            , w: 51
            , h: 51
            , preco: 40
            , saude: 10
            , aptit: 10
            , felicidade: 0
            , energia: 5
        }, {
            x: 170
            , y: 220
            , w: 51
            , h: 51
            , preco: 16
            , saude: 10
            , aptit: 10
            , felicidade: 0
            , energia: 5
        }, { /////////////////////////////////
            x: 242
            , y: 220
            , w: 51
            , h: 51
            , preco: 125
            , saude: 30
            , aptit: 10
            , felicidade: 0
            , energia: 5
            , doente: false
        }, {
            x: 30
            , y: 295
            , w: 51
            , h: 51
            , preco: 200
            , saude: 50
            , aptit: 10
            , felicidade: 0
            , energia: 5
            , doente: false
        }, {
            x: 102
            , y: 295
            , w: 41
            , h: 41
            , preco: 175
            , saude: 30
            , aptit: 0
            , felicidade: 0
            , energia: 5
            , doente: false
        }, {
            x: 172
            , y: 295
            , w: 41
            , h: 41
            , preco: 150
            , aptit: 0
            , felicidade: 10
            , energia: 0
            , doente: false
        }, {
            x: 245
            , y: 295
            , w: 41
            , h: 41
            , preco: 100
            , saude: 10
            , aptit: 5
            , felicidade: 25
            , energia: 5
            , doente: false
        }
    ];
    var navComida = 2;
    var navJogo = 0;
    var select = {
        list: ["images/Comidas/Alface.png", "images/Comidas/batata.png", "images/Comidas/cafe.png", "images/Comidas/carne.png", "images/Comidas/cupcake.png", "images/Comidas/laranja.png", "images/Comidas/leite.png", "images/Comidas/maca.png", "images/Comidas/morango.png", "images/Comidas/pizza.png", "images/Comidas/queijo.png", "images/Comidas/r1.png", "images/Comidas/r2.png", "images/Comidas/r3.png", "images/Comidas/r4.png", "images/Comidas/r5.png"]
        , imgs: []
        , qtd: []
        , game: ["images/jogos/crush.png", "images/jogos/jump.png","images/jogos/HemociAttack.png"]
        , jogos: []
        , x: canvas.width / 2.37
        , y: canvas.height / 1.15
        , w: canvas.width / 6.4
        , h: canvas.height / 9.6
    };
    var act = {
            list: ["images/acao/apagada.png", "images/acao/acesa.png", "images/acao/geladeira.png", "images/acao/arcade.png", "images/acao/banheira.png"]
            , img: []
        }
        //Dropdown Menu
    var dropdown = ["images/DropDown/fundo-menu.png", "images/DropDown/op-1.png", "images/DropDown/textos.png"];
    var menu = [];
    //Funcão de criacão de imagem
    var newImages = function (src) {
        var img = new Image;
        img.src = src
        return img;
    };
    var hud = new Image;
    hud.src = "images/bg/barras.png";
    var cort = new Image;
    cort.src = "images/Sprites/cortina.png";
    //inicializar o jogo
    function init() {
        if (localStorage.first == undefined) {
            window.nav = 1;
            moce = {
                idade: 0
                , higiene: 100
                , sujo: false
                , apetite: 50
                , comfome: false
                , saude: 100
                , doente: false
                , dormindo: false
                , energia: 100
                , felicidade: 100
                , exp: 0
            };
            localStorage.setItem("moce", JSON.stringify(moce));
            window.Dindin = 50;
            localStorage.setItem("money", JSON.stringify(window.Dindin));
        } else {
            moce = JSON.parse(localStorage.getItem("moce"))
            window.Dindin = JSON.parse(localStorage.getItem("money"))
        }
        //Eventos de Mouse
        canvas.addEventListener("mousedown", onMouseDown);
        //Inicializar Imagens
        for (var i = 0; i < btn.length; i++) {
            images.push(newImages(btn[i].src));
        }
        for (var i = 0; i < bal.local.length; i++) {
            bal.img.push(newImages(bal.local[i]));
        }
        for (var i = 0; i < dropdown.length; i++) {
            menu.push(newImages(dropdown[i]));
        }
        for (var i = 0; i < select.list.length; i++) {
            select.imgs.push(newImages(select.list[i]));
            select.qtd.push(0);
        }
        for (var i = 0; i < select.game.length; i++) {
            select.jogos.push(newImages(select.game[i]));
        }
        for (var i = 0; i < act.list.length; i++) {
            act.img.push(newImages(act.list[i]));
        }
        for (var i = 0; i < hemocinho.length; i++) {
            for (var j = 0; j < hemocinho[i].sheet.length; j++) {
                hemocinho[i].sprite.push(newImages(hemocinho[i].sheet[j]));
            }
        }
        //Funcão de loopMain
        main_1(0);
    }
    var vari;
    //Main Loop
    function main_1(tframe) {
        vari = window.requestAnimationFrame(main_1);
        //Update e renderizacão do jogo
        update(tframe);
        //------------Calcula o Tempo----------------
        cont++;
        s = cont / 60;
        //-------------------------------------------
        if (window.first == undefined) {
            context.drawImage(inits, 0, 0, canvas.width, canvas.height);
        } else {
            desgaste();
            tamagochi();
            render();
            localStorage.setItem("moce", JSON.stringify(moce));
            localStorage.setItem("money", JSON.stringify(window.Dindin));
        }
    }
    var some = 0
        //Dá update no estado do jogo (FPS)
    function update(tframe) {
        var dt = (tframe - lastFrame) / 1000;
        lastFrame = tframe;
        //Muda o contador de FPS
        updateFPS(dt);

        //Muda idade
        if (moce.idade < 10) {
            navIdade = 0;
        } else if (moce.idade < 20) {
            navIdade = 1;
        } else {
            navIdade = 2;
        }

        //Comendo
        if (comendo) {
            some++;
            navSprite = 1;
            if (some % 75 == 0) {
                navSprite = 0;
                some = 0;
                comendo = false;
            }
        }
        if (moce.comfome) {
            navSprite = 3;
        } else if (moce.doente) {
            navSprite = 2;
        } else if (moce.sujo) {
            navSprite = 4;
        }
        //Animacão idle
        if (cont % 8 == 0) {
            if (Anim <= hemocinho[navIdade].animN - 2) {
                Anim++
            } else {
                Anim = 0;
            }
        }
    }
    //Funcão de contagem do FPS
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
    //Renderizacões
    function render() {
        renderBG();
        perRender();
        remderBath();
        drawFrame();
        renderStats();
        renderButton();
        if (localStorage.first == undefined) {
            tutorial();
        }
    }

    function tutorial() {
        context.drawImage(bal.img[navBal], 0, 0, canvas.width, canvas.height)
    }
    //Renderizacão personagem hemocinho
    function perRender() {
        var ps = hemocinho[navIdade]
        var per = ps.sprite[navSprite];
        var num = ps.animN
        context.drawImage(per, Anim * per.width / num, 0, per.width / num, per.height, ps.x - ps.w / 2, ps.y - ps.h / 2, ps.w, ps.h);
    }
    var trick = false;

    function remderBath() {
        if (banho) {
            if (some < 80 && !trick) {
                ban.play();
                some++;
                context.drawImage(cort, 0, 0, 4 * some, 410);
            } else if (some < 420 && !trick) {
                chuv.play();
                some++;
                context.drawImage(cort, 0, 0, 340, 410);
            } else if (some == 420 && !trick) {
                trick = true;
                some = 80;
            } else if (trick) {
                ban.play();
                some--;
                context.drawImage(cort, 0, 0, 4 * some, 410);
                if (some == 0 && trick) {
                    banho = false;
                    some = 0;
                    trick = false;
                }
            }
        }
    }

    function drawCenterText(text, x, y, width) {
        var textdim = context.measureText(text);
        context.fillText(text, x + (width - textdim.width) / 2, y);
    }
    //Background
    function renderBG() {
        var bg = new Image;
        bg.src = bgImages[navBG];
        context.drawImage(bg, 0, 0, canvas.width, canvas.height);
    }
    //Tela
    function drawFrame() {
        context.drawImage(hud, 0, 0, canvas.width, canvas.height);
        var btns = 0;
        if (navBG % 2 == 0) {
            btns = 3;
        } else {
            btns = 0;
        }
        for (var i = 0; i < btn.length - btns; i++) {
            context.drawImage(images[i], btn[i].x, btn[i].y, btn[i].w, btn[i].h);
        }
        context.fillStyle = "#FFFFFF"
        context.font = canvas.width / 15 + "px IMPACT";
        context.fillText(window.Dindin, canvas.width / 6.4, canvas.height / 1.05);
        context.fillStyle = "#FFFFFF"
        context.font = canvas.width / 15 + "px Roboto";
        drawCenterText(moce.idade, canvas.width / 1.28, canvas.height / 15, canvas.width / 3.9);
        switch (navBG) {
        case 0:
            context.drawImage(act.img[4], btn[3].x, btn[3].y, btn[3].w, btn[3].h);
            break;
        case 1:
            context.drawImage(act.img[2], btn[3].x, btn[3].y, btn[3].w, btn[3].h);
            context.fillStyle = "#000000";
            context.font = canvas.width / 20 + "px Impact";
            context.drawImage(select.imgs[navComida], select.x, select.y, select.w, select.h);
            context.fillText(select.qtd[navComida], select.x + select.w / 1.5, select.y + select.h / 1.1, select.w, select.h);
            break;
        case 2:
            context.drawImage(act.img[1], btn[3].x, btn[3].y, btn[3].w, btn[3].h);
            break;
        case 3:
            context.drawImage(act.img[3], btn[3].x, btn[3].y, btn[3].w, btn[3].h);
            context.drawImage(select.jogos[navJogo], select.x, select.y, select.w, select.h);
            break;
        case 4:
            context.drawImage(act.img[0], btn[3].x, btn[3].y, btn[3].w, btn[3].h);
            break;
        }
        if (loja_open == true) {
            context.drawImage(loja_menu, 5, 70, 309, 306.5);
            for (var i = 0; i < obj_itens.length; i++) {
                context.drawImage(select.imgs[i], obj_itens[i].x, obj_itens[i].y, obj_itens[i].w, obj_itens[i].h);
            }
            context.fillStyle = "#FFFFFF";
            context.fillText(obj_itens[0].preco, obj_itens[0].x + 25, obj_itens[0].y + 63);
            context.fillText(obj_itens[1].preco, obj_itens[1].x + 28, obj_itens[1].y + 63);
            context.fillText(obj_itens[2].preco, obj_itens[2].x + 28, obj_itens[2].y + 63);
            context.fillText(obj_itens[3].preco, obj_itens[3].x + 31, obj_itens[3].y + 63);
            context.fillText(obj_itens[4].preco, obj_itens[4].x + 25, obj_itens[4].y + 65);
            context.fillText(obj_itens[5].preco, obj_itens[5].x + 28, obj_itens[5].y + 65);
            context.fillText(obj_itens[6].preco, obj_itens[6].x + 28, obj_itens[6].y + 65);
            context.fillText(obj_itens[7].preco, obj_itens[7].x + 31, obj_itens[7].y + 65);
            context.fillText(obj_itens[8].preco, obj_itens[8].x + 25, obj_itens[8].y + 65);
            context.fillText(obj_itens[9].preco, obj_itens[9].x + 28, obj_itens[9].y + 65);
            context.fillText(obj_itens[10].preco, obj_itens[10].x + 28, obj_itens[10].y + 65);
            context.fillText(obj_itens[11].preco, obj_itens[11].x + 25, obj_itens[11].y + 65);
            context.fillText(obj_itens[12].preco, obj_itens[12].x + 22, obj_itens[12].y + 60);
            context.fillText(obj_itens[13].preco, obj_itens[13].x + 22, obj_itens[13].y + 60);
            context.fillText(obj_itens[14].preco, obj_itens[14].x + 22, obj_itens[14].y + 60);
            context.fillText(obj_itens[15].preco, obj_itens[15].x + 22, obj_itens[15].y + 60);
        }
    }
    //Status do Hemocinho
    function renderStats() {
        var energy = moce.energia; //%
        var happy = moce.felicidade; //%
        var food = moce.apetite; //%
        var health = moce.saude; //%
        context.drawImage(statsBack, canvas.width / 5, canvas.height / 60, canvas.width / 1.77, canvas.height / 13);
        context.fillStyle = "#BB2222";
        context.fillRect(canvas.width / 4.7, canvas.height / 11, canvas.width / 9.4, -food * (canvas.height / 15) / 100);
        context.fillRect(canvas.width / 2.8, canvas.height / 11, canvas.width / 9.4, -health * (canvas.height / 15) / 100);
        context.fillRect(canvas.width / 2, canvas.height / 11, canvas.width / 9.4, -happy * (canvas.height / 15) / 100);
        context.fillRect(canvas.width / 1.56, canvas.height / 11, canvas.width / 9.4, -energy * (canvas.height / 15) / 100);
        context.drawImage(status, canvas.width / 5, canvas.height / 60, canvas.width / 1.77, canvas.height / 13);
    }
    //Renderiza o Menu Dropdown
    function renderButton() {
        if (dropdownBTN) {
            context.drawImage(menu[0], 0, 0, canvas.width / 1.23, canvas.height / 1.37);
            switch (navBG) {
            case 0:
                context.drawImage(menu[1], 0, canvas.height / 1.72, canvas.width / 1.23, canvas.height / 7);
                break;
            case 1:
                context.drawImage(menu[1], 0, canvas.height / 7, canvas.width / 1.23, canvas.height / 7);
                break;
            case 2:
                context.drawImage(menu[1], 0, canvas.height / 3.47, canvas.width / 1.23, canvas.height / 7);
                break;
            case 3:
                context.drawImage(menu[1], 0, canvas.height / 2.3, canvas.width / 1.23, canvas.height / 7);
                break;
            case 4:
                context.drawImage(menu[1], 0, canvas.height / 3.47, canvas.width / 1.23, canvas.height / 7);
                break;
            }
            context.drawImage(menu[2], canvas.width / 40, canvas.height / 24, canvas.width / 1.39, canvas.height / 1.5);
            context.fillStyle = "#BB2222"
            context.fillRect(0, 350, 260, 30);
            context.drawImage(creditos, 120, 355, 20, 20);
        }
    }
    

    function compra_venda(i) {
        if (obj_itens[i].preco <= window.Dindin) {
            select.qtd[i]++;
            window.Dindin -= obj_itens[i].preco;
        }
    }
    // Eventos de Mouse
    function onMouseDown(e) {
        if (window.first == undefined) {
            window.first = false;
        } else if (!banho) { //Pega a posicão
            var pos = getMousePos(canvas, e);
            if (localStorage.first == undefined) {
                if (bal.img[navBal + 1] == undefined) {
                    localStorage.first = true;
                } else if (navBal < 5) {
                    navBal++;
                } else if (navBal == 5) {
                    loja_open = true;
                    navBal++;
                } else if (navBal > 5) {
                    loja_open = false;
                    navBal++;
                } else if (bal.img[navBal] == undefined) {
                    localStorage.first = true;
                }
            }
            if (localStorage.first != undefined){
                //Verificacão de clique nos botões
                for (var i = 0; i < btn.length; i++) {
                    if (pos.x >= btn[i].x && pos.x < btn[i].x + btn[i].w && pos.y >= btn[i].y && pos.y < btn[i].y + btn[i].h) {
                        switch (i) {
                        case 0:
                            click.play();
                            dropdownBTN = !dropdownBTN;
                            break;
                        case 6:
                            click.play();
                            switch (navBG) {
                            case 1:
                                if (navComida > 0) {
                                    navComida--;
                                } else {
                                    navComida = select.imgs.length - 1;
                                }
                                break;
                            case 3:
                                if (navJogo > 0) navJogo--;
                                else navJogo = select.jogos.length - 1;
                                break;
                            }
                            break;
                        case 4:
                            switch (navBG) {
                            case 1:
                                feedme();
                                break;
                            case 3:
                                click.play();
                                canvas.removeEventListener("mousedown", onMouseDown);
                                if ((moce.energia = 0) && (moce.saude > 5) && (moce.felicidade > 5)) {
                                    moce.saude -= 5;
                                    moce.felicidade -= 5;
                                } else {
                                    moce.saude = 0;
                                    moce.felicidade = 0;
                                }
                                if (moce.felicidade < 90) {
                                    moce.energia -= 50;
                                    moce.felicidade += 10;
                                    window.cancelAnimationFrame(vari);
                                    switch (navJogo) {
                                    case 0:
                                        window.troca = 1;
                                        break;
                                    case 1:
                                        window.troca = 3;
                                        break;
                                    case 2:
                                        window.troca = 4;
                                        break;
                                    }
                                } else {
                                    moce.energia -= 10;
                                    moce.felicidade = 100;
                                    window.cancelAnimationFrame(vari);
                                    switch (navJogo) {
                                    case 0:
                                        window.troca = 1;
                                        break;
                                    case 1:
                                        window.troca = 3;
                                        break;
                                    case 2:
                                        window.troca = 4;
                                        break;
                                    }
                                }
                                break;
                            }
                            break;
                        case 5:
                            click.play();
                            switch (navBG) {
                            case 1:
                                if (navComida < select.imgs.length - 1) {
                                    navComida++;
                                } else {
                                    navComida = 0;
                                }
                                break;
                            case 3:
                                if (navJogo > 0) navJogo--;
                                else navJogo = select.jogos.length - 1;
                                break;
                            }
                            break;
                        case 3:
                            switch (navBG) {
                            case 0:
                                banho = true;
                                moce.higiene = 100;
                                moce.sujo = false;
                                click.play();
                                break;
                            case 1:
                                dropdownBTN = false;
                                loja_open = !loja_open;
                                break;
                            case 2:
                                navSprite = 5;
                                navBG = 4;
                                moce.dormindo = true;
                                break;
                            case 4:
                                navSprite = 0;
                                navBG = 2;
                                moce.dormindo = false;
                            }
                            break;
                        }
                    } else if (dropdownBTN) {
                        if (pos.y > canvas.height / 7 && pos.x < canvas.width / 1.23 && pos.y < 380) {
                            click.play();
                            dropdownBTN = false;
                            if (pos.y < canvas.height / 3.47) {
                                navBG = 1;
                            } else if (pos.y < canvas.height / 2.3) {
                                navBG = 2;
                            } else if (pos.y < canvas.height / 1.72) {
                                navBG = 3;
                            } else if (pos.y < canvas.height / 1.38) {
                                navBG = 0;
                            } else if (pos.y < 380) {
                                window.cancelAnimationFrame(vari);
                                canvas.removeEventListener("mousedown", onMouseDown);
                                window.troca = 5;
                            }
                            navSprite = 0;
                        }
                    }
                }
            }
            for (var i = 0; i < obj_itens.length; i++) {
                if (pos.x >= obj_itens[i].x && pos.x < obj_itens[i].x + obj_itens[i].w && pos.y >= obj_itens[i].y && pos.y < obj_itens[i].y + obj_itens[i].h && loja_open == true) {
                    buy.play();
                    switch (i) {
                    case 0:
                        compra_venda(i);
                        break;
                    case 1:
                        compra_venda(i);
                        break;
                    case 2:
                        compra_venda(i);
                        break;
                    case 3:
                        compra_venda(i);
                        break;
                    case 4:
                        compra_venda(i);
                        break;
                    case 5:
                        compra_venda(i);
                        break;
                    case 6:
                        compra_venda(i);
                        break;
                    case 7:
                        compra_venda(i);
                        break;
                    case 8:
                        compra_venda(i);
                        break;
                    case 9:
                        compra_venda(i);
                        break;
                    case 10:
                        compra_venda(i);
                        break;
                    case 11:
                        compra_venda(i);
                        break;
                    case 12:
                        compra_venda();
                    case 13:
                        compra_venda(i)
                        break;
                    case 14:
                        compra_venda(i)
                        break;
                    case 15:
                        compra_venda(i)
                        break;
                    }
                }
            }
        }
    }
    //Detectar posicão do mouse
    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width)
            , y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
        };
    }
    //////-----------------Desgaste-------------------------/////////////////
    function desgaste() {
      
        if (moce.dormindo == false) {
            if (moce.doente == false) {
                if (s % 30 == 0) {
                    moce.apetite -= 1;
                    moce.energia -= 1;
                    moce.saude -= 1;
                    moce.felicidade -= 1;
                    moce.higiene -= 1;
                }
                if (moce.apetite < 2) {
                    moce.apetite = 0;
                }
                if (moce.energia < 2) {
                    moce.energia = 0;
                }
                if (moce.saude < 2) {
                    moce.saude = 0;
                }
                if (moce.felicidade < 2) {
                    moce.felicidade = 0;
                }
                if (moce.higiene < 2) {
                    moce.higiene = 0;
                }
            } else {
                if (s % 30 == 0) {
                    moce.apetite -= 5;
                    moce.energia -= 5;
                    moce.saude -= 5;
                    moce.felicidade -= 5;
                    moce.higiene -= 5;
                }
                if (moce.apetite < 6) {
                    moce.apetite = 0;
                }
                if (moce.energia < 6) {
                    moce.energia = 0;
                }
                if (moce.saude < 6) {
                    moce.saude = 0;
                }
                if (moce.felicidade < 6) {
                    moce.felicidade = 0;
                }
                if (moce.higiene < 6) {
                    moce.higiene = 0;
                }
            }
        }
    }
    //////-----------------Tamagochi------------------------//////
    function tamagochi() {
        // É a funcão principal de chamada , onde todos as verificacãoes são desginadas para manutencão do boneco essa tambem é o lugar se determina o tempo que o moce dorme 
        if (moce.dormindo == false) {
            crescimento2();
            sujeira2();
            doenca2();
            fome2();
            felicidade2();
        } else {
            if ((s % 5 == 0) && (moce.energia < 100)) {
                moce.energia += 1;
            }
        }
    }
    //////---------------- Funccões chamadas na Moce que modificam o tamagochi-----------------//////
    //////----------------Sujeira2---------------------//////
    function sujeira2() {
        if (moce.higiene < 20) {
            moce.sujo = true;
        }
    }
    //////----------------doenca2---------------------//////
    function doenca2() {
        if (moce.saude <= 20) //Aqui se define se ele esta doente ou não
        {
            moce.doente = true;
            imgcont2 = 3;
        }
        if ((moce.sujo) && (moce.doente) && (s % 60 == 0) && (moce.felicidade <= 20) && (moce.saude >= 10)) {
            moce.saude -= 10;
        }
        if ((moce.sujo) && (moce.doente) && (s % 60 == 0) && (moce.saude >= 5)) {
            moce.saude -= 5;
        } else if ((moce.doente) && (s % 60 == 0) && (moce.saude >= 2)) {
            moce.saude -= 2;
        } else if ((moce.doente) && (s % 60 == 0) && ((moce.saude < 2))) {
            moce.saude = 0;
        }
    }
    //////----------------fome2---------------------//////
    function fome2() {
        if (moce.apetite <= 10) {
            if (s % 30 == 0) {
                if (moce.energia >= 2) {
                    moce.energia -= 2;
                } else {
                    moce.energia = 0;
                }
                if (moce.saude >= 2) {
                    moce.saude -= 2;
                } else {
                    moce.saude = 0
                }
                if (moce.felcidade >= 2) {
                    moce.felicidade -= 2;
                } else {
                    moce.felicidade = 0;
                }
            }
        }
    }
    //////----------------felicidade2---------------------//////
    function felicidade2() {
        if (moce.felicidade <= 10) {
            if (s % 30 == 0) {
                if (moce.apetite > 0) {
                    moce.apetite -= 1;
                } else {
                    moce.apetite = 0;
                }
                if (moce.energia > 0) {
                    moce.energia -= 1;
                } else {
                    moce.energia = 0;
                }
                if (moce.saude > 0) {
                    moce.saude -= 1;
                } else {
                    moce.saude = 0
                }
            }
        }
    }
    //////------------------crescimento2-----------------------//////
    function crescimento2() {
        if (moce.exp < 100) {
            if (s % 10 == 0) {
                if (moce.doente == false) {
                    if (moce.exp < 98) {
                        moce.exp += 2;
                    } else {
                        moce.exp = 100;
                    }
                }
                if (moce.felicidade > 50) {
                    if (moce.exp < 98) {
                        moce.exp += 2;
                    } else {
                        moce.exp = 100;
                    }
                }
            }
        } else {
            moce.exp = 0;
            moce.idade++;
        }
    }

    function feedme() {
        if (navComida < 11) {
            if ((select.qtd[navComida] > 0) && (moce.apetite < 100)) {
                select.qtd[navComida]--;
                comendo = true;
                come.play();
                //---------
                if (moce.apetite < 100 - obj_itens[navComida].aptit) {
                    moce.apetite += obj_itens[navComida].aptit
                } else {
                    moce.apetite = 100;
                }
                //---------
                if (moce.energia < 100 - obj_itens[navComida].energia) {
                    moce.energia += obj_itens[navComida].energia;
                } else {
                    moce.energia = 100;
                }
                //---------
                if (moce.felicidade < 100 - obj_itens[navComida].felicidade) {
                    moce.felicidade += obj_itens[navComida].felicidade;
                } else {
                    moce.felicidade = 100;
                }
                //---------
                if (moce.saude < 100 - obj_itens[navComida].saude) {
                    moce.saude += obj_itens[navComida].saude;
                } else {
                    moce.saude = 100;
                }
            } else if (select.qtd[navComida] > 0) {
                select.qtd[navComida]--;
                comendo = true;
                come.play();
                if (moce.felicidade > 5) {
                    moce.felicidade -= 5;
                } else {
                    moce.felicidade = 0;
                }
                if (moce.saude > 5) {
                    moce.saude -= 5;
                } else {
                    moce.saude = 0;
                }
            }
        } else {
            if ((select.qtd[navComida] > 0) && (moce.apetite < 100) && (moce.doente == true)) {
                select.qtd[navComida]--;
                comendo = true;
                come.play();
                moce.doente = false;
                //---------
                if (moce.apetite < 100 - obj_itens[navComida].aptit) {
                    moce.apetite += obj_itens[navComida].aptit
                } else {
                    moce.apetite = 100;
                }
                //---------
                if (moce.energia < 100 - obj_itens[navComida].energia) {
                    moce.energia += obj_itens[navComida].energia;
                } else {
                    moce.energia = 100;
                }
                //---------
                if (moce.felicidade < 100 - obj_itens[navComida].felicidade) {
                    moce.felicidade += obj_itens[navComida].felicidade;
                } else {
                    moce.felicidade = 100;
                }
                //---------
                if (moce.saude < 100 - obj_itens[navComida].saude) {
                    moce.saude += obj_itens[navComida].saude;
                } else {
                    moce.saude = 100;
                }
            } else if ((select.qtd[navComida] > 0) && (moce.doente == true)) {
                moce.doente = false;
                select.qtd[navComida]--;
                comendo = true;
                come.play();
                if (moce.felicidade > 5) {
                    moce.felicidade -= 5;
                } else {
                    moce.felicidade = 0;
                }
                if (moce.saude > 5) {
                    moce.saude -= 5;
                } else {
                    moce.saude = 0;
                }
            }
        }
    }
    //Chama a funcão que inicia o jogo
    init();
}