/**
 * Minimal type declarations for the 'clarinet' SAX-style JSON parser.
 * Only the parts of the API used by this package are typed here.
 */
declare module 'clarinet' {
  interface CParser {
    onopenobject: (key: string) => void;
    onopenarray: () => void;
    onkey: (key: string) => void;
    onvalue: (value: string | number | boolean | null) => void;
    oncloseobject: () => void;
    onclosearray: () => void;
    onerror: (err: Error) => void;
    onend: (() => void) | null;
    write(chunk: string): CParser;
    close(): void;
  }

  export function parser(): CParser;
}

