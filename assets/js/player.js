// Generate our player
class Player {
  constructor(playerLives, playerPosX, playerPosY, div) {
    this.playerLives = playerLives;    
    this.playerPosX = playerPosX;    
    this.playerPosY = playerPosY; 
    this.movement = new Array(); 
    this.direction = 0;
    this.speed = 8; 
    this.bombDelay = 2000;  
    this.bombKill = 1;
    this.enableBomb = 1;  //number of bomb you can launch  
    this.div = div;
    this.lastPlayerDirection = 40;
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
    
  getDirection(){
    var that = this;
    window.addEventListener('keydown', function(e){
      that.direction = e.keyCode ;
      that.movePlayer();
    }, false)
  }

  movePlayer() {
    var that = this;
    that.playerPosX;
    that.playerPosY;
      // Position calcul
      that.posX = Math.round(that.playerPosX / 50); //
      that.posY = Math.round(that.playerPosY / 50); //
//      console.log("Pos x " + that.posX);
//      console.log("Pos y " + that.posY);
        
      if ( (this.direction == that.movement[0]) || (this.direction == that.movement[1]) || (this.direction == that.movement[2]) || (this.direction == that.movement[3]) ) {
          this.lastPlayerDirection = this.direction;
      }
        

      if (this.direction == that.movement[0]) {
        //up
        
        // Change of sprite in function of the movement direction
        that.div.classList.remove(that.sprite[1], that.sprite[2], that.sprite[3]);
        that.div.classList.add(that.sprite[0]);
        
        // Tweak player position (hit box) - on x and y
        that.posX = Math.floor((that.playerPosX + 20) / 50);
        that.posY = Math.floor((that.playerPosY + 32) / 50);
          
        // Detection if the player can walk on the cell or not
        if ((map.cells[that.posY][that.posX].status === 'empty') || (map.cells[that.posY][that.posX].status === 'bonus') || (map.cells[that.posY][that.posX].status === 'dangerous')) {
            
            // Move the player of position
            that.playerPosY -= that.speed;
            
            // if bonus on the cell --> apply the bonus to the player
            that.bonusCheck(that.posX, that.posY);
        }
      } else if (this.direction == that.movement[1]) {
        //right
        
        that.div.classList.remove(that.sprite[0], that.sprite[2], that.sprite[3]);
        that.div.classList.add(that.sprite[1]);  
          
        that.posX = Math.floor((that.playerPosX + 40) / 50);
        that.posY = Math.floor((that.playerPosY + 45) / 50);
        
        if ((map.cells[that.posY][that.posX].status === 'empty') || (map.cells[that.posY][that.posX].status === 'bonus') || (map.cells[that.posY][that.posX].status === 'dangerous')) {
            
            that.playerPosX += that.speed;
            
            that.bonusCheck(that.posX, that.posY);
        }
      } else if (this.direction == that.movement[2]) {
        //down
          
        that.div.classList.remove(that.sprite[1], that.sprite[0], that.sprite[3]);
        that.div.classList.add(that.sprite[2]);  
          
        that.posX = Math.floor((that.playerPosX + 22) / 50);
        that.posY = Math.floor((that.playerPosY + 55) / 50);
          
        if ((map.cells[that.posY][that.posX].status === 'empty') || (map.cells[that.posY][that.posX].status === 'bonus') || (map.cells[that.posY][that.posX].status === 'dangerous')) {
            
            that.playerPosY += that.speed;

            that.bonusCheck(that.posX, that.posY);
        }
      } else if (this.direction == that.movement[3]) {
        //left
        
        that.div.classList.remove(that.sprite[1], that.sprite[2], that.sprite[0]);
        that.div.classList.add(that.sprite[3]);
        
        that.posX = Math.floor((that.playerPosX + 4) / 50);
        that.posY = Math.floor((that.playerPosY + 45) / 50);
          
        if ((map.cells[that.posY][that.posX].status === 'empty') || (map.cells[that.posY][that.posX].status === 'bonus') || (map.cells[that.posY][that.posX].status === 'dangerous')) {
            
            that.playerPosX -= that.speed;
            
            that.bonusCheck(that.posX, that.posY);
        }
      } else if (this.direction == that.movement[4] && that.enableBomb > 0) {
        that.createBomb();
      }
      that.div.style.top = that.playerPosY + "px";
      that.div.style.left = that.playerPosX + "px";
  }
    
  bonusCheck(posX, posY) {
    if (map.cells[posY][posX].status === 'bonus') {
      
      // Apply bonus to the player
      
      // Speed
      if (map.cells[posY][posX].bonus == map.bonusTypes[0])
        this.speed += 5;
      
      // power-bomb
      else if (map.cells[posY][posX].bonus == map.bonusTypes[1])
          this.bombKill++;
        
      // add-bomb
      else if (map.cells[posY][posX].bonus == map.bonusTypes[2])
        this.enableBomb++;
      
      // Update cell status to empty
      map.cells[posY][posX].updateStatus('empty', true);
      map.cells[posY][posX].div.classList.remove(map.cells[posY][posX].bonus);
      map.cells[posY][posX].bonusStatus = null;
    }
  }

  createBomb() {
    this.enableBomb -= 1;
    
    let bombPositionUpDown = 45, // Down
        bombPositionLeftRight = 22; // Right
      
    if (this.lastPlayerDirection == this.movement[0])
        bombPositionUpDown = 49; // Up
    
    else if (this.lastPlayerDirection == this.movement[3]) // Left
        bombPositionLeftRight = 18;
      
    let bomb = new Bomb(this.bombKill, this.playerPosX + bombPositionLeftRight, this.playerPosY + bombPositionUpDown, this.bombDelay, this);
      
    bomb.launchBomb();
    setTimeout(function() { // delay until the player can launch a bomb again
      pirate_player.enableBomb += 1;
      bomb.destructingBomb();
      bomb.killingBomb();
    }, this.bombDelay);
  }
}

pirate_player = new Player(3, 50, 25);
pirate_player.createPlayer();
pirate_player.movement = [38, 39, 40, 37, 32];
pirate_player.sprite = ['avatar_up', 'avatar_right', 'avatar_down', 'avatar_left'];
pirate_player.getDirection();
