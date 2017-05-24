// Creation of the AI

class Ai extends Player{
  createPlayer() {
    super.createPlayer(); // keyword "super" is used to call the functions attached to a parent object
    this.roads = new Array();
    this.roads[0] = new Array(map.cells[parseInt(this.playerPosY/50)][parseInt(this.playerPosX/50)]);
    this.antecedent = new Array();
    this.mode ;
  }
  movePlayer() {
    super.movePlayer();
  }

  getMovePlayer(){
    var that = this ;
    //var _super = super;
    //super.movePlayer();
    window.setInterval(function(){
      console.log(that.playerPosX);
      that.direction = 'right';
      that.movePlayer()
      //console.log(that.div);
      //that.div.style.left = that.playerPosX + "px";
    }, 300);
  }

  setMode() {
    if(map.cells[parseInt(this.playerPosY/50)][parseInt(this.playerPosX/50)].status == 'dangerous'){
      this.mode = 'defense';
    } else {
      this.mode = 'offense'
    }
  }
  getRoads(){
    do{
      let _road = new Array();
      for(let k =0; k<this.roads[this.roads.length-1].length; k++){
        for (let i = this.roads[this.roads.length-1][k].posX-1; i <= this.roads[this.roads.length-1][k].posX+1; i++) { // test on Y
              if (0 < i && i < map.rows) {
                    //don't test for x
                    for (let j = this.roads[this.roads.length-1][k].posY-1; j <= this.roads[this.roads.length-1][k].posY+1; j++) { // test on X
                        if (0 < j && j < map.columns) {
                          // ^ -> OU EXCLUSIF (l'un ou l'autre mais pas les 2) ne pas incluer la case où il se trouve
                            if((i == this.roads[this.roads.length-1][k].posX)^(j == this.roads[this.roads.length-1][k].posY)){
                                if ((map.cells[j][i].status == 'empty')||(map.cells[j][i].status == 'dangerous')) {
                                  _road[_road.length] = map.cells[j][i];

                                  let _antecedent = new Array();
                                  _antecedent[_antecedent.length] = map.cells[j][i];
                                  _antecedent[_antecedent.length] = this.roads[this.roads.length-1][k];
                                  this.antecedent[this.antecedent.length] = _antecedent;
                                  map.cells[j][i].div.classList.add('tested');
                                }
                            }
                        }
                    }
              }
          }       
      }

       this.roads[this.roads.length] = _road;

    } while(this.roads.length<4)
    console.log(this.roads);
    console.log(this.antecedent);

    //} while(!this.reachGoal())
  }
  reachGoal(){
    //let stopCondition = 'player' ;
    //if(this.mode == 'defense')
      let stopCondition = 'empty';
    for(let i=0; i<this.roads[this.roads.length-1].length;i++){
      if(this.roads[this.roads.length-1][i].status == stopCondition){
        return true;
      }
    }
    return false;
  }

}

fighter = new Ai(3, 50, 50);
fighter.createPlayer();
//fighter.setMode();
//ighter.getRoads();


fighter.movement = ['up', 'right', 'down', 'left', 'bomb'];
fighter.sprite = ['avatar_up', 'avatar_right', 'avatar_down', 'avatar_left'];
fighter.getMovePlayer();

