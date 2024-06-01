document.addEventListener('DOMContentLoaded', () => {
  const sliderInput = document.querySelector('.slider-input');
  const sliderThumb = document.querySelector('.slider-thumb');
  const value = sliderInput.value;
  // const thumbPosition = (value / sliderInput.max) * 100;
  let thumbPosition = (value / sliderInput.max) * 100;
  sliderThumb.style.left = `${thumbPosition}%`;
  sliderInput.addEventListener('input', () => {
    const value = sliderInput.value;
    const thumbPosition = (value / sliderInput.max) * 100;
    sliderThumb.style.left = `${thumbPosition}%`;
  });

  const sliderInput2 = document.querySelector('.slider-input2');
  const sliderThumb2 = document.querySelector('.slider-thumb2');
  const value2 = sliderInput2.value;
  let thumbPosition2 = (value2 / sliderInput2.max) * 100;
  sliderThumb2.style.left = `${thumbPosition2}%`;
  


  let display = document.querySelector(".display");
  let count_display = document.querySelector(".count_display");
  let memory = "0";
  display.innerText = "00000000000";
  let mult = false;
  let counter = "0";
  let power = "0";
  let teleport = false;
  let back_mult = 0;
  let div = false;
  let div_teleport = false;
  let div_a = 0;
  let div_b = 0;
  let div_result = "0";

  $("#buttonG").click(function(){
    display.innerText = "00000000000";
    memory = "0";
    mult = false;
    counter = "0";
    count_display.innerText = counter
    power = "0";
    back_mult = 0
    $("#buttonX").css('background','url("src/actButtons/multiplication.png")');
    $("#buttonD").css('background','url("src/actButtons/division.png")');
    sliderThumb2.style.left = `${50}%`;
    sliderThumb.style.left = `${100}%`;
    thumbPosition2 = 50;
    teleport = false;
    div = false;
    div_teleport = false;
  });

  $("#btn_on").click(function(){
    if (mult === false && div_teleport === false) {
      try {
        display.innerText = eval("1" + display.innerText + "+" + memory);
        display.innerText = display.innerText.substr(-11)
        memory = "0"
        sliderThumb2.style.left = `${50}%`;
        thumbPosition2 = 50;
      } catch (e) {
        display.innerText = "Error!";
      }
    }
    else if (div_teleport === true) {
      sliderThumb2.style.left = `${50}%`;
      thumbPosition2 = 50;
      display.innerText = memory + "00000000000"
      display.innerText = display.innerText.substr(0, 11);
      div_a = memory;
      memory = "0"
    }
    else {
      counter = eval("(" + counter + " + 1) % 10")
      count_display.innerText = counter
      if (teleport === true) {
        thumbPosition2 = thumbPosition2 + 5;
        sliderThumb2.style.left = `${thumbPosition2}%`;
      }
    }
  });

  $("#buttonM").click(function(){
    if (mult === false && div === false) {
      try {
        display.innerText = eval("1" + display.innerText + "-" + memory);
        display.innerText = display.innerText.substr(-11)
        memory = "0"
      } catch (e) {
        display.innerText = "Error!";
      }
      sliderThumb2.style.left = `${50}%`;
      thumbPosition2 = 50;
    }
    else if (div === true) {
      div_b = memory;
      try {
        div_result = div_a / div_b;
      } catch (e) {
        display.innerText = "Error!";
      }
      div_result = Number(div_result.toString().slice(0, 11));
      while (div_result % 1 !== 0) {
        div_result *= 10
      }
      ten_pow = 10 ** (div_result.toString().length - 1);
      counter = parseInt(div_result.toString()[0])
      count_display.innerText = counter
      div_result = div_result % ten_pow
      // console.log(div_a)
      // console.log(div_b)
      // console.log(div_result)
    }
    // для уменьшения счетчика умножения
    else {
      counter = eval("(" + counter + " - 1) % 10")
      if (counter < 0) {
        counter = -counter
      }
      count_display.innerText = counter
      sliderThumb2.style.left = `${50}%`;
      thumbPosition2 = 50;
    }
    
  });


  $("#buttonX").click(function(){
    mult = !mult
    if(mult === false){
      $(this).css('background','url("src/actButtons/multiplication.png")');
    }
    else{
      $(this).css('background','url("src/actButtons/dark/multiplication.png")');
    }
    power = "0";
    counter = "0";
  });

  $("#buttonD").click(function(){
    div = !div
    if(div === false){
      $(this).css('background','url("src/actButtons/division.png")');
    }
    else{
      $(this).css('background','url("src/actButtons/dark/division.png")');
    }
    memory = 0
  });

  $("#btn_toLeft").click(function(){
    if (mult) {
      let ten = eval("10 ** " + power)

      display.innerText = eval("1" + display.innerText + "+" + memory + "*" + counter + "*" + ten);
      display.innerText = display.innerText.substr(-11)
      power = eval(power + "+1");
      counter = "0"
      count_display.innerText = "0"
      sliderThumb2.style.left = `${50}%`;
      thumbPosition2 = 50;
    }
  });

  $("#btn_toRight").click(function(){
    if (mult) {
      if (back_mult === 0) {
        let str = eval(display.innerText + "+" + memory + "*" + counter);
        let res = parseInt(str).toString()
        while (res.length < 11) {
          res = "0" + res
        }
        display.innerText = res
        display.innerText = display.innerText.substr(0, 11)
        back_mult += 1
      }
      else {
        let str = eval(display.innerText + "*" + "10" + "+" + memory + "*" + counter);
        let res = parseInt(str).toString()
        while (res.length < 11) {
          res = "0" + res
        }
        display.innerText = res
        display.innerText = display.innerText.substr(0, 11)
        back_mult += 1
      }
      counter = 0
      count_display.innerText = "0"
      sliderThumb2.style.left = `${0}%`;
      thumbPosition2 = 0
    }
    else if (div) {
      ten_pow = 10 ** (div_result.toString().length - 1);
      console.log("Before: " + div_result)
      counter = div_result.toString()[0]
      count_display.innerText = counter
      // div_result = div_result % ten_pow
      if (div_result.toString().length > 1) {
        div_result = div_result.toString().slice(1)
      }
      else {
        div_result = 0
      }
      console.log("After: " + div_result)

      if (thumbPosition2 < 50) {
        thumbPosition2 = thumbPosition2 + 5;
        sliderThumb2.style.left = `${thumbPosition2}%`;
      }
    }
  });

  $("#btn_teleport").click(function(){
    if (mult) {
      thumbPosition2 = 0;
      sliderThumb2.style.left = `${0}%`;
      teleport = true
    }
    else {
      thumbPosition2 = 0;
      sliderThumb2.style.left = `${0}%`;
      div_teleport = true
    }
  });




  $("#btn0").click(function(){
    if (thumbPosition2 >= 0) {
      thumbPosition2 = thumbPosition2 - 5;
      if(thumbPosition2 >= 0){
        sliderThumb2.style.left = `${thumbPosition2}%`;
      }
      if (memory === "0") {
        memory = "0";
      }
      else {
        memory += "0";
      }
    }
  });

  $("#btn1").click(function(){
    if (thumbPosition2 >= 0) {
      thumbPosition2 = thumbPosition2 - 5;
      if(thumbPosition2 >= 0){
        sliderThumb2.style.left = `${thumbPosition2}%`;
      }
      if (memory === "0") {
        memory = "1";
      }
      else {
        memory += "1";
      }
    }
  });

  $("#btn2").click(function(){
    if (thumbPosition2 >= 0) {
      thumbPosition2 = thumbPosition2 - 5;
      if(thumbPosition2 >= 0){
        sliderThumb2.style.left = `${thumbPosition2}%`;
      }
      if (memory === "0") {
        memory = "2";
      }
      else {
        memory += "2";
      }
    }
  });

  $("#btn3").click(function(){
    if (thumbPosition2 >= 0) {
      thumbPosition2 = thumbPosition2 - 5;
      if(thumbPosition2 >= 0){
        sliderThumb2.style.left = `${thumbPosition2}%`;
      }
      if (memory === "0") {
        memory = "3";
      }
      else {
        memory += "3";
      }
    }
  });

  $("#btn4").click(function(){
    if (thumbPosition2 >= 0) {
    thumbPosition2 = thumbPosition2 - 5;
      sliderThumb2.style.left = `${thumbPosition2}%`;
      if (memory === "0") {
        memory = "4";
      }
      else {
        memory += "4";
      }
    }
  });

  $("#btn5").click(function(){
    if(thumbPosition2 >= 0){
      thumbPosition2 = thumbPosition2 - 5;
      sliderThumb2.style.left = `${thumbPosition2}%`;
      if (memory === "0") {
        memory = "5";
      }
      else {
        memory += "5";
      }
    }
  });

  $("#btn6").click(function(){
    if(thumbPosition2 >= 0){
      thumbPosition2 = thumbPosition2 - 5;
      sliderThumb2.style.left = `${thumbPosition2}%`;
      if (memory === "0") {
        memory = "6";
      }
      else {
        memory += "6";
      }
    }
  });

  $("#btn7").click(function(){
    if(thumbPosition2 >= 0){
      thumbPosition2 = thumbPosition2 - 5;
      sliderThumb2.style.left = `${thumbPosition2}%`;
      if (memory === "0") {
        memory = "7";
      }
      else {
        memory += "7";
      }
    }
  });

  $("#btn8").click(function(){
    if(thumbPosition2 >= 0){
      thumbPosition2 = thumbPosition2 - 5;
      sliderThumb2.style.left = `${thumbPosition2}%`;
      if (memory === "0") {
        memory = "8";
      }
      else {
        memory += "8";
      }
    }
  });

  $("#btn9").click(function(){
    if(thumbPosition2 >= 0){
      thumbPosition2 = thumbPosition2 - 5;
      sliderThumb2.style.left = `${thumbPosition2}%`;
      if (memory === "0") {
        memory = "9";
      }
      else {
        memory += "9";
      }
    } 
    // sliderInput2.value = sliderInput2.max;
    // sliderThumb2.style.left = `${50}px`;

  });


  // $("#n0").css('background','url("src/buttons/dark/multiplication.png")');

});


