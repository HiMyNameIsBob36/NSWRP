const THEMES = {
    "Management Team": { color: "rgba(255, 77, 77, 0.15)", border: "#ff4d4d" },
    "Police Force": { color: "rgba(0, 81, 255, 0.15)", border: "#0051ff" },
    "Default": { color: "rgba(255, 255, 255, 0.1)", border: "#46494A" }
};

function getTheme(name) {
    return THEMES[name] || THEMES["Default"];
}

function updateTimes() {
    document.querySelectorAll('.live-clock').forEach(clock => {
        const tz = clock.getAttribute('data-timezone');
        try {
            clock.innerText = new Intl.DateTimeFormat('en-AU', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZone: tz
            }).format(new Date());
        } catch (e) {
            clock.innerText = "Time Error";
        }
    });
}

async function loadStaff() {
    console.log("Attempting to load staff.json...");
    const container = document.getElementById("staff-container");
    
    if (!container) {
        console.error("CRITICAL: Element #staff-container not found in HTML!");
        return;
    }

    try {
        // Change "staff.json" to "../staff.json" if your file is in a different folder
        const response = await fetch("staff.json");
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("JSON Data Loaded:", data);

        const groups = data.staff.reduce((acc, m) => {
            const dept = m.sector || "Unassigned";
            if (!acc[dept]) acc[dept] = [];
            acc[dept].push(m);
            return acc;
        }, {});

        container.innerHTML = "";

        for (const [deptName, members] of Object.entries(groups)) {
            const section = document.createElement("div");
            section.className = "dept-section";
            
            const wrapper = document.createElement("div");
            wrapper.className = "card-wrapper";

            section.innerHTML = `<h2 class="dept-title">${deptName}</h2>`;

            members.forEach(m => {
                const theme = getTheme(m.role);
                
                // Safety check: if badges don't exist, use empty array
                const badges = m.badges || [];
                const badgesHTML = badges.map(b => `
                    <div class="badge-item" style="border-color: ${b.color}">
                        <img src="${b.icon}" alt="badge">
                        <span class="tooltip">${b.label}</span>
                    </div>
                `).join('');

                const card = document.createElement("div");
                card.className = "staff-card";
                card.innerHTML = `
                    <div class="staff-header">
                        <img src="${m.avatar}" class="avatar" onerror="this.src='../media/logo.png'">
                        <div>
                            <h2>${m.name}</h2>
                            <p>${m.handle} • ${m.pronouns}</p>
                            <p>🕒 <span class="live-clock" data-timezone="${m.timezone}">Loading...</span></p>
                        </div>
                    </div>
                    <div class="staff-tags">
                        <span class="tag" style="background:${theme.color}; border:1px solid ${theme.border}">${m.role}</span>
                        <div class="badge-container">${badgesHTML}</div>
                    </div>
                    <p class="description">${m.description}</p>
                `;
                wrapper.appendChild(card);
            });

            section.appendChild(wrapper);
            container.appendChild(section);
        }

        updateTimes();
        setInterval(updateTimes, 30000);

    } catch (error) {
        console.error("Fetch Error:", error);
        container.innerHTML = `<p style="color:red; padding:20px;">Failed to load staff: ${error.message}</p>`;
    }
}

/* Sidebar logic bundled in to ensure it works
document.addEventListener("DOMContentLoaded", () => {
    console.log("Staff Script Initialized");
    loadStaff();
    
    const openBtn = document.getElementById("openNav");
    const closeBtn = document.getElementById("closeNav");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    if (openBtn && sidebar && overlay) {
        openBtn.onclick = () => {
            sidebar.classList.add("open");
            overlay.classList.add("show");
        };
    }

    if (closeBtn && sidebar && overlay) {
        closeBtn.onclick = () => {
            sidebar.classList.remove("open");
            overlay.classList.remove("show");
        };
    }

    if (overlay) {
        overlay.onclick = () => {
            sidebar.classList.remove("open");
            overlay.classList.remove("show");
        };
    }
}); */
