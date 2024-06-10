export function parseBool(object) {
  if (object === "true") {
    return true;
  } else if (object === "false") {
    return false;
  }
}

export function regularize(Form) {
  Form.name = Form.name.toLowerCase();
  Form.bank = Form.bank.toLowerCase();
}

export function autoFill(key) {
  let bankInput = document.getElementById("bankInput");

  if (key === null || key === undefined) {
    bankInput.value = bankInput.value.slice(0, -1);
  } else if (key !== null) {
    bankInput.value += key;
  }
}
