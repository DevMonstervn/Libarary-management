// Dữ liệu sách mô phỏng
const books = [
  {
    id: 1,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    genre: "Self-help",
    available: 5,
    image:
      "https://m.media-amazon.com/images/I/71F1FnqSyrL._AC_UF1000,1000_QL80_.jpg",
    isbn: "978-0671027032",
    publisher: "Simon & Schuster",
    year: 1936,
    description:
      "Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử, giúp bạn đạt được thành công trong cuộc sống và công việc.",
  },
  {
    id: 2,
    title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
    author: "Nguyễn Nhật Ánh",
    genre: "Văn học",
    available: 3,
    image:
      "https://salt.tikicdn.com/ts/product/9e/fa/b4/c82935562746f58422f1414248048b1b.jpg",
    isbn: "978-6041058697",
    publisher: "NXB Trẻ",
    year: 2010,
    description:
      "Một câu chuyện cảm động về tuổi thơ và tình bạn trong bối cảnh làng quê Việt Nam yên bình.",
  },
  {
    id: 3,
    title: "Lập Trình JavaScript Từ Đầu",
    author: "John Doe",
    genre: "Công nghệ",
    available: 7,
    image:
      "https://m.media-amazon.com/images/I/5131OWtQRaL._SX379_BO1,204,203,200_.jpg",
    isbn: "978-1234567890",
    publisher: "Tech Press",
    year: 2023,
    description:
      "Hướng dẫn toàn diện cho người mới bắt đầu học lập trình JavaScript, từ cơ bản đến nâng cao.",
  },
  {
    id: 4,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    genre: "Tiểu thuyết",
    available: 2,
    image:
      "https://m.media-amazon.com/images/I/71jY-4-bJYL._AC_UF1000,1000_QL80_.jpg",
    isbn: "978-0061122415",
    publisher: "HarperCollins",
    year: 1988,
    description:
      "Một câu chuyện ngụ ngôn về việc theo đuổi ước mơ và khám phá vận mệnh của chính mình.",
  },
  {
    id: 5,
    title: "Cha Giàu Cha Nghèo",
    author: "Robert Kiyosaki",
    genre: "Kinh tế",
    available: 6,
    image:
      "https://m.media-amazon.com/images/I/81BE7eeJW9L._AC_UF1000,1000_QL80_.jpg",
    isbn: "978-0446677456",
    publisher: "Warner Books",
    year: 1997,
    description:
      "Cuốn sách tài chính cá nhân nổi tiếng, chia sẻ những bài học về tiền bạc và đầu tư.",
  },
  {
    id: 6,
    title: "Harry Potter và Hòn đá Phù thủy",
    author: "J.K. Rowling",
    genre: "Fantasy",
    available: 10,
    image:
      "https://m.media-amazon.com/images/I/81ebFikj3YL._AC_UF1000,1000_QL80_.jpg",
    isbn: "978-0747532699",
    publisher: "Bloomsbury",
    year: 1997,
    description:
      "Cuốn sách đầu tiên trong series Harry Potter, kể về cuộc phiêu lưu của cậu bé phù thủy tại trường Hogwarts.",
  },
  {
    id: 7,
    title: "Bố Già",
    author: "Mario Puzo",
    genre: "Trinh thám",
    available: 4,
    image:
      "https://m.media-amazon.com/images/I/81n1-9rnRKL._AC_UF1000,1000_QL80_.jpg",
    isbn: "978-0451205766",
    publisher: "Signet",
    year: 1969,
    description:
      "Một câu chuyện kinh điển về gia đình mafia Corleone và cuộc chiến tranh giành quyền lực ngầm.",
  },
];

function displayBooks() {
  const bookListDiv = document.getElementById("bookList");
  if (!bookListDiv) return;

  bookListDiv.innerHTML = ""; // Xóa nội dung cũ

  books.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    const imageElement = document.createElement("img");
    imageElement.src = book.image;
    imageElement.alt = book.title;
    imageElement.width = 100;

    const titleElement = document.createElement("h3");
    titleElement.classList.add("book-title");
    titleElement.textContent = book.title;

    const authorElement = document.createElement("p");
    authorElement.classList.add("book-author");
    authorElement.textContent = `Tác giả: ${book.author}`;

    const genreElement = document.createElement("p");
    genreElement.textContent = `Thể loại: ${book.genre}`;

    const availableElement = document.createElement("p");
    availableElement.textContent = `Số lượng còn lại: ${book.available}`;

    const detailsLink = document.createElement("a");
    detailsLink.href = `book-detail.html?id=${book.id}`;
    detailsLink.textContent = "Xem chi tiết";

    bookItem.appendChild(imageElement);
    bookItem.appendChild(titleElement);
    bookItem.appendChild(authorElement);
    bookItem.appendChild(genreElement);
    bookItem.appendChild(availableElement);
    bookItem.appendChild(detailsLink);

    bookListDiv.appendChild(bookItem);
  });
}

