const form = document.getElementById("dataForm");
const table = document.getElementById("recordTable");
const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const data = document.getElementById("data").value.trim();

    if (!name || !email || !data) {
        message.textContent = "Please fill in all fields.";
        message.className = "message error";
        return;
    }

    try {
        const response = await fetch("/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                data: data
            })
        });

        const result = await response.json();

        if (result.success) {

            message.textContent = result.message;
            message.className = "message success";

            const record = result.record;

            const row = table.insertRow(0);

            row.insertCell(0).textContent = record.id;
            row.insertCell(1).textContent = record.name;
            row.insertCell(2).textContent = record.email;
            row.insertCell(3).textContent = record.data;

            form.reset();

        } else {

            message.textContent = result.message;
            message.className = "message error";
        }

    } catch (error) {

        console.error(error);

        message.textContent = "Server connection error. Please run app.py.";
        message.className = "message error";
    }
});