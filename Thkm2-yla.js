const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static('../'));  // خدمة الملفات الثابتة

const usersFile = path.join(__dirname, 'users.json');

// تحميل/حفظ المستخدمين
function loadUsers() {
    try { return JSON.parse(fs.readFileSync(usersFile)); } catch { return []; }
}
function saveUsers(users) { fs.writeFileSync(usersFile, JSON.stringify(users)); }

// API تسجيل
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    let users = loadUsers();
    if (users.find(u => u.email === email)) {
        return res.json({ success: false, message: 'البريد موجود بالفعل' });
    }
    const newUser = { name, email, password, bookings: [] };
    users.push(newUser);
    saveUsers(users);
    res.json({ success: true, message: 'تم التسجيل' });
});

// API دخول
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    let users = loadUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ success: true, user });
    } else {
        res.json({ success: false, message: 'خطأ في البيانات' });
    }
});

// API حجز (مع عمولة 5%)
app.post('/api/book', (req, res) => {
    const { service, amount, userEmail } = req.body;
    let users = loadUsers();
    const userIndex = users.findIndex(u => u.email === userEmail);
    if (userIndex !== -1) {
        const commission = amount * 0.05;
        users[userIndex].bookings.push({ service, amount, commission, date: new Date() });
        saveUsers(users);
        res.json({ success: true, commission, message: 'تم الحجز وخصم العمولة' });
    } else {
        res.json({ success: false });
    }
});

app.listen(3000, () => console.log('Backend يعمل على http://localhost:3000'));