function searchBooks() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const bookItems = document.querySelectorAll("#bookList .book-item");

  bookItems.forEach((item) => {
    const title = item.querySelector(".book-title").textContent.toLowerCase();
    const author = item.querySelector(".book-author").textContent.toLowerCase();

    if (title.includes(searchTerm) || author.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function displayBookDetails() {
  const bookDetailsDiv = document.getElementById("bookDetails");
  if (!bookDetailsDiv) return;

  const urlParams = new URLSearchParams(window.location.search);
  const bookId = parseInt(urlParams.get("id"));
  const book = books.find((b) => b.id === bookId);

  if (book) {
    bookDetailsDiv.innerHTML = `
          <img src="${book.image}" alt="${book.title}" width="150">
          <h3>${book.title}</h3>
          <p>Tác giả: ${book.author}</p>
          <p>Thể loại: ${book.genre}</p>
          <p>ISBN: ${book.isbn}</p>
          <p>Nhà xuất bản: ${book.publisher}</p>
          <p>Năm xuất bản: ${book.year}</p>
          <p>Mô tả: ${book.description}</p>
      `;
  } else {
    bookDetailsDiv.innerHTML = "<p>Không tìm thấy sách.</p>";
  }
}

function displayFeaturedBooks() {
  const featuredBooksDiv = document.querySelector(".featured-books .book-list");
  if (!featuredBooksDiv) return;

  featuredBooksDiv.innerHTML = ""; // Xóa nội dung cũ

  // Lấy 3 cuốn sách đầu tiên làm sách nổi bật
  const featured = books.slice(0, 3);

  featured.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    const imageElement = document.createElement("img");
    imageElement.src = book.image;
    imageElement.alt = book.title;
    imageElement.width = 100;

    const titleElement = document.createElement("h3");
    titleElement.textContent = book.title;

    bookItem.appendChild(imageElement);
    bookItem.appendChild(titleElement);

    featuredBooksDiv.appendChild(bookItem);
  });
}

function displayNewArrivals() {
  const newArrivalsDiv = document.querySelector(".new-arrivals .book-list");
  if (!newArrivalsDiv) return;

  newArrivalsDiv.innerHTML = ""; // Xóa nội dung cũ

  // Lấy 3 cuốn sách tiếp theo làm sách mới
  const newArrivals = books.slice(3, 6);

  newArrivals.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    const imageElement = document.createElement("img");
    imageElement.src = book.image;
    imageElement.alt = book.title;
    imageElement.width = 100;

    const titleElement = document.createElement("h3");
    titleElement.textContent = book.title;

    bookItem.appendChild(imageElement);
    bookItem.appendChild(titleElement);

    newArrivalsDiv.appendChild(bookItem);
  });
}

// Gọi hàm hiển thị sách khi trang books.html được tải
if (document.querySelector(".book-list-section")) {
  window.onload = displayBooks;
}

// Gọi hàm hiển thị chi tiết sách khi trang book-detail.html được tải
if (document.querySelector(".book-detail-section")) {
  window.onload = displayBookDetails;
}

// Gọi hàm hiển thị sách nổi bật và sách mới khi trang home.html được tải
if (document.querySelector(".hero")) {
  // Kiểm tra xem có phần tử hero không, thường có trên trang chủ
  window.onload = function () {
    displayFeaturedBooks();
    displayNewArrivals();
    // Các hàm window.onload khác có thể được gọi ở đây nếu cần
  };
}

