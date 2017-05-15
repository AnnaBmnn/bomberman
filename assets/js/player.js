// Generate our player
var pirate_player = function(playerPosX, playerPosY, div) {    
    this.playerPosX = playerPosX;    
    this.playerPosY = playerPosY; 
    this.movement = new Array();   
    this.div = div;    
    this.createPlayer = function() {        
            this.div = document.createElement('div');        
            this.div.classList.add('avatar_down');
            this.div.style.top = this.playerPosY + 'px';
            this.div.style.left = this.playerPosX + 'px';        
            var map = document.querySelector('.map');        
            map.appendChild(this.div);    
        },
        this.movePlayer = function() {
            var that = this;
            that.playerPosX = playerPosX;
            that.playerPosY = playerPosY;
            window.addEventListener('keydown', function(e) {
                // Position calcul
                that.posX = Math.floor(that.playerPosX / 50); //
                that.posY = Math.floor(that.playerPosY / 50); //
              console.log("Pos x " + that.posX);
              console.log("Pos y " + that.posY);
              console.log("PosX Player " + that.playerPosX);
              console.log("PosY Player " + that.playerPosY);


                if (e.keyCode == that.movement[0]) {
                    //up
                    that.posX = Math.floor((that.playerPosX+15) / 50); //
                    that.posY = Math.floor((that.playerPosY+25) / 50); //
                    if (map.cells[that.posY][that.posX].status === 'empty') {
                        console.log(map.isUnbreakable(that.posX, that.posY));
                        that.playerPosY -= 5;
                        that.div.classList.remove(that.sprite[1], that.sprite[2], that.sprite[3]);
                        that.div.classList.add(that.sprite[0]);
                    }
                } else if (e.keyCode == that.movement[1]) {
                    //right
                    that.posX = Math.floor((that.playerPosX+35) / 50); //
                    that.posY = Math.floor((that.playerPosY +30)/ 50); //
                    if (map.cells[that.posY][that.posX].status === 'empty') {
                        that.playerPosX += 5;
                        that.div.classList.remove(that.sprite[0], that.sprite[2], that.sprite[3]);
                        that.div.classList.add(that.sprite[1]);
                    }
                } else if (e.keyCode == that.movement[2]) {
                  //down
                  that.posX = Math.floor((that.playerPosX+15) / 50); //
                  that.posY = Math.floor((that.playerPosY+35) / 50); //
                  if (map.cells[that.posY][that.posX].status === 'empty') {
                    that.playerPosY += 5;
                    that.div.classList.remove(that.sprite[1], that.sprite[0], that.sprite[3]);
                    that.div.classList.add(that.sprite[2]);
                  }
                } else if (e.keyCode == that.movement[3]) {
                  //left
                  that.posX = Math.floor((that.playerPosX-5) / 50); //
                  that.posY = Math.floor((that.playerPosY+30) / 50); //
                  if (map.cells[that.posY][that.posX].status === 'empty') {
                    that.playerPosX -= 5;
                    that.div.classList.remove(that.sprite[1], that.sprite[2], that.sprite[0]);
                    that.div.classList.add(that.sprite[3]);
                  }
                }
                that.div.style.top = that.playerPosY + "px";
                that.div.style.left = that.playerPosX + "px";
            }, false);
        }
}

var pirate_player = new pirate_player(50, 50);
pirate_player.createPlayer();
pirate_player.movement = [38, 39, 40, 37];
pirate_player.sprite = ['avatar_up', 'avatar_right', 'avatar_down', 'avatar_left'];
pirate_player.movePlayer();
