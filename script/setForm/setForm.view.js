const elements = {
    setForm : document.getElementById("containerSet"),
    setPower :document.getElementById("setPower"),
    setName : document.getElementById("setName"),
    setCapacity : document.getElementById("setCapacity"),
    userNameKettle : document.getElementById("userNameKettle"),
    controlForm : document.getElementById("container"),
}

function getSetData() {
    const item = {
        name: elements.setName.value,
        power: elements.setPower.value,
        capacity: elements.setCapacity.value,
    }
    return item
}

function displayName(kettleInfo){
    userNameKettle.textContent = `${kettleInfo.name}, ${kettleInfo.power}w, ${kettleInfo.capacity}ml`
}

export {
    getSetData, elements, displayName
}