/* ==========================================================
   ECHOES OF BHARAT
   WEBSITE JAVASCRIPT
========================================================== */


/* ==========================================================
   SCROLL TO HERITAGE
========================================================== */

function scrollToHeritage() {

    const heritage = document.getElementById("heritage");

    heritage.scrollIntoView({
        behavior: "smooth"
    });

}


/* ==========================================================
   GO TO GAMES
========================================================== */

function goToGames() {

    const games = document.getElementById("games");

    games.scrollIntoView({
        behavior: "smooth"
    });

}


/* ==========================================================
   OPEN GAMES
========================================================== */

function openGames() {
    window.location.href = "arcade/index.html";

}


/* ==========================================================
   MONUMENT VIDEO GALLERY
========================================================== */

const monumentVideos = {
    "Taj Mahal": {
        title: "Taj Mahal: a story of love",
        place: "AGRA, UTTAR PRADESH",
        videoId: "EeIwMPaV858",
        description: "A short Smithsonian Channel introduction to the Taj Mahal and the story of Shah Jahan and Mumtaz Mahal."
    },
    "Konark Sun Temple": {
        title: "Sun Temple: stone and sunlight",
        place: "KONARK, ODISHA",
        videoId: "UGXhyw1H05U",
        description: "An educational introduction to the architecture, history, and conservation of Konark's Sun Temple."
    },
    "Hampi": {
        title: "Hampi: UNESCO heritage site",
        place: "HAMPI, KARNATAKA",
        videoId: "xwi-dk8H-do",
        description: "A brief visual introduction to Hampi's remarkable landscape and the legacy of Vijayanagara."
    },
    "Ajanta Caves": {
        title: "Ajanta: art carved in rock",
        place: "MAHARASHTRA",
        videoId: "Kx4n0t4ALaI",
        description: "An introduction to the Buddhist art, paintings, and rock-cut architecture of the Ajanta Caves."
    }
};

function playMonumentVideo(monument) {
    const video = monumentVideos[monument];
    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("monumentVideo");

    if (!video || !modal || !frame) return;

    document.getElementById("videoTitle").textContent = video.title;
    document.getElementById("videoEyebrow").textContent = video.place;
    document.getElementById("videoDescription").textContent = video.description;
    document.getElementById("videoExternalLink").href = `https://www.youtube.com/watch?v=${video.videoId}`;
    frame.src = `https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0&modestbranding=1&autoplay=1`;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeMonumentVideo() {
    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("monumentVideo");

    if (!modal || !frame) return;

    frame.src = "";
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}


/* ==========================================================
   HERITAGE PASSPORT + TIME COMPASS
========================================================== */

const timeCompassStories = {
    "Taj Mahal": { era: "MUGHAL ERA · 17TH CENTURY", mission: "Spot the idea behind its perfect symmetry: paired gardens, gateways, and marble details create a carefully balanced memorial." },
    "Konark Sun Temple": { era: "EASTERN GANGA DYNASTY · 13TH CENTURY", mission: "Imagine the temple as Surya's stone chariot. Look for how wheels, horses, and carvings turn architecture into a story." },
    "Jagannath Temple": { era: "ODISHA'S LIVING TRADITION", mission: "Notice how a monument can be more than stone: it can remain at the heart of a living cultural tradition." },
    "Hampi": { era: "VIJAYANAGARA EMPIRE · 14TH–16TH CENTURIES", mission: "Follow the clues of a great city: river, markets, temples, and boulder-strewn landscape all reveal how Hampi flourished." },
    "Sanchi Stupa": { era: "MAURYAN PERIOD · 3RD CENTURY BCE", mission: "Trace a clockwise path around the stupa in your mind. Its carved gateways tell stories without a written guide." },
    "Ajanta Caves": { era: "ANCIENT INDIA · 2ND CENTURY BCE ONWARD", mission: "Picture artists working by lamplight. The caves preserve paintings and sculpture shaped directly into rock." },
    "Red Fort": { era: "MUGHAL ERA · 17TH CENTURY", mission: "Look beyond the red sandstone walls: this fort was designed as an imperial city of halls, gardens, and ceremony." },
    "Charminar": { era: "DECCAN HERITAGE · 16TH CENTURY", mission: "Find the four great arches and minarets that made this crossroads monument a symbol of Hyderabad." }
};

let activeMonument = "";

function getPassport() {
    try { return JSON.parse(localStorage.getItem("bharatPassport") || "[]"); }
    catch { return []; }
}

function savePassport(stamps) {
    localStorage.setItem("bharatPassport", JSON.stringify(stamps));
}

function renderPassport() {
    const stamps = getPassport();
    const count = Math.min(stamps.length, Object.keys(timeCompassStories).length);
    const countEl = document.getElementById("passportCount");
    const fill = document.getElementById("passportFill");
    const status = document.getElementById("passportStatus");
    if (!countEl || !fill || !status) return;
    countEl.textContent = count;
    fill.style.width = `${(count / 8) * 100}%`;
    status.textContent = count === 0 ? "Your first journey is waiting." : count === 8 ? "Passport complete — you are a Heritage Guardian!" : `${8 - count} more ${8 - count === 1 ? "stamp" : "stamps"} until Heritage Guardian.`;
}

function showStampToast(title, alreadyCollected) {
    const existing = document.querySelector(".stamp-toast");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.className = "stamp-toast";
    toast.innerHTML = alreadyCollected ? `<strong>STAMP ALREADY IN PASSPORT</strong>${title} is part of your living collection.` : `<strong>✦ NEW HERITAGE STAMP</strong>${title} has been added to your Passport.`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3600);
}

