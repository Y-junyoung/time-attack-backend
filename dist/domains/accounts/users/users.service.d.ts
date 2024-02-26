import { LogInData, SignUpData } from "./users.type";
declare const usersService: {
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
export default usersService;
//# sourceMappingURL=users.service.d.ts.map