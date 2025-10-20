const d = document;

window.addEventListener('load',function(e) { 
    initValidate();
    initMessage();
    setResponsiveImage();
    
});

// === Formulieren ===
function initValidate() {
    const submitKnop = d.getElementById('verstuur');
    // excistency check!
    if (!submitKnop) return; // Stop als de knop niet bestaat
    //console.log(submitKnop);

    submitKnop.addEventListener('click', function(e) {
        e.preventDefault(); // voorkom dat de pagina verstuurd wordt
        console.log(this.form);
        if (valideerForm(this.form)){
            // alleen als alles goed is bevonden dan versturen we de pagina
            this.form.submit(); // verstuur de pagina
            confirmSubmission(); // Toon een bevestiging
        }     
    });
}

var allesGoed; // GLOBAL

function valideerForm(contactForm){
    allesGoed = true;
    let waarde = '';
    let geldig = false;

    for (element of contactForm.elements) {
        // controleren of er invoer is in de tekstvelden
        if (element.type == 'text') {
            
            waarde = element.value;
            geldig = waarde.length >= 2;

        } else if (element.type == 'button') {
            continue;
            //console.log(element.id);  
        }
       
        formFeedback(element, geldig);
        console.log(element, geldig); 
                    
        // controleer of de email plausibel is
        // ab@cd.ef minimaal
        if (element.name == 'email' || element.name == 'email_inlog') {
            console.log(element.id);
            waarde = element.value;
            let apenstaart = waarde.lastIndexOf('@');
              let laatstePunt = waarde.lastIndexOf('.');
            let length = waarde.length;
            geldig =     apenstaart >=2
                         && laatstePunt > apenstaart + 2
                         && length > laatstePunt + 2;
            formFeedback(element, geldig);
            console.log(element, geldig);
        }

        if (element.name == 'bericht') {
            console.log(element.id);
            waarde = element.value;
            geldig = waarde.length >= 2 ;
        
            formFeedback(element, geldig);
            console.log(element, geldig); 
        }

    } // einde elementen loop
    // Retourneer true als alle velden geldig zijn, anders false
    return allesGoed;
} // einde valideer Form functie



function formFeedback(element, geldig){
    const melding = d.getElementById(element.id + '_error');
    console.log(melding, element.id);
    if (geldig){
        melding.style.display = 'none';
        element.style.borderColor = 'green';

    } else {
        melding.style.display = 'block';
        allesGoed = false ; // als er een fout dan blijft het fout.
        element.style.borderColor = 'red';
    }
}
// het genereren van een bericht bij succesvolle verzending
function initMessage() {
    const successMessage = document.getElementById('success_message');
    // exixtentieCheck(successMessage)
    if (!successMessage) return; // stop als er geen successMessage is
    successMessage.classList.add('hidden');
}
// bericht bij succesvolle verzending
function confirmSubmission() {
    const successMessage = document.getElementById('success_message');
    const overlay = document.getElementById('overlay');
    if (successMessage) {
        successMessage.classList.remove('hidden');
        overlay.classList.remove('hidden');
        console.log('Success message displayed'); // Voor debuggen
    } else {
        console.error("Element met ID 'success_message' niet gevonden.");
    }

    // Sluit de popup wanneer op de overlay of de sluitknop wordt geklikt
    overlay.addEventListener('click', closePopup);
    document.getElementById('close').addEventListener('click', closePopup);
}

function closePopup() {
    const successMessage = document.getElementById('success_message');
    const overlay = document.getElementById('overlay');
    successMessage.classList.add('hidden');
    overlay.classList.add('hidden');
}

// === Responsive afbeelding ===
window.addEventListener("load", setResponsiveImage);
window.addEventListener("resize", setResponsiveImage);
function setResponsiveImage() {
    const title = document.title;
    const firstWord = title.split(' ')[0].toLowerCase();
    const image = document.getElementById('responsiveImg');
    const width = window.innerWidth;
    if(!image) return;// als er geen afbeelding is dan stoppen we
    // Stel de src en title attributen in
    image.src = `./../img/${firstWord}_${width >= 1280 ? 'laptop' : width >= 768 ? 'tablet' : 'mobile'}_s.png`;
    image.title = firstWord; // Stel de title-attribuut in op basis van het eerste woord van de titel van de pagina
    console.log("Afbeelding ingesteld:", image.src, image.alt);
}

function openTargetBlank(className) {
    document.querySelectorAll(`.${className}`).forEach(link => {
        if (window.innerWidth >= 768) {
            link.setAttribute("target", "_blank");
        }
    });
}
// Roep de functie aan na het laden van de pagina
document.addEventListener("DOMContentLoaded", () => {
    openTargetBlank("imageNewTab");
});

// === GSAP Animatie ===
gsap.from('.logo', {duration: 1.4, opacity:0, scale:0, ease: "elastic.out(1.1,1)",});
gsap.from('.logoT', {duration: 1, opacity:0, ease:'ease-in-out', y:-100})
gsap.from('.logo2', {duration: 1, opacity:0, rotation:540, ease:'power4.out'})
gsap.to(".background", {
    opacity: 1,
    duration: 1,
    ease: "ease-out",
});

