const sidebar = document.getElementById("sidebar")
const overlay = document.getElementById("overlay")

document.getElementById("openNav").onclick = () => {
sidebar.classList.add("open")
overlay.classList.add("show")
}

document.getElementById("closeNav").onclick = closeSidebar
overlay.onclick = closeSidebar

function closeSidebar(){
sidebar.classList.remove("open")
overlay.classList.remove("show")
}

/* SEARCH */

const searchOverlay = document.getElementById("searchOverlay")
const searchBtn = document.getElementById("searchBtn")
const searchInput = document.getElementById("searchInput")
const results = document.getElementById("searchResults")

searchBtn.onclick = openSearch

function openSearch(){
searchOverlay.classList.add("show")
searchInput.focus()
}

/* close search if clicking outside */

searchOverlay.addEventListener("click",(e)=>{

if(e.target === searchOverlay){
searchOverlay.classList.remove("show")
}

})

/* keyboard shortcut */

document.addEventListener("keydown",(e)=>{

if(e.key === "/"){
e.preventDefault()
openSearch()
}

})

/* example search data */

const pages = [

{
title:"Departments",
url:"#",
content:"Police Fire Civilian"
},

{
title:"Meet the Team",
url:"#",
content:"Staff administration moderators"
},

{
title:"Guides",
url:"#",
content:"Tutorials server guides"
}

]


function renderResults(query=""){

let q = query.toLowerCase()

results.innerHTML=""

let found = false

pages.forEach(page=>{

if(
q === "" ||
page.title.toLowerCase().includes(q) ||
page.content.toLowerCase().includes(q)
){

found = true

results.innerHTML += `
<a href="${page.url}" class="result">
<b>${page.title}</b>
<p>${page.content}</p>
</a>
`

}

})

if(!found){
results.innerHTML = `<div class="result">No results found</div>`
}

}

/* show results when search opens */

function openSearch(){

searchOverlay.classList.add("show")
searchInput.focus()

renderResults()

}

searchInput.addEventListener("input",()=>{
renderResults(searchInput.value)
})
