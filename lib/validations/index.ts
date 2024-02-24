import {
  Account,
  Privacy,
  Shipping,
  User,
  Validation,
} from "@/types";

export function accountValidation(account: Account) {
  let error: Validation = {};

  if (!account.email) {
    error.email = "El email es requerido.";
  } else if (!/\S+@\S+\.\S+/.test(account.email)) {
    error.email = "El email no es válido.";
  }

  if (!account.password) {
    error.password = "La contraseña es requerida.";
  }

  if (account.password !== account.confirmPassword) {
    error.password = "Las contraseñas no coinciden.";
  }

  return error;
}

export function privacyValidation(privacy: Privacy) {
  let error: Validation = {};

  if (!privacy.firstName) {
    error.firstName = "El nombre es requerido.";
  }

  if (!privacy.lastName) {
    error.lastName = "El apellido es requerido.";
  }

  if (!privacy.dni) {
    error.dni = "El dni es requerido.";
  }

  if (!privacy.birthday) {
    error.birthday = "La fecha de nacimiento es requerida.";
  }

  return error;
}

export function shippingValidation(shipping: Shipping) {
  let error: Validation = {};

  if (!shipping.region) {
    error.region = "La provincia es requerida.";
  }

  if (!shipping.location) {
    error.location = "La ciudad es requerida.";
  }

  if (!shipping.address) {
    error.address = "La dirección es requerida.";
  }

  if (!shipping.zip) {
    error.zip = "El CP es requerido.";
  } else {
    if (!/^.+$/.test(shipping.zip)) {
      error.zip = "El CP no es válido.";
    }
  }

  if (!shipping.areaCode) {
    error.areaCode = "El CA es requerido.";
  } else {
    if (!/^.+$/.test(shipping.areaCode)) {
      error.areaCode = "El CA no es válido.";
    }
  }

  if (!shipping.phone) {
    error.phone = "El número de teléfono es requerido.";
  } else if (!/^\d{10}$/.test(shipping.phone)) {
    error.phone = "El número de teléfono no es válido.";
  }

  return error;
}

export function signInValidation(account: Account) {
  let error: Validation = {};

  if (!account.email) {
    error.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(account.email)) {
    error.email = "El email no es válido";
  }

  if (!account.password) {
    error.password = "La contraseña es requerida";
  }

  return error;
}

export function signUpValidation(user: User) {
  let error: Validation = {};

  if (!user.email) {
    error.email = "El email es requerido.";
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    error.email = "El email no es válido.";
  }

  if (!user.password) {
    error.password = "La contraseña es requerida.";
  }

  if (user.password !== user.confirmPassword) {
    error.password = "Las contraseñas no coinciden.";
  }

  if (!user.firstName) {
    error.firstName = "El nombre es requerido.";
  }

  if (!user.lastName) {
    error.lastName = "El apellido es requerido.";
  }

  if (!user.dni) {
    error.dni = "El dni es requerido.";
  }

  if (!user.birthday) {
    error.birthday = "La fecha de nacimiento es requerida.";
  }

  if (!user.region) {
    error.region = "La provincia es requerida.";
  }

  if (!user.location) {
    error.location = "La ciudad es requerida.";
  }

  if (!user.address) {
    error.address = "La dirección es requerida.";
  }

  if (!user.zip) {
    error.zip = "El CP es requerido.";
  } else {
    if (!/^.+$/.test(user.zip)) {
      error.zip = "El CP no es válido.";
    }
  }

  if (!user.areaCode) {
    error.areaCode = "El CA es requerido.";
  } else {
    if (!/^.+$/.test(user.areaCode)) {
      error.areaCode = "El CA no es válido.";
    }
  }

  if (!user.phone) {
    error.phone = "El número de teléfono es requerido.";
  } else if (!/^\d{8}$/.test(user.phone)) {
    error.phone = "El número de teléfono no es válido.";
  }

  return error;
}
