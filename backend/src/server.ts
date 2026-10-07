import express, {Request, Response, NextFunction} from 'express';
import {router} from './routes';
import cors from 'cors';

const app = express();
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Use the defined routes
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});