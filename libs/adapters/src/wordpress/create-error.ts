type ErrorCode =
    | 'NETWORK_ERROR'
    | 'HTTP_ERROR'
    | 'AUTH_ERROR'
    | 'VALIDATION_ERROR'
    | 'SERVER_ERROR'
    | 'PARSE_ERROR'
    | 'UNKNOWN_ERROR';

type Error = {
    code: ErrorCode;
    message: string;
    httpStatus?: number;
    details?: unknown;
    retryable: boolean;
}

export const createError = (
    status: number,
    message: string,
    options: Partial<Omit<Error, 'code' | 'message'>> = {}
): Error => {
    const retryableCodes: ErrorCode[] = [ 'NETWORK_ERROR', 'HTTP_ERROR', 'SERVER_ERROR' ];
    const code = errorCodeFromStatus( status );

    return {
        code,
        message,
        retryable: options.retryable ?? retryableCodes.includes( code ),
        ...options,
    };
}

const errorCodeFromStatus = ( status: number ): ErrorCode => {
    if ( status === 401 || status === 403 ) {
        return 'AUTH_ERROR';
    }

    if ( status === 400 || status === 422 ) {
        return 'VALIDATION_ERROR';
    }

    if ( status >= 500 ) {
        return 'SERVER_ERROR'
    }

    return 'HTTP_ERROR';
}
