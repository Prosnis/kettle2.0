import * as model from "../model.mjs";
import * as viewControl from "./controlForm.view.js";
import * as viewStatus from "./statusForm.view.js";
import * as data from "../data/data.js";

const { boiling, waiting, done, burn } = data.statuses;
const { inputVolume, errorWater, errorTemp, inputTemp } = viewControl.elements;

function fill() {
  if (model.userKettle.working) return;
  viewStatus.updateStatus(waiting);
  const { capacity: currentValue } = model.userKettle.getSettings();

  const fillInfo = viewControl.getControlData();
  model.errorTemp(
    Number(fillInfo.temp),
    () => viewControl.showError(inputTemp, errorTemp),
    () => viewControl.removeError(inputTemp, errorTemp)
  );
  model.errorVolume(
    Number(fillInfo.volume),
    () => viewControl.showError(inputVolume, errorWater),
    () => viewControl.removeError(inputVolume, errorWater)
  );
  model.userKettle.fill(Number(fillInfo.volume), Number(fillInfo.temp));

  viewStatus.updateVolume(currentValue, model.userKettle.waterVolume);
  viewStatus.updateTimer(model.userKettle.doneTime);
  viewStatus.updateTemp(model.userKettle.finalTemperature);

  console.log(model.userKettle);
}

function stop() {
  if (!model.userKettle.working) return;
  viewStatus.updateStatus(waiting);
  model.userKettle.stop();
  viewStatus.updateTemp(model.userKettle.finalTemperature);
}

function start() {
  if (model.userKettle.working) return;
  viewStatus.updateStatus(boiling);
  model.userKettle.start(
    (remainingTime) => {
      viewStatus.updateTimer(remainingTime);
    },
    (finalTemp) => {
      viewStatus.updateTemp(finalTemp);
    },
    () => {
      viewStatus.updateStatus(done);
    },
    () => {
      viewStatus.burned()
      viewStatus.updateStatus(burn)
      viewStatus.newOne()
    }
  );
}

function setupEventListeners() {
  Object.entries(data.events).forEach(([key, value]) => {
    document.getElementById(key).addEventListener(value.action, (e) => {
      e.preventDefault();
      value.func();
    });
  });
}
setupEventListeners();

export { fill, start, stop };
