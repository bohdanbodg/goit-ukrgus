const contentSelector = ".first-page-content";
const formSelector = "#form";
const mainActionSelector = ".main-action";
const gusAnimClass = "gus-anim";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Укргусь підготувався до роботи!");

  addClickEventToActionButton(contentSelector, (e) => {
    e.preventDefault();
    scrollToElement(formSelector);
  });

  let form = document.querySelector(formSelector);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendForm(form);
  });
});

function addClickEventToActionButton(blockSelector, callback) {
  let actionButton = document.querySelector(
    `${blockSelector} ${mainActionSelector}`
  );
  actionButton.addEventListener("click", callback, false);
}

function scrollToElement(elementSelector) {
  document.querySelector(elementSelector).scrollIntoView({
    behavior: "smooth",
  });
}

function validateForm() {
  const fullnameInput = document.querySelector(`${formSelector} #fullname`);
  if (isEmptyString(fullnameInput.value)) {
    throw new Error("Введіть ПІБ гуся!");
  }

  const emailInput = document.querySelector(`${formSelector} #email`);
  if (isEmptyString(emailInput.value)) {
    throw new Error("Введіть електронну пошту!");
  }

  const email = emailInput.value.trim();
  if (!(email.includes("@") && email.includes("."))) {
    throw new Error("Введіть електронну пошту у правильному форматі!");
  }
}

function isEmptyString(text, checkWhitespace = true) {
  if (typeof text !== "string") {
    return false;
  }

  return text.length === 0 || (checkWhitespace && text.trim().length === 0);
}

function sendForm(form) {
  try {
    validateForm();
  } catch (error) {
    alert(error.message);

    return;
  }

  let actionButton = document.querySelector(
    `${formSelector} ${mainActionSelector}`
  );
  actionButton.setAttribute("disabled", true);

  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(new FormData(form)).toString(),
  })
    .then(() => {
      runGusAnimation();

      setTimeout(() => {
        actionButton.removeAttribute("disabled");
        clearForm();
      }, 2000);
    })
    .catch((error) => {
      console.log("Sending form failed!");
    });
}

function clearForm() {
  let allFormInputs = document.querySelectorAll(`${formSelector} input`);
  allFormInputs.forEach((input) => {
    input.value = "";
  });
}

function runGusAnimation() {
  let gusImage = document.createElement("img");
  gusImage.setAttribute("src", "img/gus-anim.gif");
  gusImage.classList.add(gusAnimClass);

  let targetContainer = document.querySelector(formSelector);
  targetContainer.appendChild(gusImage);

  setTimeout(2000, () => {
    targetContainer.removeChild(gusImage);
  });

  console.log("Укргусь полетів виконувати бойову роботу!");
}
