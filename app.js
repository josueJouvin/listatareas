const formulario = document.querySelector('#formulario');
const pintarHtmlTodo = document.querySelector('#pintarTodo');
const inputForm = document.querySelector('#inputForm');
const alerta = document.querySelector('#alerta');
const filtros = document.querySelector('#filtros')
let todos = [];
 

document.addEventListener('DOMContentLoaded',() =>{
    if(localStorage.getItem('todos')){
        todos = JSON.parse(localStorage.getItem('todos'));
        pintarHtml()
    }
})

formulario.addEventListener('submit', (e) =>{
    e.preventDefault()
    let agregar = inputForm.value

    if(agregar === '' || !agregar.trim()){
        alerta.classList.remove('d-none')
        
        setTimeout(()=>{
            alerta.classList.add('d-none')
        },2000)
        return;
    }

    inputForm.value = ''
    guardarTodo(agregar)
})

const guardarTodo = (agregar) =>{

    const objTodo = {
        titulo: agregar,
        id: `${Date.now()}`,
        hora: `${moment().format('LT')}`,
        fecha: `${moment().format('l')}`,
        completado : false
        //agregar tarea: 0; y cuando le demos clikc al checboxk sea tarea++
    }

    todos.push(objTodo)
    pintarHtml();
    
}

const pintarHtml = () =>{
    pintarHtmlTodo.innerHTML = '';
    
    todos.forEach((todo1)=>{
        let {titulo,id,hora,fecha} = todo1
        let todo = document.createElement('div')
        todo.setAttribute("data-key",id)

        if(todo1.completado === true){
            todo.classList.add("tachar")
        }

        const checked = todo1.completado ? "checked" : " ";

        todo.innerHTML= `
        <div class="alert mb-0 alert-warning d-flex align-items-center justify-content-between">
        <div class="d-flex gap-2 align-items-center">
        <input type="checkbox" class="form-check-input idCheck"${checked}/>
        <p class="fw-normal mb-0 lead">${titulo}</p>
        </div>
        <div>
        <button class="btn btn-danger" value=${id} >Eliminar</button>
        </div>
        </div> 
        <nav class="mb-4 navbar bg-light">
        <div class="container-fluid">
        <span>Hora ingreso: ${hora}</span>
        <span>Fecha ingreso: ${fecha}</span>
        </div>
        </nav>
        `
        pintarHtmlTodo.appendChild(todo)
        filtrado(todo)
    })
    guardarLocalStorage()
}
//PARA MARCAR EL CHEXBOX COMO ACTIVO O INACTIVO
pintarHtmlTodo.addEventListener('change',(e)=>{
    if(e.target.type === 'checkbox'){
        id = e.target.parentElement.parentElement.parentElement.getAttribute("data-key")
       toggle(id)
    }
})
 
const toggle = (id) =>{
    todos.forEach(item =>{
        if(item.id === id){
            item.completado = !item.completado;    
            pintarHtml()
        }
    })
}

const filtrado = (todo) =>{
    filtros.addEventListener('change',(e) =>{
        todos.forEach((t) => {
   // intentarlos solo con ifs
   //ver el video de midudev de no usar switch
            switch(e.target.value){
                case "todos":
                    todo.classList.remove('d-none')
                    
                break;
                case "completados":
                    if(t.completado === false){
                        if(!todo.classList.contains('tachar')){
                            todo.classList.add('d-none')
                        }else{
                            todo.classList.remove('d-none')
                        }
                    }
                break;
                case "incompletos":
                    if(t.completado !== false){
                        if(todo.classList.contains('tachar')){
                            todo.classList.add('d-none')
                        }else{
                            todo.classList.remove('d-none')
                        }
                    }
                break;        
            }
            
        })
    })
    
}

const guardarLocalStorage = () =>{
    const storageTodo = JSON.stringify(todos);
    localStorage.setItem('todos',storageTodo)
}

const eliminaTodo = addEventListener('click',(e) =>{
    if (e.target.matches(".btn-danger")) {
        let cl = e.target.value//se obtiene el id
        todos = todos.filter(todo => todo.id !== cl)
        pintarHtml()
    }
})

