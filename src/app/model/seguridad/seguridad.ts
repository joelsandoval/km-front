export class Credenciales {
    userName: string;
    nombre: string;
    roles: string[];
    constructor(
        userName: string,
        nombre: string,
        roles: string[]
    ) {
        this.userName = userName;
        this.nombre = nombre;
        this.roles = roles;
    }
}

export class UserRepresentation {
    self!: string;
    id!: string;
    origin!: string;
    createdTimestamp!: number;
    username: string;
    enabled!: boolean;
    totp!: boolean;
    emailVerified!: boolean;
    firstName: string;
    lastName: string;
    email: string;
    federationLink!: string;
    serviceAccountClientId!: string;
    attributes!: Attributes;
    credentials: CredentialRepresentation[];
    disableableCredentialTypes!: string;
    requiredActions!: string[];
    federatedIdentities!: FederatedIdentityRepresentation[];
    realmRoles: string[];
    clientRoles!: Attributes[];
    clientConsents!: UserConsentRepresentation[];
    notBefore!: number;
    groups!: string[];
    access!: Access;
    constructor(username: string, firstName: string, lastName: string, email: string, credentials: CredentialRepresentation[],
        realmRoles: string[]) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.credentials = credentials;
        this.realmRoles = realmRoles;
    }
}

export class Attributes {
    key!: string;
    value!: string[];
}

export class CredentialRepresentation {

    id!: string;
    type!: string;
    userLabel!: string;
    createdDate!: number;
    secretData!: string;
    credentialData!: string;
    priority!: number;
    value!: string;
    temporary!: boolean;

}

export class FederatedIdentityRepresentation {

    identityProvider!: string;
    userId!: string;
    userName!: string;

}

export class UserConsentRepresentation {

    clientId!: string;
    grantedClientScopes!: string[];
    createdDate!: number;
    lastUpdatedDate!: number;

}

export class Access {
    key!: string;
    value!: boolean;
}
