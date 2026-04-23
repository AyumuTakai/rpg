var PC = {
  elm:null,
  x:1,
  y:5,
  name:'ああああ',
  hp:15,
  hpMax:15,
  atk:5,
  def:3,
  enemy: null,
  flag: new Array(false),
  init:function(elm){
    this.elm = elm;
    this.hp = this.hpMax;
    this.x = 1;
    this.y = 5;
    this.set();
    for(var i=0;i < this.flag.length;i++) {
      this.flag[i] = false;
    }
    return this;
  },
  set:function(){
    this.elm.css({left:PC.x*100-50+'px',top:(PC.y-1)*60-18+'px'});
    $('.pcname').html(this.name);
    this.showStatus();
    return this;
  },
  showStatus:function(){
    $('.hp').html(this.hp);
    $('.hpMax').html(this.hpMax);
    return this;
  },
  move:function(x,y) {
    $('#map .textframe .msg').html('');
    PC.x = Math.min(Math.max(x,1),7);
    PC.y = Math.min(Math.max(y,1),5);
    this.set();
    this.checkEvent();
    return this;
  },
  show:function(){
    $(this.elm).show();
    return this;
  },
  getTerrain:function(x,y){
    var n = x + y * MAP.WIDTH+1;
    var name =  $('#map ul li:nth-child('+n+')').attr('class');
    //console.log(x,y,n,name);
    return name;
  },
  setArrow:function(x,y,orientation){
    var terrain = this.getTerrain( x, y);
    if( terrain == 'mountain' || terrain == '' ) {
      $('.PC .arrows .'+orientation).hide();
    }else{
      $('.PC .arrows .'+orientation).show();
    }
  },
  encount:function(enemyNo){
    mode='';
    $('.battle .enemy img').hide();
    $('.battle .command').show();
    this.enemy = Object.create(ENEMY[enemyNo]);
    $('.battle .enemy img.'+this.enemy.id ).fadeIn(500);
    $('.battle .message').html(this.enemy.name+' があらわれた。');

    $('.battle .command .attack span').text('>');
    $('.battle .command .run span').text(' ');

    $('#map').fadeOut(500,function(){
      $('.battle').fadeIn(500,function(){
        mode = 'battle';
      });
    });
  },
  checkEncount:function(){
    var terrain = this.getTerrain(this.x,this.y);

    if( terrain == 'plain' ) {
      if(Math.random() < 0.3) {
        this.encount(0);
      }
    }else if(terrain == 'forest') {
      if(Math.random() < 0.2) {
        this.encount(1);
      }
    }else if(terrain == 'cave') {
      this.encount(3);
    }
  },
  checkEvent:function() {
    for(var i = 0;i < EVENTS.length;i++) {
      var event = EVENTS[i];
      if(this.x == event.x && this.y == event.y) {
        event.action();
        return;
      }
    }
    this.checkEncount();
  },
  attack:function(){
    $('.battle .command').hide();
    var myDamage = Math.max(0,this.atk - this.enemy.def);
    var msg = this.enemy.name+' に'+myDamage+'のダメージを与えた。';
    this.enemy.hp -= myDamage;
    if(this.enemy.hp < 0) {
      msg += '<br>' + this.enemy.name + 'を倒した。';
      this.enemy = null;
    }
    $('.battle .message').html(msg);
    return false;
  },
  defense:function(){
    var enemyDamage = Math.max(0,this.enemy.atk - this.def);
    var msg = this.enemy.name+' から'+enemyDamage+'のダメージを受けた。';
    this.hp = Math.max(0,this.hp - enemyDamage);
    this.showStatus();
    if(this.hp <= 0) {
      msg += ' HPが0になった。';
      this.enemy = null;
      this.flag[1] = false;
    }else{
      $('.battle .command').show();
    }
    $('.battle .message').html(msg);
    return false;
  },
  run:function(){
    $('.battle .command').hide();
    this.enemy = null;
    this.flag[1] = false;
    $('.battle .message').html(this.name + ' は逃げだした。');
    return false;
  }
}
