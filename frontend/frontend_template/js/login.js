
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


const handleLogin = async (event) => {
    event.preventDefault();
    const loginButton = document.getElementById("login");
    loginButton.innerText = "Loading...";
    loginButton.disabled = true;

 
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();


    const credentials = { username, password };

    try {
        const response = await fetch("http://127.0.0.1:8000/users/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("role", data.user.role);
            
            await showAlert("Success!", "Login successful!", "success");
            window.location.href = "index.html";

        } else if (data.detail) {
            
            showAlert("Error!", data.detail, "error");
        } else {
            
            showAlert("Error!", "Unexpected error occurred. Please try again.", "error");
        }
    } catch (error) {
        
        console.error("Login failed:", error);
        showAlert("Error!", "Something went wrong. Please try again later.", "error");
    } finally {
        
        loginButton.innerText = "Login";
        loginButton.disabled = false;
    }
};



