import { Resend } from 'resend';

console.log("THE KEYS ARE ",process.env.RESEND_API_KEYS)
export const resend = new Resend(process.env.RESEND_API_KEYS as string);