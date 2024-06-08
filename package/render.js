export function renderNotification(text, color) {
  let notification = document.getElementById("notification");
  notification.textContent = text;
  notification.style.border = `solid ${color}`;
  notification.style.color = color;

  notification.style.transition = "none";
  notification.style.opacity = "1";

  setTimeout(function () {
    notification.style.transition = "opacity 1s ease";
    notification.style.opacity = "0";
    setTimeout(function () {
      notification.textContent = "";
    }, 1000);
  }, 3000);
}

export function renderScore(Form) {
  document.getElementById("resultDiv").classList.add("container2");
  document.getElementById(
    "companyName"
  ).innerText = `Company name : ${Form.name}`;
  document.getElementById(
    "companyScore"
  ).innerText = `Company score : ${Form.Score}`;
  if (Form.Score >= 5) {
    let result = document.getElementById("companyResult");
    result.innerText = `Passed the boarding process`;
    result.classList.add("pass");
    result.classList.remove("fail");
  } else {
    let result = document.getElementById("companyResult");
    result.innerText = `Failed the boarding process`;
    result.classList.add("fail");
    result.classList.remove("pass");
  }
}
