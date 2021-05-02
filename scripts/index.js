//VARIABLES

let arrayFormulario = [];
let articulosAll;
let formulario;
let img;
//FUNCIONES GET,INSERT,DELETE,CREATE
async function getEvents() {
    arrayFormulario = await Evento.getEvents();

    arrayFormulario.forEach(eForm => {
        crearFormulario(eForm);
    });
}

async function insertarFormulario(eForm) {
    let newForm = new Evento(eForm);
    let formInsert = await newForm.post();

    arrayFormulario.push(formInsert);
    crearFormulario(formInsert);
}

function crearFormulario(eForm) {
    let articuloCreado = eForm.toHTML();
    let borrar = articuloCreado.querySelector("button");

    borrar.addEventListener('click', async e => {
        await eForm.delete();
        arrayFormulario.splice(arrayFormulario.indexOf(eForm), 1);
        articuloCreado.remove();
    });
    articulosAll.appendChild(articuloCreado);
}
//ADDEVENTLISTENERS

document.addEventListener("DOMContentLoaded", e => {
    articulosAll = document.getElementById("eventsContainer");
    formulario = document.getElementById("newEvent");
    image = document.getElementById("imgPreview");
    
    getEvents();

    formulario.image.addEventListener("change", e => {
        let fichero = formulario.image.files[0];

        if (fichero && fichero.type.startsWith('image')) {
            let reader = new FileReader();
            reader.readAsDataURL(fichero); // Leerlo en base64

            reader.addEventListener('load', e => {
                // Visualizamos la imagen en un <img> en el HTML
                image.src = reader.result;
            });
        }
    });

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        const precio = formulario.price.value;
        let eForm = {
            id: formulario.id.value,
            name: formulario.name.value,
            date: formulario.date.value,
            description: formulario.description.value,
            image: imgPreview.src,
            price: parseFloat(precio)
        };
        await insertarFormulario(eForm);

        formulario.reset();
        image.src = '';

    });
});



