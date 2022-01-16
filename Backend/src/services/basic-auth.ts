export const httpAuthDecrypt = (header: string): [string, string] => {
    const b64auth = header.split(' ')[1] || ''
    const [email, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    return [email, password];
}