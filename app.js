const loginForm = document.getElementById("login-form");
const googleBtn = document.getElementById("google-btn");
const statusField = document.getElementById("status");
const allowedDomain = "nemsu.edu";

const setStatus = (message, type = "info") => {
  const colors = {
    info: "text-slate-500",
    success: "text-emerald-600",
    error: "text-rose-600",
  };

  statusField.textContent = message;
  statusField.className = `${colors[type]} text-sm`;
};

const validateInstitutionalEmail = (email) => {
  const [, domain] = email.split("@");
  return domain === allowedDomain;
};

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const email = String(formData.get("email")).trim();
  const role = String(formData.get("role"));

  if (!validateInstitutionalEmail(email)) {
    setStatus(
      "Please use your institutional email (…@nemsu.edu) to proceed.",
      "error",
    );
    return;
  }

  if (!role) {
    setStatus("Select a role so we can match the correct permissions.", "error");
    return;
  }

  setStatus(
    `Credentials verified for ${role.replace("-", " ")}. Redirecting to secure workspace…`,
    "success",
  );

  // Placeholder for real authentication request
  setTimeout(() => {
    console.info("Send credentials to backend / auth provider");
  }, 500);
});

googleBtn?.addEventListener("click", () => {
  setStatus(
    "Redirecting to Google Identity Services for authentication…",
    "info",
  );

  // Example of where to initialize Google Identity Services
  // window.location.href = "/auth/google"; // backend route
});

