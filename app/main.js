import './styles.css'
import {setupPreguntarServidor, setupPreguntarAter} from './preguntar'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div class="d-flex">
      <h1>Probando Webservices de ATER</h1>
      <hr/>

      <label class="mb-3 input-label text-center">Mensaje</label>
      <input type="text" class="form-input text-center" id="pregunta"/> 
      <hr/>
      <div class="row">
        <div id="aterApi">
          <button class="btn btn-primary w-100" id="preguntarAter">preguntarle a la ATER</button>
        </div>
        <div id="customApi">
          <button class="btn btn-danger w-100" id="preguntarServidor">preguntarle a mi servidor</button>
        </div>
      </div>
    </div>
    <hr/>
    <div class="d-flex" id="resultado">
    </div>
  </div>
`
// setupCounter(document.querySelector('#counter'))

setupPreguntarAter(document.querySelector('#preguntarAter'), document.querySelector('#resultado'))
setupPreguntarServidor(document.querySelector('#preguntarServidor'), document.querySelector('#resultado'))


