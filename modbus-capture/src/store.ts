import { createClient } from 'redis';
import { emitter } from './emitter';

const client = createClient();
const connect = async () => {
    client.on('error', (err) => console.error('Redis Client Error', err));
    client.connect();  
};

export const CONNECT_TO_REDIS = 'CONNECT_TO_REDIS';
emitter.on(CONNECT_TO_REDIS, connect);

export async function get(key: string): Promise<string> {
    if(client.isOpen) {
        return client.get(key);
    }
};

export function set(key: string, value: string):void {
    if(client.isOpen) {
        client.set(key, value);
    }
};

export function close() {
    client.quit();
}
