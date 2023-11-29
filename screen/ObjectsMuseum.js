class Quadros {
    constructor({ text, onComplete }) {
      this.text = text;
      this.onComplete = onComplete;
      this.element = null;
    }
    

    createElement() {
      
      //Create the element
      this.element = document.createElement("div");
      this.element.classList.add("Quadro");

      if(this.text === 'quadro1'){
        this.element.innerHTML = (`
        <button class="Quadro_button">X</button>
        <img class="Quadro_1" src="./images/maps/Banner even3.jpg">
           
        `)
      }
      
      if(this.text === 'quadro2'){
        this.element.innerHTML = (`
        <button class="Quadro_button">X</button>
        <img class="Quadro_1" src="./images/maps/Banner SIASTRO.jpeg">       
        `)
      }

      if(this.text === 'medalha'){
        this.element.innerHTML = (`
        <div class="divMedalha"> 
          <button class="Quadro_button">X</button>
          <img class="medalha" src="./images/museum/medalha.jpg">
        </div>   
        `)
      }
      
      if(this.text === 'certAgil'){
        this.element.innerHTML = (`
        <div class="divMedalha"> 
          <button class="Quadro_button">X</button>
          <img class="medalha" src="./images/museum/CertificadoAgil.jpg">
        </div>   
        `)
      }
      

      if(this.text === 'certScrum'){
        this.element.innerHTML = (`
        <div class="divMedalha"> 
          <button class="Quadro_button">X</button>
          <img class="medalha" src="./images/museum/CertificadoScrum.jpg">
        </div>   
        `)
      }


      if(this.text === 'fundamentosIntegridadePublica'){
        this.element.innerHTML = (`
        <div class="divMedalha"> 
          <button class="Quadro_button">X</button>
          <img class="medalha" src="./images/museum/FundamentosIntegridadePublica.jpg">
        </div>   
        `)
      }
      else {
        console.log("SEM MAPA")
      }
      

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