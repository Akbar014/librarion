

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


function availableBooks() {
    const accessToken = getAccessToken();
    const headers = {
        'Content-Type': 'application/json',
    };
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }
    fetch(`http://127.0.0.1:8000/books/allBooks/?available=true`, { 
        method: 'GET',
        headers: headers,
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => displayAvailableBooks(data))
    .catch((err) => console.error("Error fetching available books:", err));
}


function displayAvailableBooks(books){
    
    const parent = document.getElementById("available_books");

    books.forEach(book => {
        console.log(books);
        const div = document.createElement("div");
        div.classList.add("col-lg-3", "col-md-6",  "col-12",  "mb-4", "mb-lg-0", "mt-3");

        const bookImage = book.image ? book.image : 'assets/img/def_product.png'; 
        
        div.innerHTML = `

            <div class="custom-block bg-white shadow-lg">
                <img src="${bookImage}" class="custom-block-image img-fluid" alt="">
                <a href="" class="mt-3">
                    <div class="d-flex">
                        <div>
                            <h6 class="mb-1" id="book_title">${book.title}</h6>
                            <p class="mb-0" id="book_author">${book.author}</p>
                            <span class="mb-2" id="book_title">Available copies : ${book.available_copies}</span>
                            <div class="row d-flex">
                                <div class="col-md-6">
                                    <button class="btn btn-info mt-4" onclick="bookBorrow(${book.id})">Borrow </button>
                                </div>
                                <div class="col-md-6">
                                    <button class="btn btn-info mt-4">View  </button>
                                </div>
                            </div>
                        </div>

                        <!-- <span class="badge bg-design rounded-pill ms-auto">14</span> -->
                    </div>

                    
                </a>
            </div>

        `
        parent.appendChild(div);

    });

}

async function bookBorrow(bookId) {
    event.preventDefault();
    const accessToken = getAccessToken();
    const info = { book: bookId };
    if(!accessToken){
        showAlert("Error!", "Login first for borrow a book", "error");
        window.location.href = "login.html";
    }
    else{
        try {
            const res = await fetch(`http://127.0.0.1:8000/borrow/bookBorrow/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(info),
            });

            const data = await res.json();
            if(data.error){
                showAlert("Alert!", data.error, "error");
            }else{
                await showAlert("Success!", "Book borrowed Successfully !!", "success");
                window.location.href = "borrowed_list.html";
            }
        } catch (err) {
            console.error("Error borrowing book:", err);
            showAlert("Error!", "Something went wrong. Please try again later.", "error");
        }
    }
}


availableBooks();