function collectStamp(title) {
    if (!timeCompassStories[title]) return;
    const stamps = getPassport();
    const alreadyCollected = stamps.includes(title);
    if (!alreadyCollected) { stamps.push(title); savePassport(stamps); renderPassport(); }
    showStampToast(title, alreadyCollected);
}

function completeMission() {
    if (!activeMonument) return;
    collectStamp(activeMonument);
}

/* ==========================================================
   MONUMENT INFORMATION MODAL
========================================================== */

function openMonument(title, location, description) {

    activeMonument = title;

    document.getElementById("modalTitle").textContent = title;

    document.getElementById("modalLocation").textContent = location;

    document.getElementById("modalDescription").textContent = description;

    const story = timeCompassStories[title] || { era: "HERITAGE DISCOVERY", mission: "Look closely: architecture, place, and community together reveal a monument's story." };
    document.getElementById("compassEra").textContent = story.era;
    document.getElementById("compassMission").textContent = story.mission;

    document
        .getElementById("monumentModal")
        .classList.add("active");

}


/* ==========================================================
   CLOSE MONUMENT MODAL
========================================================== */

function closeMonument() {

    document
        .getElementById("monumentModal")
        .classList.remove("active");

}


/* ==========================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================================== */

document
    .getElementById("monumentModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeMonument();

        }

    });

document
    .getElementById("videoModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeMonumentVideo();

        }

    });

document.addEventListener("DOMContentLoaded", renderPassport);


/* ==========================================================
   ESC KEY CLOSES MODAL
========================================================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeMonument();
        closeMonumentVideo();

    }

});


/* ==========================================================
   MONUMENT SEARCH
========================================================== */

