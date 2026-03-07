function createClockHTML() {
    // Creates the structure for HH:MM
    return `
        <div class="clock-container">
            <div class="digit-slot" id="h1"><span>0</span><span>1</span><span>2</span></div>
            <div class="digit-slot" id="h2"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></div>
            <span>:</span>
            <div class="digit-slot" id="m1"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>
            <div class="digit-slot" id="m2"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></div>
        </div>
    `;
}

function updateRollingTime(cardElement, timezone) {
    const now = new Intl.DateTimeFormat('en-AU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: timezone
    }).formatToParts(new Date());

    const hh = now.find(p => p.type === 'hour').value;
    const mm = now.find(p => p.type === 'minute').value;

    const digits = [hh[0], hh[1], mm[0], mm[1]];
    const slots = cardElement.querySelectorAll('.digit-slot');

    digits.forEach((digit, i) => {
        // Move the strip up by 20px multiplied by the digit value
        slots[i].style.transform = `translateY(-${digit * 20}px)`;
    });
}

async function loadStaff() {
    const container = document.getElementById("staff-container");
    const response = await fetch("staff.json");
    const data = await response.json();

    // Grouping logic
    const groups = data.staff.reduce((acc, m) => {
        (acc[m.sector] = acc[m.sector] || []).push(m);
        return acc;
    }, {});

    container.innerHTML = "";

    for (const [dept, members] of Object.entries(groups)) {
        const section = document.createElement("div");
        section.className = "dept-section";
        section.innerHTML = `<h2 class="dept-title">${dept}</h2><div class="card-wrapper"></div>`;
        const wrapper = section.querySelector(".card-wrapper");

        members.forEach(member => {
            const card = document.createElement("div");
            card.className = "staff-card";
            card.innerHTML = `
                <div class="staff-header">
                    <img src="${member.avatar}" class="avatar">
                    <div>
                        <h2>${member.name}</h2>
                        <p>${member.handle}</p>
                        <div class="time-row">🕒 ${createClockHTML()}</div>
                    </div>
                </div>
                <div class="staff-tags">
                    <span class="tag" style="border-color:${getTheme(member.role).border}">
                        ${member.role}
                    </span>
                </div>
                <p class="description">${member.description}</p>
            `;
            wrapper.appendChild(card);
            
            // Initial time set
            updateRollingTime(card, member.timezone);
            
            // Set individual interval for this card
            setInterval(() => updateRollingTime(card, member.timezone), 1000);
        });
        container.appendChild(section);
    }
}
