// Creation of the AI

class Ai extends Player{
  createPlayer() {
    super.createPlayer(); // keyword "super" is used to call the functions attached to a parent object
    this.bombKill = 14
    console.log(this.bombKill + ' AI'); // juste un test pour voir si ca marche
  }
}

fighter = new Ai(3, 100, 100);
fighter.createPlayer();
