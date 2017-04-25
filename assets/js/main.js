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
cell.status = unbreakable --> cell is an unbreakable wall
cell.status = breakable --> cell is an breakable wall

*/

var map = function(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.div = document.querySelector('.map');
    this.cells = [rows];
    
    this.generateMap = function(){
        for(var i = 0; i<this.rows; i++){
            this.cells[i] = [this.columns];
            
            for(var j = 0; j<this.columns; j++){
                //define the cell with status unbreakable depending on their place 
                var status = 'empty';
                if(i==0 || i==this.rows-1 || j==0 || j==this.columns-1)
                    status = 'unbreakable'
                else
                    if(j%2==0 && i%2==0)
                        status = 'unbreakable'

                var myCell = new cell(i, j, status);
                myCell.createDiv(this.div);
                this.cells[i][j] = myCell;
            }
        }
    }
}

var map = new map(13,17);
map.generateMap();
console.log(map.cells);