// Kiểm tra xem có thông tin tài khoản đã ghi nhớ trong localStorage không và xử lý đăng nhập
document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("username");
  const rememberMeCheckbox = document.getElementById("rememberMe");
  const storedUsername = localStorage.getItem("rememberedUsername");

  if (storedUsername) {
    usernameInput.value = storedUsername;
    rememberMeCheckbox.checked = true;
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Ngăn chặn hành động submit mặc định (chúng ta đang mô phỏng)

      const currentUsername = usernameInput.value;
      const isRemembered = rememberMeCheckbox.checked;
      const loginButton = event.submitter; // Lấy nút submit

      if (loginButton) {
        loginButton.textContent = "Đang đăng nhập..."; // Thay đổi text của nút
        loginButton.disabled = true; // Vô hiệu hóa nút
      }

      if (isRemembered) {
        localStorage.setItem("rememberedUsername", currentUsername);
      } else {
        localStorage.removeItem("rememberedUsername");
      }

      // Mô phỏng đăng nhập thành công sau 1 giây
      setTimeout(function () {
        localStorage.setItem("isLoggedIn", "true");
        alert(`Đăng nhập thành công với tên người dùng: ${currentUsername}`);
        window.location.href = "home.html"; // Chuyển hướng đến trang chủ sau khi đăng nhập mô phỏng
        if (loginButton) {
          loginButton.textContent = "Đăng nhập"; // Khôi phục text của nút
          loginButton.disabled = false; // Kích hoạt lại nút
        }
      }, 1000); // 1000 milliseconds = 1 giây
    });
  }

  const togglePasswordButton = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  if (togglePasswordButton && passwordInput) {
    togglePasswordButton.addEventListener("click", function () {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      this.querySelector("i").classList.toggle("fa-eye");
      this.querySelector("i").classList.toggle("fa-eye-slash");
    });
  }
});

// Hàm đăng xuất (đã được đưa ra ngoài phạm vi của hàm submit)
function logout() {
  localStorage.removeItem("isLoggedIn");
  alert("Đăng xuất thành công.");
  window.location.href = "index.html";
}

// Thêm chức năng mô phỏng cho trang profile.html
if (document.querySelector(".container.mx-auto.p-8")) {
  document.addEventListener("DOMContentLoaded", function () {
    const changeAvatarBtn = document.getElementById("change-avatar-btn");
    const avatarInput = document.getElementById("avatar-input");
    const profileImage = document.getElementById("profile-image");
    const saveProfileBtn = document.getElementById("save-profile-btn");
    const fullnameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const borrowedBooksList = document.getElementById("borrowed-books-list");

    // Mô phỏng chọn ảnh đại diện
    if (changeAvatarBtn && avatarInput && profileImage) {
      changeAvatarBtn.addEventListener("click", function () {
        avatarInput.click(); // Kích hoạt input file khi nhấn nút
      });

      avatarInput.addEventListener("change", function () {
        if (this.files && this.files[0]) {
          // Mô phỏng việc đọc và hiển thị ảnh
          const reader = new FileReader();
          reader.onload = function (e) {
            profileImage.src = e.target.result;
          };
          reader.readAsDataURL(this.files[0]);
          alert("Ảnh đại diện đã được cập nhật (mô phỏng).");
        }
      });
    }

    // Mô phỏng lưu thông tin hồ sơ
    if (saveProfileBtn && fullnameInput && emailInput && phoneInput) {
      saveProfileBtn.addEventListener("click", function () {
        const fullname = fullnameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        // Thực tế ở đây sẽ gửi dữ liệu lên server
        alert(
          "Thông tin hồ sơ đã được lưu thành công (mô phỏng).\nHọ và tên: " +
            fullname +
            "\nEmail: " +
            email +
            "\nSố điện thoại: " +
            phone
        );
      });
    }

    // Dữ liệu sách đang mượn mô phỏng
    const borrowedBooksData = [
      {
        title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
        borrowDate: "2025-03-10",
        dueDate: "2025-03-20",
      },
      { title: "Nhà Giả Kim", borrowDate: "2025-03-05", dueDate: "2025-03-15" },
      {
        title: "Lập Trình JavaScript Từ Đầu",
        borrowDate: "2025-03-15",
        dueDate: "2025-03-25",
      },
    ];

    // Hiển thị sách đang mượn
    if (borrowedBooksList) {
      borrowedBooksData.forEach((book) => {
        const row = borrowedBooksList.insertRow();
        const titleCell = row.insertCell();
        const borrowDateCell = row.insertCell();
        const dueDateCell = row.insertCell();

        titleCell.textContent = book.title;
        borrowDateCell.textContent = book.borrowDate;
        dueDateCell.textContent = book.dueDate;
      });
    }
  });
}
