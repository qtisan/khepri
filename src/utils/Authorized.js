import RenderAuthorized from '../components/Authorized';
import { getAuthority } from './authority';

const authority = getAuthority();
const Authorized = RenderAuthorized(authority);
// console.log('Authorized Rendered.' + authority);
export default Authorized;
