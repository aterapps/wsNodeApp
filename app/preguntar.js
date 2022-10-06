import { token,hash, fetchApi } from "./aterApi"

export async function setupPreguntarServidor(trigger, element) {
    trigger.addEventListener('click', async () => {
        element.innerHTML = ''
        const pregunta = document.querySelector('#pregunta').value
        // creo un div y le agrego clases de animate.css        
        document.querySelector('#pregunta').value = ''
        const texto = 'preguntando al servidor: "'+pregunta+'"'
        element.appendChild(newTextElement(texto))
        element.appendChild(newTextElement('El servidor le pregunta a la api de la ATER: '+pregunta))
        
    })
}

/*
    enviar parametros concatenados al servidor procesar el hash y recibirlo para enviar
*/

export function setupPreguntarAter(trigger, element) {
    trigger.addEventListener('click', async () => {
        element.innerHTML = ''
        const pregunta = document.querySelector('#pregunta').value
        const texto = 'preguntando al servidor: "'+pregunta+'"'
        document.querySelector('#pregunta').value = ''
        // creo un div y le agrego clases de animate.css        
        element.appendChild(newTextElement(texto))
        element.appendChild(newTextElement('Solicito un token a mi servidor...'))
        const bearer = await token()
        element.appendChild(newTextElement('Token recibido'))
        element.appendChild(newPreElement({token:`bearer ...${bearer.token.slice(-20)}`}))
        element.appendChild(newTextElement('Solicito un hash a mi servidor...'))
        const hashParam = await hash(pregunta)
        element.appendChild(newTextElement('Hash recibido'))
        element.appendChild(newPreElement(hashParam))
        element.appendChild(newTextElement('Pregunto a la api de la ATER...'))
        const respuesta = await fetchApi([pregunta], bearer.token, hashParam.hash)
        element.appendChild(newTextElement('Respuesta recibida'))
        element.appendChild(newPreElement(respuesta))
    })
}

const newTextElement = (texto) => {
    const element = document.createElement('p')
    element.classList
    .add('animate__animated')
    element.classList.add('animate__fadeIn')
    element.innerHTML = texto

    return element
}

const newPreElement = (json) => {
    const element = document.createElement('pre')
    element.classList
    .add('animate__animated')
    element.classList.add('animate__fadeIn')
    element.innerHTML = JSON.stringify(json, null, 2)

    return element
}



