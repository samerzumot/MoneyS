export declare const createLinkToken: (userId: string) => Promise<import("plaid").LinkTokenCreateResponse>;
export declare const exchangePublicToken: (userId: string, publicToken: string) => Promise<{
    success: boolean;
}>;
export declare const syncAllPlaidLiabilities: (userId: string) => Promise<{
    success: boolean;
}>;
//# sourceMappingURL=plaidService.d.ts.map