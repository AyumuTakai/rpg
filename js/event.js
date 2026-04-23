var EVENTS = new Array(
  { // お城
    x:1,y:5,
    action:function(){
      mode='';
      $('#map').fadeOut(500,function(){
        $('#event01').fadeIn(500,function(){
          mode='event01';
        });
      });
    }
  },
  { // 街
    x:5,y:3,
    action:function(){
      mode='';
      $('#map').fadeOut(500,function(){
        $('#event02').fadeIn(500,function(){
          PC.hp = PC.hpMax;
          mode='event02';
        });
      });
    }
  },
  { // 森
    x:1,y:1,
    action:function(){
      if(PC.flag[0] == false) {
        $('#map .textframe .msg').html('洞窟を発見しました。<br>姫をさらった狼男を発見しました。');
        $('#map ul li:nth-child(11)').css('background-image','url(images/doukutsu.png)');
        PC.flag[0] = true;
      }else{
        PC.flag[1] = true;
        PC.encount(2);
      }
    }
  }
);
