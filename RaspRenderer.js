const Screens = {
    Logo: 'Logo',
    PutFinger: 'PutFinger',
    FingerReceived: 'FingerReceived',
    SelectingCharacter: 'SelectingCharacter'
};

var currentScreen = Screens.Logo

const hideScreen = (id) => {
    document.getElementById(id).style.display = "none";
}

const showScreen = (id) => {
    document.getElementById(id).style.display = "block";
}

const switchToScreen = (id) => {
    hideAll()
    showScreen(id)
    currentScreen = id
}

const hideAll = () => {
    const items = document.getElementsByClassName("screen");
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "none";
    }
}

switchToScreen(Screens.Logo)


window.electronAPI.onCoin(() => {
    if (currentScreen == Screens.Logo) {
        switchToScreen(Screens.PutFinger)
    }
})


const putFingerImg = document.getElementById(Screens.PutFinger)
putFingerImg.addEventListener('click', () => {
    console.log("clicked!")
    if (currentScreen == Screens.PutFinger) {
        window.electronAPI.finger()
        switchToScreen(Screens.FingerReceived)
        setTimeout(() => {
            switchToScreen(Screens.SelectingCharacter)
        }, 3000)
    }
})