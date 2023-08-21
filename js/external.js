$("document").ready(function () {
  var currentQuestion = 0;
  var totalQuestions = 0;
  var userAnswers = {};
  var all_questions;
  var all_questions_en;
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
            console.error("Failed to fetch all-questions-en.json:", error);

            // Show error message to the user
            const errorMessage = document.createElement("div");
            errorMessage.textContent =
              "Error: Failed to fetch all-questions-en.json.";
            $(".question-container").html(errorMessage);

            hideFormBtns();
          });
      })
      .catch((error) => {
        console.error("Failed to fetch all-questions:", error);

        // Show error message to the user
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "Error: Failed to fetch all-questions.json.";
        $(".question-container").html(errorMessage);

        hideFormBtns();
      });
  }

  function getEvidences(){
    return fetch("question-utils/cpsv.json")
    .then((response) => response.json())
    .then((data) => {
      all_evidences = data;
      totalEvidences = data.length;

      // Fetch the second JSON file
      return fetch("question-utils/cpsv-en.json")
        .then((response) => response.json())
        .then((dataEn) => {
          all_evidences_en = dataEn;
        })
        .catch((error) => {
          console.error("Failed to fetch cpsv-en:", error);

          // Show error message to the user
          const errorMessage = document.createElement("div");
          errorMessage.textContent =
            "Error: Failed to fetch cpsv-en.json.";
          $(".question-container").html(errorMessage);

          hideFormBtns();
        });
    })
    .catch((error) => {
      console.error("Failed to fetch cpsv:", error);

      // Show error message to the user
      const errorMessage = document.createElement("div");
      errorMessage.textContent = "Error: Failed to fetch cpsv.json.";
      $(".question-container").html(errorMessage);

      hideFormBtns();
    });
  }

  function getEvidencesById(id) {
    var selectedEvidence;
    currentLanguage === "greek" ? selectedEvidence = all_evidences : selectedEvidence = all_evidences_en;
    selectedEvidence = selectedEvidence.PublicService.evidence.find((evidence) => evidence.id === id) 

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
  }

  //text added in the final result
  function setResult(text){
    const resultWrapper = document.getElementById("resultWrapper");
    const result = document.createElement("div");
    result.textContent=text;
    resultWrapper.appendChild(result);
  }

  //Εachtime back/next buttons are pressed the form loads a question
  function loadQuestion(questionId, noError) {
    //If it is the first question, the back button is hidden
    if (currentQuestion === 0) {
      $("#backButton").hide();
    } else {
      $("#backButton").show();
    }

    currentLanguage === "greek" ? question = all_questions[questionId] : question = all_questions_en[questionId];
    var questionElement = document.createElement("div");


    //If the user has answered the question (checked a value), no error occurs. Otherwise you get an error (meaning that user needs to answer before he continues to the next question)!
    if (noError) {

      questionElement.innerHTML = `
                <div class='govgr-field'>
                    <fieldset class='govgr-fieldset' aria-describedby='radio-country'>
                        <legend role='heading' aria-level='1' class='govgr-fieldset__legend govgr-heading-l'>
                            ${question.question}
                        </legend>
                        <div class='govgr-radios' id='radios-${questionId}'>
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
            <legend role='heading' aria-level='1' class='govgr-fieldset__legend govgr-heading-l'>
                        ${question.question}
                    </legend>
                <fieldset class='govgr-fieldset' aria-describedby='radio-error'>
                    <legend  class='govgr-fieldset__legend govgr-heading-m language-component' data-component='chooseAnswer'>
                        Επιλέξτε την απάντησή σας
                    </legend>
                    <p class='govgr-hint language-component' data-component='oneAnswer'>Μπορείτε να επιλέξετε μόνο μία επιλογή.</p>
                    <div class='govgr-radios id='radios-${questionId}'>
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
    currentLanguage === "greek" ? $(".question-container").html("Λυπούμαστε αλλά δεν δικαιούστε το Δελτίο Μετακίνησης ΑμεΑ!") : $(".question-container").html("We are sorry but you are not entitled to the Disability Mobility Card!");
    hideFormBtns();
  }

  $("#startBtn").click(function () {
    $("#intro").html("");
    $("#languageBtn").hide();
    $("#questions-btns").show();
  });

  function retrieveAnswers() {
    var allAnswers = [];
    // currentLanguage === "greek" ? result = "Πρέπει να υποβάλετε id1": result = "You must submit id1";

    getEvidencesById(1);
    for (var i = 0; i < totalQuestions; i++) {
      var answer = sessionStorage.getItem("answer_" + i);
      allAnswers.push(answer);
    }
    if (allAnswers[0] === "2") {
      getEvidencesById(9);
    }
    if (
      allAnswers[2] === "4"
    ) {
      getEvidencesById(11);
    }
    if (allAnswers[4] === "1") {
      getEvidencesById(6);
    } else if (allAnswers[4] === "2") {
      getEvidencesById(7);
    } else if (
      allAnswers[4] === "3"
    ) {
      getEvidencesById(8);
    }
    if (
      allAnswers[5] === "1" || (allAnswers[5] === "2" && allAnswers[8] === "1")
    ) { 
      getEvidencesById(10);
      setResult("Δικαιούται και ο συνοδός");
    }
    
    if (
      allAnswers[6] === "2"
    ) {
      getEvidencesById(3);
      getEvidencesById(4);
    } else if (
      allAnswers[6] === "3"
    ) {
      getEvidencesById(3);
      getEvidencesById(5);
    }
    if (allAnswers[7] === "1") {
      getEvidencesById(12);
    } else if (allAnswers[7] === "2") {
      getEvidencesById(2);
      if(allAnswers[8] === "1"){
        setResult("Δικαιούσαι δωρεάν μετακίνησης με τα αστικά μέσα συγκοινωνίας της Περιφέρειας σου και έκπτωση 50% για τις εκτός ορίων της Περιφέρειάς τους μετακινήσεις με υπεραστικά ΚΤΕΛ");
      }
      else if(allAnswers[8] === "2"){
        setResult("Δικαιούσαι έκπτωση 50% για τις εκτός ορίων της Περιφέρειάς τους μετακινήσεις με υπεραστικά ΚΤΕΛ");
      }
    }
  }

  function submitForm() {
    currentLanguage === "greek" ? $(".question-container").html("<div class='answer'>Είστε δικαιούχος!</div>") : $(".question-container").html("<div class='answer'>You are eligible!</div>");
    const resultWrapper = document.createElement("div");
    resultWrapper.setAttribute("id", "resultWrapper");
    $(".question-container").append(resultWrapper);
    const evidenceListElement = document.createElement("ol");
    evidenceListElement.setAttribute("id", "evidences");
    $(".question-container").append("<div class='answer'>Τα δικαιολογητικά που πρέπει να προσκομίσετε για να λάβετε το Δελτίο Μετακίνησης είναι τα εξής:</div>");
    $(".question-container").append(evidenceListElement);
    $("#faqContainer").load("faq.html");
    retrieveAnswers();
    hideFormBtns();
  }

  $("#nextQuestion").click(function () {
    
    if ($(".govgr-radios__input").is(":checked")) {
      var selectedRadioButtonIndex = $('input[name="question-option"]').index($('input[name="question-option"]:checked'))+1;
      console.log(selectedRadioButtonIndex);
      if (
        currentQuestion === 0 && selectedRadioButtonIndex === 3) {
        currentQuestion=-1;
        skipToEnd();
      } else if (currentQuestion === 1 && selectedRadioButtonIndex === 2) {
        currentQuestion=-1;
        skipToEnd();
      } else if (currentQuestion === 3 && selectedRadioButtonIndex === 2) {
        currentQuestion=-1;
        skipToEnd();
      } else {
        //save selectedRadioButtonIndex to the storage
        userAnswers[currentQuestion] = selectedRadioButtonIndex;
        sessionStorage.setItem("answer_" + currentQuestion, selectedRadioButtonIndex); // save answer to session storage

        //if the questions are finished then...
        if (currentQuestion + 1 == totalQuestions) {
          submitForm();
        }
        // otherwise...
        else {
          currentQuestion++;
          loadQuestion(currentQuestion, true);

          if (currentQuestion + 1 == totalQuestions) {
            currentLanguage === "greek" ? $(this).text("Υποβολή") : $(this).text("Submit"); 
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

  $("#questions-btns").hide();

  // Get all questions
  getQuestions().then(() => {
    // Get all evidences and load the first question on page load
    getEvidences().then(() => {
      // Code inside this block executes only after the data is fetched
      loadQuestion(currentQuestion, true);
    });
  });


});
