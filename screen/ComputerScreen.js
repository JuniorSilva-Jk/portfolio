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
        <div class="ComputerScreen_p">
            <a class= "icon" href="https://bicjrproject.netlify.app/" target="_blank">
              <img src="./images/icons/tuboDeEnsaio.png" alt="Icon Project"> <br>
              <p class="UnderIcon">Bolsa de Iniciação Ciêntífica Júnior</p>    
            </a>
            <a class= "icon" href="http://localhost:3000/" target="_blank">
              <img src="./images/icons/tuboDeEnsaio.png" alt="Icon Project"> <br>
              <p class="UnderIcon">Hands Dedector netflix</p>    
            </a>
            <a class= "icon" href="https://semanact.mcti.gov.br/" target="_blank">
              <img src="./images/icons/tuboDeEnsaio.png" alt="Icon Project"> <br>
              <p class="UnderIcon">SNCT</p>    
            </a>
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