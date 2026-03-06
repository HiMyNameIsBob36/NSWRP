console.log("Loading custom header & footer.")

//OOP - Inheritence
class MyHeader extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
<div class="navbar">
<div id="menu"><img class="icon"></div>

<img class="icon"><span>New South Wales Roleplay</span>



<div class="nav-right">
   <a><div id="search"><img class="icon"></div></a>
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
