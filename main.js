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

//Autofill bank column event
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
      document.getElementById("formSubmission").reset();
      return true;
    }
  } catch (error) {
    document.getElementById("notification").textContent = error.message;
  }
  return false;
}

function sendForm(Form) {
  fetch("https://chipbe.fly.dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Form),
  })
    .then((response) => {
      if (!response.ok) {
        const errorBE = `Failed to fetch data ${response.status}`;
        renderNotification(errorBE, "red");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response:", data);
      if (data.message) {
        renderNotification(data.message, "black");
        // document.getElementById("formSubmission").reset(); Moved to line 66 as a temporary fix
      } else if (!data.message) {
        renderNotification(
          "Organization of the same name already exist",
          "red"
        );
      }
      console.log("Response:", data.error.message);
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
}
