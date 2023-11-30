(function () {

  const overworld = new Overworld({
    element: document.querySelector(".game-container")
  });
  overworld.init();

})();

function verify(){
   var screenWidth = screen.width;

  if(screenWidth < 720) {
    alert("A versão mobile deste jogo ainda está em desenvolvimento, por favor acesse novamente utilizando um desktop")
    window.location.href = "https://www.linkedin.com/in/valdean-junior/";
    
  }
}

verify();

