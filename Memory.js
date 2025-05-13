LevelsRowColumn = [[2,2],[2,3],[4,4],[5,6]]
NumberOFCards = [-1, 6, 16, 30]
Gototutor = ["Привет, пользователь, нажмите на любую из предложенных карт",
    "Попробуйте таким же способом найти такую же карту, как и эта", 
    "Молодец, вы нашли совпадение, продолжай в том же духе, кликая оставшиеся карты", 
    "Карты не совпали, но попробуйте выбрать две другие", 
    "Умничка, ты все открыл, можешь переходить на первый уровень!"]

NumHeart =[-1,5,10,15]

buttons = document.querySelectorAll(".purple")
BlockLevel()

async function EntranceINliders(){
    exit = document.getElementById("start")
    entrance = document.getElementById("liders")
    exit.style.display = "none"
    entrance.style.display = "flex"
    https = "http://127.0.0.1:5000/Liders"
    get_responce = await fetch(https)
    data = await get_responce.json()
    console.log(data.liders)
    data = data.liders
    liderTbl = document.getElementById("lidersTable")
    for(i=0; i<data.length; i++){
        divka = document.createElement("div")
        divka.classList.add("LidersRow")
        liderTbl.appendChild(divka)
        div1= document.createElement("div")
        div2 = document.createElement("div")
        divka.appendChild(div1)
        divka.appendChild(div2)
        div1.innerHTML = data[i][1]
        div2.innerHTML = data[i][0]
    console.log(data.length)
    }

}

async function BlockLevel(){
    user = localStorage.getItem("Name")
    console.log(user)
    https = "http://127.0.0.1:5000/GetUserData?Name=" + user
    get_responce = await fetch(https)
    data = await get_responce.json()
    two = document.getElementById("Two")
    three = document.getElementById("Three")
    data = data.data
    if(!data){
        two.classList.add("blockedButton")
        three.classList.add("blockedButton")
        console.log(data + 'meow')
        localStorage.setItem("UserLvl","0,0,0,0")
    }
    else{
        console.log(data + "2 else")
        localStorage.setItem("UserLvl",data)
        k = [NumberOFCards[1]*10, NumberOFCards[2]*10, NumberOFCards[3]*10]
        point = [NumHeart[1]*NumHeart[1]*k[0], NumHeart[2]*NumHeart[2]*k[1], NumHeart[3]*NumHeart[3]*k[2]]
    if(data[1]<=point[0]*0.5 && data[2]==0 && data[3]==0){
        two.classList.add("blockedButton")
        three.classList.add("blockedButton")
    }
    else if(data[2]<=point[1]*0.5 && data[1]>point[0]*0.5 && data[3]==0){
        three.classList.add("blockedButton")
        two.classList.remove("blockedButton")
        console.log("2.0")
    }
    else if(data[2]>point[1]*0.5){
        three.classList.remove("blockedButton")
    }
}
}

async function EntranceINLevel(numlevel){
    hearts = document.getElementById("liveHeart")
    lastLvl = localStorage.getItem("UserLvl")
    NumOFHeart = NumHeart[numlevel]
    if(hearts!=NumOFHeart && numlevel!=0){
        console.log(lastLvl + "if ")
        lastLvl = lastLvl.split(",")
        lastLvl = [Number(lastLvl[0]),Number(lastLvl[1]),Number(lastLvl[2]),Number(lastLvl[3])]
        lastLvl = lastLvl[numlevel-1]
        k = NumberOFCards[numlevel-1]*10
        point = NumHeart[numlevel-1]*NumHeart[numlevel-1]*k
        console.log(lastLvl, point, NumHeart)
        if(lastLvl==point){
            NumOFHeart += 2
            console.log(NumOFHeart)
        }
        for(i=0; i<NumOFHeart; i++){ 
        span = document.createElement("span")
        span.classList.add("material-symbols-outlined")
        span.classList.add("heart")
        span.innerHTML = "favorite"
        hearts.appendChild(span)
    }}
    localStorage.setItem("level", numlevel)
    https = "http://127.0.0.1:5000/getImg?NumLevel=" + numlevel
    get_responce = await fetch(https)
    data = await get_responce.json()
    if (get_responce){
        RenderImg(data, numlevel)
    }
    exit = document.getElementById("start")
    entrance = document.getElementById("game")
    exit.style.display = "none"
    entrance.style.display = "flex"
    
}


