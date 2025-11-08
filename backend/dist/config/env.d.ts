export declare const ENV: {
    nodeEnv: "development" | "test" | "production";
    port: number;
    databaseUrl: string;
    plaid: {
        clientId: string | undefined;
        secret: string | undefined;
        environment: "development" | "production" | "sandbox";
    };
    openAI: {
        apiKey: string | undefined;
    };
    firebase: {
        projectId: string | undefined;
        clientEmail: string | undefined;
        privateKey: string | undefined;
    };
    email: {
        host: string | undefined;
        port: number | undefined;
        user: string | undefined;
        pass: string | undefined;
        from: string | undefined;
    };
    app: {
        baseUrl: string | undefined;
    };
};
export type AppEnv = typeof ENV;
//# sourceMappingURL=env.d.ts.map