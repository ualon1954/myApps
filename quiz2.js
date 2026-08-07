// const Q = [
//     ["Science", "MEDIUM", "Which planet is known as the Red Planet?", ["Venus", "Mars", "Jupiter", "Mercury"], 1],
//     ["Technology", "EASY", "What does HTML stand for?", ["HyperText Markup Language", "High Transfer Machine Language", "Hyperlink Text Management Language", "Home Tool Markup Language"], 0],
//     ["Geography", "EASY", "What is the capital city of Japan?", ["Kyoto", "Osaka", "Tokyo", "Hiroshima"], 2],
//     ["Science", "MEDIUM", "How many bones are in the adult human body?", ["186", "206", "226", "256"], 1],
//     ["History", "MEDIUM", "Who was the first person to walk on the Moon?", ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"], 2],
//     ["Technology", "EASY", "Which language is primarily used to style web pages?", ["Python", "CSS", "SQL", "Java"], 1],
//     ["Geography", "EASY", "Which ocean is the largest?", ["Atlantic", "Indian", "Arctic", "Pacific"], 3],
//     ["Science", "EASY", "What gas do plants absorb from the atmosphere?", ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], 2],
//     ["Technology", "MEDIUM", "What does CPU commonly stand for?", ["Central Processing Unit", "Computer Power Utility", "Core Program User", "Central Program Upload"], 0],
//     ["General", "EASY", "How many sides does a hexagon have?", ["5", "6", "7", "8"], 1]
// ];


const Q = [
    ["גאוגרפיה", "קל", "מהי בירת צרפת?",["ברליו", "לונדון", "פריז", "רומא"], 2],
    ["טכנולוגיה", "בינוני", "ביזו שפה משתמשים לבניית אתרי אימטרנט?",["PHP", "Python", "Javascript", "All"], 3],
    ["גאוגרפיה", "קל", "מהי המדינה הכי גדולה בעולם?",["ארצות הברית", "קנדה", "אוסטרליה", "רוסיה"], 3],
    ["מדע", "בינוני", "מהי העצם הקטנה ביותר בגוף האדם?",["פמור", "הומרוס", "סטפס", "טיביה"], 2],
    ["מדע", "קל", "כמה רגליים יש לעכביש?",["שש", "עשר", "ארבע", "שמונה"], 3],
    ["מדע", "בינוני", "איזה כוכב לכת הכי קרוב לשמש?",["נוגה", "כדור הארץ", "מאדים", "כוכב חמה"], 3],
    ["היסטוריה", "קל", "מי היה הנשיא הראשון של ארצות הברית?",["תומס ג'פרסון", "ג'ורג' וושינגטון", "בנג'מין פרנקלין", "ג'ון אדמס"], 1],
    ["מדע", "בינוני", "איזה גז מרכיב כ-78% מהאטמוספירה?",["חמצן", "פחמן דו חמצני", "הליום", "חנקן"], 3],
    ["מדע", "בינוני", "איזה איבר בגוף האדם מייצר אינסולין?",["הלבלב", "הכבד", "הכליות", "הקיבה"], 0],
    ["מדע", "בינוני", "כמה עצמות יש לתינוק שנולד?",["206", "270", "250", "300"], 3],
    ["היסטוריה", "קל", "באיזו שנה נוסדה האוניברסיטה העברית?",["1930", "1920", "1925", "1918"], 2],
    ["מדע", "בינוני", "איזה כוכב לכת הכי גדול במערכת השמש?",["שבתאי", "נפטון", "אורנוס", "צדק"], 3],
    ["היסטוריה", "קל", "באיזו שנה נפלה חומת ברלין?",["1989", "1985", "1991", "1987"], 0],
    ["גאוגרפיה", "קל", "איזו שפה מדברים הכי הרבה בעולם?",["הינדית", "ספרדית", "סינית מנדרינית", "אנגלית"], 2],
    ["גאוגרפיה", "בינוני", "איזה הר הוא הגבוה ביותר בעולם?",["K2", "קילימנג'רו", "מקינלי", "הר אוורסט"], 3],
    ["גאוגרפיה", "בינוני", "איזה נהר הכי ארוך בעולם?",["היאנגצה", "הנילוס","המיסיסיפי", "האמזונס"], 1],
    ["מדע", "בינוני", "איזה יסוד כימי סימנו Au?",["כסף", "זהב", "אלומיניום", "ארגון"], 1],
    ["היסטוריה", "קל", "מי חיבר את התפוח התשיעי של בטהובן?",["פרנץ שוברט", "יוהאן סבסטיאן באך", "וולפגנג אמדאוס מוצרט", "לודוויג ון בטהובן"], 3],
    ["מדע", "קל", "מהי היחידה הבסיסית של החיים?",["מערכת איברים", "תא", "איבר", "רקמה"], 1],
    ["היסטוריה", "בינוני", "איזה קיסר רומי שרף את רומא?",["נרון","יוליוס קיסר", "טרייאנוס","אוגוסטוס"], 0]
];

