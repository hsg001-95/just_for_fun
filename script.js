const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const gif = document.getElementById('gif');
const question = document.getElementById('question');
const subtext = document.getElementById('subtext');
const btnGroup = document.querySelector('.btn-group');

const states = [
    {
        gif: "1.gif",
        question: "Do you love me? 🥰",
        subtext: "nvn is all yours"
    },
    {
        gif: "2.gif",
        question: "Please think again! 🥺",
        subtext: "itni jaldi na matt bolo!🥺"
    },
    {
        gif: "3.gif",
        question: "Ek aur baar Soch lo! 🥺",
        subtext: "kyu aisa kar rahi ho pls Maan jao🥺"
    },
    {
        gif: "4.gif",
        question: "beautiful pls Man jao na! Kitna code likh waogi😭",
        subtext: "bhut git baat hai yrr :("
    }
];

let currentState = 0;
let runawayActive = false;
let yesFontSize = 1.1; // rem
let yesPaddingY = 10; // px
let yesPaddingX = 30; // px

noBtn.addEventListener('click', () => {
    if (!runawayActive) {
        currentState++;
        
        // Animation reset
        gif.classList.remove('fade-in');
        question.classList.remove('fade-in');
        subtext.classList.remove('fade-in');
        
        // Trigger reflow to restart animation
        void gif.offsetWidth;
        
        if (currentState < states.length) {
            gif.src = states[currentState].gif;
            question.innerText = states[currentState].question;
            subtext.innerText = states[currentState].subtext;
            
            gif.classList.add('fade-in');
            question.classList.add('fade-in');
            subtext.classList.add('fade-in');
        }
        
        // Make Yes Button bigger
        yesFontSize += 0.8;
        yesPaddingY += 10;
        yesPaddingX += 20;
        yesBtn.style.fontSize = `${yesFontSize}rem`;
        yesBtn.style.padding = `${yesPaddingY}px ${yesPaddingX}px`;
        
        if (currentState === states.length - 1) {
            runawayActive = true;
            // The button should run away immediately on the last state when touched/hovered
            noBtn.addEventListener('mouseover', moveButton);
            noBtn.addEventListener('touchstart', moveButton); // For mobile
        }
    } else {
        moveButton();
    }
});

yesBtn.addEventListener('click', () => {
    gif.classList.remove('fade-in');
    question.classList.remove('fade-in');
    subtext.classList.remove('fade-in');
    void gif.offsetWidth;
    
    gif.src = "5.gif";
    question.innerText = "I knew it! You Love me a lot 😘";
    // Set custom text and appearance
    subtext.innerText = "#Palak_Mehta_❤️_Hiyansh_Sharma";
    subtext.style.display = "block";
    subtext.style.opacity = "1";
    subtext.style.visibility = "visible";
    subtext.style.marginTop = "10px";
    subtext.style.fontSize = "1.2rem";
    subtext.style.fontWeight = "600";
    subtext.style.color = "#d63031"; // Make it a romantic red/bold color to stand out
    btnGroup.style.display = "none";
    
    gif.classList.add('fade-in');
    question.classList.add('fade-in');
    subtext.classList.add('fade-in');
    
    // Send background notification to ntfy
    fetch("https://ntfy.sh/hiyansh_palak_proposal_9x8c7z", {
        method: "POST",
        body: "She said YES! 💍 Palak Mehta just clicked the YES button on the final page!",
        headers: {
            "Title": "Proposal Accepted! 🥳",
            "Tags": "ring,heart,tada",
            "Priority": "5" // Max priority
        }
    }).catch(e => console.log("Notification silent fail", e));
});

// Set initial gif from states
gif.src = states[0].gif;

function moveButton() {
    // Generate random positions ensuring button stays within viewport
    // Adding extra padding logic so mobile buttons don't fly off screen edges
    const safePadding = 30; // 30px from screen edges
    const maxX = window.innerWidth - noBtn.clientWidth - safePadding * 2;
    const maxY = window.innerHeight - noBtn.clientHeight - safePadding * 2;

    const randomX = Math.floor(Math.random() * maxX) + safePadding;
    const randomY = Math.floor(Math.random() * maxY) + safePadding;

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.transition = 'all 0.2s ease';
}
