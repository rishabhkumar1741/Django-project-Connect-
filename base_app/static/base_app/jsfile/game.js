const score = document.querySelector(".score");
const game_area = document.querySelector(".game_area");
const start_screen = document.querySelector(".start_screen");

start_screen.addEventListener('click',start);
let keys = {
    ArrowUp :false,
    ArrowLeft:false,
    ArrowDown:false,
    ArrowRight:false

}
let player = { speed:5,score:0};
document.addEventListener('keydown',gamekeydown);
document.addEventListener('keyup',gamekeyup);

function gamekeydown(e)
{
    if (e.key in keys)
    {
        keys[e.key] = true
   
    }
}
function gamekeyup(e)
{
    if (e.key in keys)
    {
        keys[e.key] = false
       
    }
    
}

function iscollide (a,b)
{
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) ||(aRect.left > bRect.right))

}

function movielines()
{
    let lines = document.querySelectorAll('.car_line');
    lines.forEach(function(item){
        item.y += player.speed;
        item.style.top = item.y + "px";
        if(item.y >=700)
        {
            item.y -= 750;
        }
        
    })
}

function end_game()
{
    player.start = false;
    start_screen.classList.remove('hide');
    start_screen.innerHTML = "Game Over <br> Your final score is " + (player.score+1) + " Press here to restart the Game " ;
    a = document.createElement('a');
    a.href = '/';
    a.innerText = "Quit";
    start_screen.appendChild(a);
}


function movecars(car)
{
    let lines = document.querySelectorAll('.enemy_car');
    
    lines.forEach(function(item){
        item.y += player.speed;
        item.style.top = item.y + "px";

        if(iscollide(car,item))
        {
            end_game();
        }
        
        if(item.y >=700)
        {
            item.y = -300;
            item.style.left =Math.floor(Math.random()*350) + "px";
        }
        
    })
}


function gamestart()
{
    let car_position = document.querySelector('.car') ;
    let road = game_area.getBoundingClientRect();

  
    if (player.start)
    {
        movielines();
        movecars(car_position);
        if(keys.ArrowUp && player.y > (road.top +100) )  {  player.y -= player.speed }
        if(keys.ArrowDown && player.y < (road.bottom - 90))  {  player.y += player.speed  }
        if(keys.ArrowLeft && player.x > 0 )  {  player.x -= player.speed  }
        if(keys.ArrowRight && player.x < (road.width - 50))  {  player.x += player.speed  }
        car_position.style.top = player.y + "px";
        car_position.style.left = player.x + "px";
        player.score++;
        score.innerText = "Score"+" "+ player.score


        window.requestAnimationFrame(gamestart); 
        

    }
    
    
    

}
function start(){
    start_screen.classList.add('hide');
  
    game_area.innerHTML = "";

    player.start = true;
    player.score = 0;
    for(i=0 ;i<5;i++)
    {
    let car_line = document.createElement('div');
    car_line.setAttribute('class','car_line');
    car_line.y = (i*150)
    car_line.style.top = car_line.y + "px";
    game_area.appendChild(car_line);
    
    }
    let car = document.createElement('div');
    car.setAttribute('class','car');
    game_area.appendChild(car);


    for(i=0 ;i<3;i++)
    {
    let enemy_car = document.createElement('div');
    enemy_car.setAttribute('class','enemy_car');
    enemy_car.y = ((i+1)*350)*-1;
    enemy_car.style.top = enemy_car.y + "px";
    enemy_car.style.backgroundColor = randomcolour();
    game_area.appendChild(enemy_car);

    enemy_car.style.left =Math.floor(Math.random()*350) + "px";
    
    }


    

    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    window.requestAnimationFrame(gamestart);
    
    
}


function randomcolour()
{
    function c()
    {
        let hex  = Math.floor(Math.random()*256).toString(16);
        return ("0"+String(hex)).substr(-2);
    }
    return "#"+c()+c()+c()
}