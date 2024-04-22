document.addEventListener("DOMContentLoaded", function () {

    fetchServices();

    fetchAboutUs();

    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        submitForm();
    });
});

//Modo Oscuro
function temaOscuro(button) {
    const body = document.querySelector('body');
    const footer = document.querySelector('footer');
    const buttonLabel = button.innerHTML;

    if (buttonLabel === "Tema Oscuro") {
        body.style.backgroundColor = "#333";
        body.style.color = "white";
        footer.style.color = "black";
        footer.style.backgroundColor = "#F5F5F5";
        button.innerHTML = "Tema Claro";
    } else {
        body.style.backgroundColor = "#F5F5F5";
        body.style.color = "black";
        footer.style.color = "white";
        footer.style.backgroundColor = "#333";
        button.innerHTML = "Tema Oscuro";
    }
}

function fetchServices() {
    fetch("https://ciisa.coningenio.cl/v1/services/", {
        headers: {
            Authorization: "Bearer ciisa"
        }
    })
        .then(response => response.json())
        .then(data => {
            const servicesList = document.getElementById("services-list");
            data.forEach(service => {
                servicesList.innerHTML += `
                <div>
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                </div>
            `;
            });
        })
        .catch(error => console.error('Error:', error));
}

function fetchAboutUs() {
    fetch("https://ciisa.coningenio.cl/v1/about-us/", {
        headers: {
            Authorization: "Bearer ciisa"
        }
    })
        .then(response => response.json())
        .then(data => {
            const aboutContent = document.getElementById("about-content");
            aboutContent.innerHTML = `
            <h3>Misión:</h3>
            <p>${data.mission}</p>
            <h3>Visión:</h3>
            <p>${data.vision}</p>
            <h3>Valores:</h3>
            <p>${data.values}</p>
        `;
        })
        .catch(error => console.error('Error:', error));
}

// Inicio envío de formulario 
function submitForm() {
    const formData = new FormData(document.getElementById("contact-form"));
    const fullName = formData.get("fullname");
    const selectedService = formData.get("service");
    const message = formData.get("message");

    // Log
    console.log("Nombre Completo:", fullName);
    console.log("Servicio Seleccionado:", selectedService);
    console.log("Mensaje:", message);

    alert("Mensaje enviado correctamente");
}