async function Reset(){
    butChange = document.getElementById("Change")
    butChange.style.display = "block"
    rows = document.querySelectorAll(".RowCard")
    for(i=0; i<rows.length; i++){
        rows[i].remove()
    }
    hearts = document.getElementById("liveHeart")
    spanchik = hearts.querySelectorAll('span').length
    spans = hearts.querySelectorAll('span')
    for(i=0; i<spanchik; i++){
        spans[i].remove()
    }
    numlevel = localStorage.getItem("level")
    drim = 0
    await EntranceINLevel(numlevel)
}


function RenderImg(data, numlevel){
    data = data.cards
    f = 0
    field = document.getElementById("fieldGame")
    Rows = LevelsRowColumn[numlevel][0]
    Column = LevelsRowColumn[numlevel][1]
    for(a=0; a<Rows; a++){
        Divs = document.createElement("div")
        Divs.classList.add("RowCard")
        for(i=0; i<Column; i++){
            img = document.createElement("img")
            img.src = "img/Obloshka.png"
            img.dataset.image = "img/" + data[f]
//"img/" + data[f]
            img.classList.add("smallCards")
            img.addEventListener("click", flipTHEcard)
            Divs.appendChild(img)
            f = f + 1 
        }
        field.appendChild(Divs)
    } 

}


drim = 0
function Check(){
    flipedCards = document.querySelectorAll(".smallCards.flipCard")
    numlevel = localStorage.getItem("level")
    if(numlevel==0){
    divka = document.querySelector(".DIVlearn")}
    if(flipedCards.length==2 && flipedCards[0].src==flipedCards[1].src){
        setTimeout(()=>{
        flipedCards[0].style.visibility = "hidden"
        flipedCards[1].style.visibility = "hidden"
        flipedCards[0].classList.remove("flipCard")
        flipedCards[1].classList.remove("flipCard")
        GameEnd()}, 200
        
    )
    }
    else if (flipedCards.length>=2){
        setTimeout(()=>{
            for(i=0; i<flipedCards.length;i++){
                flipedCards[i].src =  "img/Obloshka.png"
                flipedCards[i].classList.remove("flipCard") 
        }}, 200)
        
        hearts = document.getElementById("liveHeart")
        
        if(drim!= NumHeart[numlevel]){
            console.log(drim)
        drim = drim + 1
        children = hearts.children
        children[0].remove()
        }
        else{
            alert("У вас закончились жизни, обновляем!")
            Reset()
        }
        if(numlevel==0){
        divka.innerHTML = Gototutor[3]
        divka.style.left = "40px"
        }
    }
    else if(flipedCards.length==1 && numlevel==0){
        divka.innerHTML = Gototutor[1]
        divka.style.left = "1200px"
        divka.style.top = "500px"
    }
}
function GameEnd(){
    AllCards = document.querySelectorAll(".smallCards")
    numCardsHid = 0
    numlevel = localStorage.getItem("level")
    if(numlevel==0){
        divka = document.querySelector(".DIVlearn")
    }
    for(i=0; i<AllCards.length;i++){
        if (AllCards[i].style.visibility=="hidden"){
            numCardsHid = numCardsHid + 1
        }
    }
    if (numCardsHid==AllCards.length){ 
        if(numlevel!=0){
            User = localStorage.getItem("Name")
            k = NumberOFCards[numlevel]*10
            point = NumHeart[numlevel]*NumHeart[numlevel]*k - drim*NumHeart[numlevel]*k
            IDpoint = document.getElementById("points")
            entranc = document.getElementById("dark")
            entranc.style.display = "flex"
            entrance = document.getElementById("win")
            entrance.style.display = "flex"
            IDpoint.innerHTML = point
            if (User){
            NamUser = document.getElementById("NameUser")
            NamUser.innerHTML = User + ","}
            else if (!User){
                butChange = document.getElementById("Change")
                butChange.style.display = "none"
                Input = document.createElement("input")
                Input.classList.add("inputPharameters")
                Input.type = 'text'
                Input.placeholder = "Напиши свое имя"
                Div = document.getElementById("nameSet")
                Div.appendChild(Input)
            }
        }
        else{    
        divka.innerHTML = Gototutor[4]
        divka.style.left = "40px"
        setTimeout(ExitTOmenu, 2000)
        
        }
        drim = 0
    }
    else if(numlevel==0){
        divka.innerHTML = Gototutor[2]
        divka.style.left = "40px"
    }
}
function Tutorial(){
    divka = document.createElement("div")
    divka.classList.add("DIVlearn")
    game = document.getElementById("game")
    game.appendChild(divka)
    divka.innerHTML = Gototutor[0]
    EntranceINLevel(0)
}

