<!doctype html>
<html lang="el">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>ΔΕΛΤΙΟ ΜΕΤΑΚΙΝΗΣΗΣ ΑΜΕΑ</title>

    <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.css" rel="stylesheet" crossorigin="anonymous">

    <!-- Digigov CSS -->
    <link href="https://cdn.jsdelivr.net/npm/@digigov/css@latest/dist/digigov.css" rel="stylesheet"
        crossorigin="anonymous">
    <link rel="stylesheet" href="styles.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- Bootstrap, Ajax -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>

    <!-- JQuery -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
    <script>
    $("document").ready(function() {
        var currentQuestion = 0;
        var totalQuestions = 0;
        var userAnswers = {};

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

        function loadErrorQuestion(questionId) {
            $.ajax({
                url: 'question-utils/error-question.php',
                type: 'GET',
                data: {
                    id: questionId
                },
                success: function(response) {
                    $('.question-container').html(response);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Error loading error-question: ' + errorThrown);
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

        function retrieveAnswers() {
            var allAnswers = [];
            for (var i = 0; i < totalQuestions; i++) {
                var answer = sessionStorage.getItem("answer_" + i);
                allAnswers.push(answer);
            }
            console.log(allAnswers); // display all answers in console
        }

        $('#nextQuestion').click(function() {
            if ($('.govgr-radios__input').is(':checked')) {
                var answer = $('input[name="question-option"]:checked').val();
 
                if (currentQuestion === 0 && answer === "Το έχασα για 2η φορά και θέλω να το εκδώσω ξανά") {
                    skipToEnd();
                } else if (currentQuestion === 1 && answer === "ΟΧΙ"){
                    skipToEnd();
                } else if (currentQuestion === 3 && answer === "ΟΧΙ"){
                    skipToEnd();
                } else {
                    userAnswers[currentQuestion] = answer;
                    sessionStorage.setItem("answer_" + currentQuestion,
                        answer); // save answer to session storage

                    if (currentQuestion + 1 == totalQuestions) {
                        //click submit button
                        alert('submit');
                        // retrieve all answers when user submits
                        retrieveAnswers();
                    } else {
                        currentQuestion++;
                        loadQuestion(currentQuestion);

                        if (currentQuestion + 1 == totalQuestions) {
                            $(this).text('Υποβολή');
                        }
                    } 
                }
            } else {
                loadErrorQuestion(currentQuestion);
            }
        });

        function skipToEnd() {
            $('#nextQuestion').text("END");
            alert("KNOCK OUT QUESTION");
        }

        // Load the first question on page load
        loadQuestion(currentQuestion);
        // Get the number of questions
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
    <div class="mask" id="mask-up"></div>
    <div class="mask" id="mask-bottom"></div>




    <!--  MAIN CONTAINER -->
    <div class="govgr-width-container" id="content">
        <div class="govgr-main-wrapper">
            <div class="govgr-grid-column-two-thirds">
                <h1 class="govgr-heading-xl">Πληροφορίες για την χορήγηση Δελτίων Μετακίνησης ΑΜΕΑ για το 2023</h1>
                <p class="govgr-body">Ο παρών οδηγός δημιουργήθηκε ώστε να βοηθήσει τους χρήστες για οποιαδήποτε
                    πληροφορία σχετικά με τα δελτία μετακίνησης ΑΜΕΑ.
                </p>
            </div>
        </div>
        <div class="question-container">
            <!-- here we load the question with JQuery, AJAX -->
        </div>
        <button class="govgr-btn govgr-btn-primary govgr-btn-cta" id="nextQuestion">
            Επόμενη ερώτηση
            <svg viewBox="0 0 24 24" class="govgr-arrow--right" focusable="false" aria-hidden="true">
                <path d="M8.5,2L6.1,4.3l7.6,7.7l-7.6,7.6L8.5,22l10-10L8.5,2z" />
            </svg>
        </button>
    </div>

    <!-- ACCESSIBILITY MENU -->
    <div class="row ">
        <div class="col">
            <div class="collapse multi-collapse" id="CollapseExample">
                <div class="card card-body">
                    <nav id="accessibility-menu">
                        <div class="form-check form-switch">
                            <label class="form-check-label" for="cursor-button">Bigger Cursor</label>
                            <input id="cursor-button" class="form-check-input" type="checkbox" role="switch">
                        </div>
                        <div class="form-check form-switch">
                            <label class="form-check-label" for="font-size-button">Big Font Size</label>
                            <input id="font-size-button" class="form-check-input" type="checkbox" role="switch">
                        </div>
                        <div class="form-check form-switch">
                            <label class="form-check-label" for="read-aloud-button">Read Aloud</label>
                            <input id="read-aloud-button" class="form-check-input" type="checkbox" role="switch">
                        </div>
                        <div class="form-check form-switch">
                            <label class="form-check-label" for="contrast-button">Change Contrast</label>
                            <input id="contrast-button" class="form-check-input" type="checkbox" role="switch">
                        </div>
                        <div class="form-check form-switch">
                            <label class="form-check-label" for="reading-mask-button">Reading Mask</label>
                            <input id="reading-mask-button" class="form-check-input" type="checkbox" role="switch">
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    <p class="text-right">
        <a class="btn btn-default" data-toggle="collapse" href="#CollapseExample" role="button" aria-expanded="false"
            aria-controls="CollapseExample">
            <svg id="accessibility-icon" xmlns=" http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                    d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm161.5-86.1c-12.2-5.2-26.3 .4-31.5 12.6s.4 26.3 12.6 31.5l11.9 5.1c17.3 7.4 35.2 12.9 53.6 16.3v50.1c0 4.3-.7 8.6-2.1 12.6l-28.7 86.1c-4.2 12.6 2.6 26.2 15.2 30.4s26.2-2.6 30.4-15.2l24.4-73.2c1.3-3.8 4.8-6.4 8.8-6.4s7.6 2.6 8.8 6.4l24.4 73.2c4.2 12.6 17.8 19.4 30.4 15.2s19.4-17.8 15.2-30.4l-28.7-86.1c-1.4-4.1-2.1-8.3-2.1-12.6V235.5c18.4-3.5 36.3-8.9 53.6-16.3l11.9-5.1c12.2-5.2 17.8-19.3 12.6-31.5s-19.3-17.8-31.5-12.6L338.7 175c-26.1 11.2-54.2 17-82.7 17s-56.5-5.8-82.7-17l-11.9-5.1zM256 160a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
            </svg>
        </a>
    </p>

    <!-- FOOTER  -->
    <footer class="govgr-footer" role="contentinfo">
        <div class="govgr-width-container">
            <div class="govgr-footer__meta">
                <div class="govgr-footer__meta-item govgr-footer__meta-item--grow">
                    <div class="govgr-footer__content">
                        <p class="govgr-footer__licence-description">

                            Υλοποίηση από τις φοιτήτριες της Εφαρμοσμένης Πληροφορικής: <a
                                href="https://github.com/ElisavetAmpatzidou" target="_blank" rel="noreferrer noopener"
                                class="govgr-link">Αμπατζίδου Ελισάβετ
                                <span class="govgr-visually-hidden">(ανοίγει σε
                                    καινούρια καρτέλα)</span></a>
                            και <a href="https://github.com/evitadasy" target="_blank" rel="noreferrer noopener"
                                class="govgr-link">Δασύρα Ευμορφία Ελπίδα
                                <span class="govgr-visually-hidden">(ανοίγει σε καινούρια
                                    καρτέλα)</span></a>
                            για την εκπόνηση πτυχιακής εργασίας.
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
<script type="text/javascript" src="accessibility-menu-functions.js"></script>
<script>
// window.addEventListener('DOMContentLoaded', function(e) {
//     let paramString = window.location.href.split('?')[1];
//     let queryString = new URLSearchParams(paramString);
//     if (queryString.get('pattern')) {
//         document.body.style.padding = '0px';
//     }
//     if (queryString.get('dark')) {
//         document.documentElement.className = 'dark';
//     }
// })
</script>

</html>