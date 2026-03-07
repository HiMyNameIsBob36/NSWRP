// 1. Define your color palette here
const THEMES = {
    "Management Team": { color: "#ff4d4d", border: "#ff1a1a" },
    "Supervisor":      { color: "#990000", border: "#660000" },
    "Development":     { color: "#4d94ff", border: "#1a75ff" },
    "Lead Developer":  { color: "#2d5a9e", border: "#1c3d6e" },
    "Default":         { color: "#eeeeee", border: "#cccccc" } // Fallback
};

// 2. Helper to grab theme colors based on name
function getTheme(name) {
    return THEMES[name] || THEMES["Default"];
}

function getLocalTime(timezone) {
    try {
        return new Intl.DateTimeFormat('en-US', {
            timeStyle: 'short',
            timeZone: timezone
        }).format(new Date());
    } catch (e) {
        return "Failed fetching time.";
    }
}

async function loadStaff() {
    const container = document.getElementById("staff-container");
    try {
        const response = await fetch("staff.json");
        const data = await response.json();

        container.innerHTML = "";

        data.staff.forEach(member => {
            // Get themes automatically based on the name string in JSON
            const sectorTheme = getTheme(member.sector);
            const roleTheme = getTheme(member.role);
            const currentTime = getLocalTime(member.timezone);

            const card = document.createElement("div");
            card.className = "staff-card";

            card.innerHTML = `
                <div class="staff-header">
                    <img src="${member.avatar}" class="avatar" alt="${member.name}">
                    <div>
                        <h2>${member.name}</h2>
                        <p>${member.handle} • ${member.pronouns}</p>
                        <p>🕒 ${currentTime}</p>
                    </div>
                </div>
                <div class="staff-tags">
                    <span class="tag" style="background:${sectorTheme.color}; border:2px solid ${sectorTheme.border}">
                        ${member.sector}
                    </span>
                    <span class="tag" style="background:${roleTheme.color}; border:2px solid ${roleTheme.border}">
                        ${member.role}
                    </span>
                </div>
                <p class="description">${member.description}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadStaff);
