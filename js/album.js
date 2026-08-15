const photos = [{
        id: 1,
        title: "Mountain Escape",
        album: "Nature",
        date: "2026-08-12",
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 2,
        title: "Ocean Morning",
        album: "Travel",
        date: "2026-08-10",
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 3,
        title: "City Lights",
        album: "Urban",
        date: "2026-08-08",
        src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 4,
        title: "Forest Path",
        album: "Nature",
        date: "2026-08-06",
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 5,
        title: "Desert Road",
        album: "Adventure",
        date: "2026-08-03",
        src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 6,
        title: "Golden Coast",
        album: "Travel",
        date: "2026-07-30",
        src: "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 7,
        title: "Architecture",
        album: "Urban",
        date: "2026-07-25",
        src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 8,
        title: "Alpine Lake",
        album: "Nature",
        date: "2026-07-20",
        src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 9,
        title: "Palm Paradise",
        album: "Travel",
        date: "2026-07-15",
        src: "https://images.unsplash.com/photo-1509233720127-6ee79b0628d0?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 10,
        title: "Night Drive",
        album: "Adventure",
        date: "2026-07-12",
        src: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 11,
        title: "Quiet Lake",
        album: "Nature",
        date: "2026-07-09",
        src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 12,
        title: "Old Streets",
        album: "Urban",
        date: "2026-07-05",
        src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1000&q=85"
    }
];
let favorites = JSON.parse(localStorage.getItem("vistoraFavorites") || "[]");
let activeAlbum = "All",
    sortNewest = true,
    viewerList = [],
    viewerIndex = 0;

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function saveFav() {
    localStorage.setItem("vistoraFavorites", JSON.stringify(favorites))
}

function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2200)
}

function go(page) {
    $$(".page").forEach(x => x.classList.remove("active-page"));
    $(`#${page}Page`).classList.add("active-page");
    $$(".nav a").forEach(x => x.classList.toggle("active", x.dataset.page === page));
    $("#mainNav").classList.remove("open");
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    if (page === "albums") renderPhotos();
    if (page === "favorites") renderFavorites();
}
document.addEventListener("click", e => {
    const p = e.target.closest("[data-page]");
    if (p) {
        e.preventDefault();
        go(p.dataset.page)
    }
});
$("#menuToggle").onclick = () => $("#mainNav").classList.toggle("open");
$("#profileBtn").onclick = () => $("#loginModal").classList.add("open");
$$("[data-close]").forEach(b => b.onclick = () => $("#" + b.dataset.close).classList.remove("open"));
window.addEventListener("keydown", e => {
    if (e.key === "Escape") $$(".modal.open").forEach(m => m.classList.remove("open"));
    if ($("#viewerModal").classList.contains("open")) {
        if (e.key === "ArrowRight") nextPhoto();
        if (e.key === "ArrowLeft") prevPhoto()
    }
});
$("#themeBtn").onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("vistoraTheme", document.body.classList.contains("dark") ? "dark" : "light")
};
if (localStorage.getItem("vistoraTheme") === "dark") document.body.classList.add("dark");

function card(p) {
    const on = favorites.includes(p.id);
    return `<article class="photo-card" data-id="${p.id}">
   <button class="heart ${on?"on":""}" data-fav="${p.id}" title="Favorite">${on?"♥":"♡"}</button>
   <img src="${p.src}" alt="${p.title}" loading="lazy">
   <div class="photo-info"><strong>${p.title}</strong><small>${p.album} · ${p.date}</small></div>
 </article>`;
}

function renderPhotos() {
    let list = photos.filter(p => activeAlbum === "All" || p.album === activeAlbum);
    const q = $("#searchInput").value.toLowerCase().trim();
    if (q) list = list.filter(p => (p.title + p.album).toLowerCase().includes(q));
    list.sort((a, b) => sortNewest ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date));
    $("#photoGrid").innerHTML = list.length ? list.map(card).join("") : `<div class="empty">No photos found.</div>`;
}

