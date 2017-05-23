// Creation of the AI

class Ai extends Player{
  createPlayer() {
    super.createPlayer(); // keyword "super" is used to call the functions attached to a parent object
    this.goal ;
  }
  setNewGoal() {
  	if(map.cells[parseInt(this.playerPosY/50)][parseInt(this.playerPosX/50)].status == 'dangerous'){
  		console.log('danger');
  	} else {
  		console.log('securite');
  	}
  }

}

fighter = new Ai(3, 100, 100);
fighter.createPlayer();
fighter.setNewGoal();

