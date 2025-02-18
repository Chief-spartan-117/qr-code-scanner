import { json, type RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({ request }) => {
    const { name, email, phoneNumber } = await request.json();

    return json({ name, email, phoneNumber });
};