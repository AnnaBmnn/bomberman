// Creation of the AI

class Ai extends Player{
  createPlayer() {
    super.createPlayer(); // keyword "super" is used to call the functions attached to a parent object
    this.roads = new Array();
    this.cell = map.cells[parseInt(this.playerPosY/50)][parseInt(this.playerPosX/50)];
    this.nextCell = this.cell;
    this.roads[0] = new Array(map.cells[parseInt(this.playerPosY/50)][parseInt(this.playerPosX/50)]);
    this.antecedent = new Array();
    this.direction = '';
    this.mode ;
  }
  movePlayer() {
    super.movePlayer();
  }
  alea(max){
    return Math.round(Math.random()*max);
  }
  getNewDirection(){
    var cellsPossibilities = new Array();
    for(let i = this.nextCell.posX -1 ; i<= this.nextCell.posX+ 1; i ++){
      if (0 < i && i < map.rows) {
        for(let j = this.nextCell.posY -1 ; j <= this.nextCell.posY + 1 ; j++){
          if (0 < j && j < map.columns) {
            //we don't test for the case where the player is
            if((i == this.nextCell.posX)^(j == this.nextCell.posY)){
              //we don't test for the case where the player was
              if((map.cells[i][j]!== this.cell)){
                if(map.cells[i][j].status == 'empty'||map.cells[i][j].status == 'bonus')
                  cellsPossibilities[cellsPossibilities.length] = map.cells[i][j];
              }
            }
          }
        }
      }
    }
    if(this.direction == 'bomb') {
      // we come back to the previous case
      let _cell = this.nextCell;
      this.nextCell = this.cell;
      this.cell = _cell;

      //we set new direction
      if(this.cell.posX+1 == this.nextCell.posX)
        this.direction = 'down';
      if(this.cell.posX-1 == this.nextCell.posX)
        this.direction = 'up';
      if(this.cell.posY-1 == this.nextCell.posY)
        this.direction = 'left';
      if(this.cell.posY+1 == this.nextCell.posY)
        this.direction = 'right';
    }else {
      //if the player is stuck, launch bomb
      if(cellsPossibilities.length == 0){
        this.direction = 'bomb';
      }
      else {
        this.cell = this.nextCell;
        //find new case randomly among the empty case around (empty case around stuck in the cellsPossibilies)
        this.nextCell = cellsPossibilities[this.alea(cellsPossibilities.length-1)];
        if(this.cell.posX+1 == this.nextCell.posX)
          this.direction = 'down';
        if(this.cell.posX-1 == this.nextCell.posX)
          this.direction = 'up';
        if(this.cell.posY-1 == this.nextCell.posY)
          this.direction = 'left';
        if(this.cell.posY+1 == this.nextCell.posY)
          this.direction = 'right';
      }
    }


  }

  getMovePlayer(){
    var that = this ;
    window.setInterval(function(){

      that.movePlayer() ;
      let _posX,
          _posY;

      if( that.direction == 'up'){
        _posX = Math.floor((that.playerPosX) / 50);
        _posY = Math.floor((that.playerPosY + 40) / 50);
      } else {
        if( that.direction == 'right'){
          _posX = Math.floor((that.playerPosX ) / 50);
          _posY = Math.floor((that.playerPosY ) / 50);

        } else {
          if( that.direction == 'down'){
            _posX = Math.floor((that.playerPosX) / 50);
            _posY = Math.floor((that.playerPosY ) / 50);
          } else {
            if( that.direction == 'left'){

              _posX = Math.floor((that.playerPosX + 40 ) / 50);
              _posY = Math.floor((that.playerPosY) / 50);
              console.log(_posX, _posY);
            } else {
              _posX = parseInt((that.playerPosX)/50);
              _posY = parseInt((that.playerPosY)/50);
            }
          }
        }
      }
      if(_posX ==that.nextCell.posY&&_posY==that.nextCell.posX){
        console.log(_posX, _posY);
        that.getNewDirection();
      }

    }, 200);
  }
}

fighter = new Ai(3, 50, 50);
fighter.createPlayer();
//fighter.setMode();
//ighter.getRoads();
fighter.movement = ['up', 'right', 'down', 'left', 'bomb'];
fighter.sprite = ['fighter_up', 'fighter_right', 'fighter_down', 'fighter_left'];
fighter.getMovePlayer();
