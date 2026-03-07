/* SEARCH POPUP */

const searchOverlay = document.getElementById("searchOverlay")
const searchInput = document.getElementById("searchInput")
const closeSearch = document.getElementById("closeSearch")

function openSearch(){

searchOverlay.classList.add("show")

setTimeout(()=>{
searchInput.focus()
},150)

}

function closeSearchBox(){
searchOverlay.classList.remove("show")
}

document.querySelector(".searchBtn").onclick = openSearch
closeSearch.onclick = closeSearchBox

/* CLOSE CLICK OUTSIDE */

searchOverlay.addEventListener("click",(e)=>{
if(e.target === searchOverlay){
closeSearchBox()
}
})

/* KEYBOARD SHORTCUT */

document.addEventListener("keydown",(e)=>{

if(e.key === "/"){
e.preventDefault()
openSearch()
}

if(e.key === "Escape"){
closeSearchBox()
}

})

/* SEARCH ENGINE */

async function loadSearch(){

const res = await fetch("/search-data.json")
const pages = await res.json()

const results = document.getElementById("searchResults")

searchInput.addEventListener("input",()=>{

let q = searchInput.value.toLowerCase()

results.innerHTML=""

pages.forEach(page=>{

if(page.title.toLowerCase().includes(q) || page.content.toLowerCase().includes(q)){

results.innerHTML += `
<a href="${page.url}" class="result">
<b>${page.title}</b>
<p>${page.content.slice(0,120)}...</p>
</a>
`

}

})

})

}

loadSearch()

/* THEME TOGGLE */

const themeToggle = document.getElementById("themeToggle")
const themeIcon = document.getElementById("themeIcon")

let theme = localStorage.getItem("theme")

if(theme === "light"){
document.body.classList.add("light")
themeIcon.src="../media/light.png"
}

themeToggle.onclick = ()=>{

document.body.classList.toggle("light")

if(document.body.classList.contains("light")){

localStorage.setItem("theme","light")
themeIcon.src="../media/light.png"

}else{

localStorage.setItem("theme","dark")
themeIcon.src="../media/dark.png"

}

}
