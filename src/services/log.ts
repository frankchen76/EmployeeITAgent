// import Debug from 'debug'

// // Initialize debug logging module
// export const log = Debug("ticketapi");
// log.log = console.log.bind(console)

// export const info = Debug("ticketapi:info");
// info.log = console.log.bind(console)

// export const err = Debug("ticketapi:error");
// err.log = console.log.bind(console)

import { InvocationContext } from "@azure/functions";

let _context: InvocationContext;
export const setLogContext = (context: InvocationContext) => {
    _context = context;
}
export const info = (...args: any[]) => {
    if (_context) {
        _context.log(args);
    }
}