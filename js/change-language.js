var languageContent = {
    greek: {
      languageBtn: "EL",
      pageTitle: "Δελτίο Μετακίνησης ΑΜΕΑ",
      infoTitle: "Πληροφορίες για την χορήγηση Δελτίων Μετακίνησης ΑΜΕΑ για το 2023",
      subTitle1: "Αυτό το ερωτηματολόγιο μπορεί να σας βοηθήσει να βρείτε αν δικαιούστε να λάβετε το Δελτίο Μετακίνησης ΑΜΕΑ.",
      subTitle2: "H συμπλήρωση του ερωτηματολογίου δεν απαιτεί παραπάνω από 10 λεπτά.",
      subTitle3: "Δεν θα αποθηκεύσουμε ούτε θα μοιραστούμε τις απαντήσεις σας.",
      backButton: "Πίσω",
      nextQuestion: "Επόμενη ερώτηση",
      biggerCursor: "Μεγαλύτερος Δρομέας",
      bigFontSize: "Μεγάλο Κείμενο",
      readAloud: "Ανάγνωση",
      changeContrast: "Αντίθεση",
      readingMask: "Μάσκα Ανάγνωσης",
      footerText: "Υλοποίηση για την εκπόνηση πτυχιακής εργασίας από τις φοιτήτριες της Εφαρμοσμένης Πληροφορικής:",
      and: "και",
      student1: "Αμπατζίδου Ελισάβετ",
      student2: "Δασύρα Ευμορφία Ελπίδα",
      startBtn:"Ας ξεκινήσουμε",
      faq:"Συχνές Ερωτήσεις",
      q1:"Πόσο κοστίζει η έκδοση του Δελτίου Μετακίνησης;",
      a1:"Δεν έχει κόστος.",
      q2:"Ποια είναι η ημερομηνία ανανέωσης και έκδοσης;",
      a2:"Για την ανανέωση και την έκδοση νέων Δελτίων Μετακίνησης AMEA ορίζεται ως ημερομηνία έναρξης η 23η-1-2023 και λήξης η 31η-10-2023.",
      q3:"Ποιο είναι το διάστημα ισχύος του Δελτίου Μετακίνησης ΑΜΕΑ;",
      a3:"Το δελτίο χορηγείται με διάρκεια ισχύος από την ημερομηνία εκδόσεώς του μέχρι 31-12-2023.",
      q4:"Παρέχεται ψηφιακά η διαδικασία έκδοσης του Δελτίου Μετακίνησης ΑΜΕΑ;",
      a4:"Δεν παρέχεται ψηφιακά.",
      q5:"Υπάρχουν εξ αποστάσεως σημεία εξυπηρέτησης;",
      a5:"Ναι, υπάρχουν:",
      a5a:"myKEPlive (μόνο πληροφορίες)",
      chooseAnswer: "Επιλέξτε την απάντησή σας",
      oneAnswer: "Μπορείτε να επιλέξετε μόνο μία επιλογή.",
      errorAn: "Λάθος:",
      choose: "Πρέπει να επιλέξετε μια απάντηση",
    },
    english: {
      languageBtn: "EN",
      pageTitle: "Mobility Card for People with Disabilities",
      infoTitle: "Information on the issue of Mobility Cards for people with disabilities for 2023",
      subTitle1: "This questionnaire can help you determine if you are eligible to receive the Disabled Mobility Card.",
      subTitle2: "Completing the questionnaire should not take more than 10 minutes.",
      subTitle3: "We will neither store nor share your answers.",
      backButton: "Βack",
      nextQuestion: "Next Question",
      biggerCursor: "Bigger Cursor",
      bigFontSize:" Big Font Size",
      readAloud: "Read Aloud",
      changeContrast:" Change Contrast",
      readingMask:" Reading Mask",
      footerText: "Implementation for the preparation of a thesis by students of Applied Informatics:",
      and: "and",
      student1: "Ampatzidou Elisavet",
      student2: "Dasyra Evmorfia Elpida",
      startBtn:"Let's start",
      faq: "Frequently Asked Questions",
      q1: "How much does the Mobility Card issuance cost?",
      a1: "It is provided free of charge.",
      q2: "What is the renewal and issuance date?",
      a2: "For the renewal and issuance of new Mobility Cards, the start date is set as January 23, 2023, and the end date is October 31, 2023.",
      q3: "What is the validity period of the Mobility Card?",
      a3: "The card is valid from its date of issuance until December 31, 2023.",
      q4: "Is the process of issuing the Mobility Card available digitally?",
      a4: "No, it is not available digitally.",
      q5: "Are there remote service points?",
      a5: "Yes, there are:",
      a5a: "myKEPlive (for information only)",
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