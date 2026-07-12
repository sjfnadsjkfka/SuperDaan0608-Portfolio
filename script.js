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

// =====================================================
// PROJECTS — edit this list to add/remove/change projects.
// Just add or delete an object below, everything else
// (cards, popup, video) updates automatically.
//
// Fields:
//   image        - filename inside the /images folder (e.g. "military.png")
//   youtube      - a YouTube link OR just the video ID. Leave "" for no video.
//   name         - project title
//   tag          - small label shown on the card (e.g. "System")
//   description  - short text shown in the popup (use <br> for line breaks)
// =====================================================
const PROJECTS = [
    {
        image: "Schermafbeelding 2026-07-12 114113.png",
        youtube: "https://youtu.be/vNFyToty2jk",
        name: "Coffee Machine",
        tag: "System",
        description: `
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
    {
        image: "simulator.png",
        youtube: "",
        name: "Simulator Framework",
        tag: "Framework",
        description: `
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
    {
        image: "ui.png",
        youtube: "",
        name: "Advanced UI System",
        tag: "Interface",
        description: `
            Modern Roblox interface development.
            <br><br>
            Features:
            <br>• Animated menus
            <br>• Notifications
            <br>• Smooth transitions
            <br>• Responsive layouts
        `
    }
];

// ================= BUILD PROJECT CARDS =================
function extractYoutubeId(input){
    if (!input) return "";
    // already just an ID (no slashes/dots)
    if (!/[./]/.test(input)) return input;

    try{
        const url = new URL(input);
        if (url.hostname.includes("youtu.be")){
            return url.pathname.replace("/", "");
        }
        if (url.searchParams.get("v")){
            return url.searchParams.get("v");
        }
        // handles /embed/ID or /shorts/ID links
        const parts = url.pathname.split("/").filter(Boolean);
        return parts[parts.length - 1] || "";
    } catch(e){
        return "";
    }
}

function renderProjects(){
    const list = document.getElementById("projects-list");
    if (!list) return;

    list.innerHTML = PROJECTS.map((project, index) => `
        <div class="project-card" data-index="${index}">
            <div class="project-img"><img src="images/${project.image}" alt="${project.name}"></div>
            <div class="project-info">
                <span class="project-tag">${project.tag}</span>
                <h3>${project.name}</h3>
                <p>${project.description.split("<br>")[0].trim()}</p>
            </div>
        </div>
    `).join("");

    list.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("click", () => {
            openProject(PROJECTS[parseInt(card.dataset.index, 10)]);
        });
    });
}
renderProjects();

// ================= POPUP =================
function openProject(project){
    document.getElementById("popup-title").innerHTML = project.name;
    document.getElementById("popup-description").innerHTML = project.description;
    document.getElementById("popup-tag").innerHTML = project.tag;

    const videoBox = document.getElementById("popup-video");
    const videoId = extractYoutubeId(project.youtube);
    if (videoId){
        videoBox.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" title="${project.name}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        videoBox.classList.add("active");
    } else {
        videoBox.innerHTML = "";
        videoBox.classList.remove("active");
    }

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
