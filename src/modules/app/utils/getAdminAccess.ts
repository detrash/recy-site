import { MeQuery } from '../graphql/generated/graphql';
import { PERMISSION_SCOPES, Role } from './constants';

export function getAdminAccess(data: MeQuery) {
  const permissions = data?.me?.permissions;
  if (permissions?.length) {
    return PERMISSION_SCOPES[Role.Admin].every((roleProp) =>
      permissions.some((permission) => permission.type === roleProp)
    );
  }

  return false;
}
