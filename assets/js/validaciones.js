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
}

const validators ={
    birth: input=> validateBirth(input),
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
