import { EventEmitter } from 'events';

class InternalEmitter extends EventEmitter {};
const internalEmitter: InternalEmitter = new InternalEmitter();

export { internalEmitter as emitter }
