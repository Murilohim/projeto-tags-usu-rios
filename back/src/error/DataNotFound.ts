import { BaseError } from "./BaseError";

export class DataNotFound extends BaseError {

    constructor(
        message: string
    ) {
        super(message, 404)
    }
}