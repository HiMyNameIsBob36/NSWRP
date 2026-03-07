async function loadStaff() {

    const response = await fetch("staff.json");
    const data = await response.json();

    const container = document.getElementById("staff-container");

    data.staff.forEach(member => {

        const card = document.createElement("div");
        card.className = "staff-card";

        const currentTime = getLocalTime(member.timezone);

        card.innerHTML = `
            <div class="staff-header">
                <img src="${member.avatar}" class="avatar">

                <div>
                    <h2>${member.name}</h2>
                    <p>${member.handle} • ${member.pronouns}</p>
                    <p>🕒 ${currentTime}</p>
                </div>
            </div>

            <div class="staff-tags">

                <span class="tag"
                style="background:${member.sector.color}; border:2px solid ${member.sector.border}">
                    ${member.sector.name}
                </span>

                <span class="tag"
                style="background:${member.role.color}; border:2px solid ${member.role.border}">
                    ${member.role.name}
                </span>

            </div>

            <p class="description">${member.description}</p>
        `;

        container.appendChild(card);

    });
}

loadStaff();
