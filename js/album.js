const photos = [
    {
        id: 13,
        title: "קצת נוסטלגיה",
        album: "ילדות",
        date: "2000-07-05",
        src: "images/13.jpg"
    },
    {
        id: 14,
        title: "קצת נוסטלגיה",
        album: "ילדות",
        date: "2000-07-05",
        src: "images/14.jpeg"
    },
    {
        id: 15,
        title: "קצת נוסטלגיה",
        album: "ילדות",
        date: "2000-07-05",
        src: "images/15.jpeg"
    },
    {
        id: 16,
        title: "קצת נוסטלגיה",
        album: "ילדות",
        date: "2000-07-05",
        src: "images/16.jpeg"
    },
    {
        id: 17,
        title: "קצת נוסטלגיה",
        album: "אחים",
        date: "2000-07-05",
        src: "images/17.jpeg"
    },
    {
        id: 18,
        title: "קצת נוסטלגיה",
        album: "שונות",
        date: "2000-07-05",
        src: "images/18.jpeg"
    },
    {
        id: 19,
        title: "קצת נוסטלגיה",
        album: "שונות",
        date: "2000-07-05",
        src: "images/19.jpeg"
    },
    {
        id: 20,
        title: "קצת נוסטלגיה",
        album: "שונות",
        date: "2000-07-05",
        src: "images/20.jpeg"
    },
    {
        id: 21,
        title: "קצת נוסטלגיה",
        album: "שונות",
        date: "2000-07-05",
        src: "images/21.jpeg"
    },
    {
        id: 22,
        title: "קצת נוסטלגיה",
        album: "שונות",
        date: "2000-07-05",
        src: "images/22.jpeg"
    },
    {
        id: 23,
        title: "קצת נוסטלגיה",
        album: "שונות",
        date: "2000-07-05",
        src: "images/23.jpeg"
    },
    {
        id: 24,
        title: "קצת נוסטלגיה",
        album: "שונות",
        date: "2000-07-05",
        src: "images/24.jpeg"
    },
    {
        id: 25,
        title: "קצת נוסטלגיה",
        album: "שונות",
        date: "2000-07-05",
        src: "images/25.jpeg"
    },
    {
        id: 26,
        title: "קצת נוסטלגיה",
        album: "שונות",
        date: "2000-07-05",
        src: "images/26.jpeg"
    },
    {
        id: 27,
        title: "קצת נוסטלגיה",
        album: "שונות",
        date: "2000-07-05",
        src: "images/27.jpeg"
    },
    {
        id: 28,
        title: "קצת נוסטלגיה",
        album: "שונות",
        date: "2000-07-05",
        src: "images/28.jpeg"
    },
    {
        id: 29,
        title: "קצת נוסטלגיה",
        album: "שונות",
        date: "2000-07-05",
        src: "images/29.jpeg"
    },
    {
        id:30,
        title: "קצת נוסטלגיה",
        album: "שונות",
        date: "2000-07-05",
        src: "images/30.jpeg"
    },
    {
        id: 31,
        title: "קצת נוסטלגיה",
        album: "שונות",
        date: "2000-07-05",
        src: "images/31.jpeg"
    },
    {
        id: 32,
        title: "קצת נוסטלגיה",
        album: "שונות",
        date: "2000-07-05",
        src: "images/32.jpeg"
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
    if (e.key === "Escape") $$(".modal.open").forEach(m => m.classList.add("open"));
    if ($("#viewerModal").classList.contains("open")) {
        if (e.key === "ArrowRight") nextPhoto();
        if (e.key === "ArrowLeft") prevPhoto()
    }
});
// alert(localStorage.getItem("auth"));
if(localStorage.getItem("auth") !== "1")  {
    $("#loginModal").classList.add("open");
}
else{
    $("#loginModal").classList.remove("open")
}

$("#loginModal").addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        // alert("2");
        event.preventDefault();
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

// $("#loginForm").onsubmit = e => {
//     e.preventDefault();
//     const user = $("#user-name").value;
//     localStorage.setItem("vistoraUser", user);
//     $("#profileBtn").textContent = user;
//     $("#loginModal").classList.remove("open");
//     toast("Welcome back!");
// };
// if (localStorage.getItem("vistoraUser")) $("#profileBtn").textContent = localStorage.getItem("vistoraUser").split("@")[0];
    
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