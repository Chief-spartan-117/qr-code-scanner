import { json, type RequestHandler } from "@sveltejs/kit";
import Cryptr from "cryptr";
import qrcode from "qrcode";
import { SECRET_KEY } from "$env/static/private";
import prisma from "$lib/prisma";

export const POST: RequestHandler = async ({ request }) => {

    try {
        const { name, email, phoneNumber } = await request.json();

        if (!name || !email || !phoneNumber) {
            return json({ "message": "Fields missing" });
        }

        const crypter = new Cryptr(SECRET_KEY);

        const encData = crypter.encrypt(`${SECRET_KEY}|sp|${email}`);

        const qrCodeData = await qrcode.toDataURL(encData);

        await prisma.qr.create({
            data: {
                email,
                name,
                phoneNumber,
            },
        });

        return json(qrCodeData);
    }
    catch (err) {
        return json(err);
    }
};