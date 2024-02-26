import { NextFunction, Request, Response } from "express";
declare function authMiddleware(req: Request, _: Response, next: NextFunction): Promise<void>;
export default authMiddleware;
//# sourceMappingURL=auth.middleware.d.ts.map