function renderFavorites() {
    const list = photos.filter(p => favorites.includes(p.id));
    $("#favoriteGrid").innerHTML = list.length ? list.map(card).join("") : `<div class="empty">No favorites yet. Tap ♡ on a photo to save it.</div>`;
}

function renderFeatured() {
    $("#featuredGrid").innerHTML = photos.slice(0, 4).map(card).join("")
}

function renderChips() {
    const albums = ["All", ...new Set(photos.map(p => p.album))];
    $("#chips").innerHTML = albums.map(a => `<button class="chip ${a===activeAlbum?"active":""}" data-album="${a}">${a}</button>`).join("");
}
document.addEventListener("click", e => {
    const fav = e.target.closest("[data-fav]");
    if (fav) {
        e.stopPropagation();
        const id = +fav.dataset.fav;
        favorites = favorites.includes(id) ? favorites.filter(x => x !== id) : [...favorites, id];
        saveFav();
        renderPhotos();
        renderFavorites();
        renderFeatured();
        updateStats();
        return
    }
    const chip = e.target.closest("[data-album]");
    if (chip) {
        activeAlbum = chip.dataset.album;
        renderChips();
        renderPhotos();
        return
    }
    const c = e.target.closest(".photo-card");
    if (c) {
        const list = [...photos.filter(p => activeAlbum === "All" || p.album === activeAlbum)];
        openViewer(+c.dataset.id, list)
    }
});
$("#searchInput").addEventListener("input", renderPhotos);
$("#sortBtn").onclick = () => {
    sortNewest = !sortNewest;
    $("#sortBtn").textContent = `Sort: ${sortNewest?"Newest":"Oldest"}`;
    renderPhotos()
};

function openViewer(id, list = photos) {
    viewerList = list;
    viewerIndex = Math.max(0, viewerList.findIndex(p => p.id === id));
    showViewer()
}

function showViewer() {
    const p = viewerList[viewerIndex];
    $("#viewerImage").src = p.src;
    $("#viewerImage").alt = p.title;
    $("#viewerCaption").textContent = `${p.title} · ${p.album}`;
    $("#viewerModal").classList.add("open")
}

function nextPhoto() {
    viewerIndex = (viewerIndex + 1) % viewerList.length;
    showViewer()
}

function prevPhoto() {
    viewerIndex = (viewerIndex - 1 + viewerList.length) % viewerList.length;
    showViewer()
}
$("#nextPhoto").onclick = nextPhoto;
$("#prevPhoto").onclick = prevPhoto;

$("#loginForm").onsubmit = e => {
    e.preventDefault();
    const email = $("#email").value;
    localStorage.setItem("vistoraUser", email);
    $("#profileBtn").textContent = email.split("@")[0];
    $("#loginModal").classList.remove("open");
    toast("Welcome back!");
};
if (localStorage.getItem("vistoraUser")) $("#profileBtn").textContent = localStorage.getItem("vistoraUser").split("@")[0];

const drop = $("#dropzone"),
    input = $("#fileInput");
["dragenter", "dragover"].forEach(ev => drop.addEventListener(ev, e => {
    e.preventDefault();
    drop.classList.add("drag")
}));
["dragleave", "drop"].forEach(ev => drop.addEventListener(ev, e => {
    e.preventDefault();
    drop.classList.remove("drag")
}));
drop.addEventListener("drop", e => handleFiles(e.dataTransfer.files));
input.addEventListener("change", e => handleFiles(e.target.files));

function handleFiles(files) {
    $("#uploadPreview").innerHTML = "";
    [...files].filter(f => f.type.startsWith("image/")).forEach(f => {
        const r = new FileReader();
        r.onload = () => {
            const img = document.createElement("img");
            img.src = r.result;
            img.alt = f.name;
            $("#uploadPreview").appendChild(img)
        };
        r.readAsDataURL(f)
    });
    if (files.length) toast(`${files.length} photo(s) ready for preview`)
}

function updateStats() {
    $("#photoCount").textContent = photos.length;
    $("#favoriteCount").textContent = favorites.length
}
renderChips();
renderPhotos();
renderFavorites();
renderFeatured();
updateStats();