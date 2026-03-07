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
