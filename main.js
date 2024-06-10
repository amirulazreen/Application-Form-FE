import "./css/style.css";
import { calculateGeneralScore } from "./package/score";
import { parseBool, regularize, autoFill } from "./package/utils";
import { renderNotification, renderScore } from "./package/render";

let Form = {};

//Submit event
document
  .getElementById("formSubmission")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    if (fillForm()) {
      calculateGeneralScore(Form);
      renderScore(Form);
      regularize(Form);
      sendForm(Form);
    }
  });

// Autofill bank column event
document
  .getElementById("nameInput")
  .addEventListener("input", function (event) {
    autoFill(event.data);
  });

function fillForm() {
  const name = document.getElementById("nameInput").value;
  const type = document.querySelector(
    'input[name="organizationType"]:checked'
  ).value;
  const bank = document.getElementById("bankInput").value;
  const opYear = parseInt(document.getElementById("opyearInput").value);
  const ssm = parseBool(document.getElementById("ssmInput").value);
  const paymentgateway = document.getElementById("paymentgatewayInput").value;
  const prodType = document.getElementById("prodtypeInput").value;
  const storeType = document.getElementById("storetypeInput").value;
  const inventory = parseBool(document.getElementById("inventoryInput").value);
  const reference = document.getElementById("referenceInput").value;
  const socMedia = document.getElementById("socmediaInput").value;
  const litigation = parseBool(
    document.getElementById("litigationInput").value
  );

  try {
    if (bank !== name) {
      const errorFE = (document.getElementById("notification").textContent =
        "Bank name must be the same as organization name");
      renderNotification(errorFE, "red");
    } else {
      Form = {
        name,
        type,
        bank,
        opYear,
        ssm,
        paymentgateway,
        prodType,
        storeType,
        inventory,
        reference,
        socMedia,
        litigation,
      };
      return true;
    }
  } catch (error) {
    document.getElementById("notification").textContent = error.message;
  }
  return false;
}

//https://chipbe.fly.dev/
//http://localhost:8080/save
function sendForm(Form) {
  fetch("https://chipbe.fly.dev/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Form),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorMessage = await response.json();
        console.log("Error Message:", errorMessage);
        renderNotification(errorMessage.error, "red");
        throw new Error(errorMessage.error);
      }
      return response.json();
    })

    .then((data) => {
      console.log("Response:", data);
      renderNotification(data.message, "black");
      document.getElementById("formSubmission").reset();
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
      renderNotification(error, "red");
    });
}
