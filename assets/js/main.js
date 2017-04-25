//object cell
var cell = function(posX, posY, status, div) {
    this.posX = posX;
    this.posY = posY;
    this.status = status;
    this.div = div;
    
    this.createDiv = function(map) {
        this.div = document.createElement('div');
        this.div.classList.add('cell') ;
        this.div.classList.add(this.status) ;
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
cell.status = unbrokable --> cell is an unbrokable wall
cell.status = brokable --> cell is an brokable wall

*/

var map = function(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.div = document.querySelector('.map');
    this.cells = [rows];
    
    this.generateMap = function(){
        for(var i = 0; i<rows; i++){
            this.cells[i] = [this.columns];
            for(var j = 0; j<columns; j++){
                var myCell = new cell(i, j, 'unbrokable');
                myCell.createDiv(this.div);
                this.cells[i][j] = myCell;
                console.log(this.cells[i][j]);
            }
        }
    }
}

var map = new map(13,17);
map.generateMap();
console.log(map.cells);

/*

MAP : generateMap (création d’un tableau de cell avec le bon statue (0 : vide, 1 mur incassable )
	drawMap(création des div qui représente les
	generateRandomBonus( bonus : tableau contenant le nombre de bonus)
	numberOfCell
	tableau de cell

*/