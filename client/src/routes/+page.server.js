import * as api from '$lib/api.js';

export async function load() {
    return {
        idk: await api.get()
    }
}   