// const inputBirth = document.querySelector("#birth");

// inputBirth.addEventListener("blur", (evento) => {
//   validateBirth(evento.target);
// });

//para mejorar el código y que séa más reutilizable borramos lo anterior

export function valid(input){
  const typeOfInput = input.dataset.type; //verifica el tipo de dato
  if(validators[typeOfInput]){
    validators[typeOfInput](input);
  }

  if(input.validity.valid){
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  }else{
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = showMessageError(typeOfInput, input);
  }
}

const bugType = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError"
];

const errorMessage = {
  name:{
    valueMissing: "El campo nombre no puede estar vacío"
  },
  email: {
    valueMissing: "El campo correo no puede estar vacío",
    typeMismatch: "El correo no es válido"
  },
  password:{
    valueMissing: "El campo contraseña no puede estar vacío",
    patternMismatch: "Almenos 6 caracteres, maximo 12 caracteres, debe contener una letra mayúscula, debe contener una letra minúscula, debe contener un número, debe contener un caracter especial !¡@#$%&.,_- y no puede contener espacios"
  },
  birth:{
    valueMissing: "Este campo no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad"
  },
};

const validators ={
    birth: input=> validateBirth(input),
}

function showMessageError(typeOfInput, input){
  let message = "";
  bugType.forEach(error => {
    if(input.validity[error]){
      message = errorMessage[typeOfInput][error];
    }
  })
  return message;
}

function validateBirth(input) {
  const dateClient = new Date(input.value);
  let message = "";
  adult(dateClient);
  if(!adult(dateClient)){
    message = "Debes tener al menos 18 años de edad";
  }
  input.setCustomValidity(message);
}

function adult(dateClient) {
  const currentDate = new Date();
  const diferenceDates = new Date(
    dateClient.getUTCFullYear() + 18,
    dateClient.getUTCMonth(),
    dateClient.getUTCDate()
  );
  return diferenceDates <= currentDate;
}
