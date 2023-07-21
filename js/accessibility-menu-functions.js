//Reading
var enabledReading = false;
var currentIndex = 0;
var activeElement;
document
  .getElementById("read-aloud-button")
  .addEventListener("change", function () {

    if (enabledReading) {
      currentIndex = 0;
      window.speechSynthesis.cancel();

    } else {
    $("#nextQuestion").click(function () {
      window.speechSynthesis.cancel();
      var msg = new SpeechSynthesisUtterance(document.querySelector('[tabindex="5"]').textContent);
      console.log(msg);
      window.speechSynthesis.speak(msg);
    });
    }
    enabledReading = !enabledReading;
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Tab" && enabledReading) {
      event.preventDefault();
      if (currentIndex < 9) {
        window.speechSynthesis.cancel();
        currentIndex= currentIndex+1;
        console.log(currentIndex);
        activeElement = document.querySelector('[tabindex="' + currentIndex + '"]');
        activeElement.focus();
        console.log(activeElement.textContent);
        var msg = new SpeechSynthesisUtterance(activeElement.textContent);
        window.speechSynthesis.speak(msg);
      }
      } else {
        console.log("No next element found");
      }
    });

   
//Fonts
var isFontBig = false;

document
  .getElementById("font-size-button")
  .addEventListener("change", function () {
    if (isFontBig) {
      //disable big fonts
      var style = document.createElement("style");
      style.innerHTML = "*{ font-size: 100%;}";
      document.head.appendChild(style);
    } else {
      //enable big fonts
      var style = document.createElement("style");
      style.innerHTML =
        "*{ font-size: 1.3rem;} .govgr-radios__item{ display:flex; flex-direction:row; justify-content:flex-start; align-items:flex-start;}";
      document.head.appendChild(style);
    }
    isFontBig = !isFontBig;
  });

// Change Contrast
document
  .getElementById("contrast-button")
  .addEventListener("change", function () {
    // Toggle the body's contrast class
    document.body.classList.toggle("high-contrast");
  });

// Reading Mask
const readingMask1 = document.getElementById("mask-up");
const readingMask2 = document.getElementById("mask-bottom");

var enabledReadingMask = false;
document
  .getElementById("reading-mask-button")
  .addEventListener("change", function () {
    if (enabledReadingMask) {
      //disable reading mask
      readingMask1.style.opacity = 0;
      readingMask2.style.opacity = 0;
    } else {
      //enable reading mask
      readingMask1.style.opacity = 0.5;
      readingMask2.style.opacity = 0.5;

      readingMask1.style.pointerEvents = "auto";
      readingMask2.style.pointerEvents = "auto";
    }
    enabledReadingMask = !enabledReadingMask;
  });

if (!enabledReadingMask) {
  document.addEventListener("mousemove", function (e) {
    readingMask1.style.top = e.clientY + 75 + "px";
    readingMask2.style.height = e.clientY - 75 + "px";
  });
}

// Bigger Cursor
var isCursorBig = false;

document
  .getElementById("cursor-button")
  .addEventListener("change", function () {
    if (isCursorBig) {
      //disable big cursor
      var style = document.createElement("style");
      style.innerHTML =
        "*{cursor:auto !important;} button,.govgr-accordion .govgr-accordion__section-summary,.govgr-accordion .govgr-accordion__section-heading, .govgr-autocomplete__input--show-all-values,.govgr-autocomplete__option,.govgr-btn,.govgr-checkboxes__label,.govgr-checkboxes__input,.govgr-radios__label,.govgr-radios__input,.govgr-burger-icon,.govgr-link,.govgr-back-link,.govgr-details__summary,.govgr-tabs .govgr-tabs__list .govgr-tabs__list-item,.tooltip,.govgr-step-nav__accordion__summary{cursor: pointer !important; }";
      document.head.appendChild(style);
    } else {
      //enable big cursor
      var style = document.createElement("style");
      style.innerHTML =
        "* { cursor: url(assets/big-cursor.svg), auto !important; } button,.govgr-accordion .govgr-accordion__section-summary,.govgr-accordion .govgr-accordion__section-heading, .govgr-autocomplete__input--show-all-values,.govgr-autocomplete__option,.govgr-btn,.govgr-checkboxes__label,.govgr-checkboxes__input,.govgr-radios__label,.govgr-radios__input,.govgr-burger-icon,.govgr-link,.govgr-back-link,.govgr-details__summary,.govgr-tabs .govgr-tabs__list .govgr-tabs__list-item,.tooltip,.govgr-step-nav__accordion__summary{cursor: url(assets/big-cursor.svg), auto !important;}";
      document.head.appendChild(style);
    }
    isCursorBig = !isCursorBig;
  });
