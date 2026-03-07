const THEMES = {
    "Police": { color: "rgba(0, 81, 255, 0.3)", border: "#0051ff" },
    "Management": { color: "rgba(255, 77, 77, 0.3)", border: "#ff4d4d" },
    "Default": { color: "rgba(255, 255, 255, 0.1)", border: "#46494A" }
};

function getTheme(name) {
    return THEMES[name] || THEMES["Default"];
}

// LIVE TIME FUNCTION
function updateAllTimes() {
    const timeElements = document.querySelectorAll('.live-time');
    timeElements.forEach(el => {
        const tz = el.getAttribute('data-timezone');
        el.innerText = new Intl.DateTimeFormat('en-AU', {
            timeStyle: 'short',
            timeZone: tz
        }).format(new Date());
    });
}

// Update times every 30 seconds
setInterval(updateAllTimes, 30000);

async function loadStaff() {
    const container = document.getElementById("staff-container");
    const response = await fetch("staff.json");
    const data = await response.json();

    // 1. Group staff by department
    const groups = data.staff.reduce((acc, member) => {
        const dept = member.sector; // Using 'sector' as the Department name
        if (!acc[dept]) acc[dept] = [];
        acc[dept].push(member);
        return acc;
    }, {});

    container.innerHTML = "";

    // 2. Loop through each department group
    for (const [deptName, members] of Object.entries(groups)) {
        const section = document.createElement("div");
        section.className = "dept-section";
        
        section.innerHTML = `<h2 class="dept-title">${deptName}</h2>`;
        
        const wrapper = document.createElement("div");
        wrapper.className = "card-wrapper";

        members.forEach(member => {
            const roleTheme = getTheme(member.role);
            const card = document.createElement("div");
            card.className = "staff-card";
            
            card.innerHTML = `
                <div class="staff-header">
                    <img src="${member.avatar}" class="avatar">
                    <div>
                        <h2>${member.name}</h2>
                        <p>${member.handle}</p>
                        <p>🕒 <span class="live-time time-update" data-timezone="${member.timezone}">...</span></p>
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
    
    updateAllTimes(); // Initial time load
}

document.addEventListener("DOMContentLoaded", loadStaff);
