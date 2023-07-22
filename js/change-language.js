var languageContent = {
    greek: {
      languageBtn: "EL",
      pageTitle: "Δελτίο Μετακίνησης ΑΜΕΑ",
      infoTitle: "Πληροφορίες για την χορήγηση Δελτίων Μετακίνησης ΑΜΕΑ για το 2023",
      subTitle: "Ο παρών οδηγός δημιουργήθηκε ώστε να βοηθήσει τους χρήστες για οποιαδήποτε πληροφορία σχετικά με τα δελτία μετακίνησης ΑΜΕΑ.",
      backButton: "Πίσω",
      nextQuestion: "Επόμενη ερώτηση",
      biggerCursor: "Μεγαλύτερος Δρομέας",
      bigFontSize: "Μεγάλο Κείμενο",
      readAloud: "Ανάγνωση",
      changeContrast: "Αντίθεση",
      readingMask: "Μάσκα Ανάγνωσης",
      startBtn:"Ας ξεκινήσουμε",
      chooseAnswer: "Επιλέξτε την απάντησή σας",
      oneAnswer: "Μπορείτε να επιλέξετε μόνο μία επιλογή.",
      errorAn: "Λάθος:",
      choose: "Πρέπει να επιλέξετε μια απάντηση",
    },
    english: {
      languageBtn: "EN",
      pageTitle: "Mobility Card for People with Disabilities",
      infoTitle: "Information on the issue of Mobility Cards for people with disabilities for 2023",
      subTitle: "This guide has been created to help users with any information about the mobility card for disabled people.",
      backButton: "Βack",
      nextQuestion: "Next Question",
      biggerCursor: "Bigger Cursor",
      bigFontSize:" Big Font Size",
      readAloud: "Read Aloud",
      changeContrast:" Change Contrast",
      readingMask:" Reading Mask",
      startBtn:"Let's start",
      chooseAnswer: "Choose your answer",
      oneAnswer: "You can choose only one option.",
      errorAn: "Error:",
      choose: "You must choose one option",
    }
};
  
var currentLanguage = "greek"; //Set the initial language

function toggleLanguage() {
    currentLanguage = currentLanguage === "greek" ? "english" : "greek";
    updateContent();
}

function updateContent() {
    var components = document.querySelectorAll(".language-component");
     
    components.forEach(function (component) {
        var componentName = component.dataset.component;
        component.textContent = languageContent[currentLanguage][componentName];
    });
}