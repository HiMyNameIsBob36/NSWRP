const sidebar = document.getElementById("sidebar")
const overlay = document.getElementById("overlay")

document.getElementById("openNav").onclick = () =>{
sidebar.classList.add("open")
overlay.classList.add("show")
}

document.getElementById("closeNav").onclick = closeMenu
overlay.onclick = closeMenu

function closeMenu(){
sidebar.classList.remove("open")
overlay.classList.remove("show")
}

/* SEARCH */

const searchOverlay = document.getElementById("searchOverlay")
const searchInput = document.getElementById("searchInput")
const results = document.getElementById("searchResults")

document.querySelector(".searchBtn").onclick = openSearch
document.getElementById("closeSearch").onclick = closeSearch

function openSearch(){
searchOverlay.classList.add("show")
searchInput.focus()
}

function closeSearch(){
searchOverlay.classList.remove("show")
}

document.addEventListener("keydown",(e)=>{

if(e.key === "/"){
e.preventDefault()
openSearch()
}

if(e.key === "Escape"){
closeSearch()
}

})

/* SEARCH ENGINE */

fetch("search-data.json")
.then(res=>res.json())
.then(pages=>{

searchInput.addEventListener("input",()=>{

let q = searchInput.value.toLowerCase()

results.innerHTML=""

pages.forEach(page=>{

if(page.title.toLowerCase().includes(q) || page.content.toLowerCase().includes(q)){

results.innerHTML += `
<a href="${page.url}" class="result">
<b>${page.title}</b>
<p>${page.content}</p>
</a>
`

}

})

})

})

/* THEME TOGGLE */

const toggle = document.getElementById("themeToggle")
const icon = document.getElementById("themeIcon")

let theme = localStorage.getItem("theme")

if(theme==="light"){
document.body.classList.add("light")
icon.src="media/light.png"
}

toggle.onclick = ()=>{

document.body.classList.toggle("light")

if(document.body.classList.contains("light")){

localStorage.setItem("theme","light")
icon.src="media/light.png"

}else{

localStorage.setItem("theme","dark")
icon.src="media/dark.png"

}

}
