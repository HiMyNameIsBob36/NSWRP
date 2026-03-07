/**
 * NSWRP Staff Directory Script
 * Includes: Grouping, Glassmorphism, 3-Card Grid, and Sliding Clock
 */

const THEMES = {
    "Management Team": { color: "rgba(255, 77, 77, 0.15)", border: "#ff4d4d" },
    "Supervisor":      { color: "rgba(153, 0, 0, 0.15)", border: "#990000" },
    "Development":     { color: "rgba(77, 148, 255, 0.15)", border: "#4d94ff" },
    "Police":          { color: "rgba(0, 81, 255, 0.15)", border: "#0051ff" },
    "Default":         { color: "rgba(255, 255, 255, 0.1)", border: "#46494A" }
};

function getTheme(name) {
    return THEMES[name] || THEMES["Default"];
}

// Function to update the sliding numbers
function updateClock(card, timezone) {
    try {
        const now = new Date();
        const timeStr = new Intl.DateTimeFormat('en-AU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: timezone
        }).format(now);

        const [hours, minutes] = timeStr.split(':');
        const digits = (hours + minutes).split(''); // e.g. ["1", "4", "0", "5"]

        const slots = card.querySelectorAll('.digit-slot');
        digits.forEach((digit, i) => {
            if (slots[i]) {
                const yMove = parseInt(digit) * 20; // 20px is the height of one digit
                slots[i].style.transform = `translateY(-${yMove}px)`;
            }
        });
    } catch (e) {
        console.error("Clock Error:", e);
    }
}

// Helper to create the HTML for the sliding clock
function createClockHTML() {
    // A slot contains 0-9 stacked vertically
    const slot = `<div class="digit-slot"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></div>`;
    return `
        <div class="clock-window">
            ${slot}${slot} <span class="separator">:</span> ${slot}${slot}
        </div>
    `;
}

async function loadStaff() {
    const container = document.getElementById("staff-container");
    if (!container) return;

    try {
        const response = await fetch("staff.json");
        if (!response.ok) throw new Error("Could not find staff.json");
        
        const data = await response.json();

        // 1. Group by Department (Sector)
        const groups = data.staff.reduce((acc, member) => {
            const dept = member.sector || "Unassigned";
            if (!acc[dept]) acc[dept] = [];
            acc[dept].push(member);
            return acc;
        }, {});

        container.innerHTML = "";

        // 2. Build the UI
        for (const [deptName, members] of Object.entries(groups)) {
            // Create Section
            const section = document.createElement("div");
            section.className = "dept-section";
            section.innerHTML = `<h2 class="dept-title">${deptName}</h2>`;

            // Create Grid Wrapper (Flex centers 3 cards)
            const wrapper = document.createElement("div");
            wrapper.className = "card-wrapper";

            members.forEach(member => {
                const roleTheme = getTheme(member.role);
                const card = document.createElement("div");
                card.className = "staff-card";

                card.innerHTML = `
                    <div class="staff-header">
                        <img src="${member.avatar}" class="avatar" onerror="this.src='../media/logo.png'">
                        <div class="header-text">
                            <h2>${member.name}</h2>
                            <p class="handle">${member.handle} • ${member.pronouns}</p>
                            <div class="time-container">
                                🕒 ${createClockHTML()}
                            </div>
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
                
                // Set initial time and start interval for this specific card
                setTimeout(() => updateClock(card, member.timezone), 100);
                setInterval(() => updateClock(card, member.timezone), 10000); // Check every 10s
            });

            section.appendChild(wrapper);
            container.appendChild(section);
        }

    } catch (error) {
        console.error("Load Error:", error);
        container.innerHTML = `<p style="color:red; text-align:center;">Error: ${error.message}</p>`;
    }
}

document.addEventListener("DOMContentLoaded", loadStaff);
