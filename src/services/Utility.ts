import { createHash } from 'crypto';

export const getHashCode = (str: string): string => {
    const ret = createHash('sha256').update(str).digest('hex');
    return ret;

}