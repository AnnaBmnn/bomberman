// Generate our player
class Player {
  constructor(playerLives, playerPosX, playerPosY, div) {
    this.playerLives = playerLives;    
    this.playerPosX = playerPosX;    
    this.playerPosY = playerPosY; 
    this.movement = new Array(); 
    this.bombDelay = 2000;  
    this.bombKill = 2;
    this.enableBomb = 1;  //number of bomb you can launch  
    this.div = div;
  }

  createPlayer() {
    map.pirates[map.pirates.length] = this; // add the player into the players array   
    this.div = document.createElement('div');        
    this.div.classList.add('avatar_down');
    this.div.style.top = this.playerPosY + 'px';
    this.div.style.left = this.playerPosX + 'px';        
    let mapDiv = document.querySelector('.map');        
    mapDiv.appendChild(this.div); 
  }

  movePlayer() {
    var that = this;
    that.playerPosX;
    that.playerPosY;
    window.addEventListener('keydown', function(e) {
      // Position calcul
      that.posX = Math.round(that.playerPosX / 50); //
      that.posY = Math.round(that.playerPosY / 50); //
//      console.log("Pos x " + that.posX);
//      console.log("Pos y " + that.posY);

      if (e.keyCode == that.movement[0]) {
        //up
        that.posX = Math.floor((that.playerPosX + 15) / 50); //
        that.posY = Math.floor((that.playerPosY + 25) / 50); //
        if ((map.cells[that.posY][that.posX].status === 'empty') || (map.cells[that.posY][that.posX].status === 'bonus') || (map.cells[that.posY][that.posX].status === 'dangerous')) {
            that.playerPosY -= 5;
            that.div.classList.remove(that.sprite[1], that.sprite[2], that.sprite[3]);
            that.div.classList.add(that.sprite[0]);

            pirate_player.bonusCheck(that.posX, that.posY);
        }
      } else if (e.keyCode == that.movement[1]) {
        //right
        that.posX = Math.floor((that.playerPosX + 35) / 50); //
        that.posY = Math.floor((that.playerPosY + 30) / 50); //
        if ((map.cells[that.posY][that.posX].status === 'empty') || (map.cells[that.posY][that.posX].status === 'bonus') || (map.cells[that.posY][that.posX].status === 'dangerous')) {
            that.playerPosX += 5;
            that.div.classList.remove(that.sprite[0], that.sprite[2], that.sprite[3]);
            that.div.classList.add(that.sprite[1]);

            pirate_player.bonusCheck(that.posX, that.posY);
        }
      } else if (e.keyCode == that.movement[2]) {
        //down
        that.posX = Math.floor((that.playerPosX + 15) / 50); //
        that.posY = Math.floor((that.playerPosY + 35) / 50); //
        if ((map.cells[that.posY][that.posX].status === 'empty') || (map.cells[that.posY][that.posX].status === 'bonus') || (map.cells[that.posY][that.posX].status === 'dangerous')) {
            that.playerPosY += 5;
            that.div.classList.remove(that.sprite[1], that.sprite[0], that.sprite[3]);
            that.div.classList.add(that.sprite[2]);

            pirate_player.bonusCheck(that.posX, that.posY);
        }
      } else if (e.keyCode == that.movement[3]) {
        //left
        that.posX = Math.floor((that.playerPosX - 5) / 50); //
        that.posY = Math.floor((that.playerPosY + 30) / 50); //
        if ((map.cells[that.posY][that.posX].status === 'empty') || (map.cells[that.posY][that.posX].status === 'bonus') || (map.cells[that.posY][that.posX].status === 'dangerous')) {
            that.playerPosX -= 5;
            that.div.classList.remove(that.sprite[1], that.sprite[2], that.sprite[0]);
            that.div.classList.add(that.sprite[3]);

            pirate_player.bonusCheck(that.posX, that.posY);
        }
      } else if (e.keyCode == that.movement[4] && that.enableBomb > 0) {
        that.createBomb();
      }
      that.div.style.top = that.playerPosY + "px";
      that.div.style.left = that.playerPosX + "px";
    }, false);
  }
    
  bonusCheck(posX, posY) {
    if (map.cells[posY][posX].status === 'bonus') {
      
      // Apply bonus to the player
      
      // Speed
      if (map.cells[posY][posX].bonus == map.bonusTypes[0])
        console.log('Up player speed');
      
      // power-bomb
      else if (map.cells[posY][posX].bonus == map.bonusTypes[1])
        this.bombKill += 1;
        
      // add-bomb
      else if (map.cells[posY][posX].bonus == map.bonusTypes[2])
        this.enableBomb += 1;
      
      // Update cell status to empty
      map.cells[posY][posX].updateStatus('empty', true);
      map.cells[posY][posX].div.classList.remove(map.cells[posY][posX].bonus);
      map.cells[posY][posX].bonusStatus = null;
    }
  }

  createBomb() {
    this.enableBomb -= 1;
    let bomb = new Bomb(this.bombKill, this.playerPosX, this.playerPosY, this.bombDelay, this);
    bomb.launchBomb();
    setTimeout(function() { // delay until the player can launch a bomb again
      pirate_player.enableBomb += 1;
      bomb.destructingBomb();
      bomb.killingBomb();
    }, this.bombDelay);
  }
}

pirate_player = new Player(3, 50, 50);
pirate_player.createPlayer();
pirate_player.movement = [38, 39, 40, 37, 32];
pirate_player.sprite = ['avatar_up', 'avatar_right', 'avatar_down', 'avatar_left'];
pirate_player.movePlayer();
