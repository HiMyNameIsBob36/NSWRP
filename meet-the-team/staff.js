const THEMES = { 
    "Founder": { color: "rgba(230, 126, 34, 0.25)", border: "#e67e22" },
    "Director": { color: "rgba(235, 148, 71, 0.25)", border: "#eb9447" },
    
    "Recruiting Manager": { color: "rgba(40, 100, 65, 0.25)", border: "#286441" },
    "Department Overseer": { color: "rgba(70, 136, 97, 0.25)", border: "#468861" },
    "Supervisor": { color: "rgba(95, 175, 128, 0.25)", border: "#5faf80" },
    "Ground Manager": { color: "rgba(139, 235, 178, 0.25)", border: "#8bebb2" },

    "Adminastrator": { color: "rgba(214, 0, 0, 0.25)", border: "#d60000" },
    "Moderator": { color: "rgba(255, 204, 0, 0.25)", border: "#ffcc00" },
    
    "Event Staff": { color: "rgba(31, 164, 164, 0.25)", border: "#1fa4a4" },
    "Creative Team": { color: "rgba(78, 198, 198, 0.25)", border: "#4ec6c6" },
    "General Helper": { color: "rgba(183, 255, 255, 0.25)", border: "#b7ffff" },
   
    "Default": { color: "rgba(255, 255, 255, 0.1)", border: "#46494A" }
};

function getTheme(role) {
    return THEMES[role] || THEMES["Default"];
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
    const container = document.getElementById("staff-container");
    if (!container) return;

    try {
        const response = await fetch("data.json");
        if (!response.ok) throw new Error("File not found");
        
        const data = await response.json();

        const groups = data.staff.reduce((acc, m) => {
            const dept = m.sector || "General";
            if (!acc[dept]) acc[dept] = [];
            acc[dept].push(m);
            return acc;
        }, {});

        container.innerHTML = "";

        for (const [deptName, members] of Object.entries(groups)) {
            const section = document.createElement("div");
            section.className = "dept-section";
            section.innerHTML = `<h2 class="dept-title">${deptName}</h2>`;

            const wrapper = document.createElement("div");
            wrapper.className = "card-wrapper";

            members.forEach(m => {
                const theme = getTheme(m.role);
                const badges = m.badges || [];
                
                const badgesHTML = badges.map(b => `
                    <div class="badge-item" style="border-color: ${b.color}">
                        <img src="${b.icon}">
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
                            <p><img src="../media/clock.png" class="time"> <span class="live-clock" data-timezone="${m.timezone}">...</span></p>
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
        setInterval(updateTimes, 10000);
    } catch (e) {
        console.error("JSON Error:", e);
        container.innerHTML = `<p style="color:red; text-align:center;">Failed to load staff directory. Check JSON syntax.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", loadStaff);
