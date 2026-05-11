export declare const configuration: () => {
    server: {
        env: string;
        port: number;
        origin: any;
    };
    db: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
        logging: boolean;
        cache: boolean;
    };
    jwt: {
        expire_in: string;
        expire_in_remember_me: string;
        secret: string;
    };
    refresh_token: {
        expire_in: string;
        expire_in_remember_me: string;
        secret: string;
    };
    cookie_secret: {
        secret: string;
    };
    email: {
        host: string;
        user: string;
        pass: string;
        port: number;
        secure: boolean;
        support_email: string;
        academy_name: string;
        academy_website: string;
    };
    app: {
        forgot_password_email_valid_till: number;
        doc_url: string;
        frontend_base_url: string;
        admin_base_url: string;
        otp: {
            expire_time: number;
            enabled: boolean;
        };
    };
    stripe: {
        secret_key: string;
    };
    fcm: {
        server_key: string;
    };
    twilio: {
        twilio_account_sid: string;
        twilio_apikey: string;
        twilio_api_secret: string;
        twilio_phone_number: string;
    };
    sentry: {
        dsn: string;
        environment: string;
        traces_sample_rate: number;
        profiles_sample_rate: number;
        enabled: boolean;
    };
    tenant: {
        main_domain: string;
    };
};
