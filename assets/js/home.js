document.addEventListener("DOMContentLoaded", function () {
  // ---- Phần 1: Xử lý mượn/trả sách và danh sách đã mượn ----

  const confirmBtn = document.getElementById("confirm-btn");
  const borrowedBooksTable = document.getElementById("borrowed-books");

  // Hàm để thêm sách vào bảng và localStorage
  function addBookToTable(nic, name, book, borrowDate, dueDate) {
    const row = borrowedBooksTable.insertRow();
    row.innerHTML = `
          <td class="py-3 px-6 text-left border">${nic}</td>
          <td class="py-3 px-6 text-left border">${name}</td>
          <td class="py-3 px-6 text-left border">${book}</td>
          <td class="py-3 px-6 text-left border">${borrowDate}</td>
          <td class="py-3 px-6 text-left border">${dueDate}</td>
          <td class="py-3 px-6 text-center border">
              <button class="edit-book-btn bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline" data-row-index="${borrowedBooksTable.rows.length}">Sửa</button>
              <button class="delete-book-btn bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline" data-row-index="${borrowedBooksTable.rows.length}">Xóa</button>
          </td>
      `;

    // Lưu vào localStorage
    const borrowedBooks = JSON.parse(
      localStorage.getItem("borrowedBooks") || "[]"
    );
    borrowedBooks.push({ nic, name, book, borrowDate, dueDate });
    localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));

    // Thêm sự kiện cho nút "Sửa"
    row.querySelector(".edit-book-btn").addEventListener("click", function () {
      const rowIndex = parseInt(this.dataset.rowIndex);
      editBook(rowIndex);
    });

    // Thêm sự kiện cho nút "Xóa"
    row
      .querySelector(".delete-book-btn")
      .addEventListener("click", function () {
        const rowIndex = parseInt(this.dataset.rowIndex);
        deleteBook(rowIndex);
      });
  }

  // Hàm để xóa sách
  function deleteBook(rowIndex) {
    // Xóa khỏi bảng
    borrowedBooksTable.deleteRow(rowIndex - 1);

    // Xóa khỏi localStorage
    let borrowedBooks = JSON.parse(
      localStorage.getItem("borrowedBooks") || "[]"
    );
    borrowedBooks.splice(rowIndex - 1, 1);
    localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));
    // Cập nhật lại data-row-index sau khi xóa
    updateRowIndices();
  }

  // Hàm để sửa thông tin sách
  function editBook(rowIndex) {
    let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    let bookToEdit = borrowedBooks[rowIndex - 1];

    // Điền thông tin sách vào form (Để người dùng sửa)
    document.getElementById("borrower-nic").value = bookToEdit.nic;
    document.getElementById("borrower").value = bookToEdit.name;
    document.getElementById("book").value = bookToEdit.book;
    document.getElementById("borrow-date").value = bookToEdit.borrowDate;
    document.getElementById("due-date").value = bookToEdit.dueDate;

    // Cập nhật nút "Xác nhận" thành nút "Lưu thay đổi"
    confirmBtn.textContent = "Lưu thay đổi";
    confirmBtn.removeEventListener("click", handleConfirmClick); // Xóa sự kiện cũ (thêm sách)
    confirmBtn.addEventListener("click", handleSaveClick); // Thêm sự kiện mới (lưu thay đổi)

    function handleSaveClick() {
      // Lấy thông tin đã chỉnh sửa
      const updatedNic = document.getElementById("borrower-nic").value.trim();
      const updatedName = document.getElementById("borrower").value.trim();
      const updatedBook = document.getElementById("book").value.trim();
      const updatedBorrowDate = document.getElementById("borrow-date").value;
      const updatedDueDate = document.getElementById("due-date").value;

      // Kiểm tra xem thông tin có bị bỏ trống không
      if (
        !updatedNic ||
        !updatedName ||
        !updatedBook ||
        !updatedBorrowDate ||
        !updatedDueDate
      ) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
      }
      // Cập nhật thông tin trong localStorage
      borrowedBooks[rowIndex - 1] = {
        nic: updatedNic,
        name: updatedName,
        book: updatedBook,
        borrowDate: updatedBorrowDate,
        dueDate: updatedDueDate,
      };
      localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));

      // Cập nhật thông tin trong bảng
      const row = borrowedBooksTable.rows[rowIndex - 1]; // Lấy dòng tương ứng trong bảng
      row.cells[0].textContent = updatedNic;
      row.cells[1].textContent = updatedName;
      row.cells[2].textContent = updatedBook;
      row.cells[3].textContent = updatedBorrowDate;
      row.cells[4].textContent = updatedDueDate;

      // Đặt lại nút thành "Xác nhận"
      confirmBtn.textContent = "Xác nhận";

      confirmBtn.removeEventListener("click", handleSaveClick);
      confirmBtn.addEventListener("click", handleConfirmClick);

      // Reset form
      clearForm();
      updateRowIndices();
    }
  }
  function updateRowIndices() {
    const rows = borrowedBooksTable.querySelectorAll("tr");
    for (let i = 0; i < rows.length; i++) {
      const editButton = rows[i].querySelector(".edit-book-btn");
      const deleteButton = rows[i].querySelector(".delete-book-btn");

      if (editButton) {
        editButton.dataset.rowIndex = i + 1;
      }
      if (deleteButton) {
        deleteButton.dataset.rowIndex = i + 1;
      }
    }
  }

  // Hàm xử lý sự kiện click nút "Xác nhận" (thêm sách)
  function handleConfirmClick() {
    const nic = document.getElementById("borrower-nic").value.trim();
    const name = document.getElementById("borrower").value.trim();
    const book = document.getElementById("book").value.trim();
    const borrowDate = document.getElementById("borrow-date").value;
    const dueDate = document.getElementById("due-date").value;

    if (!nic || !name || !book || !borrowDate || !dueDate) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    addBookToTable(nic, name, book, borrowDate, dueDate);
    clearForm();
  }

  // Hàm để xóa nội dung các ô input
  function clearForm() {
    document.getElementById("borrower-nic").value = "";
    document.getElementById("borrower").value = "";
    document.getElementById("book").value = "";
    document.getElementById("borrow-date").value = "";
    document.getElementById("due-date").value = "";
  }

  // Thêm sự kiện click cho nút "Xác nhận" ban đầu
  confirmBtn.addEventListener("click", handleConfirmClick);

  // Khôi phục dữ liệu từ localStorage khi tải trang
  function restoreBorrowedBooks() {
    const borrowedBooks = JSON.parse(
      localStorage.getItem("borrowedBooks") || "[]"
    );
    borrowedBooks.forEach((book) => {
      addBookToTable(
        book.nic,
        book.name,
        book.book,
        book.borrowDate,
        book.dueDate
      );
    });
  }

  restoreBorrowedBooks(); // Gọi hàm để khôi phục dữ liệu

  // Xử lý sự kiện click nút "Đăng xuất"
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("rememberedUsername");
      window.location.href = "index.html"; // Chuyển về trang đăng nhập (index.html)
    });
  }

  // ---- Phần 2: Xử lý "Sách nổi bật" ----
  // Dữ liệu sách mẫu
  let books = [
    {
      id: 1,
      title: "Lập Trình Web Bằng HTML, CSS, Javascript",
      author: "Nguyễn Văn A",
      category: "laptrinh",
      cover: "assets/images/placeholder.jpg", // Thay bằng đường dẫn ảnh thật
      publishYear: 2023,
      description: "Đây là cuốn sách hay về lập trình web",
    },
    {
      id: 2,
      title: "Tôi thấy code trên giang đường",
      author: "Phạm Văn B",
      category: "tieuthuyet",
      cover: "assets/images/placeholder.jpg",
      publishYear: 2020,
      description: "Một cuốn sách về tuổi trẻ",
    },
    {
      id: 3,
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "laptrinh",
      cover: "assets/images/placeholder.jpg",
      publishYear: 2008,
      description: "Cuốn sách kinh điển",
    },
    {
      id: 4,
      title: "Design Patterns",
      author: "Erich Gamma",
      category: "laptrinh",
      cover: "assets/images/placeholder.jpg",
      publishYear: 1994,
      description: "Các mẫu thiết kế kinh điển",
    },
    {
      id: 5,
      title: "Đắc Nhân Tâm",
      author: "Dale Carnegie",
      category: "kynang",
      cover: "assets/images/placeholder.jpg",
      publishYear: 1936,
      description: "Sách hay",
    },
    {
      id: 6,
      title: "Nhà Giả Kim",
      author: "Paulo Coelho",
      category: "tieuthuyet",
      cover: "assets/images/placeholder.jpg",
      publishYear: 1988,
      description: "Hay",
    },
    {
      id: 7,
      title: "Sử Việt - 12 Khúc Tráng Ca",
      author: "Dũng Phan",
      category: "lichsu",
      cover: "assets/images/placeholder.jpg",
      publishYear: 2020,
      description: "Sách hay",
    },
    {
      id: 8,
      title: "Cà Phê Cùng Tony",
      author: "Tony Buổi Sáng",
      category: "kynang",
      cover: "assets/images/placeholder.jpg",
      publishYear: 2015,
      description: "Sách hay",
    },
  ];

  const featuredBooksContainer = document.getElementById(
    "featured-books-container"
  );

  function displayFeaturedBooks() {
    // Chọn 3 cuốn sách ngẫu nhiên từ danh sách 'books'
    const featuredBooks = getRandomBooks(books, 3);

    featuredBooksContainer.innerHTML = ""; // Xóa nội dung cũ

    featuredBooks.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add(
        ...["bg-white", "rounded-lg", "shadow-md", "p-4", "featured-book-card"]
      );
      bookCard.innerHTML = `
              <img src="${book.cover}" alt="${book.title}" class="w-full h-48 object-cover rounded-md">
              <h4 class="text-lg font-semibold mt-2">${book.title}</h4>
              <p class="text-gray-600">${book.author}</p>
          `;
      featuredBooksContainer.appendChild(bookCard);
    });
  }

  // Hàm phụ trợ để lấy n phần tử ngẫu nhiên từ mảng
  function getRandomBooks(arr, n) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random()); // Xáo trộn mảng
    return shuffled.slice(0, n);
  }

  // Gọi hàm hiển thị sách nổi bật khi tải trang
  if (featuredBooksContainer) {
    displayFeaturedBooks();
  }
});
