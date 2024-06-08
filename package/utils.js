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
  if (key === null || key === undefined) {
    return;
  }

  let bankInput = document.getElementById("bankInput");
  bankInput.value += key;
}
