document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        location: document.getElementById('location').value
    };

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            document.getElementById('message').textContent = 'Registration successful!';
            document.getElementById('registrationForm').reset();
        } else {
            document.getElementById('message').textContent = 'Registration failed. Try again!';
        }
    } catch (error) {
        console.log(error);
        document.getElementById('message').textContent = 'An error occurred. Please try again later.';
    }
});
