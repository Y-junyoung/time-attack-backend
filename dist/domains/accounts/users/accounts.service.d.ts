declare const authService: {
    signUp: (signUpData: SignUpData) => Promise<{
        email: string;
        profile: {
            userId: string;
            nickname: string;
            description: string;
        }[];
    }>;
    logIn: (logInData: LogInData) => Promise<string>;
};
export default authService;
//# sourceMappingURL=accounts.service.d.ts.map