function searchMonuments() {

    const searchInput =
        document
            .getElementById("monumentSearch")
            .value
            .toLowerCase();

    const cards =
        document.querySelectorAll(".monument-card");


    cards.forEach(function(card) {

        const monumentName =
            card
                .getAttribute("data-name")
                .toLowerCase();


        if (monumentName.includes(searchInput)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


/* ==========================================================
   MORE HERITAGE
========================================================== */

function showMoreMessage() {
    window.location.href = "journey.html";

}


/* ==========================================================
   FUTURE LEARN PAGE
========================================================== */

function futureLearnPage() {
    window.location.href = "journey.html";

}


/* ==========================================================
   SIMPLE SCROLL REVEAL ANIMATION
========================================================== */

const observerOptions = {

    threshold: 0.12

};


const observer =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        observerOptions
    );


/* Observe monument cards */

document
    .querySelectorAll(".monument-card")
    .forEach(function(card) {

        card.style.opacity = "0";

        card.style.transform = "translateY(30px)";

        card.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        observer.observe(card);

    });


/* Observe why cards */

document
    .querySelectorAll(".why-card")
    .forEach(function(card) {

        card.style.opacity = "0";

        card.style.transform = "translateY(30px)";

        card.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        observer.observe(card);

    });/* =====================================================
   ECHOES OF BHARAT
   HERITAGE QUEST 3.0
===================================================== */


/* =====================================================
   PUZZLE DATABASE
===================================================== */

const heritagePuzzles = [

    /* =================================================
       LEVEL I
    ================================================= */

    {
        id: 1,
        level: 1,
        levelName: "EXPLORER",
        type: "mcq",

        category: "MONUMENT MYSTERY",

        question:
            "Which heritage city was the capital of the Vijayanagara Empire?",

        options: [
            "Hampi",
            "Agra",
            "Patna",
            "Jaipur"
        ],

        answer: 0,

        fact:
            "Hampi preserves the remains of the capital of the Vijayanagara Empire. UNESCO describes the site as containing extensive royal, sacred, civil and military remains."
    },


    {
        id: 2,
        level: 1,
        levelName: "EXPLORER",
        type: "mcq",

        category: "HERITAGE MAP",

        question:
            "The famous Sun Temple at Konark is located in which state?",

        options: [
            "Odisha",
            "Karnataka",
            "Rajasthan",
            "Maharashtra"
        ],

        answer: 0,

        fact:
            "The Sun Temple at Konark is one of India's UNESCO World Heritage cultural properties."
    },


    {
        id: 3,
        level: 1,
        levelName: "EXPLORER",
        type: "scramble",

        category: "ANCIENT WORD",

        question:
            "Unscramble the letters to discover the famous heritage site.",

        letters: [
            "M",
            "A",
            "P",
            "H",
            "I"
        ],

        answer:
            "HAMPI",

        fact:
            "Hampi was the capital of the Vijayanagara Empire and is now a major archaeological and heritage landscape in Karnataka."
    },


    {
        id: 4,
        level: 1,
        levelName: "EXPLORER",
        type: "clue",

        category: "HERITAGE DETECTIVE",

        question:
            "Can you identify the monument from the clues?",

        clues: [

            "I stand beside the Tungabhadra River.",

            "I belong to the historic landscape of Vijayanagara.",

            "My complex contains a famous granite stone chariot."

        ],

        options: [
            "Hampi",
            "Sanchi",
            "Konark",
            "Ajanta"
        ],

        answer: 0,

        fact:
            "The Vittala Temple complex at Hampi includes the famous stone chariot and is one of the best-known parts of the World Heritage site."
    },


    /* =================================================
       LEVEL II
    ================================================= */

    {
        id: 5,
        level: 2,
        levelName: "TIME TRAVELER",
        type: "ordering",

        category: "TIME TRAVEL",

        question:
            "Arrange these heritage sites from the oldest to the newest period represented.",

        items: [

            {
                id: "ajanta",
                text: "Ajanta Caves"
            },

            {
                id: "maha",
                text: "Mahabalipuram"
            },

            {
                id: "hampi",
                text: "Hampi"
            },

            {
                id: "taj",
                text: "Taj Mahal"
            }

        ],

        correctOrder: [
            "ajanta",
            "maha",
            "hampi",
            "taj"
        ],

        fact:
            "Ajanta's earliest phase dates to the 2nd–1st centuries BCE; Mahabalipuram's monuments were created mainly in the 7th–8th centuries CE; Hampi flourished as the Vijayanagara capital from the 14th–16th centuries; the Taj Mahal was built in the 17th century."
    },


    {
        id: 6,
        level: 2,
        levelName: "TIME TRAVELER",
        type: "matching",

        category: "HERITAGE MATCH",

        question:
            "Match each heritage site with its state.",

        left: [
            {
                id: "hampi",
                text: "Hampi"
            },

            {
                id: "ajanta",
                text: "Ajanta Caves"
            },

            {
                id: "konark",
                text: "Konark Sun Temple"
            },

            {
                id: "maha",
                text: "Mahabalipuram"
            }
        ],

        right: [
            {
                id: "odisha",
                text: "Odisha"
            },

            {
                id: "karnataka",
                text: "Karnataka"
            },

            {
                id: "maharashtra",
                text: "Maharashtra"
            },

            {
                id: "tamilnadu",
                text: "Tamil Nadu"
            }
        ],

        pairs: {

            hampi: "karnataka",

            ajanta: "maharashtra",

            konark: "odisha",

            maha: "tamilnadu"

        },

        fact:
            "These four sites represent major heritage traditions across different regions of India."
    },


    {
        id: 7,
        level: 2,
        levelName: "TIME TRAVELER",
        type: "mcq",

        category: "SYMBOL QUEST",

        question:
            "How many spokes are present in the Ashoka Chakra?",

        options: [
            "24",
            "18",
            "12",
            "32"
        ],

        answer: 0,

        fact:
            "The Ashoka Chakra has 24 spokes and appears at the centre of India's national flag."
    },


    {
        id: 8,
        level: 2,
        levelName: "TIME TRAVELER",
        type: "mcq",

        category: "ARCHITECTURE",

        question:
            "The monuments at Mahabalipuram were created under the patronage of which dynasty?",

        options: [
            "Pallavas",
            "Mauryas",
            "Mughals",
            "Cholas"
        ],

        answer: 0,

        fact:
            "UNESCO identifies Mahabalipuram as a major testimony to Pallava civilization, with rock-cut and structural monuments created mainly during the 7th and 8th centuries."
    },


    /* =================================================
       LEVEL III
    ================================================= */

    {
        id: 9,
        level: 3,
        levelName: "HERITAGE MASTER",
        type: "matching",

        category: "CULTURE TRAIL",

        question:
            "Match each classical dance tradition with its associated state.",

        left: [

            {
                id: "bharatanatyam",
                text: "Bharatanatyam"
            },

            {
                id: "kathakali",
                text: "Kathakali"
            },

            {
                id: "odissi",
                text: "Odissi"
            },

            {
                id: "kuchipudi",
                text: "Kuchipudi"
            }

        ],

        right: [

            {
                id: "tamilnadu",
                text: "Tamil Nadu"
            },

            {
                id: "kerala",
                text: "Kerala"
            },

            {
                id: "odisha",
                text: "Odisha"
            },

            {
                id: "andhra",
                text: "Andhra Pradesh"
            }

        ],

        pairs: {

            bharatanatyam: "tamilnadu",

            kathakali: "kerala",

            odissi: "odisha",

            kuchipudi: "andhra"

        },

        fact:
            "India's classical dance traditions developed in different regions and carry distinctive performance, musical and storytelling traditions."
    },


    {
        id: 10,
        level: 3,
        levelName: "HERITAGE MASTER",
        type: "clue",

        category: "THE FINAL DETECTIVE",

        question:
            "Who am I?",

        clues: [

            "I am carved from stone.",

            "I look like a ceremonial chariot.",

            "I stand within the Vittala Temple complex.",

            "Travelers come to Hampi to see me."

        ],

        options: [

            "Stone Chariot",
            "Ashoka Pillar",
            "Shore Temple",
            "Sanchi Stupa"

        ],

        answer: 0,

        fact:
            "The Stone Chariot is one of the iconic monuments within the Vittala Temple complex at Hampi."
    },


    {
        id: 11,
        level: 3,
        levelName: "HERITAGE MASTER",
        type: "scramble",

        category: "DECODE THE SCROLL",

        question:
            "Decode the ancient name hidden in these letters.",

        letters: [

            "K",
            "O",
            "N",
            "A",
            "R",
            "K"

        ],

        answer:
            "KONARK",

        fact:
            "Konark's famous Sun Temple is an important example of India's temple architecture and was inscribed on the UNESCO World Heritage List in 1984."
    },


    {
        id: 12,
        level: 3,
        levelName: "HERITAGE MASTER",
        type: "mcq",

        category: "FINAL CHALLENGE",

        question:
            "Which ancient centre of learning is located at a UNESCO World Heritage site in Bihar?",

        options: [

            "Nalanda",
            "Hampi",
            "Mahabalipuram",
            "Konark"

        ],

        answer: 0,

        fact:
            "The Archaeological Site of Nalanda Mahavihara at Nalanda, Bihar is included on UNESCO's World Heritage List."
    }

];


/* =====================================================
   GAME VARIABLES
===================================================== */

let currentPuzzle = 0;

let totalScore = 0;

let lives = 3;

let timeLeft = 20;

let timerInterval = null;

let answered = false;

let combo = 0;

let correctAnswers = 0;

let wrongAnswers = 0;

let selectedOrder = [];

let matchingSelections = [];
let hintUsed = false;
let questSoundOn = true;
let bestCombo = 0;
let audioContext = null;



/* =====================================================
   OPEN
===================================================== */

function openHeritageQuest() {

    const game =
        document.getElementById(
            "heritageQuest"
        );

    if (!game) return;

    game.classList.add("active");

    document.body.style.overflow =
        "hidden";

    const savedSound = localStorage.getItem("echoesQuestSound");
    if (savedSound !== null) questSoundOn = savedSound !== "off";
    updateSoundButton();
}


/* =====================================================
   CLOSE
===================================================== */

function closeHeritageQuest() {

    clearInterval(
        timerInterval
    );

    const game =
        document.getElementById(
            "heritageQuest"
        );

    if (!game) return;

    game.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


/* =====================================================
   START
===================================================== */

function startQuest() {

    currentPuzzle = 0;

    totalScore = 0;

    lives = 3;

    combo = 0;

    correctAnswers = 0;

    wrongAnswers = 0;

    answered = false;

    selectedOrder = [];

    matchingSelections = [];

    clearInterval(
        timerInterval
    );


    document
        .getElementById("questStart")
        .classList.add("hidden");


    document
        .getElementById("questResult")
        .classList.add("hidden");


    document
        .getElementById("questGame")
        .classList.remove("hidden");


    updateScore();

    updateLives();

    loadPuzzle();

}


/* =====================================================
   LOAD PUZZLE
===================================================== */

function loadPuzzle() {

    clearInterval(
        timerInterval
    );

    answered = false;

    selectedOrder = [];

    matchingSelections = [];


    const puzzle =
        heritagePuzzles[
            currentPuzzle
        ];

    hintUsed = false;
    const hintBox = document.getElementById("hintBox");
    if (hintBox) { hintBox.classList.add("hidden"); hintBox.textContent = ""; }
    const hintBtn = document.getElementById("hintBtn");
    if (hintBtn) { hintBtn.disabled = false; hintBtn.innerHTML = '💡 HINT <span id="hintCost">-40</span>'; }
    const puzzleCard = document.querySelector(".puzzle-card");
    if (puzzleCard) { puzzleCard.classList.remove("quest-pulse"); void puzzleCard.offsetWidth; puzzleCard.classList.add("quest-pulse"); }


    /* STATUS */

    document
        .getElementById("puzzleNumber")
        .textContent =
        `${currentPuzzle + 1} / ${heritagePuzzles.length}`;


    const levelRoman =

        puzzle.level === 1
            ? "I"
            : puzzle.level === 2
                ? "II"
                : "III";


    document
        .getElementById("levelDisplay")
        .textContent =
        levelRoman;


    document
        .getElementById("puzzleLevel")
        .textContent =
        `LEVEL ${levelRoman} • ${puzzle.levelName}`;


    document
        .getElementById("puzzleCategory")
        .textContent =
        puzzle.category;


    document
        .getElementById("puzzleQuestion")
        .textContent =
        puzzle.question;


    /* CLEAR */

    document
        .getElementById("feedback")
        .innerHTML = "";


    document
        .getElementById("feedback")
        .className =
        "quest-feedback";


    document
        .getElementById("comboDisplay")
        .textContent = "";


    document
        .getElementById("nextBtn")
        .classList.add(
            "hidden"
        );


    /* PROGRESS */

    const progress =

        (currentPuzzle /
            heritagePuzzles.length)
        * 100;


    document
        .getElementById("progressBar")
        .style.width =
        progress + "%";


    /* RENDER */

    renderPuzzle(
        puzzle
    );


    startTimer();

}


/* =====================================================
   RENDER PUZZLE
===================================================== */

function renderPuzzle(
    puzzle
) {

    const container =
        document.getElementById(
            "puzzleContent"
        );


    container.innerHTML =
        "";


    if (puzzle.type === "mcq") {

        renderMCQ(
            puzzle,
            container
        );

    }

    else if (
        puzzle.type === "scramble"
    ) {

        renderScramble(
            puzzle,
            container
        );

    }

    else if (
        puzzle.type === "ordering"
    ) {

        renderOrdering(
            puzzle,
            container
        );

    }

    else if (
        puzzle.type === "matching"
    ) {

        renderMatching(
            puzzle,
            container
        );

    }

    else if (
        puzzle.type === "clue"
    ) {

        renderClue(
            puzzle,
            container
        );

    }

}


/* =====================================================
   MCQ
===================================================== */

function renderMCQ(
    puzzle,
    container
) {

    const options =
        document.createElement(
            "div"
        );


    options.className =
        "options";


    puzzle.options.forEach(
        (
            option,
            index
        ) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "option";


            button.textContent =
                option;


            button.onclick =
                function() {

                    answerMCQ(
                        index,
                        button
                    );

                };


            options.appendChild(
                button
            );

        }
    );


    container.appendChild(
        options
    );

}


/* =====================================================
   MCQ ANSWER
===================================================== */

function answerMCQ(
    selected,
    button
) {

    if (answered) return;

    answered = true;

    clearInterval(
        timerInterval
    );


    const puzzle =
        heritagePuzzles[
            currentPuzzle
        ];


    const buttons =
        document.querySelectorAll(
            ".option"
        );


    buttons.forEach(
        b => {

            b.style.pointerEvents =
                "none";

        }
    );


    if (
        selected ===
        puzzle.answer
    ) {

        handleCorrect(
            puzzle,
            button
        );

    }

    else {

        handleWrong(
            puzzle,
            button
        );

    }

}


/* =====================================================
   SCRAMBLE
===================================================== */

function renderScramble(
    puzzle,
    container
) {

    const word =
        document.createElement(
            "div"
        );


    word.className =
        "scramble-word";


    const shuffled =
        [...puzzle.letters]
        .sort(
            () =>
                Math.random() - .5
        );


    shuffled.forEach(
        letter => {

            const tile =
                document.createElement(
                    "div"
                );


            tile.className =
                "letter-tile";


            tile.textContent =
                letter;


            word.appendChild(
                tile
            );

        }
    );


    container.appendChild(
        word
    );


    const input =
        document.createElement(
            "input"
        );


    input.className =
        "answer-input";


    input.placeholder =
        "Type your answer";


    input.id =
        "scrambleInput";


    const button =
        document.createElement(
            "button"
        );


    button.className =
        "submit-answer";


    button.textContent =
        "SUBMIT";


    button.onclick =
        function() {

            checkScramble(
                input
            );

        };


    container.appendChild(
        input
    );


    container.appendChild(
        button
    );


    input.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Enter"
            ) {

                checkScramble(
                    input
                );

            }

        }
    );

}


