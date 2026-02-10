const CONTACT_API = "http://localhost:8080/contact";

fetch(CONTACT_API)
    .then(res => res.json())
    .then(data => {
        const tbody = document.getElementById("contactTableBody");

        data.forEach(c => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${c.id}</td>
                <td>${c.email}</td>
                <td>${c.message}</td>
                <td>${c.createdAt ? c.createdAt.replace("T", " ") : "-"}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(err => console.error("Error loading contacts:", err));
