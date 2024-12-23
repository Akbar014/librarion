
const showAlert = (title, text, icon, buttonClass = "btn btn-success") => {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: "OK",
        customClass: {
            confirmButton: buttonClass,
        },
    });
};


const getValue = (id) => document.getElementById(id).value.trim();

const handleRegistration = async (event) => {
    event.preventDefault();
    
    const registerButton = document.getElementById("register");
    registerButton.innerText = "Loading...";
    registerButton.disabled = true;


    const username = getValue("username");
    const email = getValue("email");
    const password = getValue("password");


    const info = { username, email, password };

    try {
        const response = await fetch("http://127.0.0.1:8000/users/register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(info),
        });

        const data = await response.json();

        if (response.ok) {
            if (data.tokens && data.user) {
                await showAlert("Success!", "Registration successful!", "success");
                window.location.href = "login.html";
            }
        } else {
            
            if (data.email) {
                showAlert("Error!", data.email, "error");
            } else if (data.username) {
                showAlert("Error!", data.username, "error");
            } else {
                showAlert("Error!", "Something went wrong. Please check your input.", "error");
            }
        }
    } catch (error) {
        console.error("Registration failed:", error);
        showAlert("Error!", "Something went wrong. Please try again later.", "error");
    } finally {
        registerButton.innerText = "Register";
        registerButton.disabled = false;
    }
};


