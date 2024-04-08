import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import * as express  from 'express'
import { Request, Response, Router } from 'express';
import {userRouter} from "./routes/user.routes";

const app = express();
const route = Router();


app.use(express.json());
app.use(route);

app.use('/user', userRouter);

route.get('/', (req: Request, res: Response) => {
    res.json(
        {
            message: 'Welcome to jwt_auth app!'
        }
    );
});


AppDataSource.initialize().then(async () => {

    app.listen(3333, () => {
        console.log('Server listening on port 3333')
    })

    const users = await AppDataSource.manager.find(User);

    console.log(users);

}).catch(error => console.log(error))
