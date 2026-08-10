// BMI
// const gender = document.querySelector('input[name="gender"]:checked').value;
const age = document.getElementById('age');
const height = document.getElementById('height');
const weight = document.getElementById('weight');

const ageValue = document.getElementById('ageValue');
const heightValue = document.getElementById('heightValue');
const weightValue = document.getElementById('weightValue');

const bmiEl = document.getElementById('bmi');
const categoryEl = document.getElementById('category');
const pointer = document.getElementById('pointer');
let gender = 'גבר';
function  onGenderChange(event){
    gender = event.target.value;
    console.log(gender);
    calculateBMI();
}
function calculateBMI(){
    let h = height.value / 100;
    let w = weight.value;

    let bmi = w / (h*h);

    bmiEl.textContent = bmi.toFixed(1);

    let category = '';
    let color = '';

    if(bmi < 18.5){
        category = 'תת משקל';
        color = '#3b82f6';
    }
    else if(bmi < 25){
        category = 'משקל תקין';
        color = '#22c55e';
    }
    else if(bmi < 30){
        category = 'עודף משקל';
        color = '#f59e0b';
    }
    else{
        category = 'השמנת יתר';
        color = '#ef4444';
    }

    categoryEl.textContent = category;
    categoryEl.style.color = color;
    bmiEl.style.color = color;

    ageValue.textContent = age.value;
    heightValue.textContent = height.value + ' ס"מ';
    weightValue.textContent = weight.value + ' ק"ג';

    let position = Math.min(Math.max((bmi / 40) * 100,0),100);
    // pointer.style.left = `calc(${position}% - 60px)`;
    let hei=
     parseFloat(document.getElementById('height').value);
    let idealMin=
    18.5*Math.pow(hei/100,2);

    let idealMax=
    24.9*Math.pow(hei/100,2);

    let bmr;
    let wei=
        parseFloat(document.getElementById('weight').value);

    let ag=
        parseFloat(document.getElementById('age').value);

if(gender==='גבר'){
    bmr=
    88.362 +
    (13.397*wei)+
    (4.799*hei)-
    (5.677*ag);
}
else{
    bmr=
    447.593 +
    (9.247*wei)+
    (3.098*hei)-
    (4.330*ag);
}    

// document.getElementById('result').style.display='block';

// document.getElementById('bmi').innerHTML=
// bmi.toFixed(1);

// document.getElementById('status').innerHTML=
// status;

// document.getElementById('status').style.color=
// color;

// document.getElementById('bar').style.width=
// width+'%';

// document.getElementById('bar').style.background=
// color;

document.getElementById('bmr').innerHTML=
Math.round(bmr)+' קלוריות';

document.getElementById('ideal').innerHTML=
idealMin.toFixed(0)+
' - '+
idealMax.toFixed(0)+
' ק"ג';
}
age.addEventListener('input', calculateBMI);
height.addEventListener('input', calculateBMI);
weight.addEventListener('input', calculateBMI);

calculateBMI();

function openHelp(){
    document.getElementById("helpModal").style.display="block";
}

function closeHelp(){
    document.getElementById("helpModal").style.display="none";
}

window.onclick=function(e){
    if(e.target==document.getElementById("helpModal")){
        closeHelp();
    }
}


document.addEventListener("keydown",function(e){
    if(e.key==="Escape"){
        closeHelp();
    }
});


// --------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE NAVIGATION
    ========================= */

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");


    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            menuToggle.textContent =
                navLinks.classList.contains("open")
                    ? "✕"
                    : "☰";

        });


        document
            .querySelectorAll(".nav-links a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    navLinks.classList.remove("open");

                    menuToggle.textContent = "☰";

                });

            });

    }


    /* =========================
       DARK / LIGHT MODE
    ========================= */

    const themeToggle =
        document.getElementById("themeToggle");


    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        themeToggle.textContent =
            document.body.classList.contains("dark")
                ? "☀️"
                : "🌙";

    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            const theme =
                document.body.classList.contains("dark")
                    ? "dark"
                    : "light";

            localStorage.setItem("theme", theme);

            updateThemeIcon();

        });

    }


    /* =========================
       FOOTER YEAR
    ========================= */

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }
});