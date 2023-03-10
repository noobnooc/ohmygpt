declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // Server-side environment variables should be named using uppercase
            // letters only, while camelCase naming convention should be used
            // for variables shared by both the client-side and server-side.
            appName: string;
            appLogo: string;
            appThemeColor: string;
            appSummary: string;
            exampleInput: string;

            OPENAI_API_KEY: string;
            OPENAI_API_BASE_URL: string;
            SYSTEM_MESSAGE: string;
            MESSAGE_TEMPLATE: string;
        }
    }
}

export {}