//const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isMobile = window.innerWidth < 700;
const isTablet = window.innerWidth >= 700 && window.innerWidth < 1200;
let spinTimeout;

const stuffAboutMe =  ["i speak english", "tambien, hablo espanol", "i craft experiences", "i like to cook", "technology is life", "i am a disc golfer", "javascript is fun", "my son likes pizza", "f1 racing is rad", "hello, i'm gavin the dev"];
const iconsAboutStuff = ['<i id="theIcon" class="fa-solid fa-flag-usa fa-2xl"></i>', '<i id="theIcon" class="fa-solid fa-earth-americas fa-2xl"></i>', '<i id="theIcon" class="fa-solid fa-pen-ruler fa-2xl"></i>', '<i id="theIcon" class="fa-solid fa-shrimp fa-2xl"></i>', '<i id="theIcon" class="fa-solid fa-microchip fa-2xl"></i>', '<i id="theIcon" class="fa-solid fa-signs-post fa-2xl"></i>', '<i id="theIcon" class="fa-solid fa-file-code fa-2xl"></i>', '<i id="theIcon" class="fa-solid fa-pizza-slice fa-2xl"></i>', '<i id="theIcon" class="fa-solid fa-gauge-high fa-2xl"></i>', '<i id="theIcon" class="fa-solid fa-user-ninja fa-2xl"></i>' ];
const iconsAboutStuffMobile = ['<i id="theIcon" class="ms-4 fa-solid fa-flag-usa fa-2xl"></i>', '<i id="theIcon" class="ms-4 fa-solid fa-earth-americas fa-2xl"></i>', '<i id="theIcon" class="ms-4 fa-solid fa-pen-ruler fa-2xl"></i>', '<i id="theIcon" class="ms-4 fa-solid fa-shrimp fa-2xl"></i>', '<i id="theIcon" class="ms-4 fa-solid fa-microchip fa-2xl"></i>', '<i id="theIcon" class="ms-4 fa-solid fa-signs-post fa-2xl"></i>', '<i id="theIcon" class="ms-4 fa-solid fa-file-code fa-2xl"></i>', '<i id="theIcon" class="ms-4 fa-solid fa-pizza-slice fa-2xl"></i>', '<i id="theIcon" class="ms-4 fa-solid fa-gauge-high fa-2xl"></i>', '<i id="theIcon" class="ms-4 fa-solid fa-user-ninja fa-2xl"></i>' ];
const magicLetterIntro = stringToElms("hello, i'm gavin the dev");
const aboutSVGArray = ['usaflag', 'spanish', 'craft', 'cook', 'tech', 'disc', 'dev', 'pizza', 'f1', 'code'];
const svgAnimation = ['backInRight', 'jackInTheBox', 'rotateIn', 'fadeInDown', 'slideInRight', 'backInRight', 'flip', 'rotateIn', 'lightSpeedInRight', 'fadeIn']
const svgInputArray = svgHTML(aboutSVGArray);
const allSkills = {
    ecpuSkills: ['mdb4', 'jQuery', 'javascript', 'eosjs', 'scatterjs', 'chartjs', 'css', 'html5'],
    invaderSkills: ['phaser3', 'javascript', 'phaserjs', 'eosjs', 'html5', 'css', 'inkscape', 'reason'],
    sovdexSkills: ['bootstrap4', 'javascript', 'scatterjs', 'eosjs', 'css', 'html5'],
    xsovSkills: ['mdb4', 'javascript', 'eosjs', 'scatterjs', 'css', 'html5'],
    btcminerSkills: ['bootstrap4', 'javascript', 'scatterjs', 'eosjs', 'css', 'html5']
};
let stuffIterator = 0;
let icon = $('#theIcon');
let gptSysMes = "Below is the resume of Gavin followed by some sample conversation, you will take the role of Gavin. Please keep in mind, Gavin is very interested in web apps that leverage AI. Gavin has experience with ai tools like hugging.js and openai api that he can leverage. Here are some fun short quotes from Gavin for you to get a better idea of his personality for your responses 'hablo espanol. i craft experiences. i like to cook. technology is life. i am a disc golfer. javascript is fun. my son likes pizza. f1 racing is rad' Please do your best to keep responses as concise as you can and limit them to a single sentences if posible.\n\n" + resumeText + "\nPotential Employer: Can you build front-ends?\nGavin: Yes, front-end development is one of my passions and I enjoy making things interactive and reactive to provide users a fun experience.\nPotential Employer: What is your top skill?\nGavin: I'd say it is probably my ability to creatively adapt and problem solve quickly."
let openaiChatHistory = "";
let gpturbo = 'gpt-3.5-turbo';;
let userInputs = [];
let aiResponses = [];
let testingResponse = [];

