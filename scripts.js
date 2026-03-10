/* --- DATA & STATS --- */
const data = {
    "stats": {
        "uploads": "0",
        "creators": "0",
        "favorites": "0",
        "members": "1"
    }
};

// Function to fill stats (Fixed to check if elements exist)
function loadStats() {
    const fields = ["uploads", "creators", "favorites", "members"];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = data.stats[id];
    });
}

/* --- REVEAL ON SCROLL --- */
function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    reveals.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

/* --- SEARCH LOGIC --- */
const pages = [
    { title: "Departments", url: "#", content: "Police Fire Civilian" },
    { title: "Meet the Team", url: "#", content: "Staff administration moderators" },
    { title: "Guides", url: "#", content: "Tutorials server guides" }
];

function renderResults(query = "") {
    const results = document.getElementById("searchResults");
    if (!results) return;
    
    let q = query.toLowerCase();
    results.innerHTML = "";
    let found = false;

    pages.forEach(page => {
        if (q === "" || page.title.toLowerCase().includes(q) || page.content.toLowerCase().includes(q)) {
            found = true;
            results.innerHTML += `
                <a href="${page.url}" class="result">
                    <b>${page.title}</b>
                    <p>${page.content}</p>
                </a>`;
        }
    });
    if (!found) results.innerHTML = `<div class="result">No results found</div>`;
}

/* --- CUSTOM HEADER ELEMENT --- */
class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div id="overlay"></div>
        <div class="navbar">
            <button id="openNav" class="menuBtn button">☰</button>
            <a href="https://aunsw.netlify.app/" class="logo"><img src="../media/logo.png"><span>New South Wales Roleplay</span></a>
            <div class="nav-right"><img src="../media/search.png" id="searchBtn" class="button"></div>
        </div>
        <div id="sidebar" class="sidebar">
            <div class="sidebarHeader">
                <div class="serverName"><img src="../media/logo.png">New South Wales Roleplay</div>
                <button id="closeNav" class="closeBtn button">✕</button>
            </div>
            <nav class="navList">
                <details class="dropdown">
                    <summary class="navItem"><img src="../media/departments.png"><span>Departments</span></summary>
                    <div class="dropdownContent">
                        <div class="dept-item"><img src="../media/department/police.png"><a href="/departments#police">Police</a></div>
                        <div class="dept-item"><img src="../media/department/afp.png"><a href="/departments#afp">AFP</a></div>
                        <div class="dept-item"><img src="../media/department/fire.png"><a href="/departments#fire">Fire</a></div>
                    </div>
                </details>
                <a href="/meet-the-team" class="navItem"><span>Meet the Team</span></a>
            </nav>
        </div>
        <div id="searchOverlay">
            <div class="searchBox">
                <input id="searchInput" type="text" placeholder="Search...">
                <div id="searchResults"></div>
            </div>
        </div>`;

        // Initialize listeners AFTER HTML is injected
        this.setupEventListeners();
    }

    setupEventListeners() {
        const sidebar = document.getElementById("sidebar");
        const overlay = document.getElementById("overlay");
        const searchOverlay = document.getElementById("searchOverlay");
        const searchInput = document.getElementById("searchInput");

        const closeSidebar = () => {
            sidebar.classList.remove("open");
            overlay.classList.remove("show");
        };

        const openSearch = () => {
            searchOverlay.classList.add("show");
            searchInput.focus();
            renderResults();
        };

        // Onclicks
        document.getElementById("openNav").onclick = () => {
            sidebar.classList.add("open");
            overlay.classList.add("show");
        };
        document.getElementById("closeNav").onclick = closeSidebar;
        overlay.onclick = closeSidebar;
        document.getElementById("searchBtn").onclick = openSearch;

        searchOverlay.onclick = (e) => {
            if (e.target === searchOverlay) searchOverlay.classList.remove("show");
        };

        searchInput.oninput = () => renderResults(searchInput.value);
    }
}

customElements.define('the-header', SiteHeader);

/* --- INITIALIZATION --- */
document.addEventListener("keydown", (e) => {
    if (e.key === "/") {
        e.preventDefault();
        const searchOverlay = document.getElementById("searchOverlay");
        if(searchOverlay) {
            searchOverlay.classList.add("show");
            document.getElementById("searchInput").focus();
        }
    }
});

window.addEventListener("scroll", revealOnScroll);

// Run everything on load
window.addEventListener("DOMContentLoaded", () => {
    loadStats();
    revealOnScroll();
});
