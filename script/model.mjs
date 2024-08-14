class ElectricKettle {
  #name = "";
  #capacity = 0;
  #power = 0;

  constructor(name, power, capacity) {
    this.#name = name;
    this.#power = power;
    this.#capacity = capacity;

    this.doneTime = 0;
    this.waterVolume = 0;
    this.intervalTimer = null;
    this.startTime = 0;
    this.remainingTime = 0;
    this.elapsedTime = 0;
    this.finalTemperature = 0;
    this.working = false;
  }

  getSettings() {
    return {
      name: this.#name,
      capacity: this.#capacity,
      power: this.#power,
    };
  }

  #checkWater(waterLimit) {
    return waterLimit > this.#capacity ? false : true;
  }

  #checkTemp(finalTemperature) {
    return finalTemperature > 100 ? false : true;
  }

  fill(volume, temp) {
    if (this.working) return;

    if (!this.#checkWater(this.waterVolume + volume)) return;
    if (!this.#checkTemp(temp)) return;

    if (!this.waterVolume) {
      this.finalTemperature = temp;
      this.waterVolume = volume;
    } else {
      this.finalTemperature = Math.round(
        (this.finalTemperature * this.waterVolume + temp * volume) /
          (this.waterVolume + volume)
      );
      this.waterVolume += volume;
    }
    /////////

    this.doneTime = Math.round(
      [this.waterVolume * 4.18 * [100 - this.finalTemperature]] / this.#power
    );
  }

  start(onUpdate, onStop, onDone, onBurn) {
    if (this.waterVolume < 100) {
      if (typeof onUpdate === "function") {
        onBurn();
      }
      return
    } 
    this.startTime = Date.now();

    this.intervalTimer = setInterval(() => {
      this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
      this.remainingTime = Math.floor(this.doneTime - this.elapsedTime);

      if (typeof onUpdate === "function") {
        onUpdate(this.remainingTime);
      }
      if (this.remainingTime <= 0) {
        this.stop(onStop); 
        if (typeof onDone === "function") {
          onDone(); 
        }
      }
    }, 1000);
    this.working = true;
  }

  stop(onStop) {
    clearInterval(this.intervalTimer);
    if (this.working) {
      this.working = false;
      this.finalTemperature += Math.round(
        [this.#power * this.elapsedTime] / (this.waterVolume * 4.18)
      );
      this.doneTime = Math.round(
        [this.waterVolume * 4.18 * [100 - this.finalTemperature]] / this.#power
      );
      ////
      if (typeof onStop === "function") {
        onStop(this.finalTemperature);
      }
      ////
    }
  }
}

let userKettle = null;

function createNewKettle(kettle) {
  return (userKettle = new ElectricKettle(
    kettle.name,
    Number(kettle.power),
    Number(kettle.capacity)
  ));
}

function disabled(elem) {
  elem.classList.contains("disabled")
    ? elem.classList.remove("disabled")
    : elem.classList.add("disabled");
}

function errorVolume(volume, displayError, removeError) {
  const userInfo = userKettle.getSettings();
  if (userInfo.capacity < userKettle.waterVolume + volume) {
    console.log(userKettle.waterVolume + volume);
    displayError();
  } else {
    removeError();
  }
}

function errorTemp(temp, displayError, removeError) {
  temp >= 100 ? displayError() : removeError();
}

export { createNewKettle, userKettle, disabled, errorVolume, errorTemp };
