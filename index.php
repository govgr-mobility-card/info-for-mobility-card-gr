<!doctype html>
<html lang="el">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>GOV.GR</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.css" rel="stylesheet" crossorigin="anonymous">
    <!-- Digigov CSS -->
    <link href="https://cdn.jsdelivr.net/npm/@digigov/css@latest/dist/digigov.css" rel="stylesheet"
        crossorigin="anonymous">

    <!-- JQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
    $("document").ready(function() {
        var currentQuestion = 0;
        var totalQuestions = 0;

        function loadQuestion(questionId) {
            $.ajax({
                url: 'question-utils/question.php',
                type: 'GET',
                data: {
                    id: questionId
                },
                success: function(response) {
                    $('.question-container').html(response);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Error loading question: ' + errorThrown);
                }
            });
        }

        function getQuestions(c) {
            $.ajax({
                url: 'question-utils/totalQuestions.php',
                method: 'POST',
                data: {
                    action: "getQuestions"
                },
                success: function(response) {
                    totalQuestions = response;
                },
                error: function(xhr, status, error) {
                    alert('Error: ' + error);
                }
            });
        }

        $('#nextQuestion').click(function() {
            if (currentQuestion + 1 == totalQuestions) {
                //click submit button
                alert('submit');
            } else {
                currentQuestion++;
                loadQuestion(currentQuestion);
                if (currentQuestion + 1 == totalQuestions) {
                    $(this).text('Υποβολή');
                }
            }
        });

        // Load the first question on page load
        loadQuestion(currentQuestion);
        getQuestions();
    });
    </script>
</head>

<body>
    <header class="govgr-header">
        <div class="govgr-header__container">
            <div class="govgr-header__content">
                <img class="govgr-header-logo" src="https://www.gov.gr/gov_gr_logo.svg" alt="gov.gr logo" />
                <div class="govgr-header-title">Δελτίο μετακίνησης ΑΜΕΑ</div>
            </div>
        </div>
    </header>
    <div class="govgr-width-container">
        <div class="govgr-main-wrapper">
            <div class="govgr-grid-column-two-thirds">
                <h1 class="govgr-heading-xl">Πληροφορίες για την χορήγηση Δελτίων Μετακίνησης ΑΜΕΑ για το 2023</h1>
                <p class="govgr-body">Ο παρών οδηγός δημιουργήθηκε για να καλύψει τις συνεχώς αυξανόμενες ανάγκες της
                    δημόσιας διοίκησης για τη δημιουργία ενιαίων και φιλικών ψηφιακών εμπειριών χρήσης, με γνώμονα πάντα
                    την εξυπηρέτηση των πολιτών.
                </p>
            </div>
        </div>
        <div class="question-container">

        </div>
        <button class="govgr-btn govgr-btn-primary govgr-btn-cta" id="nextQuestion">
            Επόμενη ερώτηση
            <svg viewBox="0 0 24 24" class="govgr-arrow--right" focusable="false" aria-hidden="true">
                <path d="M8.5,2L6.1,4.3l7.6,7.7l-7.6,7.6L8.5,22l10-10L8.5,2z" />
            </svg>
        </button>
    </div>
    <footer class="govgr-footer" role="contentinfo">
        <div class="govgr-width-container">
            <div class="govgr-footer__meta">
                <div class="govgr-footer__meta-item govgr-footer__meta-item--grow">
                    <div class="govgr-footer__content">
                        <p class="govgr-footer__licence-description">
                            Υλοποίηση από το
                            <a href="https://grnet.gr" target="_blank" rel="noreferrer noopener"
                                class="govgr-link">ΕΔΥΤΕ<span class="govgr-visually-hidden">(ανοίγει σε καινούρια
                                    καρτέλα)</span></a> για το
                            <a href="https://mindigital.gr/" target="_blank" rel="noreferrer noopener"
                                class="govgr-link"> Υπουργείο Ψηφιακής Διακυβέρνησης <span
                                    class="govgr-visually-hidden">(ανοίγει σε καινούρια καρτέλα)</span></a>
                        </p>
                    </div>
                </div>
                <div class="govgr-footer__meta-item">
                    <!-- <img class="govgr-footer__government-logo" src="static/img/government-logo2.svg" alt="government logo" /> -->
                </div>
            </div>
        </div>
    </footer>
</body>
<script>
window.addEventListener('DOMContentLoaded', function(e) {
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    if (queryString.get('pattern')) {
        document.body.style.padding = '0px';
    }
    if (queryString.get('dark')) {
        document.documentElement.className = 'dark';
    }
})
</script>

</html>