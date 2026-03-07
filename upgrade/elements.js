console.log("Loading custom header & footer.")

//OOP - Inheritence
class MyHeader extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
<div class="navbar">
  <!-- OPEN BUTTON -->
<button id="openNav" class="openBtn">☰</button>

<!-- SIDEBAR -->
<div id="sidebar" class="sidebar">

    <div class="sidebarTop">
        <button id="closeNav" class="closeBtn">✕</button>
        <div class="serverName">
            <img src="gear-small.png">
            New South Wales Roleplay
        </div>
    </div>

    <nav class="navList">

        <a href="#" class="navItem active">
            <img src="gear.png" class="icon">
            <span>Departments</span>
        </a>

        <a href="#" class="navItem">
            <img src="gear.png" class="icon">
            <span>Meet the Team</span>
        </a>

        <a href="#" class="navItem">
            <img src="gear.png" class="icon">
            <span>Other Options</span>
        </a>

        <a href="#" class="navItem">
            <img src="gear.png" class="icon">
            <span>Other Options</span>
        </a>

    </nav>

    <div class="sidebarBottom">
        <div class="socials">
            <img src="youtube.png">
            <img src="discord.png">
        </div>

        <div class="copyright">© NSWRP | All rights reserved</div>
    </div>

</div>

<a href="https://aunsw.netlify.app/"><img class="icon"><span>New South Wales Roleplay</span></a>



<div class="nav-right">
   <a href="https://aunsw.netlify.app/search"><div class="icon"><img class="image" src="../media/search.png"></div></a>
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
