$(document).ready(function(){
  var $examples = $('.browser')
    , currentIndex = 0;

  $examples.eq(currentIndex).show();

  setInterval(changeVisibleExample, 5000);
  

  function changeVisibleExample() {
    $examples.eq(currentIndex).hide();
    currentIndex += 1;
    if (currentIndex >= $examples.length) {
      currentIndex = 0;
    }
    $examples.eq(currentIndex).show();

  }
});   

