class cell { // class cell
  constructor(posX, posY, status, div) {
    this.posX = posX;
    this.posY = posY;
    this.status = status;
    this.bonusStatus = null;
    this.bonus = null;
    this.div = div;
}
  createDiv(map) {
        this.div = document.createElement('div');
        this.div.classList.add('cell');
        this.div.classList.add(this.status);
        if (!this.bonusStatus == null)
            this.div.classList.add(this.bonusStatus);

        map.appendChild(this.div);
    }

    // newStatus --> Status we want to had / removeStatus --> true or false (removing previous status)
    updateStatus(newStatus, removeStatus) {
        if (removeStatus)
            this.div.classList.remove(this.status);

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
let spawnCorner = 4;

class map {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.div = document.querySelector('.map');
    this.cells = [rows];
    this.pirates = []; // contains all the players, used by the bomb to know if the bomb kills players or not according to their position on the map
    this.breakableWalls = 100;
    this.bonusNumber = 80;
    this.bonusTypes = ['speed', 'power-bomb', 'add-bomb'];
}
  generateMap() {
        for (let i = 0; i < this.rows; i++) {
            this.cells[i] = [this.columns];

            for (let j = 0; j < this.columns; j++) {
                //define the cell with status unbreakable depending on their place
                let status = 'empty';
                if (this.isUnbreakable(i, j))
                    status = 'unbreakable';
                //define the cell with status breakable randomly
                let myCell = new cell(i, j, status);
                myCell.createDiv(this.div);
                this.cells[i][j] = myCell;
            }
        }
    }
  generateBreakableWall() {
        for (let k = 0; k < this.breakableWalls; k++) {
            //random x and y while the cell[x][y] is a corner or a unbreakableWall
            do {
                var x = alea(1, this.rows);
                var y = alea(1, this.columns);
                if (this.bonusNumber > 0) {
                    var bonus = Math.round(Math.random());
                    if (bonus === 1) {
                        this.bonusNumber--;
                        var alea_bonus = alea(0, this.bonusTypes.length);
                    }
                }
            } while ( (this.isUnbreakable(x, y)) || (this.isCorner(x, y)) );

            this.cells[x][y].updateStatus('breakable', true);

            if (bonus === 1) {
                this.cells[x][y].bonusStatus = 'undiscovered';
                this.cells[x][y].bonus = this.bonusTypes[alea_bonus];
            }
        }
    }

    //test the cell[x][y] is unbreakable depending on their place
  isUnbreakable(x, y) {
        if (x == 0 || x == this.rows - 1 || y == 0 || y == this.columns - 1) // all the cells around
            return true;
        else
        if (y % 2 == 0 && x % 2 == 0) // one cell / 2
            return true;
        return false;
    }

    //test if the cells[x][y] is a corner case (corner case + or - number of powercase) or not
  isCorner(x, y) {
        //check if the random number give a cell in the corner
        if (x == 1) {
            if (y >= 1 && y <= spawnCorner)
                return true;
            else
            if (y <= this.columns && y >= this.columns - spawnCorner - 1)
                return true;
        }
        if (x == this.rows - 2) {
            if (y >= 1 && y <= spawnCorner)
                return true;
            else
            if (y <= this.columns && y >= this.columns - spawnCorner - 1)
                return true;
        }
        if (y == 1) {
            if (x >= 1 && x <= spawnCorner)
                return true;
            else
            if (x <= this.rows && x >= this.rows - spawnCorner - 1)
                return true;
        }
        if (y == this.columns - 2) {
            if (x >= 1 && x <= spawnCorner)
                return true;
            else
            if (x <= this.rows && y >= this.rows - spawnCorner - 1)
                return true;
        }
        return false;
    }
}

function alea(min, max) {
    return (Math.floor((max - min) * Math.random()) + min);
}

map = new map(13, 17);
//console.log(map.cells);
map.generateMap();
map.generateBreakableWall();
