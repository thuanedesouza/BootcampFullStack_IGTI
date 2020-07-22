window.addEventListener('load', start);
function start() {
  console.log('Trabalho 1');
  console.log('Página totalmente carregada!');

  let slidersClass = document.querySelector('.sliders');

  slidersClass.addEventListener('change', function () {
    let redInput = document.querySelector('#redInput');
    let greenInput = document.querySelector('#greenInput');
    let blueInput = document.querySelector('#blueInput');
    console.log(redInput.value);
    console.log(greenInput.value);
    console.log(blueInput.value);
    let rgbColor =
      'rgb(' +
      redInput.value +
      ',' +
      greenInput.value +
      ',' +
      blueInput.value +
      ')';

    let rgbfinal = document.querySelector('.rgb');
    rgbfinal.style.backgroundColor = rgbColor;
    let showRInput = document.querySelector('#showRInput');
    showRInput.value = redInput.value;
    let showGInput = document.querySelector('#showGInput');
    showGInput.value = greenInput.value;
    let showBInput = document.querySelector('#showBInput');
    showBInput.value = blueInput.value;
  });
}
