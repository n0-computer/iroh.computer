/* tslint:disable */
/* eslint-disable */
/**
 * The `ReadableStreamType` enum.
 *
 * *This API requires the following crate features to be activated: `ReadableStreamType`*
 */

export type ReadableStreamType = "bytes";

export class IntoUnderlyingByteSource {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    cancel(): void;
    pull(controller: ReadableByteStreamController): Promise<any>;
    start(controller: ReadableByteStreamController): void;
    readonly autoAllocateChunkSize: number;
    readonly type: ReadableStreamType;
}

export class IntoUnderlyingSink {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    abort(reason: any): Promise<any>;
    close(): Promise<any>;
    write(chunk: any): Promise<any>;
}

export class IntoUnderlyingSource {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    cancel(): void;
    pull(controller: ReadableStreamDefaultController): Promise<any>;
}

/**
 * An iroh endpoint running in the browser.
 */
export class Node {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    endpoint_id(): string;
    secret_hex(): string;
    /**
     * Set the fan temperature threshold on the device (protected by `secret`).
     * Returns `"ok"`, `"unauthorized"`, or `"out-of-range"` so the caller can react
     * (e.g. snap a slider back on failure).
     */
    set_threshold(ticket: string, secret: string, threshold: number): Promise<string>;
    /**
     * Spawn the endpoint. Pass a hex secret key to keep a stable id across reloads,
     * or `null`/empty to generate a fresh one.
     */
    static spawn(secret?: string | null): Promise<Node>;
    /**
     * Connect to `ticket` and poll the device. `on_reading(temperature, humidity,
     * fan, threshold)` fires on each successful read; `on_status(text)` reports the
     * connection state and any errors. Returns a [`Subscription`]; drop it (JS
     * `.free()`) to stop the loop and close the connection — do that before
     * subscribing again.
     */
    subscribe(ticket: string, on_reading: Function, on_status: Function): Subscription;
}

/**
 * Handle to a running [`Node::subscribe`] poll loop. Dropping it (JS `.free()`)
 * signals the loop to stop and lets its connection close.
 */
export class Subscription {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
}

export function start(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_node_free: (a: number, b: number) => void;
    readonly __wbg_subscription_free: (a: number, b: number) => void;
    readonly node_endpoint_id: (a: number, b: number) => void;
    readonly node_secret_hex: (a: number, b: number) => void;
    readonly node_set_threshold: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
    readonly node_spawn: (a: number, b: number) => number;
    readonly node_subscribe: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly start: () => void;
    readonly __wbg_intounderlyingbytesource_free: (a: number, b: number) => void;
    readonly __wbg_intounderlyingsink_free: (a: number, b: number) => void;
    readonly __wbg_intounderlyingsource_free: (a: number, b: number) => void;
    readonly intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
    readonly intounderlyingbytesource_cancel: (a: number) => void;
    readonly intounderlyingbytesource_pull: (a: number, b: number) => number;
    readonly intounderlyingbytesource_start: (a: number, b: number) => void;
    readonly intounderlyingbytesource_type: (a: number) => number;
    readonly intounderlyingsink_abort: (a: number, b: number) => number;
    readonly intounderlyingsink_close: (a: number) => number;
    readonly intounderlyingsink_write: (a: number, b: number) => number;
    readonly intounderlyingsource_cancel: (a: number) => void;
    readonly intounderlyingsource_pull: (a: number, b: number) => number;
    readonly ring_core_0_17_14__bn_mul_mont: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly __wasm_bindgen_func_elem_14213: (a: number, b: number, c: number, d: number) => void;
    readonly __wasm_bindgen_func_elem_14216: (a: number, b: number, c: number, d: number) => void;
    readonly __wasm_bindgen_func_elem_5377: (a: number, b: number, c: number) => void;
    readonly __wasm_bindgen_func_elem_2053: (a: number, b: number, c: number) => void;
    readonly __wasm_bindgen_func_elem_7049: (a: number, b: number, c: number) => void;
    readonly __wasm_bindgen_func_elem_5159: (a: number, b: number) => void;
    readonly __wasm_bindgen_func_elem_6302: (a: number, b: number) => void;
    readonly __wasm_bindgen_func_elem_6346: (a: number, b: number) => void;
    readonly __wasm_bindgen_func_elem_8292: (a: number, b: number) => void;
    readonly __wbindgen_export: (a: number, b: number) => number;
    readonly __wbindgen_export2: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_export3: (a: number) => void;
    readonly __wbindgen_export4: (a: number, b: number, c: number) => void;
    readonly __wbindgen_export5: (a: number, b: number) => void;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
