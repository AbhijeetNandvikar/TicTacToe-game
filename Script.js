// To get values of all html elements and declare variables
const submit = document.getElementById("submit1")
const name1 = document.getElementById("formGroupExampleInput")
const name2 = document.getElementById("formGroupExampleInput2")
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const pchance = document.getElementById("chance")
var gameBackground = document.getElementById("game-background")

var Draw = false ;

var iswin = false ;
var mypara = "X" ;
var p1Wins = 0 // Number of times Player 1 or 2 wins
var p2Wins = 0
var turn = 0 ;

var start = false; // To start game only on entering names of player
var win = false ;  // To run the loop until the game finishes.
var chance = 1 ;
var counter = 0 ; // to count number of turns 

// Declaring a multi dimensional Array
var pos = new Array(3)
for(i=0;i<3;i++){
    pos[i]=new Array ;
}
console.log(pos)

// initializing array
for(i=0;i<3;i++){
    for(j=0;j<3;j++){
        pos[i][j]="Y"
    }
}

// getting all the buttons 
var btn1 =document.getElementById("btn1") 
var btn2 =document.getElementById("btn2") 
var btn3 =document.getElementById("btn3") 
var btn4 =document.getElementById("btn4") 
var btn5 =document.getElementById("btn5") 
var btn6 =document.getElementById("btn6") 
var btn7 =document.getElementById("btn7") 
var btn8 =document.getElementById("btn8") 
var btn9 =document.getElementById("btn9") 

// To Display the names of players on the scoreboard
function displayName(){
    player1.textContent = name1.value ;
    player2.textContent = name2.value ;
    start = true ;
    pchance.textContent = `${name1.value}'s chance` ;
}
function chanceChange(){
    if(chance===1){
        console.log(chance)
        console.log("x")
        // Player 1's Turn 
         pchance.textContent = `${name2.value}'s chance` ;
         chance = 2 ;
         
         return "X" 


    } 
    else{
        console.log(chance)
        console.log("O")
        // Player 2's Turn 
         pchance.textContent = `${name1.value}'s chance`  ;
         chance = 1 ;
         return "O"
    }
}

// reset Game method
function resetGame(){
    var resetButton = document.createElement("button") 
    resetButton.className = "btn-lg"
    var textnode = document.createTextNode("RESET")
    resetButton.appendChild(textnode);  
    gameBackground.appendChild(resetButton)
    
    var mainGame = document.getElementsByClassName("main-game")[0].children
    console.log(mainGame)
    resetButton.addEventListener("click",function(){
        for(i=0;i<9;i++){
            mainGame[i].disabled = false
            mainGame[i].innerHTML = null ;
        }
        gameBackground.removeChild(resetButton)
        pchance.textContent = `Lets play Again`
        // initializing array
        for(i=0;i<3;i++){
            for(j=0;j<3;j++){
                pos[i][j]="Y"
            }
        }       

    })
}

// This is a method to change the score table
function changeScore(p,num){
    var table = document.getElementsByClassName("table")[0].children
    console.log(table)
    if(Draw === false){
        if(p=="p1"){
            table[num].innerHTML = "WIN"
            table[num+1].innerHTML = "LOSE"
        }
        else{
            table[num].innerHTML = "LOSE"
            table[num+1].innerHTML = "WIN"
        }
    }
    // Condition to draw
    else{
        pchance.textContent = `It's a draw`
        table[num].innerHTML = "DRAW"
        table[num+1].innerHTML = "DRAW"

        if(p=="p1"){
            p1Wins = p1Wins - 1
        }
        else{
            p2Wins = p2Wins - 1
        }
        Draw = false // to change draw once match draw is printed 
    }
    
}
// Winning Statement ie. to find which player wins 
function winningStatement(para){
    counter = 0 
    if(para==="X"){
        pchance.textContent = `Congratulations ${name1.value} Wins`  ;
        resetGame() 
        turn = turn + 1 
        p1Wins = p1Wins + 1 // Number of times he wins
        changeScore("p1",turn*2)
        if(turn===4 && p1Wins>p2Wins){
            document.getElementById("result").innerHTML = `${name1.value} Wins`
        }
    }
    else{
        pchance.textContent = `Congratulations ${name2.value} Wins`  ;
        resetGame()
        turn = turn + 1 
        p2Wins = p2Wins + 1 
        changeScore("p2",turn*2)
        if(turn===4 && p2Wins>p1Wins){
            document.getElementById("result").innerHTML = `${name2.value} Wins`
        }
        if(turn===4 && p1Wins>p2Wins){
            document.getElementById("result").innerHTML = `${name2.value} Wins`
        
        }
        if(turn===4 && p1Wins===p2Wins){
            document.getElementById("result").innerHTML = ` Match Draw `

        }
    }
}

