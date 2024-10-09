import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

const nonSerializable: string[] = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];
export default nonSerializable;
