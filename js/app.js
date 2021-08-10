
let datos = (localStorage.getItem(`TodoList`)) ? JSON.parse(localStorage.getItem(`TodoList`)) : {
    todo: [],
    completado: [],
};




// ICONOS DE BOOTSTRAP PARA BORRAR Y COMPLETADO
const iconoBorrar = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path class="fill"
    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
<path class="fill" fill-rule="evenodd"
    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
</svg>`

const iconoCompletado = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
<path class="fill"
    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
<path class="fill"
    d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
</svg>`


ultimaFuncion()




document.getElementById(`add`).addEventListener(`click`, function () {
    let value = document.getElementById(`item`).value;
    if (value) {
        addItem(value)
    }

})

document.getElementById(`item`).addEventListener(`keydown`, function (e) {
    let value = this.value;
    if (e.code === `Enter` && value) {
        addItem(value)
    }
})

function addItem(value) {
    addItemTodo(value);
    document.getElementById(`add`).value = ` `;

    datos.todo.push(value);
    arrayActualizado()
}
function ultimaFuncion() {
    if (!datos.todo.length && !datos.completado.length) return;

    for (let i = 0; i < datos.todo.length; i++) {
        let value = datos.todo[i];
        addItemTodo(value);
    }

    for (let e = 0; e < datos.completado.length; e++) {
        let value = datos.completado[e];
        addItemTodo(value, true);



    }
}

function arrayActualizado() {
    localStorage.setItem(`TodoList`, JSON.stringify(datos))
}


function borrarElemento() {

    let item = this.parentNode.parentNode;
    let padre = item.parentNode;
    let padreId = padre.id;
    let value = item.innerText;

    if (padreId == `todo`) {
        datos.todo.splice(datos.todo.indexOf(value), 1);
    } else {
        datos.completado.splice(datos.completado.indexOf(value), 1);

    }
    arrayActualizado()
    padre.removeChild(item);

}

function agregoElemento() {

    let item = this.parentNode.parentNode;
    let padre = item.parentNode;
    let padreId = padre.id;
    let target = (padreId == `todo`)
    let value = item.innerText;

    if (padreId == `todo`) {
        datos.todo.splice(datos.todo.indexOf(value), 1);
        datos.completado.push(value);
    } else {
        datos.completado.splice(datos.completado.indexOf(value), 1);
        datos.todo.push(value);

    }

    if (padreId == `todo`) {

        target = document.getElementById(`completed`)

    } else {
        target = document.getElementById(`todo`)
    }
    arrayActualizado()
    padre.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);

}


// Agrego tareas a la lista.


function addItemTodo(texto, completed) {

    let lista = (completed) ? document.getElementById(`completed`) : document.getElementById(`todo`)

    let item = document.createElement(`li`);
    item.innerText = texto;

    let botones = document.createElement(`div`);
    botones.classList.add(`botones`);


    let borrar = document.createElement(`button`);
    borrar.classList.add(`borrar`);
    borrar.innerHTML = iconoBorrar;
    //click para borrar
    borrar.addEventListener(`click`, borrarElemento)


    let completado = document.createElement(`button`);
    completado.classList.add(`completado`);
    completado.innerHTML = iconoCompletado;
    //click para ponerlo como terminado
    completado.addEventListener(`click`, agregoElemento)


    botones.appendChild(borrar);
    botones.appendChild(completado);
    item.appendChild(botones);



    lista.insertBefore(item, lista.childNodes[0]);
}