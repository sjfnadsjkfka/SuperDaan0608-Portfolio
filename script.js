// ================= SCROLL BUTTONS =================
function scrollProjects(){
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
}
function scrollContact(){
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// ================= SCROLL REVEAL =================
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.15 });
revealElements.forEach(element => revealObserver.observe(element));

// ================= PROJECT DATA =================
const projects = {
    "Military System": {
        tag: "System",
        html: `
            A complete Roblox military framework.
            <br><br>
            Features:
            <br>• Team systems
            <br>• Rank management
            <br>• Security systems
            <br>• Administration tools
            <br>• Training features
        `
    },
    "Simulator Framework": {
        tag: "Framework",
        html: `
            A scalable simulator framework.
            <br><br>
            Features:
            <br>• Coin systems
            <br>• Upgrade systems
            <br>• Shops
            <br>• Leaderboards
            <br>• DataStore saving
        `
    },
    "UI System": {
        tag: "Interface",
        html: `
            Modern Roblox interface development.
            <br><br>
            Features:
            <br>• Animated menus
            <br>• Notifications
            <br>• Smooth transitions
            <br>• Responsive layouts
        `
    }
};

function openProject(project){
    const data = projects[project];
    if (!data) return;
    document.getElementById("popup-title").innerHTML = project;
    document.getElementById("popup-description").innerHTML = data.html;
    document.getElementById("popup-tag").innerHTML = data.tag;
    document.getElementById("popup").style.display = "flex";
}
function closeProject(){
    document.getElementById("popup").style.display = "none";
}
document.getElementById("popup").addEventListener("click", (e) => {
    if (e.target.id === "popup") closeProject();
});

// ================= NAVBAR SCROLL EFFECT =================
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);
});

// ================= MOBILE MENU =================
const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
});
mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

// ================= ANIMATED STAT COUNTERS =================
const statEls = document.querySelectorAll("[data-count]");
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            const suffix = el.dataset.suffix || "";
            let current = 0;
            const step = Math.max(1, Math.round(target / 40));
            const tick = () => {
                current += step;
                if (current >= target) {
                    el.textContent = target + suffix;
                } else {
                    el.textContent = current + suffix;
                    requestAnimationFrame(tick);
                }
            };
            tick();
            statObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
statEls.forEach(el => statObserver.observe(el));

// ================= CLOSE POPUP WITH ESC =================
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProject();
});
