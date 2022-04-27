import type { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio';

type Data = {
    jwt: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
    const token = <string>process.env.TWILIO_AUTH_TOKEN;
    const secret = <string>process.env.TWILIO_SECRET;
    //const client = twilio(accountSid, token);
    const accessToken  = new twilio.jwt.AccessToken(accountSid, token, secret);
    accessToken.identity = req.body.identity;

    const grant = new twilio.jwt.AccessToken.VideoGrant({
        room: 'miduroom'
    });
    accessToken.addGrant(grant)


    res.status(200).json({ jwt: accessToken.toJwt() })
}
