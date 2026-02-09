import "server-only";//additional layer of security to ensure this file is only used in server-side code

import { PinataSDK } from "pinata";

export const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_SECRET_JWT || "",
    pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL || "",
});