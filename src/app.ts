import express, { Application, Request, Response } from "express";
import { IndexRouter } from "./router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";

 const app: Application = express();


// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.all('/api/auth/*split', toNodeHandler(auth));

app.use("/api/v1", IndexRouter)

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript + Express!');
});


export default app;