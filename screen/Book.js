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
        
        <div class="close_section">
            <button class="Close_button" id="close">X</button>
        </div>

        <div class="content"> 
        <button class="book_button" id="prev-btn">
            <i class="fas fa-arrow-circle-left"></i>
        </button>

        <!-- Book -->
        <div id="book" class="book">
            <!-- Paper 1 -->
            <div id="p1" class="paper">
                <div class="front">
                    <div id="f1" class="cover">
                        <h3>Valdean do Nascimento Silva Júnior</h3>
                        <p>Engenheiro de Software</p>
                    </div>
                </div>
                <div class="back">
                    <div id="b1" class="back-content">
                        <h3> Informações Pessoais </h3>
                        <ul>
                            <li>Email: valdean1999@gmail.com </li>
                            <li>Contato: (61) 98448-6596 </li>
                            <li>Formação Acadêmica: Engenharia de Software, Faculdade Projeção, Brasília, DF </li>
                            <li>Idiomas: Inglês C1 </li>
                        </ul>
                        <h3> CERTIFICAÇÕES </h3>
                        <ul>
                            <li> Gerenciamento Ágil de Projetos pelo Ministério da Ciência, Tecnologia e Inovações.  </li>
                            <li> Scrum Foundation Professional pela CertiProf </li>
                            <li> Fundamentos da Integridade Pública: Prevenindo a Corrupção pela EV.G </li>
                            <li> Photoshop pela Escola SAGA </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Paper 2 -->
            <div id="p2" class="paper">
                <div class="front">
                    <div id="f2" class="front-content">
                    <h3> HISTÓRICO PROFISSIONAL </h3>
                        <b> <p> Dezembro 2021 - Janeiro 2023 </p> </b>
                        <p> Ministério da Ciência Tecnologia e Inovações - Engenheiro de
                        Software, Brasília, Distrito Federal </p>
                        <ul>
                            <li> Gestão da equipe com 3 funcionários </li>
                            <li> Criação e teste de softwares </li>
                            <li> Elaboração da documentação de sistemas </li>
                        </ul>
                        <b> <p> Maio 2022 - Setembro 2022 </p> </b>
                        <p> Leading360 - Programador Back-end, Londres, Inglaterra </p>
                        <ul>
                            <li> Criação do novo software de questionários utilizando NodeJs, React e MongoDB </li>
                            <li> Elaboração da documentação do sistema </li>
                            <li> Teste e manutenção do software </li>
                        </ul>
                        
                    </div>
                </div>
                <div class="back">
                    <div id="b2" class="back-content">
                        <h3> HISTÓRICO PROFISSIONAL </h3>
                                <b> <p> Maio 2021 - Dezembro 2021 </p> </b>
                                <p> MCTI - Assistente Administrativo, Brasília, Distrito Federal </p>
                                <ul>
                                    <li> Supervisor e gestor de conteúdo de sistemas </li>
                                    <li> Criação de artes para divulgação em redes sociais </li>
                                    <li> Manutenção de softwares </li>
                                    <li> Elaboração de correspondências e documentações diversas </li>
                                </ul>
                                <b> <p> Abril 2019 - Abril 2021 </p> </b>
                                <p> MCTI - Estagiário, Brasília, Distrito Federal </p>
                                <ul>
                                    <li> Manutenção de equipamentos </li>
                                    <li> Controle de ordens de serviços </li>
                                    <li> Desenvolvimento de planos, metas e cronogramas </li>
                                    <li> Atendimento telefônico e online </li>
                                </ul>
                    </div>
                </div>
            </div>

            <!-- Paper 3 -->
            <div id="p3" class="paper">
                <div class="front">
                    <div id="b3" class="front-content">
                        <h3> HABILIDADES E COMPETÊNCIAS </h3>
                            <ul>
                                <li> MongoDB </li>
                                <li> Express.Js </li>
                                <li> React </li>
                                <li> Node.js </li>
                                <li> JavaScript </li>
                                <li> Python </li>
                                <li> HTML </li>
                                <li> CSS </li>
                                <li> Git </li>
                                <li> Vue.Js </li>
                                <li> Docker </li>
                                <li> AWS </li>
                                <li> Google Cloud </li>
                                <li> Linux </li>
                                <li> Windows </li>
                                <li> PHP </li>
                                <li> Java </li>
                            </ul>
                    </div>
                </div>
                <div class="back">
                    <div id="b3" class="back-content">
                        <h3> HABILIDADES E COMPETÊNCIAS </h3>
                        <ul>
                            <li> SQL </li>
                            <li> WordPress </li>
                            <li> JMeter </li>
                            <li> JUnit </li>
                            <li> Data Science </li>
                            <li> Cloud Computing </li>
                            <li> Adobe Photoshop  </li>
                            <li> Autodesk Maya  </li>
                            <li> Adobe Premiere </li>
                            <li> Adobe Illustrator </li>
                            <li> Adobe Audition  </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Paper 4 -->
            <div id="p4" class="paper">
                <div class="front">
                    <div id="b3" class="front-content">
                        <h3> CONQUISTAS E DISTINÇÕES </h3>
                        <ul>
                            <li> <b> 19ª Semana Nacional de Ciência e Tecnologia do DF </b> <br> <b>Função: </b> Sub Coordenador Geral do evento  </li>
                            <li> <b> Rio Innovation Week </b> <br> <b> Função: </b> Organizador do espaço destinado ao MCTI </li>
                            <li> <b> 18ª Semana Nacional de Ciência e Tecnologia do DF </b> <br> <b> Função: </b> Realizar manutenção de softwares nos computadores locais  </li>
                            <li> <b> 2º Seminário Internacional de Astronomia e Astronáutica MCTI </b> <br> <b> Função: </b> Organização geral do evento e comunicação e interação com palestrantes internacionais </li>
                        </ul>
                    </div>
                </div>
                <div class="back">
                    <div id="b3" class="back-content">
                        <h3> CONQUISTAS E DISTINÇÕES </h3>
                        <ul>
                            <li> <b> 1º Seminário Internacional de Astronomia e Astronáutica MCTI </b> <br> <b> Função: </b> Criador e curador da plataforma siastro.mcti.gov.br  </li>
                            <li> <b> 1º Encontro Nacional de Popularização da Ciência  </b> <br> <b>Função: </b> Criador e curador da plataforma www.fneps.mctic.gov.br </li>

                            </ul>
                        <a href="#" onclick="baixarArquivo('./images/pdf/ValdeanJunior_Curriculo.pdf')">Download</a>
                    </div>
                </div>
            </div>

        </div>
        <!-- Next Button -->
        <button class="book_button" id="next-btn">
            <i class="fas fa-arrow-circle-right"></i>
        </button>
        </div>

       `)
       document.body.appendChild(this.element);
       document.addEventListener("DOMContentLoaded", myFunction());

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

function myFunction() {
    // References to DOM Elements
    const prevBtn = document.querySelector("#prev-btn");
    const nextBtn = document.querySelector("#next-btn");
    const book = document.querySelector("#book");

    const paper1 = document.querySelector("#p1");
    const paper2 = document.querySelector("#p2");
    const paper3 = document.querySelector("#p3");
    const paper4 = document.querySelector("#p4");

    // Event Listener
    prevBtn.addEventListener("click", goPrevPage);
    nextBtn.addEventListener("click", goNextPage);
    
    document.body.addEventListener('keydown', function (event) {
        const key = event.key;
        //const code = event.keyCode;
        if(key === "ArrowRight"){
            goNextPage();
        }
        if(key === "ArrowLeft"){
            goPrevPage();
        }
    });

        // Business Logic
    let currentLocation = 1;
    let numOfPapers = 4;
    let maxLocation = numOfPapers + 1;
    
    function openBook() {
        book.style.transform = "translateX(50%)";
        prevBtn.style.transform = "translateX(-65px)";
        nextBtn.style.transform = "translateX(65px)";
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
                    break;
                case 4:
                    paper4.classList.add("flipped");
                    paper4.style.zIndex = 4;
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
                    paper1.style.zIndex = 4;
                    break;
                case 3:
                    paper2.classList.remove("flipped");
                    paper2.style.zIndex = 3;
                    break;
                case 4:
                    paper3.classList.remove("flipped");
                    paper3.style.zIndex = 2;
                    break;
                case 5:
                    openBook();
                    paper4.classList.remove("flipped");
                    paper4.style.zIndex = 1;
                    break;
                default:
                    throw new Error("unkown state");
            }

            currentLocation--;
        }
    }
}

function baixarArquivo(caminho) {
    var link = document.createElement('a');
    link.href = caminho;
    link.setAttribute('download', '');
    link.click();
  }
