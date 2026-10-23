// Educational front-end demonstration only. Not official voter authentication.
const DEMO_SESSION_KEY = "evmDemoSession";

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("votingApp");
    const redirect = document.querySelector(".login-redirect");
    const session = sessionStorage.getItem(DEMO_SESSION_KEY);

    if (!session) {
        app.hidden = true;
        redirect.hidden = false;
        return;
    }
    redirect.hidden = true;
    app.hidden = false;

    try {
        const user = JSON.parse(session);
        document.getElementById("name").value = user.name || "";
        document.getElementById("age").value = user.age || "";
    } catch (_) {
        sessionStorage.removeItem(DEMO_SESSION_KEY);
        app.hidden = true;
        redirect.hidden = false;
    }

    document.getElementById("logoutBtn").addEventListener("click", () => {
        sessionStorage.removeItem(DEMO_SESSION_KEY);
        window.location.href = "login.html";
    });
});

// Vote Count Object
let votes = {
    Lotus: 0,
    Hand: 0,
    Bicycle: 0,
    Bow: 0,
    Tree: 0,
    Star: 0
};

// Load Previous Votes
if(localStorage.getItem("votes")){
    votes = JSON.parse(localStorage.getItem("votes"));
}

updateTable();


// ================= CAST VOTE =================

function castVote(){
    if (!sessionStorage.getItem("evmDemoSession")) {
        const msg = document.getElementById("message");
        if (msg) msg.textContent = "Please complete the demo login first.";
        return;
    }
    if (sessionStorage.getItem("evmDemoVoted") === "yes") {
        const msg = document.getElementById("message");
        if (msg) msg.textContent = "A vote has already been submitted in this demo session.";
        return;
    }

    let name = document.getElementById("name").value.trim();

    let age = Number(document.getElementById("age").value);

    let candidate = document.querySelector('input[name="candidate"]:checked');

    let message = document.getElementById("message");

    if(name===""){

        message.style.color="yellow";
        message.textContent="⚠ Please enter your name.";
        return;

    }

    if(age < 18){

        message.style.color="red";
        message.textContent="❌ Sorry! Only 18+ citizens can vote.";
        return;

    }

    if(candidate==null){

        message.style.color="orange";
        message.textContent="⚠ Please select a candidate.";
        return;

    }

    votes[candidate.value]++;
    sessionStorage.setItem("evmDemoVoted", "yes");

    localStorage.setItem("votes",JSON.stringify(votes));

    updateTable();

    message.style.color="lightgreen";
    message.textContent="✅ Vote Cast Successfully!";

    document.getElementById("name").value="";
    document.getElementById("age").value="";

    candidate.checked=false;

}



// ================= UPDATE TABLE =================

function updateTable(){

    document.getElementById("lotus").innerHTML=votes.Lotus;

    document.getElementById("hand").innerHTML=votes.Hand;

    document.getElementById("bicycle").innerHTML=votes.Bicycle;

    document.getElementById("bow").innerHTML=votes.Bow;

    document.getElementById("tree").innerHTML=votes.Tree;

    document.getElementById("star").innerHTML=votes.Star;

    let total =
    votes.Lotus+
    votes.Hand+
    votes.Bicycle+
    votes.Bow+
    votes.Tree+
    votes.Star;

    document.getElementById("totalVotes").innerHTML=total;

}



// ================= SHOW WINNER =================

function showWinner(){

    let winner="";

    let max=-1;

    for(let key in votes){

        if(votes[key]>max){

            max=votes[key];

            winner=key;

        }

    }

    if(max===0){

        document.getElementById("winnerText").textContent="No Votes Cast Yet";

        return;

    }

    document.getElementById("winnerText").textContent=
    "🏆 Winner : "+winner+" ("+max+" Votes)";

}



// ================= RESET =================

function resetElection(){

    let ok = confirm("Reset all votes?");

    if(!ok){

        return;

    }

    votes={

        Lotus:0,

        Hand:0,

        Bicycle:0,

        Bow:0,

        Tree:0,

        Star:0

    };

    localStorage.removeItem("votes");

    updateTable();

    document.getElementById("winnerText").textContent="";

    document.getElementById("message").textContent="Election Reset Successfully";

}
// Result panel password protection (front-end demo only).

const RESULT_PANEL_PASSWORD = "admin123";

function toggleResult() {
    const panel = document.getElementById("resultPanel");

    if (panel.style.display === "none" || panel.style.display === "") {
        const enteredPassword = prompt("Enter the result panel password:");
        if (enteredPassword === null) return;
        if (enteredPassword !== RESULT_PANEL_PASSWORD) {
            alert("Incorrect password. Result panel access denied.");
            return;
        }
        panel.style.display = "block";
        updateTable();
    } else {
        panel.style.display = "none";
    }
}

// ENTER KEY

document.addEventListener("keypress", function(e) {
    if (e.key === "Enter" && !document.getElementById("votingApp").hidden) {
        const target = e.target;
        if (target && target.tagName !== "BUTTON" && target.type !== "radio") return;
        castVote();
    }
});