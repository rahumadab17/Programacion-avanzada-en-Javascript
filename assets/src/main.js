import { Leon, Lobo, Oso, Serpiente, Aguila } from "./class/classAnimals.js"
import animalsData from "./getAnimals.js"

let animales = []

let imagenSrc;

document.getElementById("animal").addEventListener("change", async (e) => {
    const animalSelected = e.target.value;
    const animales = await animalsData.getData();
    const animalObject = animales.find((a) => a.name == animalSelected);
    imagenSrc = `./assets/imgs/${animalObject.imagen}`;
    const preview = document.getElementById("preview");
    preview.parentElement.classList.remove("p-5");
    preview.style.backgroundImage = `url(${imagenSrc})`
});

// ! REVISAR
const reloadTable = () => {
    const animalesTemplate = document.getElementById("Animales");
    animalesTemplate.innerHTML = "";
    animales.forEach((p, i) => {
      animalesTemplate.innerHTML += `
            <div class="px-3 pb-2">
              <div class="bg-dark text-white">
                <img
                  height="200"
                  src="${p.getImg()}"
                  data-toggle="modal" data-target="#exampleModal"
                  onclick="modalDetails('${i}')"
                />
                <div>
                  <button onclick="playSound('${p.getNombre()}')" class="btn btn-secondary w-100"> <img height="30" src="assets/imgs/audio.svg" /> </button>
                </div>
              </div>
            </div>
      `;
    });
    document
      .querySelectorAll(".card-body button")
      .forEach((b) => b.addEventListener("click", activarHabiblidad));
  };

document.getElementById("btnRegistrar").addEventListener("click", async (e) => {
    const nombreElement = document.getElementById("animal");
    const edadElement = document.getElementById("edad");
    const comentariosElement = document.getElementById("comentarios");
    const nombre = nombreElement.value;
    const edad = edadElement.value;
    const comentarios = comentariosElement.value;
    const sonido = ""
    if (nombre && edad && comentarios){
        let animal =
        nombre == "Leon"
        ? new Leon(nombre, edad, imagenSrc, comentarios, sonido)
        : nombre == "Lobo"
        ? new Lobo(nombre, edad, imagenSrc, comentarios, sonido)
        : nombre == "Oso"
        ? new Oso(nombre, edad, imagenSrc, comentarios, sonido)
        : nombre == "Serpiente"
        ? new Serpiente(nombre, edad, imagenSrc, comentarios, sonido)
        : nombre == "Aguila"
        ? new Aguila(nombre, edad, imagenSrc, comentarios, sonido)
        :undefined;

        nombreElement.selectedIndex = 0;
        edadElement.selectedIndex = 0;
        comentariosElement.value = "";
        document.getElementById("preview").style.backgroundImage = "url(assets/imgs/lion.svg)";
        animales.push(animal);
        reloadTable();
    } else {
        alert("Debes completar todos los campos.")
    }

});