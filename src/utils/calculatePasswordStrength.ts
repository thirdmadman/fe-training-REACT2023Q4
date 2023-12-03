export function calculatePasswordStrength(password: string) {
  let strength = 0;

  if (/^(?=.*[a-z]).+/.test(password)) {
    strength += 1;
  }

  if (/^(?=.*[A-Z]).+/.test(password)) {
    strength += 1;
  }

  if (/^(?=.*[0-9]).+/.test(password)) {
    strength += 1;
  }

  if (/^(?=.*[^A-Za-z0-9]).+/.test(password)) {
    strength += 1;
  }

  return strength;
}
