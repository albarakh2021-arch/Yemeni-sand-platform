// تبديل بين نموذجي الدخول والتسجيل
document.getElementById('toggleForm').addEventListener('click', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
});

// تسجيل مستخدم جديد
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    // حفظ في LocalStorage (مؤقت)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, email, password, bookings: [] });
    localStorage.setItem('users', JSON.stringify(users));

    alert('تم التسجيل بنجاح! الآن قم بالدخول.');
    // إعادة توجيه إلى نموذج الدخول
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

// دخول مستخدم
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';  // إعادة توجيه إلى اللوحة
    } else {
        alert('بريد أو كلمة مرور غير صحيحة!');
    }
});