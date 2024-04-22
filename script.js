document.addEventListener("DOMContentLoaded", function () {
    // Fetching Services
    fetchServices();

    // Fetching About Us content
    fetchAboutUs();

    // Form Submission
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        submitForm();
    });
});

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

function submitForm() {
    const formData = new FormData(document.getElementById("contact-form"));
    const fullName = formData.get("fullname");
    const selectedService = formData.get("service");
    const message = formData.get("message");

    // Logging to console
    console.log("Nombre Completo:", fullName);
    console.log("Servicio Seleccionado:", selectedService);
    console.log("Mensaje:", message);
}
