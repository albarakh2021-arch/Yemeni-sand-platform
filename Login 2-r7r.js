// في registerForm submit
fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
}).then(res => res.json()).then(data => {
    if (data.success) alert(data.message);
});