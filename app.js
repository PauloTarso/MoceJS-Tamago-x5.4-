App = function () {
    this.init = function () {
        wade.loadAudio('HemociAttackSounds/Atinge.wav');
        wade.loadAudio('HemociAttackSounds/Explosao.wav');
        wade.loadAudio('HemociAttackSounds/Disparo.wav');
        wade.loadAudio('HemociAttackSounds/Blop.wav');
        wade.setWindowMode('none');
        this.Playing = false;
        /////////////////////////////
        /**/
        this.destruido1 = false; /**/
        /**/
        this.destruido2 = false; /**/
        /**/
        this.destruido3 = false; /**/
        /////////////////////////////
        /*↑↓→←↑↓→←↑↓→←↑↓→←↑↓→←↑↓→←↑↓→←↑↓→←↑↓→←↑↓→←↑↓→←INGAME SCORE↑↓→←↑↓→←↑↓→←↑↓→←↑↓→←↑↓→←↑↓→←↑↓→←↑↓→←↑↓→←↑↓→←*/
        //////////////////////////////////////////////////////////////////////////////
        this.score = 0;
        this.scoreText = new TextSprite('Score:' + this.score.toString(), '26px Helvetica', '#FFFFFF', 'left');
        this.scoreText.setOutline(0.1, '#ffd6cc');
        this.scoreText.setShadow('#4d0f00', 1, 3, 3);
        this.scoreText.setMaxWidth(200);
        var obj = new SceneObject(this.scoreText);
        wade.addSceneObject(obj);
        obj.setPosition({
            x: -230
            , y: -125
        });
        /////////////////////////////////////////////////////////////////////////////
        this.balasRestantes = 6;
        /* _______________________________________________________*/
        /*FUNCTION DE GAMEOVER*/
        //
        //______________________________________________________________________________________________________________
        this.gameOver = function () {
            //
            if (wade.app.GAMEOVER) {
                wade.physics.stopSimulation();
                base = wade.getSceneObject("CanonBase");
                base.setVisible(false);
                var gameover = wade.getSceneObject("GameOver");
                var veins = wade.getSceneObject("veins");
                var restart = wade.getSceneObject("restart");
                var menu = wade.getSceneObject("menu");
                wade.removeSceneObject(obj);
                //   wade.moveCamera({x:0,y:0,z:1.001},600);
                Background = wade.getSceneObject("Background");
                if (Background !== null && restart !== null && menu !== null && gameover !== null) {
                    Background.getSprite().setLayer(2)
                    restart.getSprite().setVisible(true);
                    menu.getSprite().setVisible(true);
                    gameover.getSprite().setVisible(true);
                    veins.getSprite().setDrawFunction(wade.drawFunctions.fadeOpacity_(0.5, 0, 1));
                    gameover.getSprite().setDrawFunction(wade.drawFunctions.fadeOpacity_(0, 0.2, 2));
                    restart.getSprite().setDrawFunction(wade.drawFunctions.fadeOpacity_(0, 0.99, 1));
                    menu.getSprite().setDrawFunction(wade.drawFunctions.fadeOpacity_(0, 0.99, 1));
                }
                else {
                    return false;
                }
                /*THE SCORE TO BE RETURNED TO THE TAMAGOTCHI, WICH IS MULTIPLYED BY THE NUMBER OF REMAINING BULLETS*/
                this.pontuacao = wade.app.score + 500 * wade.app.balasRestantes;
                this.pontuacaoText = new TextSprite('Score:' + this.pontuacao.toString(), '98px Helvetica', '#FFFFFF', 'center');
                this.pontuacaoText.setOutline(2, '#ff6600');
                this.pontuacaoText.setShadow('#993d00', 5, 5, 5);
                var pontuacaoCena = new SceneObject(this.pontuacaoText);
                wade.addSceneObject(pontuacaoCena);
                pontuacaoCena.setPosition({
                    x: 0
                    , y: -40
                });
                /*☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄☺☻♥♦*/
                //☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄             
                /*THIS IS WHERE THE APP SHOULD RETURN TO THE TAMAGOTCHI MAIN APP  */ //☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄ 
                // ☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄
                //☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄     
                ~~(window.score = (this.pontuacao / 10));
                /*                                               //☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄
	                                                                                            //☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄
	                                                                                           //☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄
	      //                                                                                 //☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄
	        ☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄☺☻♥♦♣♠•◘○◙♂♀♪//☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄
	       /*☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄*/
            }
        };
        //__________________________________________________________________________________________________________|||| 
        //__________________________________________________________________________________________________
        //|||!REMOVE THE REMAINING BULLETS OF THE SCREEN!|||\\
        /*\\\\\\\\\\\\\\\\\\\\\\\\\\_____________________________________________________________________////////////////////////////////////////////*/
        //                                                                                                                                            
        this.RemoveBalas = function (params) {
            if (!wade.app.GAMEOVER && params > 0 && wade.app.Playing) {
                var balaAremover = wade.getSceneObject("Bala" + params); //♥Gambiarra level GENIUS♥//
                balaAremover.getSprite().fadeOut(0.3);
                setTimeout(function () {
                    wade.removeSceneObject(balaAremover);
                }, 300);
            }
        };
        //
        /*____________________________________________________________________________________________________________________________________________*/
        //☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼ LOAD EVENT☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼
        /**/
        wade.loadScene('scene1.wsc', true, function () {
            wade.app.onMouseMove = function (data) {
                if (!wade.app.GAMEOVER && wade.getSceneObject("cannon") !== null && wade.app.Playing) {
                    //______________________________________________________________________________________
                    if (wade.app.destruido1 === true && wade.app.destruido2 === true && wade.app.destruido3 === true) {
                        wade.app.GAMEOVER = true;
                        wade.app.gameOver();
                    }
                    //___________________________________________________________________________________________
                    var cannon = wade.getSceneObject("cannon");
                    var displacement = wade.vec2.sub(data.screenPosition, cannon.getPosition());
                    var angle = Math.atan2(displacement.y, displacement.x);
                    cannon.setRotation(angle);
                }
                /* else{
                     return false;
                     
                 }*/
            };
            /*                                                                                                                                        */
            /*♣♣♦◘♣♦◘♣♦◘♣♦◘♦◘♣♦◘♣♦◘♣♦◘♣♦◘♣♦◘♣♦◘♣♦◘♣♦◘♣♦◘♣♦◘CLICK FUNCTION♣♦◘*♣♦◘♣♦◘♣♦◘♣♦◘♣♦◘♣♦◘♠♣♦◘♣♦◘♣♦◘♣♦◘♣♦◘♣♦◘♣♦◘♣♦◘*/
            //                                                                                                            
            //                                                                                                            
            wade.app.onMouseDown = function () {
                if (wade.app.Playing) {
                    hemocinho = wade.getSceneObject("Hemoci");
                    hemocinho.getSprite().playAnimation("mecheMeche");
                }
            }
            wade.app.onMouseUp = function () {
                wade.stopAudio();
                PB = wade.getSceneObject("powerBar");
                if (PB !== null) PB.isPlayingAudio = false;
                if (wade.app.balasRestantes > 0 && wade.app.Playing) {
                    wade.app.RemoveBalas(wade.app.balasRestantes);
                    wade.app.balasRestantes--;
                }
                else if (wade.app.balasRestantes === 0 && !wade.app.GAMEOVER) {
                    wade.app.GAMEOVER = true;
                    var veins = wade.getSceneObject("veins");
                    veins.getSprite().setVisible(true);
                    veins.getSprite().setDrawFunction(wade.drawFunctions.fadeOpacity_(0, 0.2, 2));
                    setTimeout(function () {
                        wade.app.gameOver();
                    }, 2000);
                }
                //                                                                                                                  
                //¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤²²³³THE VEC FUNCTION TO SIMULATE THE TRAJECTORY²³³³¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
                //                                                                                                                          
                if (!wade.app.GAMEOVER && wade.app.Playing) { //      
                    //      
                    var cannon = wade.getSceneObject("cannon"); //          
                    var powerBar = wade.getSceneObject("powerBar").getSprite(); //      
                    var rotation = cannon.getSprite().getRotation(); //          
                    var pos = wade.vec2.rotate({
                        x: 25
                        , y: 0
                    }, rotation); //      
                    var vel = wade.vec2.normalize(pos);
                    wade.vec2.addInPlace(pos, cannon.getPosition());
                    var ball = wade.getSceneObject("ball").clone();
                    wade.app.ball = ball;
                    ball.setPosition(pos);
                    wade.addSceneObject(ball, true);
                    wade.vec2.scaleInPlace(vel, 700 * powerBar.value);
                    setTimeout(function () {
                        ball.setAngularVelocity(10);
                        ball.setVelocity(vel);
                        wade.playAudio('HemociAttackSounds/Disparo.wav');
                        //   wade.moveCamera({x:240,y:150,z:0.79},70);
                    }, 0);
                    //                                                                                                                    
                    setTimeout(function () {
                        if (wade.app.GAMEOVER === false) {
                            ball.getSprite().playAnimation("explode");
                            ball.getSprite().fadeOut(0.3);
                        }
                        else {
                            return false;
                        }
                    }, 5000);
                    powerBar.value = 0;
                }
            };
        });
        this.GAMEOVER = false; //   
    };
    /*☺☻♥♦♣♠•◘○◙♂♀♪♫☼►☺☻♥♦♣♠•◘○◙♂♀♪♫☼►Whats making the game lag?*/
    //                                                                                                                                                    
};