const questions=[
 {category:"ידע כללי",q:"מהי בירת צרפת?",a:["ברליו", "לונדון", "פריז", "רומא"],c:2},
 {category:"ידע כללי",q:"ביזו שפה משתמשים לבניית אתרי אימטרנט?",a:["PHP", "Python", "Javascript", "All"],c:3},
 {category:"ידע כללי",q:"מהי המדינה הכי גדולה בעולם?",a:["ארצות הברית", "קנדה", "אוסטרליה", "רוסיה"],c:3},
 {category:"ידע כללי",q:"מהי העצם הקטנה ביותר בגוף האדם?",a:["פמור", "הומרוס", "סטפס", "טיביה"],c:2},
 {category:"ידע כללי",q:"כמה רגליים יש לעכביש?",a:["שש", "עשר", "ארבע", "שמונה"],c:3},
 {category:"ידע כללי",q:"איזה כוכב לכת הכי קרוב לשמש?",a:["נוגה", "כדור הארץ", "מאדים", "כוכב חמה"],c:3},
 {category:"ידע כללי",q:"מי היה הנשיא הראשון של ארצות הברית?",a:["תומס ג'פרסון", "ג'ורג' וושינגטון", "בנג'מין פרנקלין", "ג'ון אדמס"],c:1},
 {category:"ידע כללי",q:"איזה גז מרכיב כ-78% מהאטמוספירה?",a:["חמצן", "פחמן דו חמצני", "הליום", "חנקן"],c:3},
 {category:"ידע כללי",q:"איזה איבר בגוף האדם מייצר אינסולין?",a:["הלבלב", "הכבד", "הכליות", "הקיבה"],c:0},
 {category:"ידע כללי",q:"כמה עצמות יש לתינוק שנולד?",a:["206", "270", "250", "300"],c:3},
 {category:"ידע כללי",q:"באיזו שנה נוסדה האוניברסיטה העברית?",a:["1930", "1920", "1925", "1918"],c:2},
 {category:"ידע כללי",q:"איזה כוכב לכת הכי גדול במערכת השמש?",a:["שבתאי", "נפטון", "אורנוס", "צדק"],c:3},
 {category:"ידע כללי",q:"באיזו שנה נפלה חומת ברלין?",a:[ "1989", "1985", "1991", "1987"],c:0},
 {category:"ידע כללי",q:"איזו שפה מדברים הכי הרבה בעולם?",a:["הינדית", "ספרדית", "סינית מנדרינית", "אנגלית"],c:2},
 {category:"ידע כללי",q:"איזה הר הוא הגבוה ביותר בעולם?",a:[ "K2", "קילימנג'רו", "מקינלי", "הר אוורסט"],c:3},
 {category:"ידע כללי",q:"איזה נהר הכי ארוך בעולם?",a:["היאנגצה", "הנילוס","המיסיסיפי", "האמזונס"],c:1},
 {category:"ידע כללי",q:"איזה יסוד כימי סימנו Au?",a:["כסף", "זהב", "אלומיניום", "ארגון"],c:1},
 {category:"ידע כללי",q:"מי חיבר את התפוח התשיעי של בטהובן?",a:["פרנץ שוברט", "יוהאן סבסטיאן באך", "וולפגנג אמדאוס מוצרט", "לודוויג ון בטהובן"],c:3},
 {category:"ידע כללי",q:"מהי היחידה הבסיסית של החיים?",a:["מערכת איברים", "תא", "איבר", "רקמה"],c:1},
 {category:"ידע כללי",q:"איזה קיסר רומי שרף את רומא?",a:["נרון","יוליוס קיסר", "טרייאנוס","אוגוסטוס"],c:0}

];
const maxScore = document.getElementById("max-score");
const qNum = document.getElementById("q_num");

