import express, { Application, NextFunction, Request, Response } from "express";
import { IndexRouter } from "./router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import cookieParser from "cookie-parser";

const app: Application = express();


// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser())
// Middleware to parse JSON bodies
app.use(express.json());
app.all('/api/auth/*split', toNodeHandler(auth));

app.use("/api/v1", IndexRouter)

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript + Express!');
});


app.use(globalErrorHandler)

app.use(notFound)

export default app;