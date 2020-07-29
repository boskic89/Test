const emailRegistration = document.getElementById("email-registration");
const mobileRegistration = document.getElementById("mobile-registration");
const form = document.querySelector("#register-form");
const errorMessage = document.getElementById("input-error-message");

emailRegistration.addEventListener("click", function () {
  toggleRegistrationType("email", "mobile");
});

mobileRegistration.addEventListener("click", function () {
  toggleRegistrationType("mobile", "email");
});

form.addEventListener("submit", (event) => {
  let registrationType = detectRegistrationType();
  let validateValue = document.getElementById(registrationType + "-input")
    .value;
  let error;
  if (registrationType === "mobile") error = validatePhoneNumber(validateValue);
  else error = validateEmail(validateValue);
  if (error) {
    event.preventDefault();
    errorMessage.classList.remove("invisible");
    errorMessage.classList.add("visible");
    errorMessage.innerHTML = error;
  } else {
    //we would not prevent default submit behaviour if we were indeed sending form data, but here I had to improvise
    event.preventDefault();
    cleanErrorMessage();

    // here we get an animation for 3 seconds and we go back to our form, still filled with data since there was no real submit
    loadingAnimation();
    setTimeout(showSuccessModal, 3000);
    // from modal you can access a display in case of failed request
    // as mentioned above, no submit is ever sent actually because there would be no loading animation because no response is waited on
  }
});

function loadingAnimation() {
  toggleTwoElementsVisibility("loader-holder", "form-holder");
}

function showSuccessModal() {
  document.getElementById("modal-header").classList.remove("modal-failure");
  document.getElementById("modal-header").classList.add("modal-success");
  document.getElementById("modal-header-message").innerHTML = "Success!";
  document.getElementById("modal-body-message").innerHTML =
    "Congratulations, you've successfully created an account! Please proceed to the login page.";
  document.getElementById("modal-failure-button").classList.remove("invisible");
  document.getElementById("modal-failure-button").classList.add("visible");

  toggleTwoElementsVisibility("notification-modal", "loader-holder");
}

function loadingAnimationAndFailureModal() {
  toggleTwoElementsVisibility("loader-holder", "notification-modal");
  setTimeout(showFailureModal, 3000);
}

function showFailureModal() {
  document.getElementById("modal-header").classList.add("modal-failure");
  document.getElementById("modal-header").classList.remove("modal-success");
  document.getElementById("modal-header-message").innerHTML = "Failure!";
  document.getElementById("modal-body-message").innerHTML =
    "Something went wrong during the registration process.";
  toggleTwoElementsVisibility("notification-modal", "loader-holder");
  hideElement("modal-failure-button");
}

function normalPage() {
  toggleTwoElementsVisibility("form-holder", "notification-modal");
}

function cleanErrorMessage() {
  errorMessage.classList.remove("visible");
  errorMessage.classList.add("invisible");
  errorMessage.innerHTML = "";
}

function showElement(id) {
  document.getElementById(id).classList.add("visible");
  document.getElementById(id).classList.remove("invisible");
}

function hideElement(id) {
  document.getElementById(id).classList.remove("visible");
  document.getElementById(id).classList.add("invisible");
}

function toggleTwoElementsVisibility(toBeVisible, toBeInvisible) {
  showElement(toBeVisible);
  hideElement(toBeInvisible);
}

function toggleRegistrationType(selectedType, notSelectedType) {
  let selectedElement = document.getElementById(selectedType + "-input");
  let notSelectedElement = document.getElementById(notSelectedType + "-input");
  selectedElement.required = true;
  notSelectedElement.required = false;
  document
    .getElementById(selectedType + "-registration")
    .classList.add("active");
  document
    .getElementById(notSelectedType + "-registration")
    .classList.remove("active");
  cleanErrorMessage();
  toggleTwoElementsVisibility(
    selectedType + "-input",
    notSelectedType + "-input"
  );
}

function detectRegistrationType() {
  let element = document.getElementsByClassName("active");
  if (element[0].id == "email-registration") return "email";
  else return "mobile";
}

// validateEmail is redundant because we put required for email, but I like to have it at hand in case somebody writes a@a.a
function validateEmail(value) {
  let error;
  if (!value) {
    error = "Email address is required.";
  } else if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    error = "Please use a valid email. Example: name@example.com";
  }

  return error;
}

function validatePhoneNumber(value) {
  let error;
  if (!value) {
    // since the input is required, this will never happen, but like above, I like to have it at hand
    error = "Phone number is required.";
  } else if (!value.match(/^[+]?\d+$/i)) {
    error = "Please write phone number in form of 060.. or +38160..";
  } else if (value.length < 7) {
    error =
      "Enter phone number longer than 7 characters (yours has " +
      value.length +
      ")";
  }
  return error;
}
