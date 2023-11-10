// Roles enum
const ROLES = {
	SUPER_ADMIN: 'super_admin',
	ADMIN: 'admin',
	MODERATOR: 'moderator',
	CUSTOMER: 'customer',
};

const PERMISSIONS = {
	CREATE: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
	DELETE: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MODERATOR],
	EDIT: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MODERATOR],
	VIEW: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MODERATOR, ROLES.CUSTOMER],
	CREATE_USER_ACCOUNT: [ROLES.CUSTOMER],
};

module.exports = { ROLES, PERMISSIONS };
