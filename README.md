<h1 align="center" id="title">Librarion</h1>


<p id="description">This system is designed to manage book borrowing and includes a secure authentication mechanism implemented using JWT (JSON Web Token) authentication.</p>
<p id="description">Admin login url: http://127.0.0.1:8000/admin/ </p>
<p id="description">Admin login credentials: Username : akbar Password : 12345678 </p>


  
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   JWT Authentication
*   Borrow Books

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone ripository </p>

```
git clone https://github.com/Akbar014/swiftpos-backend.git
```

<p>2. Enter into project directory (backend) </p>

```
cd directory_name
```

<p>3. Run command</p>

```
py manage.py runserver
```


<br>



## 🍰 API Endpoints

### Autehtication
- `POST /users/register/`
- `POST /users/login/`

### Available books for borrow
- `GET /books/allBooks/?available=true`

### All books 
- `GET /books/allBooks/`
  
### Edit book
- `GET /books/allBooks/bookid`
  
### Borrow list
- `GET /borrow/bookBorrow/`
  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   django
*   django rest framwork
*   sqLite
*   cloudinary
