// from https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1

import express from 'express';
export abstract class CommonRoutesConfig {
    app: express.Application;
    name: string;

    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }
    getName() {
        return this.name;
    }

    abstract configureRoutes(): express.Application;
}