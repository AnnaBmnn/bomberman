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
var power = 4;

var map = function(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.div = document.querySelector('.map');
    this.cells = [rows];
    this.breakableWalls = 5;
    
    this.generateMap = function(){
        for(var i = 0; i<this.rows; i++){
            this.cells[i] = [this.columns];
            
            for(var j = 0; j<this.columns; j++){
                //define the cell with status unbreakable depending on their place 
                var status = 'empty';
                if(this.isUnbreakable(i,j))
                    status = 'unbreakable'
                //define the cell with status breakable randomly         
                var myCell = new cell(i, j, status);
                myCell.createDiv(this.div);
                this.cells[i][j] = myCell;
            }
        }
    }
    this.generateBreakableWall = function(){
        for(var k=0 ; k<this.breakableWalls ; k++){
            //random x and y while the cell[x][y] is a corner or a unbreakableWall
            do {
                var x = alea(1, this.rows);
                var y = alea(1, this.columns);
                console.log('k='+ k + ' x=' + x + ' y='+ y + ' isUnbreakable='+ this.isUnbreakable(x,y) + 'isCorner=' + this.isCorner(x,y));
            } while(this.isUnbreakable(x,y) || this.isCorner(x,y) )
            this.cells[x][y].updateStatus('breakable');
        }
    }
    
    //test the cell[x][y] is unbreakable depending on their place 
    this.isUnbreakable = function(x,y){
        if(x==0 || x==this.rows-1 || y==0 || y==this.columns-1)
            return true;
        else
            if(y%2==0 && x%2==0)
                return true;;
        return false;
    }
    
    //test if the cells[x][y] is a corner case (corner case + or - number of powercase) or not
    this.isCorner = function(x,y){
        //check if the random number give a cell in the corner
        if(x==1){
            if(y>=1 && y<= power)
                return true;
            else 
                if(y<=this.columns && y>=this.columns-power-1)
                    return true;            
        }
        if(x==this.rows-2){
            if(y>=1 && y<= power)
                return true;
            else 
                if(y<=this.columns && y>=this.columns-power-1)
                    return true;
        }
        if(y==1){
            if(x>=1 && x<= power)
                return true;
            else 
                if(x<=this.rows && x>=this.rows-power-1)
                    return true;           
        }
        if(y==this.columns-2){
            if(x>=1 && x<= power)
                return true;
            else 
                if(x<=this.rows && y>=this.rows-power-1)
                    return true;
        }
       return false; 
    }
}

function alea(min, max){
    return (Math.floor((max-min)*Math.random())+min); 
}
    
var map = new map(13,17);
map.generateMap();
map.generateBreakableWall();

