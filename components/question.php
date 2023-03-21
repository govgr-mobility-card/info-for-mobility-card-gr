<?php 
    function question($id, $question, $options){

        $p = "<div class='govgr-field' id='$question'>
        <fieldset class='govgr-fieldset' aria-describedby='radio-country'>
          <legend role='heading' aria-level='1' class='govgr-fieldset__legend govgr-heading-l'>
           $question
          </legend>
          <div class='govgr-radios'> " ; 
          foreach ($options as $option){
                echo "
                <div class='govgr-radios__item'>
                <label class='govgr-label govgr-radios__label'>
                  $option
                  <input class='govgr-radios__input' type='radio' name='question-option' value='".$option."'/>
                </label>
              </div>";
          };
          
          echo "
            </div>
            </fieldset>
            </div>";
    } ?>
