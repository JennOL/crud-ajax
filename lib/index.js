// Control DOM
import { Todo } from "./Todo.js";

window.addEventListener("load", (ev) => {
    let container = document.querySelector('#root ul');

    document.querySelector("#mainForm").addEventListener("submit", (ev) => {
        ev.preventDefault();

        const form = ev.target;
        const textarea = form.querySelector("textarea");
        const button = form.querySelector("[type='submit']");
        button.disabled = true;

        let todo = new Todo({
            title: textarea.value
        });

        todo.save().then(() => {
            textarea.value = "";
            button.disabled = false;

            let li = buildDOMEelemtn(todo);
            container.prepend(li);
        });

        return false;
    });

    // Todo.all => Retorna los todos del servicio web
    Todo.all().then(todos =>  {
        // Iteramos todos los todos
        todos.forEach(todo => {
            // Construimos un node del DOM con buildDOMEelement
            let node = buildDOMEelemtn(todo);

            // Insertamos el nodo en el contenedor
            container.prepend(node);
            
            editInPlace(node.querySelector("h1"), todo);
        });
    });


    let buildDOMEelemtn = (todo) => {
        let li = document.createElement('li');
        li.innerHTML = `
            <h1>${todo.title}</h1>
            <button class="close">X</button>
        `;

        li.querySelector(".close").addEventListener("click", (ev) => {
            todo.destroy().then(r => console.log(r));
            li.remove();
        })

        return li;
    }

    let editInPlace = (node, todo, propertyName) =>{
        node.addEventListener("click", (ev => {
            let inputText = document.createElement("textarea")
            inputText.value = node.innerHTML;
            inputText.autofocus = true;

            node.replaceWith(inputText);

            inputText.addEventListener("change", (ev) => {
                inputText.replaceWith(node);
                todo.title = ev.target.value;

                node.innerHTML = todo.title;
                todo.save().then(r => console.log(r));
            })
        }))
    }
})

