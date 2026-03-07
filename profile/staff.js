// Helper to format timezone strings into readable time
function getLocalTime(timezone) {
    try {
        return new Intl.DateTimeFormat('en-US', {
            timeStyle: 'short',
            timeZone: timezone
        }).format(new Date());
    } catch (e) {
        return "Time unavailable"; // Fallback for invalid timezones
    }
}

async function loadStaff() {
    const container = document.getElementById("staff-container");
    if (!container) return; // Exit if the HTML element isn't found

    try {
        const response = await fetch("staff.json");
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Clear container (useful if you call this function multiple times)
        container.innerHTML = "";

        data.staff.forEach(member => {
            const card = document.createElement("div");
            card.className = "staff-card";

            const currentTime = getLocalTime(member.timezone);

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
                    <span class="tag" style="background:${member.sector.color}; border:2px solid ${member.sector.border}">
                        ${member.sector.name}
                    </span>
                    <span class="tag" style="background:${member.role.color}; border:2px solid ${member.role.border}">
                        ${member.role.name}
                    </span>
                </div>
                <p class="description">${member.description}</p>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Failed to load staff data:", error);
        container.innerHTML = `<p>Error loading staff directory.</p>`;
    }
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", loadStaff);