const maxScore = document.getElementById("max-points");
const qNum = document.getElementById("q_num");
const $ = id => document.getElementById(id);
let i = 0,
    score = 0,
    streak = 0,
    bestStreak = 0,
    correct = 0,
    wrong = 0,
    time = 20,
    timer, answered = false,
    sound = true;

function screen(id) {
    document.querySelectorAll(".screen").forEach(x => x.classList.toggle("active", x.id === id))
}

function beep(type){if(!sound)return;try{const C=window.AudioContext||window.webkitAudioContext,ctx=new C(),o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=type==="good"?650:300;o.type="sine";g.gain.value=.045;o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.09)}catch(e){}}

function start() {
    i = score = streak = bestStreak = correct = wrong = 0;
    screen("quiz");
    render()
}

function render() {
    let q = Q[i];
    answered = false;
    time = 20;
    $("num").textContent = i + 1;
    $("cat").textContent = q[0];
    $("diff").textContent = q[1];
    $("question").textContent = q[2];
    $("bar").style.width = (i + 1) / Q.length * 100 + "%";
    $("next").disabled = true;
    $("answers").innerHTML = q[3].map((a, n) => `<button class="answer" data-n="${n}"><span class="letter">${String.fromCharCode(49+n)}</span>${a}</button>`).join("");
    document.querySelectorAll(".answer").forEach(b => b.onclick = () => answer(+b.dataset.n));
    clearInterval(timer);
    tick();
    timer = setInterval(() => {
        time--;
        tick();
        if (time <= 0) {
            clearInterval(timer);
            answer(-1)
        }
    }, 1000);
    
}

function tick() {
    let p = time / 20 * 100;
    $("timer").textContent = time;
    $("ring").style.background = `conic-gradient(${time<=5?"var(--bad)":"var(--accent)"} ${p}%,var(--line) 0)`
}

// function choose(choice){
//  if(answered)return;answered=true;clearInterval(timer);
//  const q=Q[i], buttons=[...document.querySelectorAll(".answer")];
//  buttons.forEach((b,i)=>{b.disabled=true;if(i===q.c)b.classList.add("correct");if(i===choice&&choice!==q.c)b.classList.add("wrong")});
//  if(choice===q.c){
//    correct++;streak++;bestStreak=Math.max(bestStreak,streak);
//    const points=100+Math.max(0,timeLeft*5)+streak*15;score+=points;beep("good");
// }else{wrong++;streak=0;beep("bad");}
//  $("score").textContent=score;$("streak").textContent=streak;$("next").disabled=false;
//  if(choice===-1)toast("הזמן נגמר!");
// }

function answer(n) {
    if (answered) return;
    answered = true;
    clearInterval(timer);
    let q = Q[i];
    document.querySelectorAll(".answer").forEach((b, k) => {
        b.disabled = true;
        if (k === q[4]) b.classList.add("correct");
        if (k === n && n !== q[4]) b.classList.add("wrong")
    });
    if (n === q[4]) {
        correct++;
        streak++;
        bestStreak = Math.max(bestStreak, streak);
        let gain = 100 + time * 5 + streak * 15;
        score += gain;
        $("bonus").textContent = `+${gain} נקודות`;
        beep("good")
    } else {
        wrong++;
        streak = 0;
        beep("bad")
    }
    $("score").textContent = score;
    $("streak").textContent = streak;
    $("next").disabled = false;
    if(n===-1)toast("הזמן נגמר!")
}
let qNumber =  Q.length;
let s = 0;
let maxPoints = 0;
for (let i = 0; i < qNumber; i++) {
  
  maxPoints += 100 + Math.max(0, 20 * 5) + (s + 1) * 15;
  s++;
}
maxScore.textContent = maxPoints;
qNum.textContent = qNumber;

