import { Account, Privacy, Shipping, UserProfile, Validation } from "@/types";

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

export function signUpValidation(user: UserProfile) {
  let error: Validation = {};

  if (!user.account.email) {
    error.email = "El email es requerido.";
  } else if (!/\S+@\S+\.\S+/.test(user.account.email)) {
    error.email = "El email no es válido.";
  }

  if (!user.account.password) {
    error.password = "La contraseña es requerida.";
  }

  if (user.account.password !== user.account.confirmPassword) {
    error.password = "Las contraseñas no coinciden.";
  }

  if (!user.privacy.firstName) {
    error.firstName = "El nombre es requerido.";
  }

  if (!user.privacy.lastName) {
    error.lastName = "El apellido es requerido.";
  }

  if (!user.privacy.dni) {
    error.dni = "El dni es requerido.";
  }

  if (!user.privacy.birthday) {
    error.birthday = "La fecha de nacimiento es requerida.";
  }

  if (!user.shipping.region) {
    error.region = "La provincia es requerida.";
  }

  if (!user.shipping.location) {
    error.location = "La ciudad es requerida.";
  }

  if (!user.shipping.address) {
    error.address = "La dirección es requerida.";
  }

  if (!user.shipping.zip) {
    error.zip = "El CP es requerido.";
  } else {
    if (!/^.+$/.test(user.shipping.zip)) {
      error.zip = "El CP no es válido.";
    }
  }

  if (!user.shipping.areaCode) {
    error.areaCode = "El CA es requerido.";
  } else {
    if (!/^.+$/.test(user.shipping.areaCode)) {
      error.areaCode = "El CA no es válido.";
    }
  }

  if (!user.shipping.phone) {
    error.phone = "El número de teléfono es requerido.";
  } else if (!/^\d{8}$/.test(user.shipping.phone)) {
    error.phone = "El número de teléfono no es válido.";
  }

  return error;
}
