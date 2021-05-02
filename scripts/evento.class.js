class Evento {

    constructor(formularioJSON) {
        this.id = formularioJSON.id;
        this.name = formularioJSON.name;
        this.date = formularioJSON.date;
        this.description = formularioJSON.description;
        this.image = formularioJSON.image;
        this.price = formularioJSON.price;

    }
    static async getEvents() {
        let respuesta = await Http.get(`${SERVER}/eventos`);
        return respuesta.eventos.map(form => new Evento(form));
    }
    post() {
        return Http.post(`${SERVER}/eventos`, this)
            .then((respuesta) => {
                return new Evento(respuesta.evento);
            });

    }
    put() {
        return Http.put(`${SERVER}/eventos/${this.id}`, this)
            .then((respuesta) => {
                return new Evento(respuesta.evento);
            });

    }
    delete() {
        return Http.delete(`${SERVER}/eventos/${this.id}`);
    }
    toHTML() {

        let card = document.createElement("div");
        card.classList.add("card");


        let img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = this.image;
        card.appendChild(img);


        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        card.appendChild(cardBody);


        let cardTitle = document.createElement("h4");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = this.name;
        cardBody.appendChild(cardTitle);


        let cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerText = this.description;
        cardBody.appendChild(cardText);


        let cardFooter = document.createElement("div");
        cardFooter.classList.add("card-footer");
        card.appendChild(cardFooter);


        let dateObj = new Date(this.date);


        let dia = String(dateObj.getDate()).padStart(2, '0');

        let mes = String(dateObj.getMonth() + 1).padStart(2, '0');


        let footerText = document.createElement("small");
        footerText.classList.add("text-muted");
        footerText.textContent = `${dia}/${mes}/${dateObj.getFullYear()}`;
        cardFooter.appendChild(footerText);

        let priceText = document.createElement("span");
        priceText.classList.add("float-right");
        priceText.textContent = (+this.price).toFixed(2) + "€";
        footerText.appendChild(priceText);

        let divButton = document.createElement("div");

        let button= document.createElement("button");
        divButton.appendChild(button);
        button.classList.add("btn");
        button.classList.add("btn-danger");
        button.textContent= "Borrar articulo";

        cardBody.appendChild(divButton);

        document.getElementById("eventsContainer").appendChild(card);

        return card;
    }

}