const fs = require('fs');
async function test() {
    try {
        const email = "test3@example.com";
        const password = "password123";
        const username = "testuser3";
        let out = "";
        const res1 = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });
        const d1 = await res1.json();
        out += "Register Res: " + res1.status + " " + JSON.stringify(d1) + "\n";

        const res2 = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const d2 = await res2.json();
        out += "Login Res: " + res2.status + " " + JSON.stringify(d2) + "\n";
        
        fs.writeFileSync('out2.txt', out, 'utf8');
    } catch (err) {
        fs.writeFileSync('out2.txt', err.toString(), 'utf8');
    }
}
test();
