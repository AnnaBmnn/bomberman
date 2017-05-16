class Bomb {
    constructor(power, posX, posY, delay, owner, div) {
        this.power = power;
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
        var map = document.querySelector('.map');        
        map.appendChild(this.div);   
    }
    destructingBomb() {
        var coordCellX = parseInt(this.posY / 50),
            coordCellY = parseInt(this.posX / 50);
        // test if the player is around the bomb + if there is some walls to break, according to the power of the bomb
        for (var i = coordCellX - this.power; i <= coordCellX + this.power; i++) {
            if (0 < i && i < map.rows) {
                if (map.cells[i][coordCellY].status == 'breakable') {
                    map.cells[i][coordCellY].updateStatus('empty');
                }
            }
        }
        for (var i = coordCellY - this.power; i <= coordCellY + this.power; i++) {
            if (0 < i && i < map.columns) {
                if (map.cells[coordCellX][i].status == 'breakable') {
                    map.cells[coordCellX][i].updateStatus('empty');
                }
            }
        }

    }
}
