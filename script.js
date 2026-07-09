// ================= LOADER =================
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }, 500);
});

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
        tag: "SYSTEM",
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
        tag: "FRAMEWORK",
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
        tag: "INTERFACE",
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

// ================= 3D MODEL TILT EFFECT =================
const model = document.querySelector(".model-box");
if (model) {
    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        model.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
}

// ================= CLOSE POPUP WITH ESC =================
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProject();
});
