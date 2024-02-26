import { SignUpData } from "./auth.type";
declare const authService: {
    signUp: (signUpData: SignUpData) => Promise<string>;
    logIn: () => void;
};
export default authService;
//# sourceMappingURL=auth.service.d.ts.map