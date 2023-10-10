import { Request, Response, NextFunction } from 'express';

export async function Auth(req: Request, res: Response, next: NextFunction) {
  if (req.path.startsWith('/api')) {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    let idp_url = process.env.KEYCLOAK_ISSUER + '/protocol/openid-connect/userinfo';
    const idp_response = await fetch(idp_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    console.log("idp_response status: ", idp_response.status);
    if (idp_response.status != 200) {
      return res.status(401).send('Unauthorized');
    }

  }

  next();
}
