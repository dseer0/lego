const Screens = {
    TossCoin: 'TossCoin',
    PutFinger: 'PutFinger',
    WaitGettingInfo: 'WaitGettingInfo',
    SelectingCharacter: 'SelectingCharacter'
};

var currentScreen = Screens.TossCoin


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

const switchToSelectingChar = () => {
    hideAll()
    showScreen(Screens.SelectingCharacter)
    currentScreen = Screens.SelectingCharacter
    document.getElementById('character-carousel').style.display = "block";

}
//--------------------------------------


switchToScreen(Screens.TossCoin)

window.electronAPI.onCoin(() => {
    console.log("coin tossed!")

    if (currentScreen == Screens.TossCoin) {
        switchToScreen(Screens.PutFinger)
    }
})

window.electronAPI.onFinger(() => {
    if (currentScreen == Screens.PutFinger) {
        switchToScreen(Screens.WaitGettingInfo)
        setTimeout(() => {
            switchToSelectingChar()
        }, 5000)
    }
})

