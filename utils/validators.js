// utils/validators.js

export const validateStudentId = (value) => {
  if (!value) throw new Error("El número de carnet es obligatorio");
  if (typeof value !== "string" || value.length !== 7) throw new Error("El número de carnet debe tener 7 dígitos");
  if (!/^\d{7}$/.test(value)) throw new Error("El número de carnet debe ser numérico de 7 dígitos");
  return true;
};

export const validateName = (value) => {
  if (!value) throw new Error("El nombre es obligatorio");
  if (typeof value !== "string") throw new Error("El nombre debe ser texto");
  if (value.length > 35) throw new Error("El nombre no puede exceder los 35 caracteres");
  return true;
};

export const validateSurname = (value) => {
  if (!value) throw new Error("El apellido es obligatorio");
  if (typeof value !== "string") throw new Error("El apellido debe ser texto");
  if (value.length > 35) throw new Error("El apellido no puede exceder los 35 caracteres");
  return true;
};

export const validateSection = (value, validSections) => {
  if (!value) throw new Error("La sección es obligatoria");
  if (!validSections.includes(value)) throw new Error("La sección no es válida");
  return true;
};
