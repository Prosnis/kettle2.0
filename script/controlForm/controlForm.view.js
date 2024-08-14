const elements = {
  btnFill: document.getElementById("btnFill"),
  btnStart: document.getElementById("btnStart"),
  btnStop: document.getElementById("btnStop"),

  inputVolume: document.getElementById("inputVolume"),
  inputTemp: document.getElementById("temperature"),

  controlForm: document.getElementById("container"),
  userNameKettle: document.getElementById("userNameKettle"),

  errorWater: document.getElementById("errorWater"),
  errorTemp: document.getElementById("errorTemp"),
};

function getControlData() {
  const item = {
    volume: elements.inputVolume.value,
    temp: elements.inputTemp.value,
  };
  return item;
}

function showError(input, error) {
  if (!input.classList.contains("wrong")) {
    input.classList.add("wrong");
    error.classList.remove("hide");
  }
}

function removeError(input, error) {
  if (input.classList.contains("wrong")) {
    input.classList.remove("wrong");
    error.classList.add("hide");
  }
}



export { elements, getControlData, showError, removeError };
