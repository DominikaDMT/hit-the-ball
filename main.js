const ball = document.querySelector('.ball'),
    btn = document.querySelector('.btn-action'),
    spring = document.querySelector('.spring'),
    fill = document.querySelector('.fill');

console.log(ball, btn, spring, fill);

const stretchSpring = () => {
    console.log('Naciągamy');
    // fill i spring są zapałzowane
    fill.style.animationName = "fill";
    fill.style.animationPlayState = "running";
    spring.style.animationPlayState = "running";
    btn.textContent = "Puśc sprężynę";
    //  zablokowanie kklikania butona
    btn.removeEventListener("mousedown", stretchSpring);
    btn.removeEventListener("touchstart", stretchSpring);

}


const releaseSpring = () => {
    console.log("Puszczamy");
    const fillStyles = getComputedStyle(fill);
    // const fillWidth = Number(fillStyles.width);
    // Number zrobi Nan, jeśli będą w stringu pixere
    const fillWidth = parseInt(fillStyles.width, 10);
    const barWidth = parseInt(getComputedStyle(document.querySelector('.bar')).width, 10);
    console.log(fillWidth, barWidth);
    const progressPercent = (fillWidth / barWidth).toFixed(2);
    console.log(progressPercent);

    btn.textContent = `Moc uderzenia to ${(progressPercent*100).toFixed()}%`
    btn.style.backgroundColor = '#aaa';
    btn.style.color = 'black'
    fill.style.animationPlayState = "paused";

    // nadpisanie zmienną dla html
    document.documentElement.style.setProperty("--power-x", `${30 + progressPercent * 50}%`);
    ball.style.animation = 'fly-ball-x 1s 1 forwards .15s cubic-bezier(.17, .67, .6, 1), fly-ball-y 1s 1 forwards 0.15s linear'

    document.documentElement.style.setProperty("--spring-left", getComputedStyle(spring).left);
    spring.style.animation = 'release-spring .2s 1 forwards linear';

    //  zablokowanie kklikania butona
    btn.removeEventListener("mouseup", stretchSpring);
    btn.removeEventListener("touchend", stretchSpring);


    ball.addEventListener('animationend', resetAnimation);

    // pobranie styli jako obiekty - ALTERNATYWA
    const myRules = document.styleSheets[0].cssRules;
    console.log(myRules);

    for (const i of myRules) {
        if (i.name === "fly-ball-x") {
            i.appendRule(`100% {left: ${30 + progressPercent * 50}%}`);
        }
    }


}

const resetAnimation = () => {
    console.log('Reset animacji');
    ball.removeEventListener('animationend', resetAnimation);

    // przywrócenie nasłuchiwania

    setTimeout(() => {
        btn.addEventListener('mousedown', stretchSpring);
        btn.addEventListener('mouseup', releaseSpring);
        btn.addEventListener('touchstart', stretchSpring);
        btn.addEventListener('touchend', releaseSpring);

        btn.style.backgroundColor = "#222";
        btn.style.color = 'white';
        btn.textContent = "Naciągnij sprężynę";


        spring.style.animation = "";
        ball.style.animation = "";
        fill.style.animationName = "none";




    }, 2000)




}

btn.addEventListener('mousedown', stretchSpring);
btn.addEventListener('mouseup', releaseSpring);
btn.addEventListener('touchstart', stretchSpring);
btn.addEventListener('touchend', releaseSpring);