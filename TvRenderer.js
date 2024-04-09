const Screens = {
    TossCoin: 'TossCoin',
    PutFinger: 'PutFinger',
    WaitGettingInfo: 'WaitGettingInfo',
    SelectingCharacter: 'SelectingCharacter',
    SelectedCharacter: 'SelectedCharacter'
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

const switchToSelectedChar = () => {
    hideAll()
    showScreen(Screens.SelectedCharacter)
    currentScreen = Screens.SelectedCharacter


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
            setTimeout(() => {
                switchToSelectedChar()
                setTimeout(() => {
                    switchToScreen(Screens.TossCoin)
                }, 10000)
            }, 5000)
        }, 5000)
    }
})

