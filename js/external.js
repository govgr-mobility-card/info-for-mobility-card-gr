$("document").ready(function () {
  var currentQuestion = 0;
  var totalQuestions = 0;
  var userAnswers = {};
  var all_questions;
  var all_questions_en;
  const jsondata = "question-utils/cpsv.json";

  //hide the form buttons when its necessary
  function hideFormBtns() {
    $("#nextQuestion").hide();
    $("#backButton").hide();
  }

  //Once the form begins, the questions' data and length are fetched.
  function getQuestions() {
    return fetch("question-utils/all-questions.json")
      .then((response) => response.json())
      .then((data) => {
        all_questions = data;
        totalQuestions = data.length;

        // Fetch the second JSON file
        return fetch("question-utils/all-questions-en.json")
          .then((response) => response.json())
          .then((dataEn) => {
            all_questions_en = dataEn;
          })
          .catch((error) => {
            console.error("ΔΕΝ ΒΡΕΘΗΚΑΝ ΕΡΩΤΗΣΕΙΣ (EN):", error);

            // Show error message to the user
            const errorMessage = document.createElement("div");
            errorMessage.textContent =
              "Error: Failed to fetch all-questions-en.json.";
            $(".question-container").html(errorMessage);

            hideFormBtns();
          });
      })
      .catch((error) => {
        console.error("ΔΕΝ ΒΡΕΘΗΚΑΝ ΕΡΩΤΗΣΕΙΣ:", error);

        // Show error message to the user
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "Error: Failed to fetch all-questions.json.";
        $(".question-container").html(errorMessage);

        hideFormBtns();
      });
  }

  //Εachtime back/next buttons are pressed the form loads a question
  function loadQuestion(questionId, noError) {
    //If it is the first question, the back button is hidden
    if (currentQuestion === 0) {
      $("#backButton").hide();
    } else {
      $("#backButton").show();
    }

    //based on change-language.js
    if (currentLanguage === "english") {
      question = all_questions_en[questionId];
    } else {
      question = all_questions[questionId];
    }
    var questionElement = document.createElement("div");


    //If the user has answered (checked a value) the question, no error occurs. Otherwise you get an error (meaning that user needs to answer before he continues to the next question)!
    if (noError) {

      questionElement.innerHTML = `
                <div class='govgr-field' id='$id'>
                    <fieldset class='govgr-fieldset' aria-describedby='radio-country'>
                        <legend role='heading' aria-level='1' class='govgr-fieldset__legend govgr-heading-l'>
                            ${question.question}
                        </legend>
                        <div class='govgr-radios'>
                            <ul>
                                ${question.options
                                  .map(
                                    (option, index) => `
                                    <div class='govgr-radios__item'>
                                        <label class='govgr-label govgr-radios__label'>
                                            ${option}
                                            <input class='govgr-radios__input' type='radio' name='question-option' value='${option}' />
                                        </label>
                                    </div>
                                `
                                  )
                                  .join("")}
                            </ul>
                        </div>
                    </fieldset>
                </div>
            `;
    } else {
      questionElement.innerHTML = `
            <div class='govgr-field govgr-field__error' id='$id-error'>
                <fieldset class='govgr-fieldset' aria-describedby='radio-error'>
                    <legend  class='govgr-fieldset__legend govgr-heading-m language-component' data-component='chooseAnswer'>
                        Επιλέξτε την απάντησή σας
                    </legend>
                    <p class='govgr-hint language-component' data-component='oneAnswer'>Μπορείτε να επιλέξετε μόνο μία επιλογή.</p>
                    <div class='govgr-radios'>
                        <p class='govgr-error-message'>
                            <span class='govgr-visually-hidden language-component' data-component='errorAn'>Λάθος:</span>
                            <span class='language-component' data-component='choose'>Πρέπει να επιλέξετε μια απάντηση</span>
                        </p>
                            ${question.options
                              .map(
                                (option, index) => `
                                <div class='govgr-radios__item'>
                                    <label class='govgr-label govgr-radios__label'>
                                        ${option}
                                        <input class='govgr-radios__input' type='radio' name='question-option' value='${option}' />
                                    </label>
                                </div>
                            `
                              )
                              .join("")}
                    </div>
                </fieldset>
            </div>
        `;
      
      //The reason for manually updating the components of the <<error>> questionElement is because the 
      //querySelectorAll method works on elements that are already in the DOM (Document Object Model) 
      if (currentLanguage === "english"){
        // Manually update the english format of the last 4 text elements in change-language.js
          //chooseAnswer: "Choose your answer",
          //oneAnswer: "You can choose only one option.",
          //errorAn: "Error:",
          //choose: "You must choose one option"
        var components = Array.from(questionElement.querySelectorAll(".language-component"));
        components.slice(-4).forEach(function (component) {
          var componentName = component.dataset.component;
          component.textContent = languageContent[currentLanguage][componentName];
        });

      }
    }

    $(".question-container").html(questionElement);
  }

  function skipToEnd() {
    $(".question-container").html(
      "Λυπούμαστε αλλά δεν δικαιούστε το Δελτίο Μετακίνησης ΑμεΑ!"
    );
    hideFormBtns();
  }

  function retrieveAnswers() {
    var allAnswers = [];
    var result = "Πρέπει να υποβάλετε id1";
    getEvidencesById(1);
    for (var i = 0; i < totalQuestions; i++) {
      var answer = sessionStorage.getItem("answer_" + i);
      allAnswers.push(answer);
    }
    alert(allAnswers); // display all answers in console

    if (allAnswers[0] === "Το έχασα και θέλω να το εκδώσω ξανά") {
      result += " id9";
      getEvidencesById(9);
    }
    if (
      allAnswers[2] ===
      "Πολίτης τρίτων χωρών που έχουν καταστεί ανίκανοι για εργασία μετά από εργατικό ατύχημα σε ελληνικό έδαφος, ή είναι μέλη οικογένειας Έλληνα πολίτη ή πολίτη της ΕΕ, κατά τα οριζόμενα στο άρθρο 20 παρ.2 του Π.Δ. 106/2007 (135 Α ́), στο άρθρο 85 παρ. 4 του Ν. 4251/2014 ( 80 Α ́) και στο άρθρο 31 παρ. 1 του Ν. 4540/2018 (91 Α ́)"
    ) {
      result += " id11";
      getEvidencesById(11);
    }
    if (allAnswers[4] === "Διαθέτω ιατρική γνωμάτευση") {
      result += " id6";
      getEvidencesById(6);
    } else if (allAnswers[4] === "Διαθέτω απόφαση ΕΦΚΑ") {
      result += " id7";
      getEvidencesById(7);
    } else if (
      allAnswers[4] ===
      "Δικαιούχος προνοιακών επιδομάτων ΑμεΑ που χορηγεί ο ΟΠΕΚΑ"
    ) {
      result += " id8";
      getEvidencesById(8);
    }
    if (
      allAnswers[5] ===
      "Τυφλός ή οπτική αναπηρία-αναπηρία όρασης με ποσοστό 80% και άνω"
    ) {
      result += " id10";
      getEvidencesById(10);
    }
    if (
      allAnswers[6] ===
      "Είμαι εξουσιοδοτημένο πρόσωπο του ατόμου στο οποίο θα ανήκει η κάρτα"
    ) {
      result += " id4 id3";
      getEvidencesById(3);
      getEvidencesById(4);
    } else if (
      allAnswers[6] === "Είμαι κηδεμόνας του ατόμου στο οποίο θα ανήκει η κάρτα"
    ) {
      result += " id5 id3";
      getEvidencesById(3);
      getEvidencesById(5);
    }
    if (allAnswers[7] === "Για υπεραστικά μόνο") {
      result += " id12";
      getEvidencesById(12);
    } else if (allAnswers[7] === "Για όλα όσα δικαιούμαι") {
      result += " id2";
      getEvidencesById(2);
    }
    console.log(result);
  }

  function submitForm() {
    $(".question-container").html("Είστε δικαιούχος!");
    const evidenceListElement = document.createElement("ul");
    evidenceListElement.setAttribute("id", "evidences");
    $(".question-container").append(evidenceListElement);
    retrieveAnswers();
    hideFormBtns();
  }

  $("#nextQuestion").click(function () {
    if ($(".govgr-radios__input").is(":checked")) {
      var answer = $('input[name="question-option"]:checked').val();
      if (
        currentQuestion === 0 &&
        (answer === "Το έχασα για 2η φορά και θέλω να το εκδώσω ξανά" || answer === "I lost it for the second time and want to reissue it" )) {
        currentQuestion=-1;
        skipToEnd();
      } else if (currentQuestion === 1 && (answer === "ΟΧΙ" || answer === "NO" )) {
        currentQuestion=-1;
        skipToEnd();
      } else if (currentQuestion === 3 && (answer === "ΟΧΙ" || answer === "NO" )) {
        currentQuestion=-1;
        skipToEnd();
      } else {
        userAnswers[currentQuestion] = answer;
        sessionStorage.setItem("answer_" + currentQuestion, answer); // save answer to session storage

        //if the questions are finished then...
        if (currentQuestion + 1 == totalQuestions) {
          alert("submit");

          // retrieve all answers
          submitForm();
        }
        // otherwise...
        else {
          currentQuestion++;
          loadQuestion(currentQuestion, true);

          if (currentQuestion + 1 == totalQuestions && currentLanguage=="greek") {
            $(this).text("Υποβολή");
          }
          else if (currentQuestion + 1 == totalQuestions && currentLanguage=="english"){
            $(this).text("Submit");
          }
        }
      }
    } else {
      loadQuestion(currentQuestion, false);
    }
  });

  $("#backButton").click(function () {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion(currentQuestion, true);

      // Retrieve the answer for the previous question from userAnswers
      var answer = userAnswers[currentQuestion];
      if (answer) {
        $('input[name="question-option"][value="' + answer + '"]').prop(
          "checked",
          true
        );
      }
    }
  });

  $("#languageBtn").click(function () {
    toggleLanguage();
    // if is false only when the user is skipedToEnd and trying change the language
    if (currentQuestion>=0 && currentQuestion<totalQuestions-1) loadQuestion(currentQuestion, true);
  });

  function getEvidencesById(id) {
    fetch(jsondata)
      .then((response) => response.json())
      .then((data) => {
        const selectedEvidence = data.PublicService.evidence.find(
          (evidence) => evidence.id === id
        );
        if (selectedEvidence) {
          const evidenceListElement = document.getElementById("evidences");
          selectedEvidence.evs.forEach((evsItem) => {
            const listItem = document.createElement("li");
            listItem.textContent = evsItem.name;
            evidenceListElement.appendChild(listItem);
          });
        } else {
          console.log(`Evidence with ID '${givenEvidenceID}' not found.`);
        }
      })
      .catch((error) => {
        console.error("Error fetching JSON:", error);
      });
  }

  // Get the number of questions and load the first question on page load
  getQuestions().then(() => {
    // Code inside this block executes only after the data is fetched
    loadQuestion(currentQuestion, true);
  });
});
