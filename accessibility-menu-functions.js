//Reading
enabledReading = false;
document.getElementById('read-aloud-button').addEventListener('click', () => {
    if (enabledReading) {
        //disable reading
        window.speechSynthesis.cancel();
    } else {
        //enable reading
        var content = document.getElementById("content");
        if (content) {
            var msg = new SpeechSynthesisUtterance(content.textContent);
            window.speechSynthesis.speak(msg);
        } else {
            console.log("Error: content element not found");
        }
    }
    enabledReading = !enabledReading;
});

//Fonts
let isFontBig = false;

document.getElementById('font-size-button').addEventListener('click', () => {
    if (isFontBig) {
        //disable big fonts
        var style = document.createElement('style');
        style.innerHTML =
            '*{ font-size: 100%;}';
        document.head.appendChild(style);
    } else {
        //enable big fonts
        var style = document.createElement('style');
        style.innerHTML =
            '*{ font-size: 1.3rem;} .govgr-radios__item{ display:flex; flex-direction:row; justify-content:flex-start; align-items:flex-start;}';
        document.head.appendChild(style);
    }
    isFontBig = !isFontBig;
});

// Change Contrast
document.getElementById('contrast-button').addEventListener('click', function() {
    // Toggle the body's contrast class
    document.body.classList.toggle('high-contrast');
});

// Reading Mask
const readingMask1 = document.getElementById('mask-up');
const readingMask2 = document.getElementById('mask-bottom');

enabledReadingMask = false;
document.getElementById('reading-mask-button').addEventListener('click', () => {
    if (enabledReadingMask) {
        //disable reading mask
        readingMask1.style.opacity = 0;
        readingMask2.style.opacity = 0;
    } else {
        //enable reading mask
        readingMask1.style.opacity = 0.5;
        readingMask2.style.opacity = 0.5;

        readingMask1.style.pointerEvents = 'auto';
        readingMask2.style.pointerEvents = 'auto';
    }
    enabledReadingMask = !enabledReadingMask;
});

document.addEventListener('mousemove', function(e) {
    if (readingMask2.style.opacity == 0.5) {
        readingMask1.style.top = (e.clientY + 75) + 'px';
        readingMask2.style.height = (e.clientY - 75) + 'px';
    }
});

// Bigger Cursor
let isCursorBig = false;

document.getElementById('cursor-button').addEventListener('click', () => {
    if (isCursorBig) {
        //disable big cursor
        var style = document.createElement('style');
        style.innerHTML =
            '*{cursor:auto !important;} button,.govgr-accordion .govgr-accordion__section-summary,.govgr-accordion .govgr-accordion__section-heading, .govgr-autocomplete__input--show-all-values,.govgr-autocomplete__option,.govgr-btn,.govgr-checkboxes__label,.govgr-checkboxes__input,.govgr-radios__label,.govgr-radios__input,.govgr-burger-icon,.govgr-link,.govgr-back-link,.govgr-details__summary,.govgr-tabs .govgr-tabs__list .govgr-tabs__list-item,.tooltip,.govgr-step-nav__accordion__summary{cursor: pointer !important; }';
        document.head.appendChild(style);
    } else {
        //enable big cursor
        var style = document.createElement('style');
        style.innerHTML =
            '* { cursor: url(assets/big-cursor.svg), auto !important; } button,.govgr-accordion .govgr-accordion__section-summary,.govgr-accordion .govgr-accordion__section-heading, .govgr-autocomplete__input--show-all-values,.govgr-autocomplete__option,.govgr-btn,.govgr-checkboxes__label,.govgr-checkboxes__input,.govgr-radios__label,.govgr-radios__input,.govgr-burger-icon,.govgr-link,.govgr-back-link,.govgr-details__summary,.govgr-tabs .govgr-tabs__list .govgr-tabs__list-item,.tooltip,.govgr-step-nav__accordion__summary{cursor: url(assets/big-cursor.svg), auto !important;}';
        document.head.appendChild(style);
    }
    isCursorBig = !isCursorBig;
});