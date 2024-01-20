let toDoEl = document.getElementById("toDo")//Accessing the html element having id of toDo
let listElements = []//Creating an empty array
let toDoList = document.querySelector(".list")//when we use query selector we 
let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$"

function getRandomId(){
    //generating random alphaNumeric id for each object

    let pass = ""
    for(let i = 0;i < 8;i++){
        let randomNumber = Math.floor(Math.random() * 65)//generating an id having a length of 8 characters
        pass+=alphabets[randomNumber]
    }
    return pass //whenever getRandomId is called out we need something as output to be assigned
}


function addTask(){
    //initializing an object named 'data' everytime

    let data = {
        text : "",
        id : getRandomId(),//assigning a random Id 
        check : false
    }
    if(toDoEl.value.length > 0){
        newToDoItem(data)//passing the data to the function so that it can be accessible
        listElements.push(data) //pushing each object into our Array listElements
    }
    
    toDoEl.value = "" //After the div is created we will delete whatever is written by us in input toDo
}

function newToDoItem(data){//for creation of new list item
    data.text = toDoEl.value //setting the property text in Data object to what we typed in our input 'toDo'
    let mainDiv = document.createElement("div")//creating a parent div
    
    
    let check = document.createElement("input")//creating an input and setting its attribute to a checkbox..
    check.setAttribute("type","checkbox")
    
    
    let toDoItem = document.createElement("div")//creating another div which holds are list item text
    let btn = document.createElement("button")

    //btn === Remove button
    btn.addEventListener("click" , (e) => {//here e is an event that is passed because we want to access it
        let task = e.target.previousElementSibling.textContent//In our mainDiv we have order as checkbox-text-removeButton
        for (let i=0; i<listElements.length; i++) {
            listElements = listElements.filter((item) => item.text !== task)//finding the element and filter it out so that our remaining array is not having that object basically its deleted
            break//as soon as we get the object to be deleted we just stop
        }
        e.target.parentElement.remove()//removing its parentElement ie mainDiv..
    })

    check.style.cssText = "width:20px;height:20px;background-color:black;"
    check.addEventListener('click', (e) => checked(e))

    //Appending the checkbox->text item->remove button
    mainDiv.appendChild(check)
    mainDiv.appendChild(toDoItem)
    mainDiv.appendChild(btn)


    btn.innerText = "Remove"//labelling the button
    
    //styling our remove button
    btn.style.cssText = "width: 9rem;border:none; height: 6vh; border-radius:8px;cursor:pointer;font-size:1.4rem;font-weight:bold;background:white;color:black"
    
    //aligning the checkbox,div,button using css
    mainDiv.style.cssText = "display:flex;justify-content:center;align-items : center;gap:10rem;width:100%"
    
    //when the mouse is hovered what happens?
    btn.addEventListener("mouseover", () => {
        btn.style.cssText = "width: 9rem;border:2px solid white; height: 6vh; border-radius:8px;cursor:pointer;font-size:1.4rem;font-weight:bold;background:black;color:white;transform:scale(0.99);transition:0.2s ease"
    })

    //when mouse is removed..
    btn.addEventListener("mouseout", () => {
        btn.style.cssText = "width: 9rem;border:none; height: 6vh; border-radius:8px;cursor:pointer;font-size:1.4rem;font-weight:bold;background:white;color:black;transform:scale(0.99);transition:0.2s ease"
    })

    //when button is clicked styling?
    // btn.addEventListener("click", () => {
    //     btn.style.cssText= "width: 9rem;border:2px solid white; height: 6vh; border-radius:8px;cursor:pointer;font-size:1.4rem;font-weight:bold;background:black;color:white;"
    // })


    //styling our text in our list item
    toDoItem.style.cssText = "color: black ;background-color : white; padding:10px;font-size:1.6rem; border-radius : 7px; width : 50%; height : 6vh; display:flex; justify-content : start; align-items : center; text-indent : 10px "                                                      
    let toDoText = document.createTextNode(toDoEl.value)
    toDoItem.appendChild(toDoText)

    toDoList.appendChild(mainDiv)
    //toDoText is appended in toDoItem,which is then appended in our toDoList, and it is added to our mainDiv which is shown up on our Browser
}

function checked(e){
    // get task content

    const style1 = "color: grey ;background-color : #e3e2de;text-decoration: line-through;text-decoration-color:grey; padding:10px;font-size:1.6rem; border-radius : 7px; width : 50%; height : 6vh; display:flex; justify-content : start; align-items : center; text-indent : 10px;"
    const style2 = "color: black ;background-color : white; padding:10px;font-size:1.6rem; border-radius : 7px; width : 50%; height : 6vh; display:flex; justify-content : start; align-items : center; text-indent : 10px "
   
    let task = e.target.nextElementSibling.textContent; //Accessing the text content of the next sibling of the checkbox which is the div(list item text)
    let nextEl = e.target.nextElementSibling;//Accesing the div(text)

    for (let i=0; i<listElements.length; i++) {
        if (listElements[i]['text'] === task) {//Assuring whether the data.text is equivalent to the next sibling text of the checkbox we have clicked
            console.log(listElements[i]['check'])
            listElements[i]['check'] = !listElements[i]['check'];//when checkbox is clicked the values must switch
            
            //ternary operator for deciding which styling must be used when
            (listElements[i]['check']) ?
                nextEl.style.cssText = style1
           :
                nextEl.style.cssText = style2
            
            break;//to avoid any further loops
        }
        
    }
}