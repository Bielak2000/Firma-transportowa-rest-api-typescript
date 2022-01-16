import argon2 from "argon2";

export const hashPassword = async (password: string) =>  {
    // https://github.com/ranisalt/node-argon2/wiki/Options
    return await argon2.hash(password, {
        type: argon2.argon2id,  // being resistant against GPU and tradeoff attacks
        memoryCost: 4096,       // The amount of memory to be used by the hash function, in KiB
        timeCost: 3,        // increases hash strength at the cost of time required to compute.
        hashLength: 32,
        parallelism: 1,     // The amount of threads to compute the hash on
    });
}

export const matchPassword = async (hash: string, plain: string) => {
    return argon2.verify(hash, plain);
}