/* =====================================================
   SCRAMBLE ANSWER
===================================================== */

function checkScramble(
    input
) {

    if (answered) return;


    const puzzle =
        heritagePuzzles[
            currentPuzzle
        ];


    const userAnswer =
        input.value
            .trim()
            .toUpperCase();


    if (!userAnswer) return;


    answered = true;

    clearInterval(
        timerInterval
    );


    if (
        userAnswer ===
        puzzle.answer
    ) {

        handleCorrect(
            puzzle
        );

    }

    else {

        handleWrong(
            puzzle
        );

    }

}


/* =====================================================
   ORDERING
===================================================== */

function renderOrdering(
    puzzle,
    container
) {

    const list =
        document.createElement(
            "div"
        );


    list.className =
        "order-list";


    const shuffled =
        [...puzzle.items]
        .sort(
            () =>
                Math.random() - .5
        );


    shuffled.forEach(
        item => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "order-item";


            element.dataset.id =
                item.id;


            element.textContent =
                item.text;


            element.onclick =
                function() {

                    selectOrderItem(
                        element,
                        item.id,
                        puzzle
                    );

                };


            list.appendChild(
                element
            );

        }
    );


    container.appendChild(
        list
    );


    const hint =
        document.createElement(
            "div"
        );


    hint.className =
        "order-hint";


    hint.textContent =
        "Click the items in the order you believe is correct.";


    container.appendChild(
        hint
    );

}


