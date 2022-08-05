export function getUserInitials(userName: string): string {
  const splittedName = userName.split(' ');
  const firstInitial = splittedName[0].charAt(0).toUpperCase();

  if (splittedName.length > 1) {
    const lastInitial = splittedName.slice(-1)[0].charAt(0).toUpperCase();

    return `${firstInitial}${lastInitial}`;
  }
  const lastInitial = splittedName[0].charAt(1).toUpperCase();
  return `${firstInitial}${lastInitial}`;
}