function next() {
    if (!answered) return;
    if (i < Q.length - 1) {
        i++;
        render()
    } else finish()
}

function trophy() {
    let p = correct / Q.length * 100;
    if (p === 100) return ["👑", "יהלום", "ניצחון מוחלט!", "ציון מושלם."];
    if (p >= 90) return ["💎", "פלטינה", "זכית במדליית פלטינה!", "דיוק עילית."];
    if (p >= 80) return ["🏆", "זהב", "זכית במדליית זהב!", "יוצא דופן."];
    if (p >= 60) return ["🥈", "כסף", "זכית במדליית כסף!", "עבודה טובה."];
    return ["🥉", "ארד", "זוכה מדליית ארד!", "המשך להתאמן."]
}

function finish() {
    clearInterval(timer);
    screen("results");
    let p = Math.round(correct / Q.length * 100),
        t = trophy();
    $("finalScore").textContent = score;
    $("correct").textContent = correct;
    $("wrong").textContent = wrong;
    $("accuracy").textContent = p + "%";
    $("bestStreak").textContent = bestStreak;
    $("resultIcon").textContent = t[0];
    $("resultTitle").textContent = correct === qNumber ? "מושלם!" : correct >= qNumber-2 ? "מעולה!" : correct >= qNumber-4 ? "עבודה טובה!" : "המשך להתאמן!";
    $("summary").textContent = `עניתם ${correct} מתוך ${Q.length} נכון וצברתם ${score.toLocaleString()} נקודות.`;
    localStorage.qmBest = Math.max(+localStorage.qmBest || 0, score);
    $("best").textContent = localStorage.qmBest;
    setTimeout(celebrate, 300)
}

function celebrate() {
    let t = trophy(),
        p = Math.round(correct / Q.length * 100);
    $("trophy").textContent = t[0];
    $("tier").textContent = t[1];
    $("tierTitle").textContent = t[2];
    $("tierText").textContent = t[3];
    $("cCorrect").textContent = correct;
    $("cStreak").textContent = bestStreak;
    $("cAccuracy").textContent = p + "%";
    $("animatedScore").textContent = 0;
    $("celebration").classList.remove("hidden");
    let box = $("confetti");
    box.innerHTML = "";
    for (let n = 0; n < 140; n++) {
        let s = document.createElement("span");
        s.className = "particle";
        s.textContent = ["✦", "★", "◆", "●", "■"][Math.floor(Math.random() * 5)];
        s.style.left = Math.random() * 100 + "%";
        s.style.color = ["#ffd45a", "#9f8cff", "#4fd1c5", "#fff"][Math.floor(Math.random() * 4)];
        s.style.setProperty("--x", (Math.random() - .5) * 900 + "px");
        s.style.setProperty("--r", (Math.random() * 1200 - 600) + "deg");
        s.style.setProperty("--d", 2 + Math.random() * 3 + "s");
        s.style.setProperty("--delay", Math.random() * .5 + "s");
        box.appendChild(s)
    }
    let st = performance.now();

    function count(now) {
        let p = Math.min(1, (now - st) / 1300);
        $("animatedScore").textContent = Math.round(score * (1 - Math.pow(1 - p, 3))).toLocaleString();
        if (p < 1) requestAnimationFrame(count)
    }
    requestAnimationFrame(count)
}

function review() {
    let r = $("reviewPanel");
    r.innerHTML = Q.map((q, n) => `<div><b>${n+1}. ${q[2]}</b><span>תשובה נכונה: ${q[3][q[4]]}</span></div>`).join("");
    r.classList.toggle("hidden")
}

function toast(x) {
    $("toast").textContent = x;
    $("toast").classList.add("show");
    setTimeout(() => $("toast").classList.remove("show"), 1400)
}
$("start").onclick = start;
$("again").onclick = start;
$("next").onclick = next;
$("continue").onclick = () => $("celebration").classList.add("hidden");
$("review").onclick = review;
$("theme").onclick = () => {
    document.body.classList.toggle("light");
    $("theme").textContent = document.body.classList.contains("light") ? "🌙" : "☀️"
};
$("sound").onclick = () => {
    sound = !sound;
    $("sound").textContent = sound ? "🔊" : "🔇";
    toast(sound ? "הצליל מופעל" : "הצליל מושתק")
};
$("best").textContent = localStorage.qmBest || 0;