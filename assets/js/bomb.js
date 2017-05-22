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
        this.div.style.top = this.posY + 13 + "px"; // + 13 to place the bomb at his feet
        this.div.style.left = this.posX + 13 + "px";
        let map = document.querySelector('.map');        
        map.appendChild(this.div); 
    }
    destructingBomb() {
        console.log(this.posY);
        console.log(parseInt(this.posY / 50));
        console.log(this.posX);
        console.log(parseInt(this.posX / 50));
        let coordCellX = parseInt(this.posY / 50),
            coordCellY = parseInt(this.posX / 50);
        // test if the player is around the bomb + if there is some walls to break, according to the powerKill of the bomb
        if ( (map.cells[coordCellX - 1][coordCellY].status !== 'unbreakable') || (map.cells[coordCellX + 1][coordCellY].status !== 'unbreakable') ) { // prevent breakable cells to be destruct if they are behind unbreakable cell
            for (let i = coordCellX - this.powerDestruct; i <= coordCellX + this.powerDestruct; i++) {
                if (0 < i && i < map.rows) {
                    if (map.cells[i][coordCellY].status == 'breakable') {
                        if (map.cells[i][coordCellY].secondary_status == 'bonus')
                        {
                            map.cells[i][coordCellY].updateStatus('bonus_', true);
                        } else
                            map.cells[i][coordCellY].updateStatus('empty', true);
                    }
                }
            }
        }
        if ( (map.cells[coordCellY - 1][coordCellX].status !== 'unbreakable') || (map.cells[coordCellY + 1][coordCellX].status !== 'unbreakable') ) {
            for (let i = coordCellY - this.powerDestruct; i <= coordCellY + this.powerDestruct; i++) { // test on X
                if (0 < i && i < map.columns) {
                    if (map.cells[coordCellX][i].status == 'breakable') {
                        if (map.cells[coordCellX][i].secondary_status == 'bonus')
                        {
                            map.cells[coordCellX][i].updateStatus('bonus_', true);
                        } else
                            map.cells[coordCellX][i].updateStatus('empty', true);
                    }
                }
            }
        }
        this.div.classList.remove('bomb');  
    }
    killingBomb() {
        let coordCellX = parseInt(this.posY / 50),
            coordCellY = parseInt(this.posX / 50);

        // testing if some players are around
        for (let i = coordCellX - this.powerKill; i <= coordCellX + this.powerKill; i++) { // test on Y
            if (0 < i && i < map.rows) {
                for (let j = 0; j < map.pirates.length; j++) {
                    if (map.cells[i][coordCellX].posY === parseInt(map.pirates[j].playerPosY/50) && map.cells[i][coordCellY].posX === parseInt(map.pirates[j].playerPosX/50)) {
                        map.pirates[j].playerLives -= 1;
                        return true;
                        //don't test for x
                    }
                }
            }
        }

        for (let i = coordCellY - this.powerKill; i <= coordCellY + this.powerKill; i++) { // test on X
            if (0 < i && i < map.columns) {
                for (let j = 0; j < map.pirates.length; j++) {
                    if (map.cells[coordCellY][i].posX === parseInt(map.pirates[j].playerPosX/50) && map.cells[coordCellX][i].posY === parseInt(map.pirates[j].playerPosY/50)) {
                        map.pirates[j].playerLives -= 1;
                    }
                }
            }
        }

    }
}
