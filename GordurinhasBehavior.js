GordurinhasBehavior = function()    
{


/*◘♣♦◘♣♦◘♣♦◘♣♦◘◘♣♦◘♣♦◘♣♦◘♣♦◘ THE BEHAVIOR TO SET WHEN THE FAT BARS WILL BE REMOVED FROM THE SCENE*/



this.onAddToScene=function(){
this.isAudioPlaying=false;
wade.loadAudio('HemociAttackSounds/BarraFade.mp3');
	    

     this.owner.hp=0; 
    
};  
  
  
  this.onCollision=function(){
 var objects=this.owner.getOverlappingObjects();



 for (var i=0;i<objects.length;i++){
      if(objects[i] == wade.app.ball){
       this.owner.hp+=1;
      if(!this.isPlaying){
       wade.playAudio('HemociAttackSounds/Atinge.wav');
          this.isPlaying=true;
      }
         break;
      }
 }

if (this.owner.hp==100){
this.owner.getBehavior().getFixtureList().SetSensor(true);

this.owner.getSprite().fadeOut(1.3);
wade.playAudio('HemociAttackSounds/BarraFade.mp3');
setTimeout(function() {wade.removeSceneObject(this.owner);}, 1300);
    
    
}
      
  };
  

    
};