/* =====================================================
   ORDER SELECT
===================================================== */

function selectOrderItem(
    element,
    id,
    puzzle
) {

    if (answered) return;


    if (
        selectedOrder.includes(id)
    ) return;


    selectedOrder.push(id);

    element.classList.add(
        "selected"
    );


    element.textContent =
        `${selectedOrder.length}. ${
            puzzle.items.find(
                item =>
                    item.id === id
            ).text
        }`;


    if (
        selectedOrder.length ===
        puzzle.correctOrder.length
    ) {

        answered = true;

        clearInterval(
            timerInterval
        );


        const correct =
            JSON.stringify(
                selectedOrder
            ) ===
            JSON.stringify(
                puzzle.correctOrder
            );


        if (correct) {

            handleCorrect(
                puzzle
            );

        }

        else {

            handleWrong(
                puzzle
            );

        }

    }

}


/* =====================================================
   MATCHING
===================================================== */

function renderMatching(
    puzzle,
    container
) {

    const grid =
        document.createElement(
            "div"
        );


    grid.className =
        "match-grid";


    const leftColumn =
        document.createElement(
            "div"
        );


    leftColumn.className =
        "match-column";


    const leftTitle =
        document.createElement(
            "h4"
        );


    leftTitle.textContent =
        "HERITAGE";


    leftColumn.appendChild(
        leftTitle
    );


    puzzle.left.forEach(
        item => {

            const element =
                createMatchItem(
                    item,
                    "left"
                );

            leftColumn.appendChild(
                element
            );

        }
    );


    const rightColumn =
        document.createElement(
            "div"
        );


    rightColumn.className =
        "match-column";


    const rightTitle =
        document.createElement(
            "h4"
        );


    rightTitle.textContent =
        "MATCH WITH";


    rightColumn.appendChild(
        rightTitle
    );


    const shuffled =
        [...puzzle.right]
        .sort(
            () =>
                Math.random() - .5
        );


    shuffled.forEach(
        item => {

            const element =
                createMatchItem(
                    item,
                    "right"
                );

            rightColumn.appendChild(
                element
            );

        }
    );


    grid.appendChild(
        leftColumn
    );


    grid.appendChild(
        rightColumn
    );


    container.appendChild(
        grid
    );

}


