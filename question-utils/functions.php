<?php
  $questionsFilePath = 'questions.json';
  // Load the JSON data from the file
  $questionsJson = file_get_contents($questionsFilePath);
  $questions = json_decode($questionsJson, true);
  
  function getQuestionById($id) {
    global $questions;
    foreach ($questions as $question) {
      if ($question['id'] == $id) {
        return $question;
      }
  }
    return null;
  }

  function getQuestions(){
    global $questions;
    $count = count($questions);
    return $count;
  }

  function question($id) {
    $questionData = getQuestionById($id);

    if (!$questionData) {
      return "<div class='error' style='color:red;'><b>ΔΕΝ ΒΡΕΘΗΚΕ ΕΡΩΤΗΣΗ.</b></div><br />";
    }

    $question = $questionData['question'];
    $options = $questionData['options'];

    $html = "<div class='govgr-field' id='$id'>
      <fieldset class='govgr-fieldset' aria-describedby='radio-country'>
        <legend role='heading' aria-level='1' class='govgr-fieldset__legend govgr-heading-l'>
          $question
        </legend>
        <div class='govgr-radios'>";
    foreach ($options as $option) {
      $html .= "
          <div class='govgr-radios__item'>
            <label class='govgr-label govgr-radios__label'>
              $option
              <input class='govgr-radios__input' type='radio' name='question-option' value='$option' />
            </label>
          </div>";
    }
    $html .= "
        </div>
      </fieldset>
    </div>";

    // Return the generated HTML
    return $html;
  }

?>