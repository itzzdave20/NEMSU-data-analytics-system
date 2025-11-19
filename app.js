const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const googleBtn = document.getElementById("google-btn");
const statusField = document.getElementById("status");
const registerStatusField = document.getElementById("register-status");
const formTriggers = document.querySelectorAll("[data-form-trigger]");
const allowedDomain = "nemsu.edu";

const setStatus = (node, message, type = "info") => {
  const colors = {
    info: "text-slate-500",
    success: "text-emerald-600",
    error: "text-rose-600",
  };

  node.textContent = message;
  node.className = `${colors[type]} text-sm text-center`;
  node.classList.remove("hidden");
};

const validateInstitutionalEmail = (email) => {
  const [, domain] = email.split("@");
  return domain === allowedDomain;
};

const setActiveForm = (target) => {
  if (!loginForm || !registerForm) {
    return;
  }
  const isLogin = target === "login";
  loginForm.classList.toggle("hidden", !isLogin);
  statusField.classList.toggle("hidden", !isLogin);
  registerForm.classList.toggle("hidden", isLogin);
  registerStatusField.classList.toggle("hidden", isLogin);

  formTriggers.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.formTrigger === target);
  });
};

formTriggers.forEach((button) => {
  button.addEventListener("click", () =>
    setActiveForm(button.dataset.formTrigger),
  );
});

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const email = String(formData.get("email")).trim();
  const role = String(formData.get("role"));

  if (!validateInstitutionalEmail(email)) {
    setStatus(
      statusField,
      "Please use your institutional email (…@nemsu.edu) to proceed.",
      "error",
    );
    return;
  }

  if (!role) {
    setStatus(
      statusField,
      "Select a role so we can match the correct permissions.",
      "error",
    );
    return;
  }

  setStatus(
    statusField,
    `Credentials verified for ${role.replace("-", " ")}. Redirecting to secure workspace…`,
    "success",
  );

  // Placeholder for real authentication request
  setTimeout(() => {
    console.info("Send credentials to backend / auth provider");
  }, 500);
});

registerForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(registerForm);
  const fullName = String(formData.get("fullName")).trim();
  const email = String(formData.get("email")).trim();
  const role = String(formData.get("role"));
  const password = String(formData.get("password"));
  const confirmPassword = String(formData.get("confirmPassword"));

  if (!fullName) {
    setStatus(registerStatusField, "Please provide your full name.", "error");
    return;
  }

  if (!validateInstitutionalEmail(email)) {
    setStatus(
      registerStatusField,
      "Only institutional addresses (…@nemsu.edu) can register.",
      "error",
    );
    return;
  }

  if (!role) {
    setStatus(registerStatusField, "Choose your official role.", "error");
    return;
  }

  if (password.length < 8) {
    setStatus(
      registerStatusField,
      "Passwords should be at least 8 characters.",
      "error",
    );
    return;
  }

  if (password !== confirmPassword) {
    setStatus(registerStatusField, "Passwords do not match.", "error");
    return;
  }

  setStatus(
    registerStatusField,
    "Account request submitted. Awaiting admin verification…",
    "success",
  );

  setTimeout(() => {
    console.info("Send registration payload to backend");
  }, 500);
});

googleBtn?.addEventListener("click", () => {
  setStatus(
    statusField,
    "Redirecting to Google Identity Services for authentication…",
    "info",
  );

  // Example of where to initialize Google Identity Services
  // window.location.href = "/auth/google"; // backend route
});

setActiveForm("login");

