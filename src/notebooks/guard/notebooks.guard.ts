import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class NotebooksGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers.authorization);
    return true;
  }
}
