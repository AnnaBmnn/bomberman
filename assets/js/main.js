//object cel2
var cell = function(posX, posY, status, div) {
    this.posX = posX;
    this.posY = posY;
    this.status = status;
    this.div = div;

    this.createDiv = function(map) {
        this.div = document.createElement('div');
        this.div.classList.add('cell');
        this.div.classList.add(this.status);
        map.appendChild(this.div);
    }

    this.updateStatus = function(newStatus) {
        this.div.classList.remove(status);
        this.status = newStatus;
        this.div.classList.add(newStatus);
    }
}
/*
CELL.STATUS

cell.status = empty --> cell is empty
cell.status = unbreakable --> cell is an unbreakable wall
cell.status = breakable --> cell is an breakable wall

*/
var power = 4;

var map = function(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.div = document.querySelector('.map');
    this.cells = [rows];
    this.breakableWalls = 100;

    this.generateMap = function() {
        for (var i = 0; i < this.rows; i++) {
            this.cells[i] = [this.columns];

            for (var j = 0; j < this.columns; j++) {
                //define the cell with status unbreakable depending on their place
                var status = 'empty';
                if (this.isUnbreakable(i, j))
                    status = 'unbreakable'
                //define the cell with status breakable randomly
                var myCell = new cell(i, j, status);
                myCell.createDiv(this.div);
                this.cells[i][j] = myCell;
            }
        }
    }
    this.generateBreakableWall = function() {
        for (var k = 0; k < this.breakableWalls; k++) {
            //random x and y while the cell[x][y] is a corner or a unbreakableWall
            do {
                var x = alea(1, this.rows);
                var y = alea(1, this.columns);
            } while (this.isUnbreakable(x, y) || this.isCorner(x, y))
            this.cells[x][y].updateStatus('breakable');
        }
    }

    //test the cell[x][y] is unbreakable depending on their place
    this.isUnbreakable = function(x, y) {
        if (x == 0 || x == this.rows - 1 || y == 0 || y == this.columns - 1) // all the cells around
            return true;
        else
        if (y % 2 == 0 && x % 2 == 0) // one cell / 2
            return true;
        return false;
    }

    //test if the cells[x][y] is a corner case (corner case + or - number of powercase) or not
    this.isCorner = function(x, y) {
        //check if the random number give a cell in the corner
        if (x == 1) {
            if (y >= 1 && y <= power)
                return true;
            else
            if (y <= this.columns && y >= this.columns - power - 1)
                return true;
        }
        if (x == this.rows - 2) {
            if (y >= 1 && y <= power)
                return true;
            else
            if (y <= this.columns && y >= this.columns - power - 1)
                return true;
        }
        if (y == 1) {
            if (x >= 1 && x <= power)
                return true;
            else
            if (x <= this.rows && x >= this.rows - power - 1)
                return true;
        }
        if (y == this.columns - 2) {
            if (x >= 1 && x <= power)
                return true;
            else
            if (x <= this.rows && y >= this.rows - power - 1)
                return true;
        }
        return false;
    }
}

function alea(min, max) {
    return (Math.floor((max - min) * Math.random()) + min);
}

var map = new map(13, 17);
map.generateMap();
map.generateBreakableWall();


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
                    if (map.isUnbreakable(that.posX, that.posY) === false) {
                        console.log(map.isUnbreakable(that.posX, that.posY));
                        that.playerPosY -= 5;
                        that.div.classList.remove(that.sprite[1], that.sprite[2], that.sprite[3]);
                        that.div.classList.add(that.sprite[0]);
                    }
                } else if (e.keyCode == that.movement[1]) {
                    //right
                    that.posX = Math.floor((that.playerPosX+35) / 50); //
                    that.posY = Math.floor((that.playerPosY +30)/ 50); //
                    if (map.isUnbreakable(that.posX, that.posY) === false) {
                        that.playerPosX += 5;
                        that.div.classList.remove(that.sprite[0], that.sprite[2], that.sprite[3]);
                        that.div.classList.add(that.sprite[1]);
                    }
                } else if (e.keyCode == that.movement[2]) {
                  //down
                  that.posX = Math.floor((that.playerPosX+15) / 50); //
                  that.posY = Math.floor((that.playerPosY+35) / 50); //
                  if (map.isUnbreakable(that.posX, that.posY) === false) {
                    that.playerPosY += 5;
                    that.div.classList.remove(that.sprite[1], that.sprite[0], that.sprite[3]);
                    that.div.classList.add(that.sprite[2]);
                  }
                } else if (e.keyCode == that.movement[3]) {
                  //left
                  that.posX = Math.floor((that.playerPosX-5) / 50); //
                  that.posY = Math.floor((that.playerPosY+30) / 50); //
                  if (map.isUnbreakable(that.posX, that.posY) === false) {
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
