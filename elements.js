//OOP - Inheritence
class SiteHeader extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
    <div id="overlay"></div>
<div class="navbar">

<button id="openNav" class="menuBtn button">☰</button>

<a href="https://aunsw.netlify.app/" class="logo"><img src="../media/logo.png"><span>New South Wales Roleplay</span></a>

<div class="nav-right"><img src="../media/search.png" id="searchBtn" class="button"></div>
</div>

<div id="sidebar" class="sidebar"><div class="sidebarHeader">
<div class="serverName"><img src="../media/logo.png">New South Wales Roleplay</div>

<button id="closeNav" class="closeBtn button">✕</button>
</div>

<nav class="navList">
  <details class="dropdown">
    <summary class="navItem"><img src="../media/departments.png"><span>Departments</span></summary>
    <div class="dropdownContent">
      <div class="dept-item"><img src="../media/department/police.png"><a href="https://aunsw.netlify.app/departments#police">Police</a></div>
      <div class="dept-item"><img src="../media/department/afp.png"><a href="https://aunsw.netlify.app/departments#afp">Austrlaian Federal Police</a></div>
      <div class="dept-item"><img src="../media/department/fire.png"><a href="https://aunsw.netlify.app/departments#fire">Fire & Rescue</a></div>
      <div class="dept-item"><img src="../media/department/ambulance.png"><a href="https://aunsw.netlify.app/departments#ambulace">Paramedics</a></div>
       <div class="dept-item"><img src="../media/department/dot.png"><a href="https://aunsw.netlify.app/departments#dot">Transport NSW</a></div>
      </div></details>

  <a href="https://aunsw.netlify.app/meet-the-team" class="navItem"><img src="../media/team.png"><span>Meet the Team</span></a>
  <a href="https://aunsw.netlify.app/affiliates" class="navItem"><img src="../media/affiliates.png"><span>Affiliates</span></a>
  <a href="https://aunsw.netlify.app/rules" class="navItem"><img src="../media/rulebook.png"><span>Rules & Guidelines</span></a>
</nav>

<div class="sidebarFooter">
  <div class="copyright">© NSWRP | All rights reserved.</div>
  <div class="social">
    <a class="button socialBtn" href="https://www.youtube.com/@NSWERLC" target="_blank"><img src="../media/youtube.png"></a>
    <a class="button socialBtn" href="https://discord.gg/rWtnWX5Esy" target="_blank"><img src="../media/discord.png"></a>
  </div></div></div>

<div id="searchOverlay">
<div class="searchBox">
<input id="searchInput" type="text" placeholder="Search...">
<div id="searchResults"></div>
</div></div>
    `
  }
}

customElements.define('the-header', SiteHeader)

console.log("Custom elements loaded.")

