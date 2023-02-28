import type { RequestHandler } from 'express';

export type AsyncRequestHandler<T = unknown, P = Record<string, unknown>> = RequestHandler<
    P,
    unknown,
    T
>;
