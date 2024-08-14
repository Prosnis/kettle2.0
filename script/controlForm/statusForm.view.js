const elements = {
  statusInfo: document.getElementById("statusInfo"),
  volumeStatus: document.getElementById("volumeStatus"),
  volumeStatusLabel: document.getElementById("volumeStatusLabel"),
  boiledStatusLabel: document.getElementById("boiledStatusLabel"),
  temperatureStatusLabel: document.getElementById("temperatureStatusLab"),
  controlForm: document.getElementById("container"),
  toHide: document.getElementById("toHide"),
};

function updateVolume(maxValue, currentValue) {
  volumeStatus.max = maxValue;
  volumeStatus.value = currentValue
  volumeStatusLabel.textContent = `volume: ${currentValue}/${maxValue} ml`;
}

function updateTimer(time) {
  boiledStatusLabel.textContent = `time to ready: ${time} s`;
}

function updateTemp(temp){
    temperatureStatusLabel.textContent = `temperature: ${temp}°c`
}

function updateStatus(status){
    statusInfo.textContent = status
}

function burned(){
  document.getElementById('body').classList.add('burn')
}

function newOne(){
  const btn = document.createElement('button')
  btn.textContent = 'i have another one'
  elements.toHide.after(btn)
  elements.controlForm.classList.add('disabled')
  elements.toHide.classList.add('hide')
  btn.onclick = ()=>location.reload()
}


export { updateVolume, elements, updateTimer,updateTemp,updateStatus,burned, newOne };