/* =====================================================
   MATCH ITEM
===================================================== */

function createMatchItem(
    item,
    side
) {

    const element =
        document.createElement(
            "div"
        );


    element.className =
        "match-item";


    element.textContent =
        item.text;


    element.dataset.id =
        item.id;


    element.dataset.side =
        side;


    element.onclick =
        function() {

            selectMatch(
                element
            );

        };


    return element;

}


/* =====================================================
   MATCH SELECT
===================================================== */

function selectMatch(
    element
) {

    if (answered) return;


    if (
        element.classList.contains(
            "matched"
        )
    ) return;


    const side =
        element.dataset.side;


    document
        .querySelectorAll(
            `.match-item[data-side="${side}"]`
        )
        .forEach(
            item => {

                item.classList.remove(
                    "selected"
                );

            }
        );


    element.classList.add(
        "selected"
    );


    matchingSelections =
        matchingSelections.filter(
            item =>
                item.side !== side
        );


    matchingSelections.push({

        side:
            side,

        id:
            element.dataset.id,

        element:
            element

    });


    if (
        matchingSelections.length === 2
    ) {

        evaluateMatch();

    }

}


/* =====================================================
   EVALUATE MATCH
===================================================== */

function evaluateMatch() {

    const first =
        matchingSelections[0];


    const second =
        matchingSelections[1];


    if (
        first.side ===
        second.side
    ) {

        matchingSelections = [];

        return;

    }


    const left =
        first.side === "left"
            ? first
            : second;


    const right =
        first.side === "right"
            ? first
            : second;


    const puzzle =
        heritagePuzzles[
            currentPuzzle
        ];


    if (
        puzzle.pairs[
            left.id
        ] === right.id
    ) {

        left.element.classList.add(
            "matched"
        );

        right.element.classList.add(
            "matched"
        );


        left.element.classList.remove(
            "selected"
        );

        right.element.classList.remove(
            "selected"
        );


        matchingSelections = [];


        const matched =
            document.querySelectorAll(
                ".match-item.matched"
            );


        if (
            matched.length ===
            puzzle.left.length * 2
        ) {

            answered = true;

            clearInterval(
                timerInterval
            );

            handleCorrect(
                puzzle
            );

        }

    }

    else {

        left.element.classList.add(
            "selected"
        );

        right.element.classList.add(
            "selected"
        );


        setTimeout(
            () => {

                left.element.classList.remove(
                    "selected"
                );

                right.element.classList.remove(
                    "selected"
                );

            },
            500
        );


        matchingSelections = [];

    }

}


/* =====================================================
   CLUE PUZZLE
===================================================== */

function renderClue(
    puzzle,
    container
) {

    const box =
        document.createElement(
            "div"
        );


    box.className =
        "clue-box";


    puzzle.clues.forEach(
        (
            clue,
            index
        ) => {

            const line =
                document.createElement(
                    "div"
                );


            line.className =
                "clue";


            line.innerHTML =
                `<span class="clue-number">
                    CLUE ${index + 1}
                </span>
                — ${clue}`;


            box.appendChild(
                line
            );

        }
    );


    container.appendChild(
        box
    );


    const options =
        document.createElement(
            "div"
        );


    options.className =
        "options";


    puzzle.options.forEach(
        (
            option,
            index
        ) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "option";


            button.textContent =
                option;


            button.onclick =
                function() {

                    answerMCQ(
                        index,
                        button
                    );

                };


            options.appendChild(
                button
            );

        }
    );


    container.appendChild(
        options
    );

}


/* =====================================================
   CORRECT ANSWER
===================================================== */

function handleCorrect(
    puzzle,
    button = null
) {

    correctAnswers++;

    combo++;


    let points =
        100;


    points +=
        timeLeft * 5;


    if (combo >= 2) {

        points +=
            combo * 25;

    }


    totalScore +=
        points;

    bestCombo = Math.max(bestCombo, combo);
    celebrateCorrect();
    playQuestTone("correct");


    if (button) {

        button.classList.add(
            "correct"
        );

    }


    updateScore();


    const feedback =
        document.getElementById(
            "feedback"
        );


    feedback.className =
        "quest-feedback feedback-correct";


    feedback.innerHTML =
        `
        <strong>✓ CORRECT!</strong>
        +${points} POINTS

        <br><br>

        ${puzzle.fact}
        `;


    if (combo >= 2) {

        const comboDisplay =
            document.getElementById(
                "comboDisplay"
            );


        comboDisplay.textContent =
            `🔥 ${combo}× COMBO!`;


        comboDisplay.classList.add(
            "combo-animation"
        );

    }


    document
        .getElementById("nextBtn")
        .classList.remove(
            "hidden"
        );

}


/* =====================================================
   WRONG ANSWER
===================================================== */

