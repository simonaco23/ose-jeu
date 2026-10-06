const data={
 question:[
  "Quel est ton plus gros fou rire à deux ?",
  "Quelle est la chose la plus spontanée que tu aimerais faire avec l'autre ?",
  "Quel est ton petit secret le plus drôle ?",
  "Si vous partiez demain ensemble, où iriez-vous ?",
  "Quelle qualité de l'autre préfères-tu ?"
 ],
 action:[
  "Fais une imitation de l'autre pendant 20 secondes.",
  "Danse sans musique pendant 30 secondes.",
  "Fais rire l'autre sans parler.",
  "Laisse l'autre choisir une photo drôle dans ton téléphone.",
  "Fais un compliment original à l'autre."
 ],
 spicy:[
  "Regardez-vous dans les yeux pendant 20 secondes sans rire.",
  "Donne à l'autre un baiser tendre de 10 secondes.",
  "Fais un compliment très séduisant à l'autre.",
  "Murmure à l'oreille de l'autre quelque chose qui lui plaît.",
  "L'autre choisit une petite attention romantique que tu dois faire."
 ]};
let players=["",""],turn=0,rotation=0;
function renderPlayers(){
 const box=document.getElementById("players");
 box.innerHTML="";
 players.forEach((p,i)=>{
   const row=document.createElement("div");
   row.className="player-row";
   row.innerHTML=`<input class="player-input" maxlength="18" placeholder="Joueur ${i+1}" value="${p}">`+
     (players.length>2?`<button class="remove-player" onclick="removePlayer(${i})">×</button>`:"");
   box.appendChild(row);
 });
 box.querySelectorAll(".player-input").forEach((input,i)=>input.addEventListener("input",()=>players[i]=input.value));
}
function addPlayer(){if(players.length<8){players.push("");renderPlayers()}}
function removePlayer(i){if(players.length>2){players.splice(i,1);renderPlayers()}}

function show(id){document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));document.getElementById(id).classList.add('active')}
function showSetup(){show('setup');renderPlayers()}
function startGame(){
 const inputs=[...document.querySelectorAll(".player-input")];
 players=inputs.map((x,i)=>x.value.trim()||"Joueur "+(i+1));
 if(players.length<2) return;
 turn=0;
 document.getElementById('turn').textContent="Au tour de "+players[turn];
 show('game')
}
function play(type){
 const wheel=document.getElementById('wheel');rotation+=720+Math.floor(Math.random()*360);wheel.style.transform=`rotate(${rotation}deg)`;
 const list=data[type],text=list[Math.floor(Math.random()*list.length)];
 const emoji=type==="question"?"❓":type==="action"?"🎯":"😏";
 setTimeout(()=>{document.querySelector('.result-emoji').textContent=emoji;document.querySelector('.result h2').textContent=type==="spicy"?"Ose… 😏":type==="action"?"À toi de jouer !":"Question !";document.querySelector('.result p').textContent=text;turn=turn===0?1:0;document.getElementById('turn').textContent="Au tour de "+players[turn]},650)
}