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
        
        let coordCellX = parseInt(this.posX/ 50),
            coordCellY = parseInt(this.posY/50);
        
        this.div.style.top = (Math.floor(this.posY / 50) * 50) + "px"; // + 25 to place the bomb at his feet
        this.div.style.left = (Math.floor(this.posX / 50) * 50) + "px"; // + 15 to center the bomb on the player

        let mapDiv = document.querySelector('.map');        
        
        mapDiv.appendChild(this.div); 
        
        // j --> x && i --> y
        // test on up and left
        
        for (let j = coordCellY - this.powerKill; j <= coordCellY; j++) {
            if (j < 0)
                j = 0;
            
            if (0 < j && j < map.rows) {
                for (let i = coordCellX - this.powerKill; i <= coordCellX; i++) {
                    if (i < 0)
                        i = 0;
                    
                    if (0 < i && i < map.columns) {
                        
                        let isBlock = false; // initialise isBlock at false at every loop
                        if (i == coordCellX) {
                            if (map.cells[j][i].status == 'empty' || map.cells[j][i].status == 'bonus') {
                                
                                if (j < coordCellY) {
                                    for (let k = 1; j + k < coordCellY; k++) {
                                        if ( (map.cells[j + k][i].status == 'unbreakable') || (map.cells[j + k][i].status == 'breakable') )
                                            isBlock = true;
                                    }
                                    if (!isBlock) {
                                        if (map.cells[j][i].bonusStatus == 'discovered')
                                            map.cells[j][i].div.classList.add('dangerous');
                                        
                                        else
                                            map.cells[j][i].updateStatus('dangerous', true);
                                    }
                                }
                            }
                        }
                            
                        else if (j == coordCellY) {
                            if (map.cells[j][i].status == 'empty' || map.cells[j][i].status == 'bonus') {
                                if (i < coordCellX) {
                                    for (let k = 1; i + k < coordCellX; k++) {
                                        if ( (map.cells[j][i + k].status == 'unbreakable') || (map.cells[j][i + k].status == 'breakable') )
                                            isBlock = true;
                                    }
                                    if (!isBlock) {
                                        if (map.cells[j][i].bonusStatus == 'discovered')
                                            map.cells[j][i].div.classList.add('dangerous');
                                        
                                        else
                                            map.cells[j][i].updateStatus('dangerous', true);
                                    }
                                }
                            }
                        }
                    }
                } 
            }
        }
        
        // j --> x && i --> y
        // test on right and down
        
        for (let i = coordCellX + this.powerKill; i >= coordCellX; i--) {
            if (i > map.columns - 2)
                i =  map.columns - 2;
        
            if (0 < i && i < map.columns) {
                for (let j = coordCellY + this.powerKill; j >= coordCellY; j--) {
                    if (j > map.rows - 2)
                            j = map.rows - 2;
                    
                    if (0 < j && j < map.rows) {
                        
                        let isBlock = false; // initialise isBlock at false at every loop
                        
                        if ( (i == coordCellX) && (j == coordCellY) ) {
                            if (map.cells[j][i].status == 'empty')
                                map.cells[j][i].updateStatus('dangerous', true);
                            
                        } else if (i == coordCellX) {
                            if (map.cells[j][i].status == 'empty' || map.cells[j][i].status == 'bonus') {
                                
                                if (j > coordCellY) {
                                    for (let k = 1; j - k > coordCellY; k++) {
                                        if ( (map.cells[j - k][i].status == 'unbreakable') || (map.cells[j - k][i].status == 'breakable') )
                                            isBlock = true;
                                    }
                                    if (!isBlock) {
                                        if (map.cells[j][i].bonusStatus == 'discovered')
                                            map.cells[j][i].div.classList.add('dangerous');
                                        
                                        else
                                            map.cells[j][i].updateStatus('dangerous', true);
                                    }
                                }
                            }
                        }
                            
                        else if (j == coordCellY) {
                            if (map.cells[j][i].status == 'empty' || map.cells[j][i].status == 'bonus') {
                                
                                if (i > coordCellX) {
                                    for (let k = 1; i - k > coordCellX; k++) {
                                        if ( (map.cells[j][i - k].status == 'unbreakable') || (map.cells[j][i - k].status == 'breakable') )
                                            isBlock = true;
                                    }
                                    if (!isBlock) {
                                        
                                        if (map.cells[j][i].bonusStatus == 'discovered')
                                            map.cells[j][i].div.classList.add('dangerous');
                                        
                                        else
                                            map.cells[j][i].updateStatus('dangerous', true);
                                    }
                                }
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
        
        // Test on up and left
        let is_unbreakable_i_up = false,
            is_unbreakable_j_left = false;
        
        for (let i = coordCellX ; i >= coordCellX - this.powerKill; i--) {
            if (0 <= i && i < map.rows) {
                
                for (let j = coordCellY; j >= coordCellY - this.powerKill; j--) {
                    if (0 <= j && j < map.columns) {
                        
                        if (i == coordCellX) {
                            
                            if (!is_unbreakable_j_left) {
                                if (map.cells[i][j].status == 'unbreakable')
                                    is_unbreakable_j_left = true;

                                else if (map.cells[i][j].status == 'breakable') {
                                    if (map.cells[i][j].bonusStatus == 'undiscovered') {
                                        map.cells[i][j].updateStatus('bonus', true);
                                        map.cells[i][j].div.classList.add(map.cells[i][j].bonus);
                                        map.cells[i][j].bonusStatus = 'discovered';
                                        is_unbreakable_j_left = true;

                                    } else
                                        map.cells[i][j].updateStatus('empty', true);

                                } else if (map.cells[i][j].bonusStatus == 'discovered') {
                                    map.cells[i][j].updateStatus('empty', true);
                                    map.cells[i][j].div.classList.remove(map.cells[i][j].bonus);
                                    map.cells[i][j].bonusStatus = null;
                                    
                                } else if ((map.cells[i][j].status == 'dangerous') || (map.cells[i][j].div.classList.contains('dangerous')) )
                                    map.cells[i][j].div.classList.add('explosion_left_right');
                            }
                        } else if (j == coordCellY) {
                            if (!is_unbreakable_i_up) {
                                if (map.cells[i][j].status == 'unbreakable')
                                    is_unbreakable_i_up = true;

                                else if (map.cells[i][j].status == 'breakable') {
                                    if (map.cells[i][j].bonusStatus == 'undiscovered') {
                                        map.cells[i][j].updateStatus('bonus', true);
                                        map.cells[i][j].div.classList.add(map.cells[i][j].bonus);
                                        map.cells[i][j].bonusStatus = 'discovered';
                                        is_unbreakable_i_up = true;

                                    } else
                                        map.cells[i][j].updateStatus('empty', true);
                        
                                } else if (map.cells[i][j].bonusStatus == 'discovered') {
                                    map.cells[i][j].updateStatus('empty', true);
                                    map.cells[i][j].div.classList.remove(map.cells[i][j].bonus);
                                    map.cells[i][j].bonusStatus = null;
                                
                                } else if ((map.cells[i][j].status == 'dangerous') || (map.cells[i][j].div.classList.contains('dangerous')) )
                                    map.cells[i][j].div.classList.add('explosion_left_right');
                            }
                        }
                    }
                }  
            }
        }
        
        // Test on down and right
        let is_unbreakable_i_down = false,
            is_unbreakable_j_right = false;
        
        for (let i = coordCellX; i <= coordCellX + this.powerKill; i++) {
            if (0 < i && i < map.rows) {
                
                for (let j = coordCellY; j <= coordCellY + this.powerKill; j++) {
                    if (0 < j && j < map.columns) {
                        
                        if (i == coordCellX) {
                            
                            if (!is_unbreakable_j_right) {
                                if (map.cells[i][j].status == 'unbreakable')
                                    is_unbreakable_j_right = true;
                            
                                else if (map.cells[i][j].status == 'breakable') {
                                    if (map.cells[i][j].bonusStatus == 'undiscovered') {
                                        map.cells[i][j].updateStatus('bonus', true);
                                        map.cells[i][j].div.classList.add(map.cells[i][j].bonus);
                                        map.cells[i][j].bonusStatus = 'discovered';
                                        is_unbreakable_j_right = true;
                            
                                    } else
                                        map.cells[i][j].updateStatus('empty', true);
                        
                                } else if (map.cells[i][j].bonusStatus == 'discovered') {
                                    map.cells[i][j].updateStatus('empty', true);
                                    map.cells[i][j].div.classList.remove(map.cells[i][j].bonus);
                                    map.cells[i][j].bonusStatus = null;
                                    
                                } else if ((map.cells[i][j].status == 'dangerous') || (map.cells[i][j].div.classList.contains('dangerous')) )
                                    map.cells[i][j].div.classList.add('explosion_left_right');
                            }
                        } else if (j == coordCellY) {
                            if (!is_unbreakable_i_down) {
                                if (map.cells[i][j].status == 'unbreakable')
                                    is_unbreakable_i_down = true;
                            
                                else if (map.cells[i][j].status == 'breakable') {
                                    if (map.cells[i][j].bonusStatus == 'undiscovered') {
                                        map.cells[i][j].updateStatus('bonus', true);
                                        map.cells[i][j].div.classList.add(map.cells[i][j].bonus);
                                        map.cells[i][j].bonusStatus = 'discovered';
                                        is_unbreakable_i_down = true;
                            
                                    } else
                                        map.cells[i][j].updateStatus('empty', true);
                        
                                } else if (map.cells[i][j].bonusStatus == 'discovered') {
                                    map.cells[i][j].updateStatus('empty', true);
                                    map.cells[i][j].div.classList.remove(map.cells[i][j].bonus);
                                    map.cells[i][j].bonusStatus = null;
                                
                                } else if ((map.cells[i][j].status == 'dangerous') || (map.cells[i][j].div.classList.contains('dangerous')) )
                                    map.cells[i][j].div.classList.add('explosion_left_right');
                            }
                        }
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
                        if (i == coordCellX || j == coordCellY) {
                            if (map.cells[i][j].status == 'dangerous')
                                map.cells[i][j].updateStatus('empty', true);
                                
                            if ( (map.cells[i][j].div.classList.contains('dangerous')) && (map.cells[i][j].status = 'bonus') )
                                map.cells[i][j].div.classList.remove('dangerous');
                                
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