function handleWrong(
    puzzle,
    button = null
) {

    wrongAnswers++;

    combo = 0;

    lives--;


    if (button) {

        button.classList.add(
            "wrong"
        );

    }


    updateLives();


    const feedback =
        document.getElementById(
            "feedback"
        );


    feedback.className =
        "quest-feedback feedback-wrong";


    let correctText =
        "";


    if (
        puzzle.type === "scramble"
    ) {

        correctText =
            `The answer was <strong>${puzzle.answer}</strong>.`;

    }

    else if (
        puzzle.type === "ordering"
    ) {

        const orderedNames =
            puzzle.correctOrder
                .map(
                    id => {

                        return puzzle.items
                            .find(
                                item =>
                                    item.id === id
                            )
                            .text;

                    }
                );


        correctText =
            `Correct order:
            <strong>
            ${orderedNames.join(" → ")}
            </strong>`;

    }

    else if (
        puzzle.type === "matching"
    ) {

        correctText =
            `Review the heritage matches and try the challenge again.`;

    }

    else {

        correctText =
            `The correct answer was
            <strong>
            ${puzzle.options[puzzle.answer]}
            </strong>.`;

    }


    feedback.innerHTML =
        `
        <strong>✕ NOT QUITE!</strong>

        <br>

        ${correctText}

        <br><br>

        ${puzzle.fact}
        `;


    document
        .getElementById("nextBtn")
        .classList.remove(
            "hidden"
        );


    if (lives <= 0) {

        document
            .getElementById("nextBtn")
            .textContent =
            "VIEW RESULT →";

    }

}


/* =====================================================
   TIMER
===================================================== */

function startTimer() {

    timeLeft = 20;

    updateTimer();


    timerInterval =
        setInterval(
            () => {

                timeLeft--;

                updateTimer();


                if (
                    timeLeft <= 0
                ) {

                    clearInterval(
                        timerInterval
                    );

                    timeExpired();

                }

            },
            1000
        );

}


/* =====================================================
   UPDATE TIMER
===================================================== */

function updateTimer() {

    const timer =
        document.getElementById(
            "timer"
        );


    if (!timer) return;


    timer.textContent =
        timeLeft;


    if (
        timeLeft <= 5
    ) {

        timer.style.color =
            "#ef7777";

    }

    else {

        timer.style.color =
            "#f2c35b";

    }

}


/* =====================================================
   TIME EXPIRED
===================================================== */

function timeExpired() {

    if (answered) return;


    answered = true;

    wrongAnswers++;

    combo = 0;

    lives--;


    updateLives();


    const puzzle =
        heritagePuzzles[
            currentPuzzle
        ];


    const feedback =
        document.getElementById(
            "feedback"
        );


    feedback.className =
        "quest-feedback feedback-wrong";


    feedback.innerHTML =
        `
        <strong>⏱ TIME'S UP!</strong>

        <br><br>

        ${puzzle.fact}
        `;


    document
        .getElementById("nextBtn")
        .classList.remove(
            "hidden"
        );


    if (lives <= 0) {

        document
            .getElementById("nextBtn")
            .textContent =
            "VIEW RESULT →";

    }

}


/* =====================================================
   HINT + SOUND + MICRO INTERACTIONS
===================================================== */
function useHint() {
    if (answered || hintUsed) return;
    const puzzle = heritagePuzzles[currentPuzzle];
    const hintBox = document.getElementById("hintBox");
    const hintBtn = document.getElementById("hintBtn");
    if (!hintBox || !hintBtn) return;
    const hints = {
        1: "Think of the great Vijayanagara capital in present-day Karnataka.",
        2: "The Sun Temple is on India's eastern coast, in the state famous for Odia culture.",
        3: "These five letters form the same city from Puzzle 1.",
        4: "The answer is the historic Vijayanagara landscape beside the Tungabhadra.",
        5: "Ajanta comes first; the Taj Mahal comes last.",
        6: "Hampi and Konark are in Karnataka and Odisha respectively.",
        7: "The number is the same as the number of spokes shown on the wheel in India's flag.",
        8: "Think of the Pallava rulers and the rock-cut monuments of the Coromandel Coast.",
        9: "Bharatanatyam is linked with Tamil Nadu; Kuchipudi with Andhra Pradesh.",
        10: "It is the famous chariot-shaped stone monument in the Vittala Temple complex.",
        11: "The letters spell the name of the famous Sun Temple site.",
        12: "The ancient university site is in Bihar."
    };
    totalScore = Math.max(0, totalScore - 40);
    hintUsed = true;
    hintBox.textContent = "💡 Hint: " + (hints[puzzle.id] || "Look closely at the wording of the question.");
    hintBox.classList.remove("hidden");
    hintBtn.disabled = true;
    updateScore();
    playQuestTone("hint");
}

function getAudioContext() {
    if (!audioContext) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return null;
        audioContext = new Ctx();
    }
    if (audioContext.state === "suspended") audioContext.resume();
    return audioContext;
}

function playQuestTone(kind) {
    if (!questSoundOn) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = kind === "correct" ? [523.25,659.25,783.99] : kind === "wrong" ? [220,174.61] : kind === "level" ? [392,523.25,659.25,783.99] : [330];
    notes.forEach((freq,i)=>{
        const osc=ctx.createOscillator(), gain=ctx.createGain();
        osc.type="sine"; osc.frequency.value=freq;
        gain.gain.setValueAtTime(0.0001,now+i*.09);
        gain.gain.exponentialRampToValueAtTime(0.055,now+i*.09+.02);
        gain.gain.exponentialRampToValueAtTime(0.0001,now+i*.09+.18);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now+i*.09); osc.stop(now+i*.09+.2);
    });
}

