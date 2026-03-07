const THEMES = {
    "Manager": { color: "rgba(255, 77, 77, 0.15)", border: "#ff4d4d" },
    "Supervisor":      { color: "rgba(153, 0, 0, 0.15)", border: "#990000" },
    "Founder":     { color: "rgba(77, 148, 255, 0.15)", border: "#4d94ff" },
    "Director":          { color: "rgba(0, 81, 255, 0.15)", border: "#0051ff" },
    "Default":         { color: "rgba(255, 255, 255, 0.1)", border: "#46494A" }
};

function getTheme(name) {
    return THEMES[name] || THEMES["Default"];
}

// Simple Live Time Function
function updateTimes() {
    const clocks = document.querySelectorAll('.live-clock');
    clocks.forEach(clock => {
        const tz = clock.getAttribute('data-timezone');
        clock.innerText = new Intl.DateTimeFormat('en-AU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: tz
        }).format(new Date());
    });
}

// Update the clocks every 10 seconds
setInterval(updateTimes, 10000);

async function loadStaff() {
    const container = document.getElementById("staff-container");
    if (!container) return;

    try {
        const response = await fetch("staff.json");
        const data = await response.json();

        // Grouping logic (by Sector/Department)
        const groups = data.staff.reduce((acc, member) => {
            const dept = member.sector || "General Staff";
            if (!acc[dept]) acc[dept] = [];
            acc[dept].push(member);
            return acc;
        }, {});

        container.innerHTML = "";

        for (const [deptName, members] of Object.entries(groups)) {
            // Create the Department Heading
            const section = document.createElement("div");
            section.className = "dept-section";
            section.innerHTML = `<h2 class="dept-title">${deptName}</h2>`;

            // Create the Grid (This keeps cards 3-per-line)
            const wrapper = document.createElement("div");
            wrapper.className = "card-wrapper";

            members.forEach(member => {
                const roleTheme = getTheme(member.role);
                const card = document.createElement("div");
                card.className = "staff-card";

                card.innerHTML = `
                    <div class="staff-header">
                        <img src="${member.avatar}" class="avatar" onerror="this.src='../media/logo.png'">
                        <div class="header-info">
                            <h2>${member.name}</h2>
                            <p class="handle-pronouns">${member.handle} • ${member.pronouns}</p>
                            <p class="time-row">🕒 <span class="live-clock" data-timezone="${member.timezone}">--:--</span></p>
                        </div>
                    </div>
                    <div class="staff-tags">
                        <span class="tag" style="background:${roleTheme.color}; border:1px solid ${roleTheme.border}">
                            ${member.role}
                        </span>
                    </div>
                    <p class="description">${member.description}</p>
                `;
                wrapper.appendChild(card);
            });

            section.appendChild(wrapper);
            container.appendChild(section);
        }

        updateTimes(); // Run immediately after loading

    } catch (error) {
        console.error("Error loading staff:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadStaff);