let index=0,score=0,streak=0,bestStreak=0,correct=0,wrong=0,timeLeft=20,timerId=null,answered=false,sound=true;
const $=id=>document.getElementById(id);
const screens=["startScreen","quizScreen","resultScreen"];
function show(id){screens.forEach(x=>$(x).classList.toggle("active",x===id));}
function beep(type){if(!sound)return;try{const C=window.AudioContext||window.webkitAudioContext,ctx=new C(),o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=type==="good"?650:300;o.type="sine";g.gain.value=.045;o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.09)}catch(e){}}
function startQuiz(){
 index=0;score=0;streak=0;bestStreak=0;correct=0;wrong=0;
 $("score").textContent=0;$("streak").textContent=0;
 show("quizScreen");renderQuestion();
}
function renderQuestion(){
 const q=questions[index];answered=false;timeLeft=20;
 $("currentNo").textContent=index+1;$("totalNo").textContent=questions.length;
 $("category").textContent=q.category;$("questionText").textContent=q.q;
 $("progressBar").style.width=((index+1)/questions.length*100)+"%";
 $("nextBtn").disabled=true;
 $("answers").innerHTML=q.a.map((x,i)=>`<button class="answer" data-i="${i}"><span class="answer-letter">${String.fromCharCode(49+i)}</span><span>${x}</span></button>`).join("");
 document.querySelectorAll(".answer").forEach(b=>b.addEventListener("click",()=>choose(+b.dataset.i)));
 updateTimer();clearInterval(timerId);timerId=setInterval(()=>{timeLeft--;updateTimer();if(timeLeft<=0){clearInterval(timerId);choose(-1)}},1000);
}
function updateTimer(){
 $("timer").textContent=timeLeft;
 const pct=timeLeft/20*100;
 $("timerRing").style.background=`conic-gradient(${timeLeft<=5?"var(--bad)":"var(--accent)"} ${pct}%,var(--line) 0)`;
}
function choose(choice){
 if(answered)return;answered=true;clearInterval(timerId);
 const q=questions[index], buttons=[...document.querySelectorAll(".answer")];
 buttons.forEach((b,i)=>{b.disabled=true;if(i===q.c)b.classList.add("correct");if(i===choice&&choice!==q.c)b.classList.add("wrong")});
 if(choice===q.c){
   correct++;streak++;bestStreak=Math.max(bestStreak,streak);
   const points=100+Math.max(0,timeLeft*5)+streak*15;score+=points;beep("good");
}else{wrong++;streak=0;beep("bad");}
 $("score").textContent=score;$("streak").textContent=streak;$("nextBtn").disabled=false;
 if(choice===-1)toast("הזמן נגמר!");
}

let s = 1;
let maxPoints = 0;
for (let i = 0; i < questions.length; i++) {
  
  maxPoints += 100 + Math.max(0, 20 * 5) + s * 15;
  s++;
}
qNum.textContent = questions.length;
maxScore.textContent = maxPoints;
function next(){
 if(!answered)return;
 if(index<questions.length-1){index++;renderQuestion()}else finish();
}
function finish(){
 clearInterval(timerId);show("resultScreen");
 $("finalScore").textContent=score;$("correctCount").textContent=correct;$("wrongCount").textContent=wrong;
 $("accuracy").textContent=Math.round(correct/questions.length*100)+"%";$("bestStreak").textContent=bestStreak;
 const pct=correct/questions.length*100;
 $("resultTitle").textContent=pct===100?"מושלם!":pct>=80?"מעולה!":pct>=70?"עבודה נהדרת!":"המשיכו להתאמן!";
 $("resultMessage").textContent=`עניתם נכון ל ${correct} מתוך ${questions.length} שאלות. קיבלתם ${score} נקודות.`;
 $("reviewList").classList.add("hidden");
}
function review(){
 const list=$("reviewList");
 list.innerHTML=questions.map((q,i)=>`<div class="review-item"><b>${i+1}. ${q.q}</b><span class="good">תשובה נכונה: ${q.a[q.c]}</span></div>`).join("");
 list.classList.toggle("hidden");
}
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),1800)}
$("startBtn").onclick=startQuiz;$("nextBtn").onclick=next;$("restartBtn").onclick=startQuiz;$("reviewBtn").onclick=review;
$("themeBtn").onclick=()=>{document.body.classList.toggle("light");$("themeBtn").textContent=document.body.classList.contains("light")?"🌙":"☀"};
$("soundBtn").onclick=()=>{sound=!sound;$("soundBtn").textContent=sound?"🔊":"🔇";toast(sound?"הצליל הופעל":"הצליל הושתק")};
