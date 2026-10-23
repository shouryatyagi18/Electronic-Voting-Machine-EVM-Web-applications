// Educational demo only. No identity verification or government connection.
const DEMO_SESSION_KEY = "evmDemoSession";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("voterLoginForm");
    const loginScreen = document.getElementById("loginScreen");
    const loginMessage = document.getElementById("loginMessage");
    const dobInput = document.getElementById("loginDob");
    const ageInput = document.getElementById("loginAge");

    dobInput.max = new Date().toISOString().slice(0, 10);

    function calculateAge(dateString) {
        if (!dateString) return "";
        const birthDate = new Date(dateString + "T00:00:00");
        if (Number.isNaN(birthDate.getTime())) return "";
        const today = new Date();
        let years = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) years--;
        return years;
    }

    dobInput.addEventListener("change", () => {
        const calculated = calculateAge(dobInput.value);
        ageInput.value = calculated === "" ? "" : calculated;
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        loginMessage.textContent = "";

        const name = document.getElementById("loginName").value.trim();
        const dob = document.getElementById("loginDob").value;
        const age = Number(document.getElementById("loginAge").value);
        const voterId = document.getElementById("voterId").value.trim();
        const state = document.getElementById("state").value;
        const aadhaarLast4 = document.getElementById("aadhaarLast4").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const declaration = document.getElementById("declaration").checked;

        if (!name || !dob || !voterId || !state || !declaration) {
            loginMessage.textContent = "Please complete all required fields and accept the declaration.";
            return;
        }
        const calculatedAge = calculateAge(dob);
        if (calculatedAge === "" || calculatedAge < 0) {
            loginMessage.textContent = "Please enter a valid date of birth.";
            return;
        }
        if (calculatedAge < 18 || calculatedAge > 120) {
            loginMessage.textContent = "This demo is for users aged 18 or above.";
            return;
        }
        ageInput.value = calculatedAge;
        if (aadhaarLast4 && !/^\d{4}$/.test(aadhaarLast4)) {
            loginMessage.textContent = "If used, Aadhaar field must contain only the last 4 digits.";
            return;
        }
        if (mobile && !/^\d{10}$/.test(mobile)) {
            loginMessage.textContent = "If used, enter a 10-digit mobile number.";
            return;
        }

        // Store only demo fields needed by the voting page. Aadhaar/mobile are never stored.
        sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify({ name, age, voterId }));
        window.location.href = "index.html";
    });
});
