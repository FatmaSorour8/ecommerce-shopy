/* add event on element */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/* navbar toggle */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

/* header sticky & back top btn active */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
};

addEventOnElem(window, "scroll", headerSticky);

/* scroll reveal effect */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
};

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

// contact form validation
function validateForm() {
  var name = document.getElementById("the-name").value;
  var email = document.getElementById("the-email").value;
  var phone = document.getElementById("the-phone").value;
  var message = document.getElementById("the-message").value;

  // Resetting previous error messages
  document.getElementById("name-error").innerHTML = "";
  document.getElementById("email-error").innerHTML = "";
  document.getElementById("phone-error").innerHTML = "";
  document.getElementById("message-error").innerHTML = "";

  var isValid = true;

  // Validate Name
  if (name.trim() === "") {
    document.getElementById("name-error").innerHTML = "Name is required";
    isValid = false;
  }

  // Validate Email
  if (email.trim() === "") {
    document.getElementById("email-error").innerHTML = "Email is required";
    isValid = false;
  } else if (!isValidEmail(email)) {
    document.getElementById("email-error").innerHTML = "Invalid email address";
    isValid = false;
  }

  // Validate Phone
  if (phone.trim() !== "" && !isValidPhone(phone)) {
    document.getElementById("phone-error").innerHTML = "Invalid phone number";
    isValid = false;
  }

  // Validate Message
  if (message.trim() === "") {
    document.getElementById("message-error").innerHTML = "Message is required";
    isValid = false;
  }

  return isValid;
}

function isValidEmail(email) {
  // Regular expression for a valid email address
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  // Regular expression for a valid phone number (allow digits, spaces, and dashes)
  var phoneRegex = /^[\d\s\-]+$/;
  return phoneRegex.test(phone);
}
// ***** MAIN SLIDER *****
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// auto display every 3 seconds
setInterval(function () {
  plusSlides(1);
}, 4000);
