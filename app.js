/* =========================
   API URLS
========================= */
const PROJECT_API = "https://portfolio-backend-4-ol93.onrender.com/projects";
const CONTACT_API = "https://portfolio-backend-4-ol93.onrender.com/contact";

/* =========================
   LOAD PROJECTS
========================= */
function loadProjects() {
    fetch(PROJECT_API)
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to load projects");
            }
            return res.json();
        })
        .then(data => {
            const list = document.getElementById("projectList");
            list.innerHTML = ""; // clear old data

            if (data.length === 0) {
                list.innerHTML = "<p>No projects available.</p>";
                return;
            }

            data.forEach(p => {
                const card = document.createElement("div");
                card.className = "project-card";
                card.innerHTML = `
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>
                    <p><b>Tech:</b> ${p.techStack}</p>
                    <a href="${p.githubUrl}" target="_blank">GitHub</a>
                `;
                list.appendChild(card);
            });
        })
        .catch(err => {
            console.error(err);
            document.getElementById("projectList").innerHTML =
                "<p>Unable to load projects ❌</p>";
        });
}

loadProjects();

/* =========================
   CONTACT FORM
========================= */
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

   const email = document.getElementById("emailInput").value.trim();
const message = document.getElementById("messageInput").value.trim();

    const error = document.getElementById("formError");

    // RESET MESSAGE
    error.textContent = "";
    error.style.color = "red";

    // VALIDATION
    if (!email || !message) {
        error.textContent = "All fields are required ❌";
        return;
    }

    if (!email.includes("@")) {
        error.textContent = "Please enter a valid email ❌";
        return;
    }

    if (message.length < 2) {
        error.textContent = "Message must be at least 2 characters ❌";
        return;
    }

    // SEND TO BACKEND
    fetch(CONTACT_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            message: message
        })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to send message");
            }
            return res.json();
        })
        .then(() => {
            error.style.color = "green";
            error.textContent = "Message sent successfully ✅";
            document.getElementById("contactForm").reset();
        })
        .catch(err => {
            console.error(err);
            error.textContent = "Server error. Please try again ❌";
        });
});
