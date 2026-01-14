function updateTime() {
  const timeEl = document.getElementById("time");

  const formatter = new Intl.DateTimeFormat("en-AU", {
    timeZone: staffTimezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  const parts = formatter.formatToParts(new Date());
  const hour = parseInt(parts.find(p => p.type === "hour").value, 10);

  const isLate = hour >= 22 || hour < 6;
  const icon = isLate ? "🌙" : "⏰";

  timeEl.textContent = `${icon} ${formatter.format(new Date())} (${timezoneLabel})`;
}

updateTime();
setInterval(updateTime, 60000);
