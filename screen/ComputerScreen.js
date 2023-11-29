class ComputerScreen {
    constructor({ text, onComplete }) {
      this.text = text;
      this.onComplete = onComplete;
      this.element = null;
    }
  
    createElement() {
      //Create the element
      this.element = document.createElement("div");
      this.element.classList.add("ComputerScreen");
  
      this.element.innerHTML = (`
      <button class="ComputerScreen_button">X</button>

        <div class= "firstLine">
          <div class="link-wrapper">
            <a class= "link" href="https://bicjrproject.netlify.app/" target="_blank"> 
              <img src="./images/icons/chromeIcon.png" alt="Icon Project">
              <p> Bolsa de Iniciação Ciêntífica Júnior </p>    
            </a>
          </div>
          <div class="link-wrapper">
            <a class= "link" href="https://semanact.mcti.gov.br/" target="_blank"> 
              <img src="./images/icons/chromeIcon.png" alt="Icon Project">
              <p> Semana Nacional de Ciência e Tecnologia </p>    
            </a>
          </div>
          <div class="link-wrapper">
            <a class= "link" href="https://pontosnct.mcti.gov.br" target="_blank"> 
              <img src="./images/icons/chromeIcon.png" alt="Icon Project">
              <p> Ponto SNCT </p>    
            </a>
          </div>
          <div class="link-wrapper">
            <a class= "link" href="https://siastro.mcti.gov.br/Portuguese/Home/index.html" target="_blank"> 
              <img src="./images/icons/chromeIcon.png" alt="Icon Project">
              <p> Seminário Internacional de Astronomia e Astronáutica </p>    
            </a>
          </div>
        </div>    
          
      `)
  
   
      this.element.querySelector("button").addEventListener("click", () => {
        //Close the text message
        this.done();
      });
      
      this.actionListener = new KeyPressListener("Enter", () => {
        this.actionListener.unbind();
        this.done();
      })
  
    }
  
    done() {
      this.element.remove();
      this.onComplete();
    }
  
    init(container) {
      this.createElement();
      container.appendChild(this.element);
    }
  
  }