export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  withAckAndError: (f: string, callback: (g: number) => void) => void;
  message: (msg: string) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  message: (msg: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}