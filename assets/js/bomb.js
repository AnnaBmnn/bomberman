class Bomb {
    constructor(powerKill, posX, posY, delay, owner, div) {
        this.powerDestruct = 1; // number of cells that can be destructed, always one
        this.powerKill = powerKill; // power range to kill players around
        this.delay = delay;
        this.posX = posX;
        this.posY = posY;
        this.owner = owner;
        this.div = div;
    }
    
    launchBomb() {
        this.div = document.createElement('div');
        this.div.classList.add('bomb');
        this.div.style.top = this.posY + "px"; // + 13 to place the bomb at his feet
        this.div.style.left = this.posX + "px";

        let mapDiv = document.querySelector('.map');        
        mapDiv.appendChild(this.div); 
        let coordCellX = parseInt(this.posX/ 50),
            coordCellY = parseInt(this.posY/50);

        for (let i = coordCellX - this.powerKill; i <= coordCellX + this.powerKill; i++) { // test on Y

            if (0 < i && i < map.rows) {
                    //don't test for x
                    for (let j = coordCellY - this.powerKill; j <= coordCellY + this.powerKill; j++) { // test on X
                        if (0 < j && j < map.columns) {
                            if (i== coordCellX || j==coordCellY){
                                if (map.cells[j][i].status == 'empty') {
                                    map.cells[j][i].updateStatus('dangerous', true);
                                }
                            }

                        }
                    }
            }
        }
    }
    
    destructingBomb() {
        let coordCellX = parseInt(this.posY / 50),
            coordCellY = parseInt(this.posX / 50);
        // test if the player is around the bomb + if there is some walls to break, according to the powerKill of the bomb
        if ( (map.cells[coordCellX - 1][coordCellY].status !== 'unbreakable') || (map.cells[coordCellX + 1][coordCellY].status !== 'unbreakable') ) { // prevent breakable cells to be destruct if they are behind unbreakable cell
            for (let i = coordCellX - this.powerDestruct; i <= coordCellX + this.powerDestruct; i++) {
                if (0 < i && i < map.rows) {
                    if (map.cells[i][coordCellY].status == 'breakable') {
                        if (map.cells[i][coordCellY].bonusStatus == 'undiscovered') {
                            map.cells[i][coordCellY].updateStatus('bonus', true);
                            map.cells[i][coordCellY].div.classList.add(map.cells[i][coordCellY].bonus);
                            map.cells[i][coordCellY].bonusStatus = 'discovered';
                            
                        } else
                            map.cells[i][coordCellY].updateStatus('empty', true);
                        
                    } else if (map.cells[i][coordCellY].bonusStatus == 'discovered') {
                        map.cells[i][coordCellY].updateStatus('empty', true);
                        map.cells[i][coordCellY].div.classList.remove(map.cells[i][coordCellY].bonus);
                        map.cells[i][coordCellY].bonusStatus = null;
                    }
                }
            }
        }
        if ( (map.cells[coordCellY - 1][coordCellX].status !== 'unbreakable') || (map.cells[coordCellY + 1][coordCellX].status !== 'unbreakable') ) {
            for (let i = coordCellY - this.powerDestruct; i <= coordCellY + this.powerDestruct; i++) { // test on X
                if (0 < i && i < map.columns) {
                    if (map.cells[coordCellX][i].status == 'breakable') {
                        if (map.cells[coordCellX][i].bonusStatus == 'undiscovered') {
                            map.cells[coordCellX][i].updateStatus('bonus', true);
                            map.cells[coordCellX][i].div.classList.add(map.cells[coordCellX][i].bonus);
                            map.cells[coordCellX][i].bonusStatus = 'discovered';
                            
                        } else
                            map.cells[coordCellX][i].updateStatus('empty', true);
                        
                    } else if (map.cells[coordCellX][i].bonusStatus == 'discovered') {
                        map.cells[coordCellX][i].updateStatus('empty', true);
                        map.cells[coordCellX][i].div.classList.remove(map.cells[coordCellX][i].bonus);
                        map.cells[coordCellX][i].bonusStatus = null;
                    }
                }
            }
        }
        this.div.classList.remove('bomb');  
    }
    
    killingBomb() {
        let coordCellX = parseInt(this.posY / 50),
            coordCellY = parseInt(this.posX / 50);

        for (let i = coordCellX - this.powerKill; i <= coordCellX + this.powerKill; i++) { // test on Y

            if (0 < i && i < map.rows) {
                for (let j = coordCellY - this.powerKill; j <= coordCellY + this.powerKill; j++) { // test on X
                    if (0 < j && j < map.columns) {
                        if (i == coordCellX || j == coordCellY){
                            if (map.cells[i][j].status == 'dangerous')
                                map.cells[i][j].updateStatus('empty', true);
                            for (let k = 0; k < map.pirates.length; k++) {
                                if (map.cells[i][j].posY === parseInt(map.pirates[k].playerPosY/50) && map.cells[i][j].posX === parseInt(map.pirates[k].playerPosX/50)) {
                                    map.pirates[k].playerLives -= 1;
                                }
                            }

                        }

                    }
                }
            }
        }
    }
}
