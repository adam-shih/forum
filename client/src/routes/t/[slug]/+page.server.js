import * as api from '$lib/api.js';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ cookies, params }) {
    const jwt = cookies.get('jwt');
    const thread = await api.get(`api/threads/${params.slug}`, jwt);
    const comments = await api.get(`api/threads/${params.slug}/comments`, jwt);

    return {
        thread,
        comments
    }
}

export const actions = {
    comment: async ({ cookies, request, params: { slug } }) => {
        const data = await request.formData();
        const jwt = cookies.get('jwt');
        const content = data.get('content');

        if (!jwt) {
            throw redirect(302, '/login');
        }

        if (content == '') {
            return fail(422);
        }

        const body = await api.post(`api/threads/${slug}/comments`, {
            content
        }, jwt);

        if (body.errors) {
            return fail(401, body);
        }
    },
    vote: async ({ cookies, params: { slug } }) => {
        const jwt = cookies.get('jwt');

        if (!jwt) {
            throw redirect(302, '/login');
        }

        const body = await api.post(`api/threads/${slug}/vote`, {}, jwt);

        if (body.errors) {
            return fail(401, body);
        }

        return body;
    },
    unvote: async ({ cookies, params: { slug } }) => {
        const jwt = cookies.get('jwt');

        if (!jwt) {
            throw redirect(302, '/login');
        }

        const body = await api.post(`api/threads/${slug}/unvote`, {}, jwt);

        if (body.errors) {
            return fail(401, body);
        }

        return body;
    },
}