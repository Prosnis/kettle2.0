import * as view from "../setForm/setForm.view.js";
import * as model from "../model.mjs";

view.elements.setForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const setInfo = view.getSetData();
  model.createNewKettle(setInfo);
  model.disabled(view.elements.setForm)
  model.disabled(view.elements.controlForm)
  view.displayName(setInfo)
});

view.elements.setForm.addEventListener("input", (e) => {
  if (e.target.type === "range") {
    let label = document.querySelector(`label[for="${e.target.id}"]`);
    label.id === "labelPower"
      ? (label.textContent = `${e.target.value}w`)
      : (label.textContent = `${e.target.value}ml`);
  }
});
