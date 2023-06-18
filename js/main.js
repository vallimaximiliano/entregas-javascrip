function IdFuncion(modelo, tamaño) {
    return `${modelo.slice(0, 3)}-${tamaño}`;
  }

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
      document.getElementById("mensaje").innerHTML = "Por favor, rellena todos los campos.";
    } else {
        if (revisarExistencia == false) {
            let acolchadoUsuario = new Acolchado(
              nombre,
              tamanio,
              precio,
              stock
            );
            todosLosAcolchados.push(acolchadoUsuario);
           
            document.getElementById("mensaje").innerHTML = "Se creó con éxito el Acolchado " + acolchadoUsuario.id;
          } else {
            document.getElementById("mensaje").innerHTML = "Este Acolchado ya existe";
          }


    }
  }

//crear elementos html
function mostrarCard() {

    todosLosAcolchados.forEach(element => {
        const parrafo = document.createElement("div")
parrafo.innerHTML = 
`<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${element.modelo}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">${element.tamaño}</h6>
    <h6 class="card-subtitle mb-2 text-body-secondary">${element.precio}</h6>
    <h6 class="card-subtitle mb-2 text-body-secondary">${element.stock}</h6>
    <p class="card-text">Este es el acolchado que usted acaba de ingresar a nuestro sistema revolucionario.</p>
  </div>
</div>`
document.body.append(parrafo) 


    })

    
}


