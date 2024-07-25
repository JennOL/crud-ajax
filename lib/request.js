// Peticiones AJAX

/*
 action { type: , payload:}
*/

const method = {
    list: 'GET',
    create: 'POST',
    update: 'PUT',
    destroy: 'DELETE',
    listall: 'GET'
}

const path = "todos";
const endpoint = "https://jsonplaceholder.typicode.com";

export default (action) => {
    let options = {
        method: method[action.type],
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return fetch(endpoint + getPath(action), options).then(r => r.json());
}

let getPath = (action) => {
    if(action.type === 'create')
        return `/${path}`;
    else if(action.type === 'listall')
        return `/${path}?_limit=20`;
    else
        return `/${path}/${action.payload.id}`;
}
