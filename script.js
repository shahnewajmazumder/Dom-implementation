// 1. Registration Form DOM Implementation

const form = document.getElementById("registrationForm");
const result = document.getElementById("result");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const courseSelect = document.getElementById("course");

// Elements of the live student card
const idCard = document.getElementById("idCard");
const avatar = document.getElementById("avatar");
const cardName = document.getElementById("cardName");
const cardEmail = document.getElementById("cardEmail");
const cardCourse = document.getElementById("cardCourse");
const cardStatus = document.getElementById("cardStatus");

// Fill the card while the user types
function updateCard() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const course = courseSelect.value;

    cardName.textContent = name || "Your name";
    cardName.classList.toggle("empty", !name);

    cardEmail.textContent = email || "your@email.com";
    cardEmail.classList.toggle("empty", !email);

    cardCourse.textContent = course ? "Course: " + course : "Course not chosen";
    avatar.textContent = name ? name.charAt(0).toUpperCase() : "?";

    // Any edit after registering turns the card back into a draft
    if (idCard.classList.contains("done")) {
        idCard.classList.remove("done");
        cardStatus.textContent = "Draft card. Not registered yet.";
    }
}

nameInput.addEventListener("input", updateCard);
emailInput.addEventListener("input", updateCard);
courseSelect.addEventListener("change", updateCard);

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const course = courseSelect.value;

    result.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = "Registration Successful!";

    const nameText = document.createElement("p");
    nameText.textContent = "Name: " + name;

    const emailText = document.createElement("p");
    emailText.textContent = "Email: " + email;

    const courseText = document.createElement("p");
    courseText.textContent = "Course: " + course;

    result.append(heading, nameText, emailText, courseText);
    result.style.display = "block";

    // Stamp the card
    idCard.classList.add("done");
    cardStatus.textContent = "Welcome aboard, " + name.split(" ")[0] + ".";
});

// Clear everything when the form is reset
form.addEventListener("reset", function () {
    result.style.display = "none";
    result.replaceChildren();

    // Wait one tick so the inputs are empty before the card reads them
    setTimeout(function () {
        idCard.classList.remove("done");
        updateCard();
        cardStatus.textContent = "Draft card. Not registered yet.";
    }, 0);
});


// 2. Interactive Page Using Buttons

const message = document.getElementById("message");
const counterDisplay = document.getElementById("counter");
const demoBox = document.getElementById("demoBox");

let count = 0;
let colorIndex = 0;
let textIndex = -1;

const colors = [
    "#eef2ff",
    "#dcfce7",
    "#fff3b0",
    "#ffd9e8",
    "#cdeffd"
];

const messages = [
    "Great! You changed the text using DOM.",
    "textContent just rewrote this line.",
    "JavaScript is editing the page live.",
    "Same element, brand new words."
];

// Little pop on the number whenever it changes
function showCount() {
    counterDisplay.textContent = count;
    counterDisplay.classList.remove("bump");
    void counterDisplay.offsetWidth; // restart the animation
    counterDisplay.classList.add("bump");
}

// Change text
document.getElementById("changeText")
    .addEventListener("click", function () {
        textIndex = (textIndex + 1) % messages.length;
        message.textContent = messages[textIndex];
    });

// Change background color
document.getElementById("changeColor")
    .addEventListener("click", function () {
        colorIndex = (colorIndex + 1) % colors.length;
        demoBox.style.backgroundColor = colors[colorIndex];
    });

// Increase counter
document.getElementById("increase")
    .addEventListener("click", function () {
        count++;
        showCount();
    });

// Decrease counter
document.getElementById("decrease")
    .addEventListener("click", function () {
        count--;
        showCount();
    });

// Reset interactive page
document.getElementById("reset")
    .addEventListener("click", function () {
        count = 0;
        colorIndex = 0;
        textIndex = -1;

        showCount();
        message.textContent = "Welcome! Click a button.";
        demoBox.style.backgroundColor = colors[0];
    });