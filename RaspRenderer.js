const Screens = {
    Logo: 'Logo',
    PutFinger: 'PutFinger',
    FingerReceived: 'FingerReceived',
    SelectingCharacter: 'SelectingCharacter',
    SelectedCharacter: 'SelectedCharacter'
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
putFingerImg.addEventListener('mousedown', () => onPress())
putFingerImg.addEventListener('touchstart', () => onPress())

const onPress = () => {
    console.log("clicked!")
    if (currentScreen == Screens.PutFinger) {
        window.electronAPI.finger()
        switchToScreen(Screens.FingerReceived)

        const video = document.getElementById("FingerReceivedVideo")
        video.pause();
        video.currentTime = 0;
        video.play();


        setTimeout(() => {
            switchToScreen(Screens.SelectingCharacter)

            setTimeout(() => {
                switchToScreen(Screens.SelectedCharacter)
                setTimeout(() => {
                    switchToScreen(Screens.Logo)

                }, 10000)
            }, 5000)

        }, 5000)
    }
}