const sidebar = document.getElementById("sidebar")
const openBtn = document.getElementById("openNav")
const closeBtn = document.getElementById("closeNav")
const overlay = document.getElementById("overlay")

openBtn.onclick = () => {
sidebar.classList.add("open")
overlay.classList.add("show")
}

function closeMenu(){
sidebar.classList.remove("open")
overlay.classList.remove("show")
}

closeBtn.onclick = closeMenu
overlay.onclick = closeMenu

/* SEARCH FILTER */

const search = document.getElementById("navSearch")

search.addEventListener("input",function(){

let value = this.value.toLowerCase()
let items = document.querySelectorAll(".openable")

items.forEach(item=>{

let text = item.innerText.toLowerCase()

if(text.includes(value)){
item.style.display=""
}else{
item.style.display="none"
}

})

})
