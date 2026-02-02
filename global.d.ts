export {};

declare global {
  interface Window {
    electronAPI?: {
      saveFile: (data: { filename: string; buffer: Uint8Array }) => Promise<{ success: boolean }>;
    };
  }
}

declare global {
  interface Window {
    Clerk?: {
      __internal_openCheckout?: (params: {
        planId: string;
        planPeriod?: "month" | "year";
        subscriberType?: "user" | "org";
      }) => Promise<void>;
    };
  }
}
