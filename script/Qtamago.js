function Quiz() {
    //canvas
    var canvas = document.getElementById("jogo");
    var ctx = canvas.getContext("2d");
    canvas.width = 320;
    canvas.height = 480;
    var respostaimg0 = 0;
    var respostaimg1 = 0;
    var respostaimg2 = 0;
    var respostaimg3 = 0;
    var vari;
    var resposta_acertada = false;
    var resposta;
    var prizeR = window.score;
    var prize = window.score;
    var coin = window.score;
    var navResp = 0;
    var moedas = false;
    var condiResp = ["imgs/certo.png", "img/barra2.png", "imgs/normal.png", "img/background.png"];
    var condi1 = [];
    //var hudImgs = ["imgs/pergunta.png","imgs/perguntareal.png"];
    var hudImgs = [
        {
            src: "img/barra0.png"
            , x: 3
            , y: 155
            , w: 312
            , h: 65
        }, {
            src: "img/barra0.png"
            , x: 3
            , y: 220
            , w: 312
            , h: 65
        }, {
            src: "img/barra0.png"
            , x: 3
            , y: 285
            , w: 312
            , h: 65
        }, {
            src: "img/barra0.png"
            , x: 3
            , y: 350
            , w: 312
            , h: 65
        }, {
            src: "img/perguntas.png"
            , x: 3
            , y: 5
            , w: 312
            , h: 100
        }, {
            src: "imgs/perguntareal.png"
            , x: 0
            , y: 30
            , w: 320
            , h: 100
        }, {
            src: "img/moeda.png"
            , x: 140
            , y: 435
            , w: 35
            , h: 35
        }
     ]
    var n_pergunta
    var h1 = [];
    var qperguntas = [
            {
                p: "Com quantos anos se pode doar sangue?"
                , r1: "A partir 16 de anos"
                , r2: "mais que 40 anos"
                , r3: "acima de 69 anos"
                , r4: "desde de pequeno"
        }, {
                p: "Posso doar Sangue se eu tiver uma tatuagem?"
                , r1: "Sim, 1 ano depois de fazer a ultima tatuagem"
                , r2: "Sim, basta ir no hemocentro"
                , r3: "Não, Nunca"
                , r4: "Depende de quantas tatuagens"
        }, {
                p: "Doar sangue constantemente  vicia?"
                , r1: "Sim, mas é facil parar"
                , r2: "Sim,sempre tem que ficar doando"
                , r3: "Doar sangue não vicia"
                , r4: "Só se você está enfenticado por um vampiro"
        }, {
                p: "Doar sangue faz emagrecer?"
                , r1: "Acho que sim,porque está tirando algo do corpo"
                , r2: "Doar sangue você não engorda nem emagrece" //verdadeiro


                
                , r3: "Emagrece muito, minha tia perdeu muito peso"
                , r4: "Não, mas você ficar gigante "
        }, {
                p: "Doar sangue engrossa  ou afina o sangue?"
                , r1: "Não engrossa e nem afina " //verdadeiro


                
                , r2: "Depende de quanto sangue você doou"
                , r3: "Não engrossa , mas deixa ele amarelinho"
                , r4: "Depende das estrelas "
        }, {
                p: "Tem que levar algum algum documento para doar?"
                , r1: "Não, basta força de vontade"
                , r2: "Sim, qualquer documento serve"
                , r3: "Sim, é preciso levar um documento com foto" //verdadeiro


                
                , r4: "Não, mas seria legal levar uma carta de Hogwart"
        }, {
                p: "Existe Algum substituto para o sangue?"
                , r1: "Sim, mas demora muito pra ser feito"
                , r2: "Sim, mas é muito caro"
                , r3: "Não, nada pode subistituir" //verdadeiro


                
                , r4: "Não, mas da pra usar refrigerante por um tempo"
        }, {
                p: "Oque é sangue raro?"
                , r1: "É um tipo de sangue que poucas pessoas tem" //verdadeiro


                
                , r2: "É uma versão brilhosa do sangue"
                , r3: "É um tipo de sangue com poderes especias "
                , r4: "Não existe sangue tipo de sangue raro"
        }, {
                //------------------------------------------------
                p: "O sangue doado pode ajudar quantas pessoas?"
                , r1: "4 pessoas para cada bolsa de sangue" //verdadeiro


                
                , r2: "2 pessoas para cada bolsa de sangue"
                , r3: "1 pessoas para cada bolsa de sangue"
                , r4: "3 pessoas para cada bolsa de sangue"
        }, {
                p: "Tomei vacina para Hepatite B. posso doar sangue?"
                , r1: "Só depois de 3 meses e tem que pegar uma fila" //verdadeiro


                
                , r2: "Pode doar logo depois se quiser"
                , r3: "Tem que esperar 48 horas"
                , r4: "Pode depois de 3 horas,42 minutos"
        }, {
                p: "Posso doar se estou com suspeita de Dengue?"
                , r1: "Claro que não, nunca mais vai poder doar"
                , r2: "Pode sim, os laborátorios são bons"
                , r3: "Não e tem que esperar 1 mes " //verdadeiro


                
                , r4: "Pode depois de 6 meses de boa alimentação"
        }, {
                p: "Doar sangue dói?"
                , r1: "Não, mas fica coçando depois "
                , r2: "Sim, infelzmente dói "
                , r3: "Não, é tranquilo" //verdadeiro


                
                , r4: "Sim, e depois fica um pouco inchado mas passa"
        }, {
                p: "Em quanto tempo o sangue volta pro corpo?"
                , r1: "2 dias de descanço de ve ser o suficiente"
                , r2: "Menos que 1 minuto em namekusei"
                , r3: "6 meses  de espera "
                , r4: "Em até 24 horas, incrível não é?" //verdadeiro
        }, {
                p: "Tem que ficar sem comer para poder doar sangue?"
                , r1: "Sim, como a maioria dos exames"
                , r2: "Sim, por mais de 24 horas"
                , r3: "Não, mas deve comer só ovos por 2 dias"
                , r4: "Não, o doador tem que estar bem alimentado" //verdadeiro
        }

    ]
        //Percorre a resposta
    var naveg_valor;
    //Verificador da resposta
    var rvalor = [
        {
            //Questão1
            r1valor: true
            , r2valor: false
            , r3valor: false
            , r4valor: false
        }, {
            //Questão2
            r1valor: true
            , r2valor: false
            , r3valor: false
            , r4valor: false
        }, {
            //Questão3
            r1valor: false
            , r2valor: false
            , r3valor: true
            , r4valor: false
        }, {
            //Questão4
            r1valor: false
            , r2valor: true
            , r3valor: false
            , r4valor: false
        }, {
            //Questão5
            r1valor: true
            , r2valor: false
            , r3valor: false
            , r4valor: false
        }, {
            //Questão6
            r1valor: false
            , r2valor: false
            , r3valor: true
            , r4valor: false
        }, {
            //Questão7
            r1valor: false
            , r2valor: false
            , r3valor: true
            , r4valor: false
        }, {
            //Questão8
            r1valor: true
            , r2valor: false
            , r3valor: false
            , r4valor: false
        }, {
            //Questão9
            r1valor: true
            , r2valor: false
            , r3valor: false
            , r4valor: false
        }, {
            //Questão10
            r1valor: true
            , r2valor: false
            , r3valor: false
            , r4valor: false
        }, {
            //Questão11
            r1valor: false
            , r2valor: false
            , r3valor: true
            , r4valor: false
        }, {
            //Questão12
            r1valor: false
            , r2valor: false
            , r3valor: true
            , r4valor: false
        }, {
            //Questão13
            r1valor: false
            , r2valor: false
            , r3valor: false
            , r4valor: true
        }, {
            //Questão14
            r1valor: false
            , r2valor: false
            , r3valor: false
            , r4valor: true
        }

    ]
    var images = [];
    var newImages = function (src) {
        var img = new Image;
        img.src = src
        return img;
    }

    function quiz(e) {
        //mudar o x e y das frases depois de colocar a img.
        ctx.font = "28px RobotoB";
        wrapText(e.p, 19, 35, 300, 28);
        ctx.font = "18px Roboto";
        wrapText(e.r1, 19, 190, 300, 18);
        wrapText(e.r2, 19, 255, 300, 18);
        wrapText(e.r3, 19, 320, 300, 18);
        wrapText(e.r4, 19, 385, 300, 18);
    }

    function init() {
        canvas.addEventListener("mousedown", onMouseDown);
        // define a pergunta
        n_pergunta = getRandomArbitrary(-1, qperguntas.length - 1);
        for (var i = 0; i < hudImgs.length; i++) {
            h1.push(newImages(hudImgs[i].src));
        }
        for (var i = 0; i < condiResp.length; i++) {
            condi1.push(newImages(condiResp[i]));
        }
        main();
        
    }

    function main() {
        vari = window.requestAnimationFrame(main);
        draw();
        if (moedas == false) {
            coins();
        }
        quiz(qperguntas[n_pergunta]);
        console.log(window.troca);
    }

    function draw() {
        ctx.drawImage(condi1[3], 0, 0, canvas.width, canvas.height);
        ctx.drawImage(h1[4], hudImgs[4].x, hudImgs[4].y, hudImgs[4].w, hudImgs[4].h);
        for (var i = 0; i < 4; i++) {
            ctx.drawImage(h1[i], hudImgs[i].x, hudImgs[i].y, hudImgs[i].w, hudImgs[i].h);
        }
        ctx.drawImage(h1[6], hudImgs[6].x, hudImgs[6].y, hudImgs[6].w, hudImgs[6].h);
        ctx.font = "18px Roboto";
        ctx.fillStyle = "WHITE";
        ctx.fillText(coin, canvas.width / 2 + 20, 460);
    }
    //define a posição do mouse    
    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width)
            , y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
        };
    }
    // quando aperta o botão do mouse    
    function onMouseDown(e) {
        var pos = getMousePos(canvas, e);
        //Verificação de clique nos botões
        for (var i = 0; i < hudImgs.length; i++) {
            if (pos.x >= hudImgs[i].x && pos.x < hudImgs[i].x + hudImgs[i].w && pos.y >= hudImgs[i].y && pos.y < hudImgs[i].y + hudImgs[i].h) {
                resposta = i;
            }
        }
        verifica_resposta();
    }

    function verifica_resposta() {
        if(resposta_acertada == true){
            window.cancelAnimationFrame(vari);
            canvas.removeEventListener("mousedown", onMouseDown);
            window.troca = 0;
        } else {
            switch (resposta) {
            case 0:
                if ((rvalor[n_pergunta].r1valor == true) && (respostaimg0 == 0)) {
                    respostaimg0 = 2;
                    h1[0].src = "img/barra2.png";
                    resposta_acertada = true;
                    window.Dindin += prize;



                } else if ((respostaimg0 == 0) && (resposta_acertada == false)) {
                    respostaimg0 = 1;
                    h1[0].src = "img/barra1.png";
                    prize -= Math.floor(prizeR / 4)
                    moedas = false;
                }
                break;
            case 1:
                if ((rvalor[n_pergunta].r2valor == true) && ((respostaimg1 == 0))) {
                    respostaimg1 = 2;
                    h1[1].src = "img/barra2.png";
                    resposta_acertada = true;
                    window.Dindin += prize;
                    localStorage.setItem("money", JSON.stringify(window.Dindin));



                } else if ((respostaimg1 == 0) && (resposta_acertada == false)) {
                    respostaimg1 = 1;
                    h1[1].src = "img/barra1.png";
                    prize -= Math.floor(prizeR / 4);
                    moedas = false;
                }
                break;
            case 2:
                if ((rvalor[n_pergunta].r3valor == true) && ((respostaimg2 == 0))) {
                    respostaimg2 = 2;
                    h1[2].src = "img/barra2.png";
                    resposta_acertada = true;
                    window.Dindin += prize;
                    localStorage.setItem("money", JSON.stringify(window.Dindin));



                } else if ((respostaimg2 == 0) && (resposta_acertada == false)) {
                    respostaimg2 = 1;
                    h1[2].src = "img/barra1.png";
                    prize -= Math.floor(prizeR / 4)
                    moedas = false
                }
                break;
            case 3:
                if ((rvalor[n_pergunta].r4valor == true) && ((respostaimg3 == 0))) {
                    respostaimg3 = 2;
                    h1[3].src = "img/barra2.png";
                    resposta_acertada = true;
                    window.Dindin += prize;
                    localStorage.setItem("money", JSON.stringify(window.Dindin));



                } else if ((respostaimg3 == 0) && (resposta_acertada == false)) {
                    respostaimg3 = 1;
                    h1[3].src = "img/barra1.png";
                    prize -= Math.floor(prizeR / 4)
                    moedas = false;
                }
                break;
            }   
        }
    }

    function coins() {
        if (prize < coin) {
            coin--;
        } else {
            moedas = true;
        }
    }

    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min)) + min + 1;
    }
    
    function wrapText(text, x, y, maxWidth, lineHeight) {
        var cars = text.split("\n");

        for (var i = 0; i < cars.length; i++) {

            var line = "";
            var words = cars[i].split(" ");

            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + " ";
                var metrics = ctx.measureText(testLine);
                var testWidth = metrics.width;

                if (testWidth > maxWidth) {
                    ctx.fillText(line, x, y);
                    line = words[n] + " ";
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }

            ctx.fillText(line, x, y);
            y += lineHeight;
        }
     }
    
    init();
}