const Screens = {
    TossCoin: 'TossCoin',
    PutFinger: 'PutFinger',
    WaitGettingInfo: 'WaitGettingInfo',
    SelectingCharacter: 'SelectingCharacter',
    SelectedCharacter: 'SelectedCharacter'
};

var currentScreen = Screens.TossCoin
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


var rndInt = randomIntFromInterval(1, 47)


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
    document.getElementById('wybranapostac').src = "imgs/postaciev2/" + rndInt + ".png";
    document.getElementById('wybranapostac').style.display = "block";

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
        rndInt = randomIntFromInterval(1, 47)
        window.electronAPI.print("imgs/postaciev2/" + rndInt + ".pdf")

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