async function ChangeName(){
    Div = document.getElementById("nameSet")
if (!Div.innerHTML){
    butChange = document.getElementById("Change")
    butChange.style.display = "none"
    Input = document.createElement("input")
    Input.classList.add("inputPharameters")
    Input.type = 'text'
    Input.placeholder = "Напиши свое имя" 
    Div.appendChild(Input)
}
}
async function SaveResult(){
    Input = 0
    LastName = ''
    numLevel = localStorage.getItem("level")
    User = localStorage.getItem("Name")
    IDpoint = document.getElementById("points")
    point = IDpoint.innerHTML
    Divka = document.getElementById("nameSet")
    if (!User){
        Input = Divka.children[0]
        localStorage.setItem("Name", Input.value)
        User = Input.value
        LastName = Input.value
        }
    if (User){
        if(!Divka.innerHTML){
            LastName = User
        }
        else if(Divka.innerHTML && !LastName){
            LastName = User
            Input = Divka.children[0]
            User = Input.value
            localStorage.setItem("Name", Input.value)
        }
        console.log(LastName, User)
        https = https = "http://127.0.0.1:5000/SavePoints" 
        post_response = await fetch(https, {
        method:"POST",
        body: JSON.stringify({"NewName": User,
            "LastName": LastName,
            "Point": point,
            "Level": numLevel}),
        headers:{
            "Content-Type": "application/json"
        }})
    answer = await post_response.json
    if(Input){
        Input.remove()}
    alert("Ваш результат сохранен")
    CloseWindow()
}
}
function CloseWindow(){
    entranc = document.getElementById("dark")
    entranc.style.display = "none"
    entrance = document.getElementById("win")
    entrance.style.display = "none"
    Divka = document.getElementById("nameSet")
    Input = Divka.children[0]
    if (Input){
        Input.remove()
}
}
function flipTHEcard(){
    this.classList.add("flipCard")
    this.src = this.dataset.image
    Check()
}
function ExitTOmenu(){
    rows = document.querySelectorAll(".RowCard")
    for(i=0; i<rows.length; i++){
        rows[i].remove()
    }
    divka = document.querySelector(".DIVlearn")
    if(divka){
        divka.remove()
    }
    hearts = document.getElementById("liveHeart")
    spanchik = hearts.querySelectorAll('span').length
    spans = hearts.querySelectorAll('span')
    for(i=0; i<spanchik; i++){
        spans[i].remove()
    }
    butChange = document.getElementById("Change")
    butChange.style.display = "block"
    BlockLevel()
    exit = document.getElementById("game")
    entrance = document.getElementById("start")
    exit.style.display = "none"
    entrance.style.display = "flex"
    drim = 0
}
function EntranceINrule(idishka){
    localStorage.setItem("entrs", idishka)
    // если можно, то можно
    exit = document.getElementById(idishka)
    entrance = document.getElementById("rule")
    exit.style.display = "none"
    entrance.style.display = "flex" 
}

function ExitFromRule(){
    idishka = localStorage.getItem("entrs")
    exit = document.getElementById("rule")
    entrance = document.getElementById(idishka)
    exit.style.display = "none"
    entrance.style.display = "flex"
}

function ExitFromLiders(){
    exit = document.getElementById("liders")
    entrance = document.getElementById("start")
    exit.style.display = "none"
    entrance.style.display = "flex"
    liderTbl= document.getElementById("lidersTable")
    child = liderTbl.children
    
    console.log(child.length)
    while(child.length>1){
        child[1].remove()
    }
}