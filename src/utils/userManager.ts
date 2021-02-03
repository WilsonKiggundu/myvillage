import {createUserManager} from 'redux-oidc'
import {IDENTITY_CONFIG} from "./authSettings";

export default createUserManager(IDENTITY_CONFIG)