function cycleStuff() {
  let iconHTML;
  if (isMobile) {
      iconHTML = iconsAboutStuffMobile[stuffIterator];
  } else {
      iconHTML = iconsAboutStuff[stuffIterator];
  }

  $('#introIcon').html(iconHTML);
  animateCSS('#theIcon', 'flip');

  $('#theIcon').hover(
      function() {
          animateCSS('#theIcon', 'flipInY');
      },
      function() {  
      }
  );

  const svgHTML = svgInputArray[stuffIterator];
  $('#introTop').html(svgHTML);
  animateCSS('#aboutMeSVG', svgAnimation[stuffIterator]);

  $('#aboutMeSVG').hover(function() {
          animateCSS('#' + this.id, 'pulse');
      },
      function() {
      }
  );

  let blurb = getStuff(stuffAboutMe);
  const blurbHTML = stringToElms(blurb);
  $('#introDivB').html(blurbHTML);
  animateClass(".magicLetter", "fadeInRight");

  $('.magicLetter').hover(
      function() {
          animateCSS('#' + this.id, 'flipInY');
      },
      function() {
      }
  );
}

async function chat(userInput) {
  
  const url = "https://portfolioapi-ckp7.onrender.com/api";
  let inputSize = userInput.length + gptSysMes.length + openaiChatHistory.length;
  if (inputSize >= 6500) {
        cutoffAmount = inputSize - 6500;
        openaiChatHistory = openaiChatHistory.substring(cutoffAmount);
  }

  let chatRequested = setInterval(function() {
    animateCSS('#avatarDiv', 'pulse');
  }, 700);

  $('#introDivB').css('visibility', 'hidden');

  const data = {
      model: gpturbo,
      messages: [
          { role: "system", content: gptSysMes + openaiChatHistory },
          { role: "user", content: "Potential Employer: " + userInput + "\nGavin: "}
      ]
  };

  const apiDelay = setTimeout(() => {
    $('#introDivB').html("<div class='row p-0 m-0'><div id='waitNotice' class='col p-0 m-0 text-info'>gavinAI is spinning up or thinking<i class='ps-1 fa-solid fa-face-smile-beam'></i>, please explore site and return or wait...<i class='fa-solid fa-heart'></i></div></div>");
    $('#introDivB').css('visibility', 'visible');
    animateCSS('#introDivB', 'fadeIn');
  }, 3000);

  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
  });

  clearTimeout(apiDelay);

  if (!response.ok) {
      animateCSS('#avatarDiv', 'bounceIn');
      clearInterval(chatRequested);
      $('#introDivB').html("<div class='row p-0 m-0'><div class=' col p-0 m-0 text-warning'>Oh no, you have been rate limited<i class='ps-1 fa-solid fa-face-frown-open'></i>\n\nIt's OK. You can always contact me using one of the methods in the contact tab.</div></div>");
      $('#introDivB').css('visibility', 'visible');
      animateCSS('#introDivB', 'backInUp')
      throw new Error(`HTTP error! status: ${response.status}`);
  } else {
      animateCSS('#avatarDiv', 'bounceIn');
      clearInterval(chatRequested);
      const aiResponse = await response.json();
      testingResponse.push(aiResponse);
      let theResponse = aiResponse.choices[0].message.content;
      console.log(theResponse);
      userInputs.push(userInput);
      aiResponses.push(theResponse);
      openaiChatHistory += "Potential Employer: " + userInput.substring(0,userInput.length - 8) + "\n" + theResponse + "\n";
      $('#introDivB').html('<div id="gavinAIReply" class="row p-0 m-0"><div class="col p-0 m-0">' + theResponse + '</div></div>');
      $('#introDivB').css('visibility', 'visible');
      animateCSS('#introDivB', 'backInUp');
  }
};

const animateCSS = (selector, animation, prefix = 'animate__') =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(selector);
    node.classList.add(`${prefix}animated`, animationName);
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    } node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

const animateClass = (selector, animation, prefix = 'animate__') => {
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((node) => {
      node.classList.add(`${prefix}animated`, animationName);
      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
      }
      node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });
  });
};

