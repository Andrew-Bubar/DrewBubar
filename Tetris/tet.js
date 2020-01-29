console.log("testing 123123");
//defining the canvas
const canvas = document.getElementById('tetr');
const context = canvas.getContext('2d');

//scaling up
context.scale(20,20);


//make the matrix
const matrix = [

    [0,0,0],
    [1,1,1],
    [0,1,0],
];

function col(arena, player){

    const [m, o] = [player.matrix, player.pos];

    for(let y = 0; y < m.length; ++y ){

        for(let x = 0; x < m[y].length; ++x ){

            if(m[y][x] != 0 &&
                arena[y + o.y] &&
                arena[y + o.y][x + o.y] != 0){

                    return true;
                }
        }
    }
    return false;
}

function makeMatrix(w, h){

    const matrix = [];

    while(h--){

        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

//easy way to draw
function draw(){

    //test the canvas
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width,canvas.height);

    dm(player.matrix, player.pos);
}

//use the matrix
function dm(matrix, offset) {

    matrix.forEach((row,y) => {

        row.forEach((value,x) =>{

            if(value != 0){

                context.fillStyle = 'purple';
                context.fillRect(x + offset.x, 
                                 y + offset.y, 
                                 1, 1);
            }
        });
    });
}

function merge(arena, player){

    player.matrix.forEach((row, y) => {

        row.forEach((value, x) => {

            if(value != 0){

                arena[y+player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

        //game vars

//drop vars
let dCount = 0;
let dInt = 1000;
//time vars
let lastTime = 0;

function pdrop(){

    //move down
    player.pos.y++;

    //if player is on ground
    if(col(arena, player)){

        console.log('going up: ' + player.pos.y);

        player.pos.y--;
        merge(arena, player);
        player.pos.y = 0;
    }
    dCount = 0;
}

//game loop
function update(time = 0){

    //time
    const dTime = time - lastTime;
    lastTime = time;
    
    //dropper stuff
    dCount += dTime;
    if(dCount > dInt){

        pdrop();
    }

    draw();
    requestAnimationFrame(update);
}

//matrix stuff
const arena = makeMatrix(12,40);

//player controls
const player = {
    pos: {x: 5, y: 5},
    matrix: matrix,
}

//input
document.addEventListener('keydown', event =>{

    //if left arrow
    if(event.keyCode == 37){
        //move left
        player.pos.x--;
    }

    //if right arrow
    if(event.keyCode == 39){
        //move right
        player.pos.x++;
    }

     //if down arrow
    if(event.keyCode == 40){
        pdrop();
    }
});

update();