//to count number of times we are checking
function Winner(para1){  // here para is parameter used for checking whether its winning or not
    if(counter<5){
        return false ;
    }
    else{
        var pcounter = 0 ; 
        console.log("CHECKING FOR ROWS")
        console.log(pos)
        // To check possibility of winning in rows
        for(i=0;i<3;i++){
            for(j=0;j<3;j++){
                console.log(pos[i][j])
                if(pos[i][j]===para1){
                    console.log(`are equal ${para1}`)
                    pcounter = pcounter + 1
                }
                else{
                    console.log(`are not equal`)
                }
                if(pcounter===3){
                    return true
                }
            }
            pcounter = 0 
            
        }
        var pcounter = 0 ; 
        console.log("CHECKING FOR COLUMNS")
        // To check possibility of winning in columns
        for(j=0;j<3;j++){
            for(i=0;i<3;i++){
                console.log(pos[i][j])
                if(pos[i][j]===para1){
                    console.log(`are equal ${para1}`)
                    pcounter = pcounter + 1
                }
                else{
                    console.log(`are not equal`)
                }
                if(pcounter===3){
                    return true
                }
            }
            pcounter = 0 
            
        }
        pcounter = 0
        // To check diagonally
        for(i=0;i<3;i++){
            if(pos[i][i]===para1){
                pcounter= pcounter+1 
            }
            if(pcounter===3){
                return true 
            }
        }
        //To check diagonally
        if(pos[2][0]===para1 && pos[1][1]===para1 && pos[0][2]===para1){
            return true
        }
        if(counter === 9 ){
            // To print draw condition
            pchance.textContent = `Match Draw`
            Draw = true ;  
            return true 
        }
       
    }
}
var iswin = false ;
var mypara = "X" ;
btn1.addEventListener("click",function(){
    pos[0][0]=chanceChange()
    btn1.disabled = true
    btn1.innerHTML = pos[0][0]
    counter = counter + 1
    mypara = pos[0][0]
    // console.log(mypara) 
    if(Winner(mypara)){
        winningStatement(pos[0][1]) ;
    }
    ;},false)

btn2.addEventListener("click",function(){
    pos[0][1]=chanceChange()
    mypara = pos[0][1]
    btn2.disabled = true
    btn2.innerHTML = pos[0][1]
    counter = counter + 1
    // console.log(mypara)
    
    if(Winner(mypara)){
        winningStatement(pos[0][1]) ;
    }
    ;},false)

btn3.addEventListener("click",function(){
    pos[0][2]=chanceChange()
    mypara = pos[0][2]
    btn3.disabled = true
    btn3.innerHTML = pos[0][2]
    counter = counter + 1
    // console.log(mypara)
    
    if(Winner(mypara)){
        winningStatement(pos[0][2]) ;
    }
    ;},false)

btn4.addEventListener("click",function(){
    pos[1][0]=chanceChange()
    btn4.innerHTML = pos[1][0]
    btn4.disabled = true
    counter = counter + 1
    mypara = pos[1][0]
    
    if(Winner(mypara)){
        winningStatement(pos[1][0]) ;
    }
    ;},false)

btn5.addEventListener("click",function(){
    pos[1][1]=chanceChange()
    btn5.innerHTML = pos[1][1]
    btn5.disabled = true
    counter = counter + 1
    mypara = pos[1][1]
    
    if(Winner(mypara)){
        winningStatement(pos[1][1]) ;
    }
    ;},false)

btn6.addEventListener("click",function(){
    pos[1][2]=chanceChange()
    btn6.innerHTML = pos[1][2]
    btn6.disabled = true
    counter = counter + 1
    mypara = pos[1][2]
    
    if(Winner(mypara)){
        winningStatement(pos[1][2]) ;
    }
    ;},false)

btn7.addEventListener("click",function(){
    pos[2][0]=chanceChange()
    btn7.innerHTML = pos[2][0]
    btn7.disabled = true
    counter = counter + 1
    mypara = pos[2][0]
    
    if(Winner(mypara)){
        winningStatement(pos[2][0]) ;
    }
    ;},false)

btn8.addEventListener("click",function(){
    pos[2][1]=chanceChange()
    btn8.innerHTML = pos[2][1]
    btn8.disabled = true
    counter = counter + 1
    mypara = pos[2][1]
    
    if(Winner(mypara)){
        winningStatement(pos[2][1]) ;
    }
    ;},false)

btn9.addEventListener("click",function(){
    pos[2][2]=chanceChange()
    btn9.innerHTML = pos[2][2]
    btn9.disabled = true
    counter = counter + 1
    mypara = pos[2][2]
    
    if(Winner(mypara)){
        winningStatement(pos[2][2]) ;
    }
    ;},false)


// The main game method
// function game(){
//     if(start === true){
//         console.log("hiii")
//         while(win!=true){
//            if(chance===1){
//                // Player 1's Turn 
//                 pchance.textContent = name1.value ;
//                 chance = 2 ;


//            } 
//            else{
//                // Player 2's Turn 
//                 pchance.textContent = name2.value ;
//                 chance = 1 ;
//            }
//         }
//     }
// }

const btn = document.getElementById("submit2")
btn.addEventListener("click",function(){
    displayName()
    // game()
},false) ;