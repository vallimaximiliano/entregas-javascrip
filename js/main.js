//creamos ID presonalizada

function IdFuncion(modelo, tamaño) {
    return `${modelo.slice(0, 3)}-${tamaño}`;
  }
//funcion constructora

function Acolchado(modelo, tamaño, precio, stock) {
    this.id = IdFuncion(modelo, tamaño);
    this.modelo = modelo;
    this.tamaño = tamaño;
    this.precio = precio;
    this.stock = stock;
  }
  //array para guardar mis acolchados

  let todosLosAcolchados = [];

  // formulario

  function crearAcolchado() {
    let nombre = document.getElementById("nombre").value;
    let tamanio = "";
    if (document.getElementById("queen").checked) {
      tamanio = document.getElementById("queen").value;
    } else if (document.getElementById("king").checked) {
      tamanio = document.getElementById("king").value;
    }
    let precio = document.getElementById("precio").value;
    let stock = document.getElementById("stock").value;

// validar existencia

    let nuevoId = IdFuncion(nombre, tamanio);
    let revisarExistencia = false;

    todosLosAcolchados.forEach((element) => {
      if (element.id == nuevoId) {
        revisarExistencia = true;
      }
    });
   
    if (nombre === "" || tamanio === "" || precio === null || stock === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, complete todos los campos',
      })
    } else {
        if (revisarExistencia == false) {
            let acolchadoUsuario = new Acolchado(
              nombre,
              tamanio,
              precio,
              stock
            );
            todosLosAcolchados.push(acolchadoUsuario);
           
            Swal.fire({
              icon: 'success',
              title: 'BIEN',
              text: "El acolchado " + acolchadoUsuario.modelo + " fue agregado con éxito",
            })
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'ATENCIÓN',
              text: "Este acolchado ya existe",
            })
          }
    }
  }

// funcion para crear la card del acolchdo ingresado

function crearHtml (element) {
    const parrafo = document.createElement("div")
    parrafo.innerHTML += `<div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${element.modelo}</h5>
     <h6 class="card-subtitle mb-2 text-body-secondary">${element.tamaño}</h6>
   <h6 class="card-subtitle mb-2 text-body-secondary">${element.precio}</h6>
    <h6 class="card-subtitle mb-2 text-body-secondary">${element.stock}</h6>
   <p class="card-text">Este es el acolchado que usted acaba de ingresar a nuestro sistema revolucionario.</p>
   </div>
   </div>`
   document.body.append(parrafo)
   const card=document.getElementById("card")
   card.appendChild(parrafo)
}

btn.addEventListener("click", () =>{
    verStock()
})
function verStock (){
  document.getElementById("card").innerHTML = ""
    todosLosAcolchados.forEach(element => {
        console.log(element)
    crearHtml(element)
}) 
}
// llamo a mi base de datos con Fetch

fetch("./db/acolchados.json")
    .then(response => response.json())
    .then(data => {
        let app = document.getElementById('list')
        data.forEach(item => {
            let div = document.createElement('div');
            div.innerHTML = `<p class="card-text">${item.id}</p><p class="card-text">${item.nombre}</p><p class="card-text">${item.precio}</p><p class="card-text">${item.tamanio}</p><p class="card-text">${item.img}</p>`;
            list.appendChild(div);
            
        });
    })
    .catch((error) => console.error('Error:', error));
  