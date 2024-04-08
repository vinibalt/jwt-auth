import express from 'express'
import { Request, Response, Router } from 'express';

const app = express();
const route = Router();

app.use(express.json());
app.use(route);

route.get('/', (req: Request, res: Response) => {
    res.json(
        {
            message: 'Welcome to jwt_auth app!'
        }
    );
});



app.listen(3333, () => {
    console.log('Server listening on port 3333')
})