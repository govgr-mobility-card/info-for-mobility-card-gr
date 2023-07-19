var languageContent = {
    greek: {
      languageBtn: "EL",
      headerTitle: "Δελτίο μετακίνησης ΑΜΕΑ",
      pageTitle: "ΔΕΛΤΙΟ ΜΕΤΑΚΙΝΗΣΗΣ ΑΜΕΑ",
      subTitle: "Ο παρών οδηγός δημιουργήθηκε ώστε να βοηθήσει τους χρήστες για οποιαδήποτε πληροφορία σχετικά με τα δελτία μετακίνησης ΑΜΕΑ.",
      backButton: "Πίσω",
      nextQuestion: "Επόμενη ερώτηση",
    },
    english: {
      languageBtn: "EN",
      headerTitle: "Mobility Card for People with Disabilities",
      pageTitle: "MOBILITY CARD FOR PEOPLE WITH DISABILITIES",
      subTitle: "This guide has been created to help users with any information about the mobility card for disabled people.",
      backButton: "Βack",
      nextQuestion: "Next Question",
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