function stringToElms(inputString) {
    let l = inputString.length;
    let outputHTML = "";
    for (let i = 0; i < l; i++) {
      outputHTML += '<div style="color: white" class="col p-0 m-0 magicLetter" id="magicLetter'+ i +'">' + inputString[i] + '</div>';
    }
    return '<div class="row p-0 m-0">' + outputHTML + '</div>';
  }
  
  function getStuff(stuffArray) {
    let stuff = stuffArray[stuffIterator];
    stuffIterator++;
    if (stuffIterator === stuffArray.length) {
      stuffIterator = 0;
    }
    return stuff;
  };

  function svgHTML(yourArray) {
    let output = [];
    let l = yourArray.length;
    if (isMobile) {
      for (let i=0; i<l; i++){
        output.push("<img class='pe-4 mb-4 pb-4 mt-0 pt-0' id='aboutMeSVG' style='height: 75px; width: 75px;' src= images/" + yourArray[i] + ".svg><img>");
      }
    } else
    for(let i=0; i<l; i++) {
        output.push("<img class='pt-4 mt-4 pe-4' id='aboutMeSVG' style='height: 75px; width: 75px;' src= images/" + yourArray[i] + ".svg><img>");
    }
    return output;
  };

  function skillsToHTML(yourArray, skill) {
    let l = yourArray.length;
    let output = "";
    for(let i = 0; i<l; i++){
        output += '<p id="' + skill + i + '" class="col workSkill pe-1">'+ yourArray[i] + '</p>';
    }
    return output;
  }

  function getRando(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  if (isMobile) {
    $('#aboutTabContents').html('<div id="introTop" class="container d-flex justify-content-end align-items-baseline"><img class="pe-4 mb-4 pb-4 mt-0 pt-0" id="aboutMeSVG" style="height: 75px; width: 75px;" src= images/code.svg></div><div id="introDiv" class="container pt-5 mt-5 justify-content-center align-items-center"><div id="introIcon" class="ms-5 ps-5"><i id="theIcon" class="ms-3 ps-1 fa-solid fa-user-ninja fa-2xl"></i></div><br><br><div id="introDivA" class="ms-5 ps-2"></div><br><br><div id="introDivB" class="mb-5 pb-5"></div></div><div id="chatContainer" class="form-outline container pb-1 mb-1 d-flex justify-content-center"><i id="chatSendIcon" class="fas fa-share trailing text-light pe-3"></i><input type="text" id="chatInput" class="mb-0 pb-0 border form-control form-icon-trailing" aria-describedby="chatInput"/><label class="form-label" for="chatInput"><i class="ps-2 pe-2 fa-solid fa-robot"></i>ask gavinAI</label></div>');
    $('#ecpuSVG').attr('src', 'images/ecpuFullDappAnimation.gif');
    $('#ecpuSVG').attr('style', 'max-width: 300px; max-height: 700px;');
    $('#ecpuSVG').addClass('ms-2');
    $('#invadersSVG').attr('src', 'images/invadersmobile.gif');
    $('#invadersSVG').attr('style', 'max-width: 300px; max-height: 700px;');
    $('#invadersSVG').addClass('ms-2');
    $('#sovdexSVG').attr('src', 'images/sovdexmobile1.gif');
    $('#sovdexSVG').attr('style', 'max-width: 300px; max-height: 700px;');
    $('#sovdexSVG').addClass('ms-2');
    $('#xsovSVG').attr('src', 'images/xsovmobile.gif');
    $('#xsovSVG').attr('style', 'max-width: 300px; max-height: 700px;');
    $('#xsovSVG').addClass('ms-2');
    $('#btcminerSVG').attr('src', 'images/btcminermobile.gif');
    $('#btcminerSVG').attr('style', 'max-width: 300px; max-height: 700px;');
    $('#btcminerSVG').addClass('ms-2');
    $('#carouselNext').addClass('visually-hidden');
    $('#carouselPrevious').addClass('visually-hidden');
    
  } else {
    if (isTablet) {
      $('#introDiv').removeClass('ms-5');
      $('#introDiv').removeClass('ps-5');
      $('#chatContainer').css('left', '');
      $('#chatContainer').css('max-width', '550px');
    }
    $('body').css('overflow', 'hidden');
  }

  
$('#introDivA').html("<img id='avatarDiv' class='pb-3 helpinghand' style='width: 150px; height:150px;' src= images/avatar.svg>");

$('#introDivB').html(magicLetterIntro);

$('.magicLetter').hover(
  function() {
   // $(this).css('color', 'yellow');
    animateCSS('#' + this.id, 'flipInY');
  },
  function() {
  //  $(this).css('color', 'white');
    
  }
);

$('#avatarDiv').hover(
  function() {
   if ($('#gavinAIReply').length === 0 && $('#waitNotice').length ===0){
    $('#' + this.id).stop().animate({height: '165px', width: '165px'}, 'slow');
    cycleStuff();
  }}, 
  function() {
  $('#' + this.id).stop().animate({height: '150px', width: '150px'}, 'slow');
  }
);

$('#avatarDiv').click(function() {
  if ($('#waitNotice').length === 0) {
      animateCSS('#' + this.id, 'pulse');
      cycleStuff();

  /*
  if (isMobile || isTablet) {
      let count = 0;
      let maxCount = getRando(21, 23);

      function spinStuff() {
          if (count === 0 || count === maxCount - 1) {
              animateCSS('#avatarDiv', 'pulse');
          }

          cycleStuff();

          count++;
          if (count < maxCount) {
              spinTimeout = setTimeout(spinStuff, 18 * count);
          }
      }

      clearTimeout(spinTimeout);
      spinStuff();
  } else {
      animateCSS('#' + this.id, 'pulse');
      cycleStuff();
  }
  */
}
});

$('.nav-link').hover(
    function() {
        animateCSS('#' + this.id, 'pulse');
    },
    function() {

    }
);

$('#theIcon').hover(
    function() {
    animateCSS('#theIcon', 'flipInY');
    },
    function() {  
        
    }
);

$('#aboutMeSVG').hover(function() {
    animateCSS('#' + this.id, 'pulse');
  },
  function() {
  });

$('.skillheader').hover(function() {
    animateCSS('#' + this.id, 'pulse');
},
function () {
    
});

$('#ecpuSkills').html(skillsToHTML(allSkills.ecpuSkills, 'ecpuSkill'));
$('#invaderSkills').html(skillsToHTML(allSkills.invaderSkills, 'invadersSkill'));
$('#sovdexSkills').html(skillsToHTML(allSkills.sovdexSkills, 'sovdexSkill'));
$('#xsovSkills').html(skillsToHTML(allSkills.xsovSkills, 'xsovxSkill'));
$('#btcminerSkills').html(skillsToHTML(allSkills.btcminerSkills, 'btcminerSkill'));


$('.workSkill').hover(function(){
$('#' + this.id).css('color', '#ffffffea');
animateCSS('#' + this.id, 'pulse');
},
function(){
$('#' + this.id).css('color', '#54B4D3');
});

$('#cvpdf').click(function() {
  let fileUrl = 'documents/cv_gavinCarroll.pdf';
  window.open(fileUrl, '_blank');
});

$('#cvdocx').click(function() {
  let fileUrl = 'documents/cv_gavinCarroll.docx';
  window.open(fileUrl, '_blank');
});

$('#cvtxt').click(function() {
  let fileUrl = 'documents/cv_gavinCarroll.txt';
  window.open(fileUrl, '_blank');
});

$('#gmailSVG').click(function() {
  animateCSS('#gmailSVG', 'rubberBand');
  let emailAddress = 'gavinthedev@gmail.com';
  let gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(emailAddress);
  window.open(gmailUrl);
});

$('#gmailSVG').hover(function() {
animateCSS('#gmailSVG', 'pulse');
},
function() {

});

$('#linkedinSVG').click(function(event) {
  animateCSS('#linkedinSVG', 'tada');
  window.open('https://www.linkedin.com/in/gavin-c-6579738/', '_blank');
});

$('#linkedinSVG').hover(function() {
  animateCSS('#linkedinSVG', 'pulse');
  },
  function() {
  
  });

  $('#emailSVG').hover(function() {
    animateCSS('#emailSVG', 'pulse');
    },
    function() {
    
    });

    $

new ClipboardJS('#emailSVG').on('success', function (e) {
  let toast = new mdb.Toast(document.getElementById('copyNotification'));
  toast.show();
});

document.getElementById('emailSVG').addEventListener('success', function(e) {
  console.log('Text copied to clipboard');
  e.clearSelection();
});

document.getElementById('emailSVG').addEventListener('error', function(e) {
  console.error('Failed to copy text: ', e.action);
});

animateClass(".magicLetter", "fadeInRight");
animateCSS("#avatarDiv", "zoomInDown");
animateCSS("#theIcon", "flip");
animateCSS("#aboutMeSVG", "flip");

document.getElementById('chatInput').addEventListener('keydown', function(event) {
  
  var keycode = (event.keyCode ? event.keyCode : event.which);

  if ($('#chatInput').val()) {
    $('#chatSendIcon').removeClass('text-light');
    $('#chatSendIcon').addClass('text-primary');
  } else {
    $('#chatSendIcon').removeClass('text-primary');
    $('#chatSendIcon').addClass('text-light');
    
  }

  if(keycode == '13'){
    animateClass('.magicletter', 'fadeOutLeft');
    var userInput = document.getElementById('chatInput').value;
    chat(userInput);
    $('#chatInput').val("");
    $('#chatSendIcon').removeClass('text-primary');
    $('#chatSendIcon').addClass('text-light');
  }
});


