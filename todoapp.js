var cardcontainer = document.getElementById("cardcontainer");
var cardname = document.getElementById("cardname");
var addtaskpopup = document.getElementById("addtaskpopup");
var parent = document.getElementById("parent");
var additemPopup = document.getElementById("additemPopup");
var notask = document.getElementById("notask");
var singlecard = document.getElementById("singleCard");
var isSingleCard = false;
let copylist;

// add task button

function showAddTask() {
  addtaskpopup.classList.remove("hide");
  parent.classList.add("blur");
}

function hideAddTask() {
  addtaskpopup.classList.add("hide");
  parent.classList.remove("blur");
}

function addcard() {
  notask.classList.add("hide");
  hideAddTask();

  //crete element
  let card = document.createElement("div");
  let cardheading = document.createElement("h3");
  let line = document.createElement("hr");
  let itemlist = document.createElement("div");
  let addItem = document.createElement("button");
  let deletebutton = document.createElement("button");
  
  
  // append elements
  cardcontainer.appendChild(card);
  card.appendChild(cardheading);
  card.appendChild(line);
  card.appendChild(itemlist);
  card.appendChild(addItem);
  card.appendChild(deletebutton);

  //give value to element
  cardheading.innerText = cardname.value;
  cardname.value = ""; // clearing
  cardheading.style.color = "red";
  card.classList.add("card");
  cardcontainer.classList.add("cardcontainer");
  addItem.className = "fas fa-plus addbutton";
  deletebutton.className = "fas fa-trash deletebutton";

  //delete button real logic
  deletebutton.addEventListener("click", () => {
    card.remove();
    if (cardcontainer.innerText === "") notask.classList.remove("hide");
  });

  //add item button real logic
  addItem.addEventListener("click", () => addItemFunc(itemlist, copylist));

  //card heading real logic
  cardheading.addEventListener("click", () => {
    isSingleCard = true;
    singlecard.classList.remove("hide");
    cardcontainer.classList.add("hide");

    singlecard.classList.add("cardcentre")
    let copycard = card.cloneNode(true);
    singlecard.appendChild(copycard);
     
    copycard.lastElementChild.addEventListener("click", () => {
      card.remove();
      copycard.remove();
      if (cardcontainer.innerText === "") notask.classList.remove("hide");
    });

    const copyaddbtn = copycard.lastElementChild.previousElementSibling;
    copylist = copycard.querySelector("div");
    markdonelist = copylist.querySelectorAll("button");

    for (let i = 0; i < markdonelist.length; i++) {
      markdonelist[i].addEventListener("click", function () {
        markdonelist[i].previousElementSibling.classList.add("markdone");
        markdonelist[i].style.display = "none";
         markdonelist[i].style.textDecoration = "line-through";
      });
    }

    copyaddbtn.addEventListener("click", () => addItemFunc(itemlist, copylist));
       parent.firstElementChild.classList.remove("hide");
       
  });
}

//add back button function
function back() {
  isSingleCard = false;
  let card = document.createElement("div");
  
  parent.firstElementChild.classList.add("hide");
  singlecard.classList.add("hide");
  cardcontainer.classList.remove("hide");
  card.classList.remove("hide");
   singlecard.innerText = "";
}
//add popup function logic
function addItemFunc(itemlist, copylist) {
  additemPopup.classList.remove("hide");
  parent.classList.remove("blur");
  //additem
  let itemPopupheading = document.createElement("h3");
  let itemname = document.createElement("input");
  let addbutton = document.createElement("button");
  let closebutton = document.createElement("button");

  //appendchild
  additemPopup.appendChild(itemPopupheading);
  additemPopup.appendChild(itemname);
  additemPopup.appendChild(addbutton);
  additemPopup.appendChild(closebutton);

  //give element values
  itemPopupheading.innerText = "Add Task";

  addbutton.className = "fas fa-plus addbutton ";
  closebutton.className = "fas fa-trash deletebutton ";

  addbutton.addEventListener("click", () => {
    additemPopup.classList.add("hide");
    parent.classList.remove("blur");

    //add elements
    let item = document.createElement("div");
    let itemtext = document.createElement("span");
    let markdone = document.createElement("button");

    //append
    item.appendChild(itemtext);
    item.appendChild(markdone);

    //values
    itemtext.innerText = itemname.value;
    itemtext.style.color = "red";
    markdone.innerText = "Mark done";

    

    markdone.addEventListener("click", function () {
      itemtext.classList.add("markdone");
      markdone.style.display = "none";
      
    });
  
    //appending the item to item list
    itemlist.appendChild(item);
    additemPopup.innerText = "";
    if (isSingleCard) {
      let copyitem = item.cloneNode(true);
      copylist.appendChild(copyitem);

      //markdone button on heading card
      copyaddbtn=copyitem.querySelector("button");
      itemtext=copyitem.querySelector("span");


      copyaddbtn.addEventListener("click", function () {
          itemtext.classList.add("markdone");
         copyaddbtn.style.display = "none";
        itemtext.style.textDecoration = "line-through";
      });
    }
  });
}
