// تحميل بيانات المستخدم
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'login.html';  // إعادة توجيه إذا غير مسجل
}

document.getElementById('userName').textContent = currentUser.name;

// عرض الحجوزات والعمولات
const bookings = currentUser.bookings || [];
document.getElementById('bookingCount').textContent = bookings.length;

let totalCommission = 0;
bookings.forEach(booking => {
    const li = document.createElement('li');
    li.textContent = `حجز ${booking.service} - قيمة: ${booking.amount} ريال (عمولة: ${booking.commission} ريال)`;
    document.getElementById('bookingsList').appendChild(li);
    totalCommission += booking.commission;
});
document.getElementById('totalCommission').textContent = `${totalCommission} ريال`;

// خروج
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});