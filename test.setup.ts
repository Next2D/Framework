// test/global-setup.ts
class MockOffscreenCanvas {
    width: number;
    height: number;

    constructor (width: number, height: number)
    {
        this.width  = width;
        this.height = height;
    }

    getContext () {
        // CanvasRenderingContext2D などをモック
        return {
            // 必要に応じてメソッドを追加
            "fillRect": (x: number, y: number, w: number, h: number) => {},
            "transferControlToOffscreen": () => {
                return {};
            }
        };
    }
}

if (typeof globalThis.OffscreenCanvas === "undefined") {
    (globalThis as any).OffscreenCanvas = MockOffscreenCanvas;
}

if (!HTMLCanvasElement.prototype.transferControlToOffscreen) {
    HTMLCanvasElement.prototype.transferControlToOffscreen = function () {
        return this;
    };
}