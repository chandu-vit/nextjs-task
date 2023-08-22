// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    if (req.method === 'POST') {
        const {userData: {username, password}} = req.body;
        if(username === 'username' && password === 'password'){
            res.status(200).json({ result: req.body })
        }else {
            res.status(500).send({message: 'Authentication failed!'})
        }
    } else {
        res.status(200).json({ name: 'John Doe' })
    }
  }
  