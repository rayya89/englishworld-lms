import firebaseErrors from "../data/firebaseErrors.json";

export function onFail(error) {
  const message = firebaseErrors[error.code] || firebaseErrors["default"];

  console.error(error.code);
  alert(message);
}
