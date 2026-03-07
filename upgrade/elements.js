console.log("Loading custom header & footer.")

//OOP - Inheritence
class MyHeader extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
<div class="navbar">

<button id="openNav" class="menuBtn">☰</button>

<a href="/" class="logo">
<img src="media/logo.png">
<span>New South Wales Roleplay</span>
</a>

<div class="nav-right">
<img src="media/search.png" class="searchBtn">
</div>

</div>

<!-- SIDEBAR -->

<div id="sidebar" class="sidebar">

<div class="sidebarHeader">

<div class="serverName">
<img src="media/logo.png">
New South Wales Roleplay
</div>

<button id="closeNav">✕</button>

</div>

<nav class="navList">

<details>

<summary class="navItem">
<img src="media/icon.png">
Departments
</summary>

<div class="dropdown">

<a href="#">Police</a>
<a href="#">Fire</a>
<a href="#">Civilian</a>

</div>

</details>

<a href="#" class="navItem">
<img src="media/icon.png">
Meet the Team
</a>

<a href="#" class="navItem">
<img src="media/icon.png">
Guides
</a>

</nav>

<div class="sidebarFooter">

<div id="themeToggle" class="themeToggle">

<img id="themeIcon" src="media/dark.png">
<span>Theme</span>

</div>

<div class="social">

<a href="#"><img src="media/youtube.png"></a>
<a href="#"><img src="media/discord.png"></a>

</div>

</div>

</div>

<!-- SEARCH POPUP -->

<div id="searchOverlay">

<div class="searchModal">

<div class="searchTop">

<img src="media/search.png">
<input type="text" id="searchInput" placeholder="Search...">
<button id="closeSearch">✕</button>

</div>

<div id="searchResults"></div>

</div>

</div>`
  }
}


class MyFooter extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `<footer class="footer"><div class="footer-grid">

<div class="footer-brand">
<h2>ERLC<span>X</span></h2><p>Discover and share high-quality ER:LC assets built by the community.</p>
</div>

<div class="footer-column">
<h4>MARKETPLACE</h4>
<a href="#">Browse</a><a href="#">Groups</a><a href="#">Talent</a><a href="#">Upload</a>
</div>

<div class="footer-column">
<h4>ACCOUNT</h4>
<a href="#">Profile</a><a href="#">Creator Dashboard</a><a href="#">Support</a><a href="#">Guidelines</a>
</div>

<div class="footer-column">
<h4>COMMUNITY</h4>
<a href="#">Blog</a><a href="#">Affiliates</a>
</div>

<div class="footer-column">
<h4>LEGAL</h4>
<a href="#">Terms</a><a href="#">Privacy</a>
</div></div>

<div class="footer-bottom">
© 2026 ERLCX. All rights reserved.
</div>

</footer>`
  }
}

customElements.define('my-header', MyHeader)
customElements.define('my-legal', MyFooter)