function toggleQuestSound() {
    questSoundOn=!questSoundOn;
    localStorage.setItem("echoesQuestSound",questSoundOn?"on":"off");
    updateSoundButton();
    if(questSoundOn) playQuestTone("hint");
}

function updateSoundButton() {
    const btn=document.getElementById("soundBtn");
    if(btn) btn.textContent=questSoundOn?"🔊 SOUND ON":"🔇 SOUND OFF";
}

function showLevelFlash(level,name) {
    const flash=document.createElement("div");
    flash.className="quest-level-flash";
    flash.innerHTML=`<div><small>LEVEL ${level} UNLOCKED</small><strong>${name}</strong></div>`;
    document.body.appendChild(flash);
    setTimeout(()=>flash.remove(),1750);
    playQuestTone("level");
}

function celebrateCorrect() {
    const el=document.createElement("div");
    el.className="quest-celebrate";
    el.textContent=combo>=3?"🔥🔥🔥 AMAZING COMBO!":"✨ CORRECT! ✨";
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),1150);
}

/* =====================================================
   NEXT
===================================================== */

function nextPuzzle() {

    clearInterval(
        timerInterval
    );


    if (lives <= 0) {

        showResult();

        return;

    }


    currentPuzzle++;


    if (
        currentPuzzle >=
        heritagePuzzles.length
    ) {

        showResult();

        return;

    }


    const previousLevel = heritagePuzzles[currentPuzzle - 1]?.level;
    const nextLevel = heritagePuzzles[currentPuzzle]?.level;
    if (nextLevel && previousLevel && nextLevel > previousLevel) {
        showLevelFlash(nextLevel, heritagePuzzles[currentPuzzle].levelName);
    }
    loadPuzzle();

}


/* =====================================================
   SCORE
===================================================== */

function updateScore() {

    document
        .getElementById("score")
        .textContent =
        `⭐ ${totalScore}`;

}


/* =====================================================
   LIVES
===================================================== */

function updateLives() {

    let hearts = "";


    for (
        let i = 0;
        i < lives;
        i++
    ) {

        hearts += "❤️";

    }


    if (!hearts) {

        hearts = "💀";

    }


    document
        .getElementById("lives")
        .textContent =
        hearts;

}


/* =====================================================
   RESULT
===================================================== */

function showResult() {

    clearInterval(
        timerInterval
    );


    document
        .getElementById("questGame")
        .classList.add(
            "hidden"
        );


    document
        .getElementById("questResult")
        .classList.remove(
            "hidden"
        );


    document
        .getElementById("finalScore")
        .textContent =
        totalScore;


    document
        .getElementById("correctCount")
        .textContent =
        correctAnswers;


    document
        .getElementById("wrongCount")
        .textContent =
        wrongAnswers;


    /* HIGH SCORE */

    let bestScore =
        Number(
            localStorage.getItem(
                "echoesHeritageBestScore"
            ) || 0
        );


    if (
        totalScore >
        bestScore
    ) {

        bestScore =
            totalScore;


        localStorage.setItem(
            "echoesHeritageBestScore",
            bestScore
        );

    }


    document
        .getElementById("bestScore")
        .textContent =
        bestScore;


    /* RESULT */

    let title;

    let message;

    let badge;

    let icon;


    if (
        totalScore >= 1100
    ) {

        icon = "👑";

        title =
            "BHARAT HERITAGE MASTER";

        badge =
            "👑 BHARAT HERITAGE MASTER";

        message =
            "Remarkable! You have recovered the entire Heritage Scroll and mastered the quest.";

    }

    else if (
        totalScore >= 850
    ) {

        icon = "🏆";

        title =
            "HERITAGE CHAMPION";

        badge =
            "🏆 HERITAGE CHAMPION";

        message =
            "Excellent work! Your journey through India's heritage was outstanding.";

    }

    else if (
        totalScore >= 600
    ) {

        icon = "🥇";

        title =
            "TIME TRAVELER";

        badge =
            "🥇 TIME TRAVELER";

        message =
            "You successfully travelled across different chapters of India's heritage.";

    }

    else if (
        totalScore >= 350
    ) {

        icon = "🥈";

        title =
            "HERITAGE EXPLORER";

        badge =
            "🥈 HERITAGE EXPLORER";

        message =
            "A strong beginning! Keep exploring India's monuments, stories and traditions.";

    }

    else {

        icon = "🧭";

        title =
            "CURIOUS TRAVELER";

        badge =
            "🧭 CURIOUS TRAVELER";

        message =
            "Your journey has only begun. Explore again and try to recover more of the Heritage Scroll.";

    }


    document
        .getElementById("resultIcon")
        .textContent =
        icon;


    document
        .getElementById("resultTitle")
        .textContent =
        title;


    document
        .getElementById("resultMessage")
        .textContent =
        `${message} Best combo: ${bestCombo}×`;


    document
        .getElementById("badge")
        .textContent =
        badge;


    document
        .getElementById("progressBar")
        .style.width =
        "100%";

}


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeHeritageQuest();

        }

    }
);
