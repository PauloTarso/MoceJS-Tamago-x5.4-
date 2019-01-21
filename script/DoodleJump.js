function Doodle() {
    /*↑↓→←↑↓→←↑↓→←Propriedades do canvas↑↓→←↑↓→←↑↓→←↑↓→←*/
    var width = 320
        , height = 500
        , gLoop, points = 0
        , estado = true
        , c = document.getElementById('jogo')
        , ctx = c.getContext('2d');
    c.width = width;
    c.height = height;

    var p;
    var s;

    /*↑↓→←↑↓→←↑↓→←↑↓→←↑↓→←Áudios↑↓→←↑↓→←↑↓→←*/
    greenJumpSound = new Audio('jump/greenJump.wav'); /*OS AUDIOS*/
    redJumpSound = new Audio('jump/redJump.wav');
    /*øøøøøøøøøøImagensøøøøøøøøøøøøøøøøøøøøøøø*/
    menu = new Image();
    menu.src = 'jump/menu.png';
    restart = new Image();
    restart.src = 'jump/reset.png';
    frameIMG = new Image();
    frameIMG.src = 'jump/framePontos.png';
    frameFinal = new Image();
    frameFinal.src = 'jump/framepontos.png';
	
	
	estrela = new Image();
    estrela.src = 'jump/estrela.png';
	
	base_image = new Image();
    base_image.src = 'jump/background.png';
    base_image.onload = function () {
        clippedBackgroundImage(ctx, base_image, 753, 960);
    }
    ctx.globalAlpha = 0.8;

    function clippedBackgroundImage(ctx, img, w, h) {
        ctx.save(); // ↑↓→←↑↓→←↑↓→←↑↓→←↑↓→←Função de clip para manter o paralax do background↑↓→←↑↓→←↑↓→←↑↓→←↑↓→←
        ctx.clip(); // ___________________________________________________
        var imgHeight = w / img.width * img.height;
        if (imgHeight < h) {
            ctx.fillStyle = '#33001a';
            ctx.fill();
        }
        ctx.drawImage(img, 0, 0, w, imgHeight);
        ctx.restore(); // _________________
    }
    var clear = function () {
        ctx.fillStyle = '#992222';
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.rect(0, 0, width, height);
        ctx.closePath();
        ctx.fill();
    }
    var qtHemacias = 15
        , hemacias = [];
    for (var i = 0; i < qtHemacias; i++) hemacias.push([Math.random() * width, Math.random() * height, Math.random() * 100, Math.random() / 2]);
    var DesenhaHemacias = function () {
        for (var i = 0; i < qtHemacias; i++) {
            ctx.fillStyle = 'rgba(125, 80, 80,) ' + hemacias[i][3] + ')';
            ctx.beginPath();
            ctx.arc(hemacias[i][0], hemacias[i][1], hemacias[i][2], 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
    };
    var Movehemacias = function (e) {
        for (var i = 0; i < qtHemacias; i++) {
            if (hemacias[i][1] - hemacias[i][2] > height) {
                hemacias[i][0] = Math.random() * width;
                hemacias[i][2] = Math.random() * 100;
                hemacias[i][1] = 0 - hemacias[i][2];
                hemacias[i][3] = Math.random() / 2;
            } else {
                hemacias[i][1] += e;
            }
        }
    };
    var hemocinho = new(function () {
        var isso = this; //impede que se perca o escopo do 'this' quando se chama uma nova função.
        isso.image = new Image();
        isso.image.src = "jump/sprite.png"
        isso.width = 65; //altura  e largura de cada frame!
        isso.height = 95;
        isso.frames = 1; //Numero de quadros
        isso.actualFrame = 0;
        isso.X = 0;
        isso.Y = 0;
        isso.isPulando = false;
        isso.isCaindo = false;
        isso.alturaPulo = 0;
        isso.velQueda = 0;
        isso.pular = function () {
            if (!isso.isPulando && !isso.isCaindo) {
                isso.velQueda = 0;
                isso.isPulando = true;
                isso.alturaPulo = 17;
            }
        }
        isso.checaPulo = function () {
            if (isso.Y > height * 0.4) {
                isso.setPosicao(isso.X, isso.Y - isso.alturaPulo);
            } else {
                if (isso.alturaPulo > 10) points++;
                // se o hemocinho esta no meio da tela
                // quem passa se mover são os blocos(para baixo↓↓↓↓).
                Movehemacias(isso.alturaPulo * 0.5);
                platforms.forEach(function (platform, ind) {
                    platform.y += isso.alturaPulo;
                    if (platform.y > height) {
                        var type = ~~(Math.random() * 5);
                        if (type == 0) type = 1;
                        else type = 0;
                        platforms[ind] = new Platform(Math.random() * (width - platformWidth), platform.y - height, type);
                    }
                });
            }
            isso.alturaPulo--;
            if (isso.alturaPulo == 0) {
                isso.isPulando = false;
                isso.isCaindo = true;
                isso.velQueda = 1;
            }
        }
        isso.StopQueda = function () {
            isso.isCaindo = false;
            isso.velQueda = 0;
            isso.pular();
        }
        isso.checaQueda = function () {
                if (isso.Y < height - isso.height) {
                    isso.setPosicao(isso.X, isso.Y + isso.velQueda);
                    isso.velQueda++;
                } else {
                    if (points == 0) isso.StopQueda();
                    else GameOver();
                }
            }
            /*←←←←←←←←←←←←←←←←←←←*/
        isso.moveLeft = function () { /*←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←*/
                if (isso.X > 0) {
                    isso.setPosicao(isso.X - 3, isso.Y);
                }
            }
            /*→→→→→→→→*/
        isso.moveRight = function () { /*→→→→→→→→→→→→→→→→→→→*/
            if (isso.X + isso.width < width) {
                isso.setPosicao(isso.X + 3, isso.Y);
            }
        }
        isso.setPosicao = function (x, y) {
            isso.X = x;
            isso.Y = y;
        }
        isso.interval = 0;
        isso.draw = function () {
            try {
                ctx.drawImage(isso.image, 0, isso.height * isso.actualFrame, isso.width, isso.height, isso.X, isso.Y, isso.width, isso.height);
            } catch (e) {};
            if (isso.interval == 8) {
                if (isso.actualFrame == isso.frames) {
                    isso.actualFrame = 0;
                } else {
                    isso.actualFrame++;
                }
                isso.interval = 0;
            }
            isso.interval++;
        }
    })();
    hemocinho.setPosicao(~~((width - hemocinho.width) / 2), height - hemocinho.height);
    hemocinho.pular();
    document.onmousemove = function (e) {
        if (hemocinho.X + c.offsetLeft > e.pageX) {
            hemocinho.moveLeft();
        } else if (hemocinho.X + c.offsetLeft < e.pageX) {
            hemocinho.moveRight();
        }
    }
    var nrOfPlatforms = 7
        , platforms = []
        , platformWidth = 70
        , platformHeight = 20;
    var Platform = function (x, y, type) {
        var isso = this;
        isso.primeiraCor = '#b30000'; /*Plataformas Vermelhas*/
        isso.segundaCor = '#e65c00';
        isso.onColisao = function () {
            redJumpSound.play();
            hemocinho.StopQueda();
        };
        if (type === 1) {
            isso.primeiraCor = '#FFFF00'; /*Plataformas Verdes*/
            isso.segundaCor = '#FFFFFF';
            isso.onColisao = function () {
                greenJumpSound.pause(); /*Impede que o som se sobressaia ao mesmo som, caso ainda esteja tocando.(Isso ocorre devido ao som ser mais longo)*/
                greenJumpSound.currentTime = 0.03;
                p = setTimeout(function () {
                    greenJumpSound.play();
                }, 150); /*Para evitar "|Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause()|".*/
                /*Som do contato com o bloco verde*/
                hemocinho.StopQueda();
                hemocinho.alturaPulo = 30; //Altura do pulo do hemocinho
            };
        }
        isso.x = ~~x;
        isso.y = y;
        isso.type = type;
        isso.isMoving = ~~(Math.random() * 2);
        isso.direction = ~~(Math.random() * 2) ? -1 : 1;
        isso.draw = function () {
            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            var gradient = ctx.createRadialGradient(isso.x + (platformWidth / 2), isso.y + (platformHeight / 2), 5, isso.x + (platformWidth / 2), isso.y + (platformHeight / 2), 45);
            gradient.addColorStop(0, isso.primeiraCor);
            gradient.addColorStop(1, isso.segundaCor); /*####Efeito gradiente nas plataformas#####*/
            ctx.fillStyle = gradient;
            ctx.fillRect(isso.x, isso.y, platformWidth, platformHeight);
        };
        return isso;
    };
    var geraPlataformas = function () {
        var position = 0
            , type;
        for (var i = 0; i < nrOfPlatforms; i++) {
            type = ~~(Math.random() * 8);
            if (type == 0) type = 1;
            else type = 0;
            platforms[i] = new Platform(Math.random() * (width - platformWidth), position, type);
            if (position < height - platformHeight) position += ~~(height / nrOfPlatforms);
        }
    }();
    var checaColisao = function () {
        platforms.forEach(function (e, ind) {
            if (
                (hemocinho.isCaindo) && (hemocinho.X < e.x + platformWidth) && (hemocinho.X + hemocinho.width > e.x) && (hemocinho.Y + hemocinho.height > e.y) && (hemocinho.Y + hemocinho.height < e.y + platformHeight)) {
                e.onColisao();
            }
        })
    }
    var GameLoop = function () {
        clear();
        clippedBackgroundImage(ctx, base_image, 420, 760);
        Movehemacias(0.5);
        DesenhaHemacias();
        if (hemocinho.isPulando) hemocinho.checaPulo();
        if (hemocinho.isCaindo) hemocinho.checaQueda();
        hemocinho.draw();
        platforms.forEach(function (platform, index) {
            if (platform.isMoving) {
                if (platform.x < 0) {
                    platform.direction = 1;
                } else if (platform.x > width - platformWidth) {
                    platform.direction = -1;
                }
                platform.x += platform.direction * (index / 2) * ~~(points / 100);
            }
            platform.draw();
        });
        checaColisao();
        ctx.font = "22pt Roboto";
        ctx.fillStyle = "#FFFFFF";
        var pontos = points;
       ctx.drawImage(estrela, 10, height-32, 20, 20);
		
		/*↓↓↓↓↓↓↓↓↓↓Caixa é responsiva a largura do texto↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
        frameIMGwidth = ctx.measureText(pontos).width;
        frameIMGheight = 45;
        ctx.drawImage(frameIMG, 35, height - 50, frameIMGwidth + 55, frameIMGheight);
        ctx.globalCompositeOperation = "source-over";
        ctx.fillText(pontos, 50, height - 17);
        if (estado) gLoop = setTimeout(GameLoop, 1000 / 50);
    }
    var GameOver = function () {
        estado = false;
        clearTimeout(gLoop);
        c.addEventListener("mousedown", mouse);
        s = setTimeout(function () {
            clear();
            var grd = ctx.createRadialGradient(750, 500, 10, 110, 60, 180);
            grd.addColorStop(0, "#33cc33");
            grd.addColorStop(1, "#FFFFFF");
            // Faz o gradiente
            ctx.fillStyle = grd;
          //  ctx.fillRect(0, 0, 320, 500);
            /*Alguns desenhos que eu havia feito,escolher,com ou sem!*/
           // ctx.fillRect(0,0,width,height);		
           
            ctx.drawImage(base_image, -30, 0, 750, 560);
            ctx.fillStyle = "#FFFFFF";
            ctx.drawImage(frameFinal, width / 2 - 100, height / 2 - 160, 210, 120);
            ctx.font = "40pt Roboto";
           ctx.drawImage(estrela, 10, 140, 40, 40);
			
            ctx.fillText(points, width / 2 - 40, height / 2 - 75);
            ctx.drawImage(menu, 10, 340, 120, 120);
            ctx.drawImage(restart, 190, 340, 120, 120);
        }, 100);
    }

    function getMousePos(c, e) {
        var rect = c.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * c.width)
            , y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * c.height)
        };
    }

    function mouse(e) {
        var pos = getMousePos(c, e);
        if ((pos.x >= 10 && pos.x < 10 + 120 && pos.y >= 340 && pos.y < 340 + 120) && !estado) {
            window.score = Math.floor(points / 50);
            c.removeEventListener("mousedown", mouse);
            clearTimeout(p);
            clearTimeout(s);
            clearTimeout(gLoop);
            window.troca = 2;
        }
        //tamago(); 
        //Aqui retorna para o tamagotchi.
        else if (pos.x >= 190 && pos.x < 190 + 120 && pos.y >= 340 && pos.y < 340 + 120) {
            c.removeEventListener("mousedown", mouse);
            clearTimeout(p);
            clearTimeout(s);
            clearTimeout(gLoop);
            Doodle();
        }
    };
    GameLoop();
}