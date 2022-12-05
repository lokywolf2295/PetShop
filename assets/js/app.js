import { valid } from "./validaciones.js";

//seleccionamos todos los inputs
const inputs = document.querySelectorAll("input");

//luego los iteramos y le agregamos el addEven... y cuando los saca de fovo valida
inputs.forEach(input => {
    input.addEventListener('blur', (input)=>{
        valid(input.target);
    })
})