// ===== EDIT THESE =====
const CONFIG = {
  whatsapp: "919341029015",   // country code + number, no + or spaces
  convexDeploymentUrl: "https://exuberant-manatee-960.convex.cloud",
  waText: "Hi! I’m interested in ordering from Violet Roots."
};
// =======================
// Convex HTTP actions are served from the matching .convex.site host.
const convexHttpUrl = CONFIG.convexDeploymentUrl
  .replace(/\.convex\.cloud(?=\/|$)/, ".convex.site")
  .replace(/\/$/, "");
document.querySelectorAll(".wa-link").forEach(a=>{
  a.href="https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(CONFIG.waText);
});
const video=document.getElementById("vid");
video.addEventListener("error",()=>{video.style.display="none"});

const phrases=[
  "Directly from our farms to your home.",
  "Naturally healthy, full of goodness.",
  "Freshly harvested with care.",
  "Real food, rooted in healthy soil."
];
const typedText=document.getElementById("typed-text");
const phraseAnnouncer=document.getElementById("phrase-announcer");
const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(reduceMotion){
  typedText.textContent=phrases[0];
  phraseAnnouncer.textContent=phrases[0];
}else{
  let phraseIndex=0, characterIndex=0, deleting=false;
  const typeNext=()=>{
    const phrase=phrases[phraseIndex];
    typedText.textContent=phrase.slice(0,characterIndex);
    if(!deleting && characterIndex===phrase.length){
      phraseAnnouncer.textContent=phrase;
      deleting=true;
      window.setTimeout(typeNext,1600);
      return;
    }
    if(deleting && characterIndex===0){
      deleting=false;
      phraseIndex=(phraseIndex+1)%phrases.length;
      window.setTimeout(typeNext,350);
      return;
    }
    characterIndex+=deleting?-1:1;
    window.setTimeout(typeNext,deleting?42:78);
  };
  typeNext();
}
const home=document.getElementById("home"),contact=document.getElementById("contactview");
function route(){
  const c=location.hash==="#contact";
  contact.classList.toggle("on",c);home.classList.toggle("on",!c);
  if(c)window.scrollTo(0,0);
}
function go(id){
  if(id==="contact"){location.hash="contact";return}
  const wasContact=location.hash==="#contact";
  if(wasContact)location.hash="home";
  setTimeout(()=>{
    if(id==="top")window.scrollTo({top:0});
    else document.getElementById(id).scrollIntoView();
  },wasContact?60:0);
}
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-go]");if(b)go(b.dataset.go);
});
window.addEventListener("hashchange",route);route();

const f=document.getElementById("f"),m=document.getElementById("m"),sb=document.getElementById("sb");
function say(t,c){m.textContent=t;m.className="msg "+c}
f.addEventListener("submit",async e=>{
  e.preventDefault();
  const name=f.name.value.trim(),phone=f.phone.value.replace(/[^\d+]/g,"");
  if(name.length<2)return say("Please enter your name.","err");
  if(phone.replace(/\D/g,"").length<10)return say("Please enter a valid 10-digit phone number.","err");
  sb.disabled=true;sb.textContent="Sending…";
  try{
    if(convexHttpUrl){
      const r=await fetch(convexHttpUrl+"/request",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,phone,item:f.item.value})});
      if(!r.ok)throw new Error("fail");
    }
    say("Thank you, "+name+"! We’ll call you soon.","ok");f.reset();
  }catch(err){
    say("Something went wrong. Please try WhatsApp instead.","err");
  }
  sb.disabled=false;sb.textContent="Send my request";
});
