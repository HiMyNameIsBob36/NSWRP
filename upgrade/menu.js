const sidebar = document.getElementById("sidebar")
const openBtn = document.getElementById("openNav")
const closeBtn = document.getElementById("closeNav")

openBtn.addEventListener("click",()=>{
sidebar.classList.add("open")
})

closeBtn.addEventListener("click",()=>{
sidebar.classList.remove("open")
})
