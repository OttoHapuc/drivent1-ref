import { ApplicationError } from '@/protocols';

export function badRequestError(): ApplicationError {
  return {
    name: 'BadRequestError',
    message: 'Cannot process the request!',
  };
}
