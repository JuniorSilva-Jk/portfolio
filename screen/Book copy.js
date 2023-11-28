class Book {
    constructor({ text, onComplete }) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("Books");

        this.element.innerHTML = (`
       <button class="Close_button">X</button>
        <button id="prev-btn">
            <i class="fas fa-arrow-circle-left"></i>
        </button>

        <!-- Book -->
        <div id="book" class="book">
            <!-- Paper 1 -->
            <div id="p1" class="paper">
                <div class="front">
                    <div id="f1" class="front-content">
                        <h1>Front 1</h1>
                    </div>
                </div>
                <div class="back">
                    <div id="b1" class="back-content">
                        <h1>Back 1</h1>
                    </div>
                </div>
            </div>
            <!-- Paper 2 -->
            <div id="p2" class="paper">
                <div class="front">
                    <div id="f2" class="front-content">
                        <h1>Front 2</h1>
                    </div>
                </div>
                <div class="back">
                    <div id="b2" class="back-content">
                        <h1>Back 2</h1>
                    </div>
                </div>
            </div>
            <!-- Paper 3 -->
            <div id="p3" class="paper">
                <div class="front">
                    <div id="f3" class="front-content">
                        <h1>Front 3</h1>
                    </div>
                </div>
                <div class="back">
                    <div id="b3" class="back-content">
                        <h1>Back 3</h1>
                    </div>
                </div>
            </div>
        </div>

        <!-- Next Button -->
        <button id="next-btn">
            <i class="fas fa-arrow-circle-right"></i>
        </button>
       `)

       const book = document.querySelector('#book');

       console.log(book)

        
        const paper1 = document.querySelector("#p1");
        const paper2 = document.querySelector("#p2");
        const paper3 = document.querySelector("#p3");

        // Event Listener
        // prevBtn.addEventListener("click", goPrevPage);
        // nextBtn.addEventListener("click", goNextPage);

        this.element.querySelector("#prev-btn").addEventListener("click", goPrevPage);
        this.element.querySelector("#next-btn").addEventListener("click", goNextPage);

        // Business Logic
        let currentLocation = 1;
        let numOfPapers = 3;
        let maxLocation = numOfPapers + 1;

        function openBook() {
            book.style.transform = "translateX(50%)";
            prevBtn.style.transform = "translateX(-180px)";
            nextBtn.style.transform = "translateX(180px)";
        }

        function closeBook(isAtBeginning) {
            if(isAtBeginning) {
                book.style.transform = "translateX(0%)";
            } else {
                book.style.transform = "translateX(100%)";
            }
            
            prevBtn.style.transform = "translateX(0px)";
            nextBtn.style.transform = "translateX(0px)";
        }

        function goNextPage() {
            if(currentLocation < maxLocation) {
                switch(currentLocation) {
                    case 1:
                        openBook();
                        paper1.classList.add("flipped");
                        paper1.style.zIndex = 1;
                        break;
                    case 2:
                        paper2.classList.add("flipped");
                        paper2.style.zIndex = 2;
                        break;
                    case 3:
                        paper3.classList.add("flipped");
                        paper3.style.zIndex = 3;
                        closeBook(false);
                        break;
                    default:
                        throw new Error("unkown state");
                }
                currentLocation++;
            }
        }

        function goPrevPage() {
            if(currentLocation > 1) {
                switch(currentLocation) {
                    case 2:
                        closeBook(true);
                        paper1.classList.remove("flipped");
                        paper1.style.zIndex = 3;
                        break;
                    case 3:
                        paper2.classList.remove("flipped");
                        paper2.style.zIndex = 2;
                        break;
                    case 4:
                        openBook();
                        paper3.classList.remove("flipped");
                        paper3.style.zIndex = 1;
                        break;
                    default:
                        throw new Error("unkown state");
                }

                currentLocation--;
            }
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

function teste(){
    
}