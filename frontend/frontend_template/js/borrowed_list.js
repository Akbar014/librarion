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

function getAccessToken() {
    return localStorage.getItem('access_token');
}

function allBorrowedBooks() {
    const accessToken = getAccessToken();
    const headers = {
        'Content-Type': 'application/json',
    };
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }
    fetch(`http://127.0.0.1:8000/borrow/bookBorrow/`, { 
        method: 'GET',
        headers: headers,
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => displayBorrowedeBooks(data))
    .catch((err) => console.error("Error fetching available books:", err));
}


function displayBorrowedeBooks(borrows){

    console.log(borrows);
   
    borrows.forEach(data => {
    
            const parent = document.getElementById("table-bodys");
            const tr = document.createElement("tr");
    
            tr.innerHTML = `
                <td>${data.book_title}</td>
                <td>${data.borrow_date}</td>
                <td>${data.return_date}</td>

                <td>${data.is_returned ? "Returned" : "Borrowed"}</td>
                
                <td>${data.fine}</td>
                <td>

                    ${!data.is_returned ? `<button class="btn btn-sm btn-danger" onclick="returnBook(${data.id})">Return</button>` : `<button class="btn btn-sm btn-info"> Returned</button>`}
                
                </td>
                `;
                console.log(tr);
            parent.appendChild(tr);

    
      });
    
        

}

function returnBook(id){
    const accessToken = getAccessToken();
    const info = { borrow_id: id };
    const headers = {
        'Content-Type': 'application/json',
    };
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }
    fetch(`http://127.0.0.1:8000/borrow/returnBook/?borrow_id=${id}/`, { 
        method: 'POST',
        headers: headers,
        body: JSON.stringify(info),
        
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        showAlert("Success!", data.message, "success");
        window.location.reload()
    })
    .catch((err) => console.error("Error fetching available books:", err));
}

allBorrowedBooks();
