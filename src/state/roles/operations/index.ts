import fetchRoles from './fetchRoles';
import fetchPermissions from './fetchPermissions';
import fetchRolesById from './fetchRolesById';
import createRole from './createRole';
import updateRole from './updateRole';
import deleteRole from './deleteRole';

const rolesOperations = [
    fetchRoles,
    fetchPermissions,
    fetchRolesById,
    createRole,
    updateRole,
    deleteRole,
];

export default rolesOperations;