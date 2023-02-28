import * as crypto from 'crypto';

export default function hash(token: string) {
    return crypto.createHash('sha512').update(token).digest('hex');
}
