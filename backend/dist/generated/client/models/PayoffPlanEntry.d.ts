import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model PayoffPlanEntry
 *
 */
export type PayoffPlanEntryModel = runtime.Types.Result.DefaultSelection<Prisma.$PayoffPlanEntryPayload>;
export type AggregatePayoffPlanEntry = {
    _count: PayoffPlanEntryCountAggregateOutputType | null;
    _avg: PayoffPlanEntryAvgAggregateOutputType | null;
    _sum: PayoffPlanEntrySumAggregateOutputType | null;
    _min: PayoffPlanEntryMinAggregateOutputType | null;
    _max: PayoffPlanEntryMaxAggregateOutputType | null;
};
export type PayoffPlanEntryAvgAggregateOutputType = {
    month: number | null;
    year: number | null;
    payment: runtime.Decimal | null;
    interestPortion: runtime.Decimal | null;
    principalPortion: runtime.Decimal | null;
    remainingBalance: runtime.Decimal | null;
};
export type PayoffPlanEntrySumAggregateOutputType = {
    month: number | null;
    year: number | null;
    payment: runtime.Decimal | null;
    interestPortion: runtime.Decimal | null;
    principalPortion: runtime.Decimal | null;
    remainingBalance: runtime.Decimal | null;
};
export type PayoffPlanEntryMinAggregateOutputType = {
    id: string | null;
    planId: string | null;
    debtId: string | null;
    month: number | null;
    year: number | null;
    payment: runtime.Decimal | null;
    interestPortion: runtime.Decimal | null;
    principalPortion: runtime.Decimal | null;
    remainingBalance: runtime.Decimal | null;
    createdAt: Date | null;
};
export type PayoffPlanEntryMaxAggregateOutputType = {
    id: string | null;
    planId: string | null;
    debtId: string | null;
    month: number | null;
    year: number | null;
    payment: runtime.Decimal | null;
    interestPortion: runtime.Decimal | null;
    principalPortion: runtime.Decimal | null;
    remainingBalance: runtime.Decimal | null;
    createdAt: Date | null;
};
export type PayoffPlanEntryCountAggregateOutputType = {
    id: number;
    planId: number;
    debtId: number;
    month: number;
    year: number;
    payment: number;
    interestPortion: number;
    principalPortion: number;
    remainingBalance: number;
    createdAt: number;
    _all: number;
};
export type PayoffPlanEntryAvgAggregateInputType = {
    month?: true;
    year?: true;
    payment?: true;
    interestPortion?: true;
    principalPortion?: true;
    remainingBalance?: true;
};
export type PayoffPlanEntrySumAggregateInputType = {
    month?: true;
    year?: true;
    payment?: true;
    interestPortion?: true;
    principalPortion?: true;
    remainingBalance?: true;
};
export type PayoffPlanEntryMinAggregateInputType = {
    id?: true;
    planId?: true;
    debtId?: true;
    month?: true;
    year?: true;
    payment?: true;
    interestPortion?: true;
    principalPortion?: true;
    remainingBalance?: true;
    createdAt?: true;
};
export type PayoffPlanEntryMaxAggregateInputType = {
    id?: true;
    planId?: true;
    debtId?: true;
    month?: true;
    year?: true;
    payment?: true;
    interestPortion?: true;
    principalPortion?: true;
    remainingBalance?: true;
    createdAt?: true;
};
export type PayoffPlanEntryCountAggregateInputType = {
    id?: true;
    planId?: true;
    debtId?: true;
    month?: true;
    year?: true;
    payment?: true;
    interestPortion?: true;
    principalPortion?: true;
    remainingBalance?: true;
    createdAt?: true;
    _all?: true;
};
export type PayoffPlanEntryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PayoffPlanEntry to aggregate.
     */
    where?: Prisma.PayoffPlanEntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PayoffPlanEntries to fetch.
     */
    orderBy?: Prisma.PayoffPlanEntryOrderByWithRelationInput | Prisma.PayoffPlanEntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PayoffPlanEntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PayoffPlanEntries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PayoffPlanEntries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PayoffPlanEntries
    **/
    _count?: true | PayoffPlanEntryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PayoffPlanEntryAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PayoffPlanEntrySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PayoffPlanEntryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PayoffPlanEntryMaxAggregateInputType;
};
export type GetPayoffPlanEntryAggregateType<T extends PayoffPlanEntryAggregateArgs> = {
    [P in keyof T & keyof AggregatePayoffPlanEntry]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePayoffPlanEntry[P]> : Prisma.GetScalarType<T[P], AggregatePayoffPlanEntry[P]>;
};
export type PayoffPlanEntryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PayoffPlanEntryWhereInput;
    orderBy?: Prisma.PayoffPlanEntryOrderByWithAggregationInput | Prisma.PayoffPlanEntryOrderByWithAggregationInput[];
    by: Prisma.PayoffPlanEntryScalarFieldEnum[] | Prisma.PayoffPlanEntryScalarFieldEnum;
    having?: Prisma.PayoffPlanEntryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PayoffPlanEntryCountAggregateInputType | true;
    _avg?: PayoffPlanEntryAvgAggregateInputType;
    _sum?: PayoffPlanEntrySumAggregateInputType;
    _min?: PayoffPlanEntryMinAggregateInputType;
    _max?: PayoffPlanEntryMaxAggregateInputType;
};
export type PayoffPlanEntryGroupByOutputType = {
    id: string;
    planId: string;
    debtId: string;
    month: number;
    year: number;
    payment: runtime.Decimal;
    interestPortion: runtime.Decimal;
    principalPortion: runtime.Decimal;
    remainingBalance: runtime.Decimal;
    createdAt: Date;
    _count: PayoffPlanEntryCountAggregateOutputType | null;
    _avg: PayoffPlanEntryAvgAggregateOutputType | null;
    _sum: PayoffPlanEntrySumAggregateOutputType | null;
    _min: PayoffPlanEntryMinAggregateOutputType | null;
    _max: PayoffPlanEntryMaxAggregateOutputType | null;
};
type GetPayoffPlanEntryGroupByPayload<T extends PayoffPlanEntryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PayoffPlanEntryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PayoffPlanEntryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PayoffPlanEntryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PayoffPlanEntryGroupByOutputType[P]>;
}>>;
export type PayoffPlanEntryWhereInput = {
    AND?: Prisma.PayoffPlanEntryWhereInput | Prisma.PayoffPlanEntryWhereInput[];
    OR?: Prisma.PayoffPlanEntryWhereInput[];
    NOT?: Prisma.PayoffPlanEntryWhereInput | Prisma.PayoffPlanEntryWhereInput[];
    id?: Prisma.StringFilter<"PayoffPlanEntry"> | string;
    planId?: Prisma.StringFilter<"PayoffPlanEntry"> | string;
    debtId?: Prisma.StringFilter<"PayoffPlanEntry"> | string;
    month?: Prisma.IntFilter<"PayoffPlanEntry"> | number;
    year?: Prisma.IntFilter<"PayoffPlanEntry"> | number;
    payment?: Prisma.DecimalFilter<"PayoffPlanEntry"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion?: Prisma.DecimalFilter<"PayoffPlanEntry"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion?: Prisma.DecimalFilter<"PayoffPlanEntry"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance?: Prisma.DecimalFilter<"PayoffPlanEntry"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"PayoffPlanEntry"> | Date | string;
    plan?: Prisma.XOR<Prisma.PayoffPlanScalarRelationFilter, Prisma.PayoffPlanWhereInput>;
    debt?: Prisma.XOR<Prisma.DebtAccountScalarRelationFilter, Prisma.DebtAccountWhereInput>;
};
export type PayoffPlanEntryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    payment?: Prisma.SortOrder;
    interestPortion?: Prisma.SortOrder;
    principalPortion?: Prisma.SortOrder;
    remainingBalance?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    plan?: Prisma.PayoffPlanOrderByWithRelationInput;
    debt?: Prisma.DebtAccountOrderByWithRelationInput;
};
export type PayoffPlanEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PayoffPlanEntryWhereInput | Prisma.PayoffPlanEntryWhereInput[];
    OR?: Prisma.PayoffPlanEntryWhereInput[];
    NOT?: Prisma.PayoffPlanEntryWhereInput | Prisma.PayoffPlanEntryWhereInput[];
    planId?: Prisma.StringFilter<"PayoffPlanEntry"> | string;
    debtId?: Prisma.StringFilter<"PayoffPlanEntry"> | string;
    month?: Prisma.IntFilter<"PayoffPlanEntry"> | number;
    year?: Prisma.IntFilter<"PayoffPlanEntry"> | number;
    payment?: Prisma.DecimalFilter<"PayoffPlanEntry"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion?: Prisma.DecimalFilter<"PayoffPlanEntry"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion?: Prisma.DecimalFilter<"PayoffPlanEntry"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance?: Prisma.DecimalFilter<"PayoffPlanEntry"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"PayoffPlanEntry"> | Date | string;
    plan?: Prisma.XOR<Prisma.PayoffPlanScalarRelationFilter, Prisma.PayoffPlanWhereInput>;
    debt?: Prisma.XOR<Prisma.DebtAccountScalarRelationFilter, Prisma.DebtAccountWhereInput>;
}, "id">;
export type PayoffPlanEntryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    payment?: Prisma.SortOrder;
    interestPortion?: Prisma.SortOrder;
    principalPortion?: Prisma.SortOrder;
    remainingBalance?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PayoffPlanEntryCountOrderByAggregateInput;
    _avg?: Prisma.PayoffPlanEntryAvgOrderByAggregateInput;
    _max?: Prisma.PayoffPlanEntryMaxOrderByAggregateInput;
    _min?: Prisma.PayoffPlanEntryMinOrderByAggregateInput;
    _sum?: Prisma.PayoffPlanEntrySumOrderByAggregateInput;
};
export type PayoffPlanEntryScalarWhereWithAggregatesInput = {
    AND?: Prisma.PayoffPlanEntryScalarWhereWithAggregatesInput | Prisma.PayoffPlanEntryScalarWhereWithAggregatesInput[];
    OR?: Prisma.PayoffPlanEntryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PayoffPlanEntryScalarWhereWithAggregatesInput | Prisma.PayoffPlanEntryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PayoffPlanEntry"> | string;
    planId?: Prisma.StringWithAggregatesFilter<"PayoffPlanEntry"> | string;
    debtId?: Prisma.StringWithAggregatesFilter<"PayoffPlanEntry"> | string;
    month?: Prisma.IntWithAggregatesFilter<"PayoffPlanEntry"> | number;
    year?: Prisma.IntWithAggregatesFilter<"PayoffPlanEntry"> | number;
    payment?: Prisma.DecimalWithAggregatesFilter<"PayoffPlanEntry"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion?: Prisma.DecimalWithAggregatesFilter<"PayoffPlanEntry"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion?: Prisma.DecimalWithAggregatesFilter<"PayoffPlanEntry"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance?: Prisma.DecimalWithAggregatesFilter<"PayoffPlanEntry"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PayoffPlanEntry"> | Date | string;
};
export type PayoffPlanEntryCreateInput = {
    id?: string;
    month: number;
    year: number;
    payment: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    plan: Prisma.PayoffPlanCreateNestedOneWithoutEntriesInput;
    debt: Prisma.DebtAccountCreateNestedOneWithoutPlanEntriesInput;
};
export type PayoffPlanEntryUncheckedCreateInput = {
    id?: string;
    planId: string;
    debtId: string;
    month: number;
    year: number;
    payment: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type PayoffPlanEntryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    payment?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plan?: Prisma.PayoffPlanUpdateOneRequiredWithoutEntriesNestedInput;
    debt?: Prisma.DebtAccountUpdateOneRequiredWithoutPlanEntriesNestedInput;
};
export type PayoffPlanEntryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    planId?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    payment?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PayoffPlanEntryCreateManyInput = {
    id?: string;
    planId: string;
    debtId: string;
    month: number;
    year: number;
    payment: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type PayoffPlanEntryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    payment?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PayoffPlanEntryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    planId?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    payment?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PayoffPlanEntryListRelationFilter = {
    every?: Prisma.PayoffPlanEntryWhereInput;
    some?: Prisma.PayoffPlanEntryWhereInput;
    none?: Prisma.PayoffPlanEntryWhereInput;
};
export type PayoffPlanEntryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PayoffPlanEntryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    payment?: Prisma.SortOrder;
    interestPortion?: Prisma.SortOrder;
    principalPortion?: Prisma.SortOrder;
    remainingBalance?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PayoffPlanEntryAvgOrderByAggregateInput = {
    month?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    payment?: Prisma.SortOrder;
    interestPortion?: Prisma.SortOrder;
    principalPortion?: Prisma.SortOrder;
    remainingBalance?: Prisma.SortOrder;
};
export type PayoffPlanEntryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    payment?: Prisma.SortOrder;
    interestPortion?: Prisma.SortOrder;
    principalPortion?: Prisma.SortOrder;
    remainingBalance?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PayoffPlanEntryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    payment?: Prisma.SortOrder;
    interestPortion?: Prisma.SortOrder;
    principalPortion?: Prisma.SortOrder;
    remainingBalance?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PayoffPlanEntrySumOrderByAggregateInput = {
    month?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    payment?: Prisma.SortOrder;
    interestPortion?: Prisma.SortOrder;
    principalPortion?: Prisma.SortOrder;
    remainingBalance?: Prisma.SortOrder;
};
export type PayoffPlanEntryCreateNestedManyWithoutDebtInput = {
    create?: Prisma.XOR<Prisma.PayoffPlanEntryCreateWithoutDebtInput, Prisma.PayoffPlanEntryUncheckedCreateWithoutDebtInput> | Prisma.PayoffPlanEntryCreateWithoutDebtInput[] | Prisma.PayoffPlanEntryUncheckedCreateWithoutDebtInput[];
    connectOrCreate?: Prisma.PayoffPlanEntryCreateOrConnectWithoutDebtInput | Prisma.PayoffPlanEntryCreateOrConnectWithoutDebtInput[];
    createMany?: Prisma.PayoffPlanEntryCreateManyDebtInputEnvelope;
    connect?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
};
export type PayoffPlanEntryUncheckedCreateNestedManyWithoutDebtInput = {
    create?: Prisma.XOR<Prisma.PayoffPlanEntryCreateWithoutDebtInput, Prisma.PayoffPlanEntryUncheckedCreateWithoutDebtInput> | Prisma.PayoffPlanEntryCreateWithoutDebtInput[] | Prisma.PayoffPlanEntryUncheckedCreateWithoutDebtInput[];
    connectOrCreate?: Prisma.PayoffPlanEntryCreateOrConnectWithoutDebtInput | Prisma.PayoffPlanEntryCreateOrConnectWithoutDebtInput[];
    createMany?: Prisma.PayoffPlanEntryCreateManyDebtInputEnvelope;
    connect?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
};
export type PayoffPlanEntryUpdateManyWithoutDebtNestedInput = {
    create?: Prisma.XOR<Prisma.PayoffPlanEntryCreateWithoutDebtInput, Prisma.PayoffPlanEntryUncheckedCreateWithoutDebtInput> | Prisma.PayoffPlanEntryCreateWithoutDebtInput[] | Prisma.PayoffPlanEntryUncheckedCreateWithoutDebtInput[];
    connectOrCreate?: Prisma.PayoffPlanEntryCreateOrConnectWithoutDebtInput | Prisma.PayoffPlanEntryCreateOrConnectWithoutDebtInput[];
    upsert?: Prisma.PayoffPlanEntryUpsertWithWhereUniqueWithoutDebtInput | Prisma.PayoffPlanEntryUpsertWithWhereUniqueWithoutDebtInput[];
    createMany?: Prisma.PayoffPlanEntryCreateManyDebtInputEnvelope;
    set?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
    disconnect?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
    delete?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
    connect?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
    update?: Prisma.PayoffPlanEntryUpdateWithWhereUniqueWithoutDebtInput | Prisma.PayoffPlanEntryUpdateWithWhereUniqueWithoutDebtInput[];
    updateMany?: Prisma.PayoffPlanEntryUpdateManyWithWhereWithoutDebtInput | Prisma.PayoffPlanEntryUpdateManyWithWhereWithoutDebtInput[];
    deleteMany?: Prisma.PayoffPlanEntryScalarWhereInput | Prisma.PayoffPlanEntryScalarWhereInput[];
};
export type PayoffPlanEntryUncheckedUpdateManyWithoutDebtNestedInput = {
    create?: Prisma.XOR<Prisma.PayoffPlanEntryCreateWithoutDebtInput, Prisma.PayoffPlanEntryUncheckedCreateWithoutDebtInput> | Prisma.PayoffPlanEntryCreateWithoutDebtInput[] | Prisma.PayoffPlanEntryUncheckedCreateWithoutDebtInput[];
    connectOrCreate?: Prisma.PayoffPlanEntryCreateOrConnectWithoutDebtInput | Prisma.PayoffPlanEntryCreateOrConnectWithoutDebtInput[];
    upsert?: Prisma.PayoffPlanEntryUpsertWithWhereUniqueWithoutDebtInput | Prisma.PayoffPlanEntryUpsertWithWhereUniqueWithoutDebtInput[];
    createMany?: Prisma.PayoffPlanEntryCreateManyDebtInputEnvelope;
    set?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
    disconnect?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
    delete?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
    connect?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
    update?: Prisma.PayoffPlanEntryUpdateWithWhereUniqueWithoutDebtInput | Prisma.PayoffPlanEntryUpdateWithWhereUniqueWithoutDebtInput[];
    updateMany?: Prisma.PayoffPlanEntryUpdateManyWithWhereWithoutDebtInput | Prisma.PayoffPlanEntryUpdateManyWithWhereWithoutDebtInput[];
    deleteMany?: Prisma.PayoffPlanEntryScalarWhereInput | Prisma.PayoffPlanEntryScalarWhereInput[];
};
export type PayoffPlanEntryCreateNestedManyWithoutPlanInput = {
    create?: Prisma.XOR<Prisma.PayoffPlanEntryCreateWithoutPlanInput, Prisma.PayoffPlanEntryUncheckedCreateWithoutPlanInput> | Prisma.PayoffPlanEntryCreateWithoutPlanInput[] | Prisma.PayoffPlanEntryUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.PayoffPlanEntryCreateOrConnectWithoutPlanInput | Prisma.PayoffPlanEntryCreateOrConnectWithoutPlanInput[];
    createMany?: Prisma.PayoffPlanEntryCreateManyPlanInputEnvelope;
    connect?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
};
export type PayoffPlanEntryUncheckedCreateNestedManyWithoutPlanInput = {
    create?: Prisma.XOR<Prisma.PayoffPlanEntryCreateWithoutPlanInput, Prisma.PayoffPlanEntryUncheckedCreateWithoutPlanInput> | Prisma.PayoffPlanEntryCreateWithoutPlanInput[] | Prisma.PayoffPlanEntryUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.PayoffPlanEntryCreateOrConnectWithoutPlanInput | Prisma.PayoffPlanEntryCreateOrConnectWithoutPlanInput[];
    createMany?: Prisma.PayoffPlanEntryCreateManyPlanInputEnvelope;
    connect?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
};
export type PayoffPlanEntryUpdateManyWithoutPlanNestedInput = {
    create?: Prisma.XOR<Prisma.PayoffPlanEntryCreateWithoutPlanInput, Prisma.PayoffPlanEntryUncheckedCreateWithoutPlanInput> | Prisma.PayoffPlanEntryCreateWithoutPlanInput[] | Prisma.PayoffPlanEntryUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.PayoffPlanEntryCreateOrConnectWithoutPlanInput | Prisma.PayoffPlanEntryCreateOrConnectWithoutPlanInput[];
    upsert?: Prisma.PayoffPlanEntryUpsertWithWhereUniqueWithoutPlanInput | Prisma.PayoffPlanEntryUpsertWithWhereUniqueWithoutPlanInput[];
    createMany?: Prisma.PayoffPlanEntryCreateManyPlanInputEnvelope;
    set?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
    disconnect?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
    delete?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
    connect?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
    update?: Prisma.PayoffPlanEntryUpdateWithWhereUniqueWithoutPlanInput | Prisma.PayoffPlanEntryUpdateWithWhereUniqueWithoutPlanInput[];
    updateMany?: Prisma.PayoffPlanEntryUpdateManyWithWhereWithoutPlanInput | Prisma.PayoffPlanEntryUpdateManyWithWhereWithoutPlanInput[];
    deleteMany?: Prisma.PayoffPlanEntryScalarWhereInput | Prisma.PayoffPlanEntryScalarWhereInput[];
};
export type PayoffPlanEntryUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: Prisma.XOR<Prisma.PayoffPlanEntryCreateWithoutPlanInput, Prisma.PayoffPlanEntryUncheckedCreateWithoutPlanInput> | Prisma.PayoffPlanEntryCreateWithoutPlanInput[] | Prisma.PayoffPlanEntryUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.PayoffPlanEntryCreateOrConnectWithoutPlanInput | Prisma.PayoffPlanEntryCreateOrConnectWithoutPlanInput[];
    upsert?: Prisma.PayoffPlanEntryUpsertWithWhereUniqueWithoutPlanInput | Prisma.PayoffPlanEntryUpsertWithWhereUniqueWithoutPlanInput[];
    createMany?: Prisma.PayoffPlanEntryCreateManyPlanInputEnvelope;
    set?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
    disconnect?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
    delete?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
    connect?: Prisma.PayoffPlanEntryWhereUniqueInput | Prisma.PayoffPlanEntryWhereUniqueInput[];
    update?: Prisma.PayoffPlanEntryUpdateWithWhereUniqueWithoutPlanInput | Prisma.PayoffPlanEntryUpdateWithWhereUniqueWithoutPlanInput[];
    updateMany?: Prisma.PayoffPlanEntryUpdateManyWithWhereWithoutPlanInput | Prisma.PayoffPlanEntryUpdateManyWithWhereWithoutPlanInput[];
    deleteMany?: Prisma.PayoffPlanEntryScalarWhereInput | Prisma.PayoffPlanEntryScalarWhereInput[];
};
export type PayoffPlanEntryCreateWithoutDebtInput = {
    id?: string;
    month: number;
    year: number;
    payment: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    plan: Prisma.PayoffPlanCreateNestedOneWithoutEntriesInput;
};
export type PayoffPlanEntryUncheckedCreateWithoutDebtInput = {
    id?: string;
    planId: string;
    month: number;
    year: number;
    payment: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type PayoffPlanEntryCreateOrConnectWithoutDebtInput = {
    where: Prisma.PayoffPlanEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.PayoffPlanEntryCreateWithoutDebtInput, Prisma.PayoffPlanEntryUncheckedCreateWithoutDebtInput>;
};
export type PayoffPlanEntryCreateManyDebtInputEnvelope = {
    data: Prisma.PayoffPlanEntryCreateManyDebtInput | Prisma.PayoffPlanEntryCreateManyDebtInput[];
    skipDuplicates?: boolean;
};
export type PayoffPlanEntryUpsertWithWhereUniqueWithoutDebtInput = {
    where: Prisma.PayoffPlanEntryWhereUniqueInput;
    update: Prisma.XOR<Prisma.PayoffPlanEntryUpdateWithoutDebtInput, Prisma.PayoffPlanEntryUncheckedUpdateWithoutDebtInput>;
    create: Prisma.XOR<Prisma.PayoffPlanEntryCreateWithoutDebtInput, Prisma.PayoffPlanEntryUncheckedCreateWithoutDebtInput>;
};
export type PayoffPlanEntryUpdateWithWhereUniqueWithoutDebtInput = {
    where: Prisma.PayoffPlanEntryWhereUniqueInput;
    data: Prisma.XOR<Prisma.PayoffPlanEntryUpdateWithoutDebtInput, Prisma.PayoffPlanEntryUncheckedUpdateWithoutDebtInput>;
};
export type PayoffPlanEntryUpdateManyWithWhereWithoutDebtInput = {
    where: Prisma.PayoffPlanEntryScalarWhereInput;
    data: Prisma.XOR<Prisma.PayoffPlanEntryUpdateManyMutationInput, Prisma.PayoffPlanEntryUncheckedUpdateManyWithoutDebtInput>;
};
export type PayoffPlanEntryScalarWhereInput = {
    AND?: Prisma.PayoffPlanEntryScalarWhereInput | Prisma.PayoffPlanEntryScalarWhereInput[];
    OR?: Prisma.PayoffPlanEntryScalarWhereInput[];
    NOT?: Prisma.PayoffPlanEntryScalarWhereInput | Prisma.PayoffPlanEntryScalarWhereInput[];
    id?: Prisma.StringFilter<"PayoffPlanEntry"> | string;
    planId?: Prisma.StringFilter<"PayoffPlanEntry"> | string;
    debtId?: Prisma.StringFilter<"PayoffPlanEntry"> | string;
    month?: Prisma.IntFilter<"PayoffPlanEntry"> | number;
    year?: Prisma.IntFilter<"PayoffPlanEntry"> | number;
    payment?: Prisma.DecimalFilter<"PayoffPlanEntry"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion?: Prisma.DecimalFilter<"PayoffPlanEntry"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion?: Prisma.DecimalFilter<"PayoffPlanEntry"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance?: Prisma.DecimalFilter<"PayoffPlanEntry"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"PayoffPlanEntry"> | Date | string;
};
export type PayoffPlanEntryCreateWithoutPlanInput = {
    id?: string;
    month: number;
    year: number;
    payment: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    debt: Prisma.DebtAccountCreateNestedOneWithoutPlanEntriesInput;
};
export type PayoffPlanEntryUncheckedCreateWithoutPlanInput = {
    id?: string;
    debtId: string;
    month: number;
    year: number;
    payment: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type PayoffPlanEntryCreateOrConnectWithoutPlanInput = {
    where: Prisma.PayoffPlanEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.PayoffPlanEntryCreateWithoutPlanInput, Prisma.PayoffPlanEntryUncheckedCreateWithoutPlanInput>;
};
export type PayoffPlanEntryCreateManyPlanInputEnvelope = {
    data: Prisma.PayoffPlanEntryCreateManyPlanInput | Prisma.PayoffPlanEntryCreateManyPlanInput[];
    skipDuplicates?: boolean;
};
export type PayoffPlanEntryUpsertWithWhereUniqueWithoutPlanInput = {
    where: Prisma.PayoffPlanEntryWhereUniqueInput;
    update: Prisma.XOR<Prisma.PayoffPlanEntryUpdateWithoutPlanInput, Prisma.PayoffPlanEntryUncheckedUpdateWithoutPlanInput>;
    create: Prisma.XOR<Prisma.PayoffPlanEntryCreateWithoutPlanInput, Prisma.PayoffPlanEntryUncheckedCreateWithoutPlanInput>;
};
export type PayoffPlanEntryUpdateWithWhereUniqueWithoutPlanInput = {
    where: Prisma.PayoffPlanEntryWhereUniqueInput;
    data: Prisma.XOR<Prisma.PayoffPlanEntryUpdateWithoutPlanInput, Prisma.PayoffPlanEntryUncheckedUpdateWithoutPlanInput>;
};
export type PayoffPlanEntryUpdateManyWithWhereWithoutPlanInput = {
    where: Prisma.PayoffPlanEntryScalarWhereInput;
    data: Prisma.XOR<Prisma.PayoffPlanEntryUpdateManyMutationInput, Prisma.PayoffPlanEntryUncheckedUpdateManyWithoutPlanInput>;
};
export type PayoffPlanEntryCreateManyDebtInput = {
    id?: string;
    planId: string;
    month: number;
    year: number;
    payment: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type PayoffPlanEntryUpdateWithoutDebtInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    payment?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plan?: Prisma.PayoffPlanUpdateOneRequiredWithoutEntriesNestedInput;
};
export type PayoffPlanEntryUncheckedUpdateWithoutDebtInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    planId?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    payment?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PayoffPlanEntryUncheckedUpdateManyWithoutDebtInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    planId?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    payment?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PayoffPlanEntryCreateManyPlanInput = {
    id?: string;
    debtId: string;
    month: number;
    year: number;
    payment: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion: runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type PayoffPlanEntryUpdateWithoutPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    payment?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    debt?: Prisma.DebtAccountUpdateOneRequiredWithoutPlanEntriesNestedInput;
};
export type PayoffPlanEntryUncheckedUpdateWithoutPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    payment?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PayoffPlanEntryUncheckedUpdateManyWithoutPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    payment?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    principalPortion?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    remainingBalance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PayoffPlanEntrySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    planId?: boolean;
    debtId?: boolean;
    month?: boolean;
    year?: boolean;
    payment?: boolean;
    interestPortion?: boolean;
    principalPortion?: boolean;
    remainingBalance?: boolean;
    createdAt?: boolean;
    plan?: boolean | Prisma.PayoffPlanDefaultArgs<ExtArgs>;
    debt?: boolean | Prisma.DebtAccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payoffPlanEntry"]>;
export type PayoffPlanEntrySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    planId?: boolean;
    debtId?: boolean;
    month?: boolean;
    year?: boolean;
    payment?: boolean;
    interestPortion?: boolean;
    principalPortion?: boolean;
    remainingBalance?: boolean;
    createdAt?: boolean;
    plan?: boolean | Prisma.PayoffPlanDefaultArgs<ExtArgs>;
    debt?: boolean | Prisma.DebtAccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payoffPlanEntry"]>;
export type PayoffPlanEntrySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    planId?: boolean;
    debtId?: boolean;
    month?: boolean;
    year?: boolean;
    payment?: boolean;
    interestPortion?: boolean;
    principalPortion?: boolean;
    remainingBalance?: boolean;
    createdAt?: boolean;
    plan?: boolean | Prisma.PayoffPlanDefaultArgs<ExtArgs>;
    debt?: boolean | Prisma.DebtAccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payoffPlanEntry"]>;
export type PayoffPlanEntrySelectScalar = {
    id?: boolean;
    planId?: boolean;
    debtId?: boolean;
    month?: boolean;
    year?: boolean;
    payment?: boolean;
    interestPortion?: boolean;
    principalPortion?: boolean;
    remainingBalance?: boolean;
    createdAt?: boolean;
};
export type PayoffPlanEntryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "planId" | "debtId" | "month" | "year" | "payment" | "interestPortion" | "principalPortion" | "remainingBalance" | "createdAt", ExtArgs["result"]["payoffPlanEntry"]>;
export type PayoffPlanEntryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plan?: boolean | Prisma.PayoffPlanDefaultArgs<ExtArgs>;
    debt?: boolean | Prisma.DebtAccountDefaultArgs<ExtArgs>;
};
export type PayoffPlanEntryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plan?: boolean | Prisma.PayoffPlanDefaultArgs<ExtArgs>;
    debt?: boolean | Prisma.DebtAccountDefaultArgs<ExtArgs>;
};
export type PayoffPlanEntryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plan?: boolean | Prisma.PayoffPlanDefaultArgs<ExtArgs>;
    debt?: boolean | Prisma.DebtAccountDefaultArgs<ExtArgs>;
};
export type $PayoffPlanEntryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PayoffPlanEntry";
    objects: {
        plan: Prisma.$PayoffPlanPayload<ExtArgs>;
        debt: Prisma.$DebtAccountPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        planId: string;
        debtId: string;
        month: number;
        year: number;
        payment: runtime.Decimal;
        interestPortion: runtime.Decimal;
        principalPortion: runtime.Decimal;
        remainingBalance: runtime.Decimal;
        createdAt: Date;
    }, ExtArgs["result"]["payoffPlanEntry"]>;
    composites: {};
};
export type PayoffPlanEntryGetPayload<S extends boolean | null | undefined | PayoffPlanEntryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PayoffPlanEntryPayload, S>;
export type PayoffPlanEntryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PayoffPlanEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PayoffPlanEntryCountAggregateInputType | true;
};
export interface PayoffPlanEntryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PayoffPlanEntry'];
        meta: {
            name: 'PayoffPlanEntry';
        };
    };
    /**
     * Find zero or one PayoffPlanEntry that matches the filter.
     * @param {PayoffPlanEntryFindUniqueArgs} args - Arguments to find a PayoffPlanEntry
     * @example
     * // Get one PayoffPlanEntry
     * const payoffPlanEntry = await prisma.payoffPlanEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayoffPlanEntryFindUniqueArgs>(args: Prisma.SelectSubset<T, PayoffPlanEntryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PayoffPlanEntryClient<runtime.Types.Result.GetResult<Prisma.$PayoffPlanEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PayoffPlanEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PayoffPlanEntryFindUniqueOrThrowArgs} args - Arguments to find a PayoffPlanEntry
     * @example
     * // Get one PayoffPlanEntry
     * const payoffPlanEntry = await prisma.payoffPlanEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayoffPlanEntryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PayoffPlanEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PayoffPlanEntryClient<runtime.Types.Result.GetResult<Prisma.$PayoffPlanEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PayoffPlanEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoffPlanEntryFindFirstArgs} args - Arguments to find a PayoffPlanEntry
     * @example
     * // Get one PayoffPlanEntry
     * const payoffPlanEntry = await prisma.payoffPlanEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayoffPlanEntryFindFirstArgs>(args?: Prisma.SelectSubset<T, PayoffPlanEntryFindFirstArgs<ExtArgs>>): Prisma.Prisma__PayoffPlanEntryClient<runtime.Types.Result.GetResult<Prisma.$PayoffPlanEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PayoffPlanEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoffPlanEntryFindFirstOrThrowArgs} args - Arguments to find a PayoffPlanEntry
     * @example
     * // Get one PayoffPlanEntry
     * const payoffPlanEntry = await prisma.payoffPlanEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayoffPlanEntryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PayoffPlanEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PayoffPlanEntryClient<runtime.Types.Result.GetResult<Prisma.$PayoffPlanEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PayoffPlanEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoffPlanEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PayoffPlanEntries
     * const payoffPlanEntries = await prisma.payoffPlanEntry.findMany()
     *
     * // Get first 10 PayoffPlanEntries
     * const payoffPlanEntries = await prisma.payoffPlanEntry.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const payoffPlanEntryWithIdOnly = await prisma.payoffPlanEntry.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PayoffPlanEntryFindManyArgs>(args?: Prisma.SelectSubset<T, PayoffPlanEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PayoffPlanEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PayoffPlanEntry.
     * @param {PayoffPlanEntryCreateArgs} args - Arguments to create a PayoffPlanEntry.
     * @example
     * // Create one PayoffPlanEntry
     * const PayoffPlanEntry = await prisma.payoffPlanEntry.create({
     *   data: {
     *     // ... data to create a PayoffPlanEntry
     *   }
     * })
     *
     */
    create<T extends PayoffPlanEntryCreateArgs>(args: Prisma.SelectSubset<T, PayoffPlanEntryCreateArgs<ExtArgs>>): Prisma.Prisma__PayoffPlanEntryClient<runtime.Types.Result.GetResult<Prisma.$PayoffPlanEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PayoffPlanEntries.
     * @param {PayoffPlanEntryCreateManyArgs} args - Arguments to create many PayoffPlanEntries.
     * @example
     * // Create many PayoffPlanEntries
     * const payoffPlanEntry = await prisma.payoffPlanEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PayoffPlanEntryCreateManyArgs>(args?: Prisma.SelectSubset<T, PayoffPlanEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PayoffPlanEntries and returns the data saved in the database.
     * @param {PayoffPlanEntryCreateManyAndReturnArgs} args - Arguments to create many PayoffPlanEntries.
     * @example
     * // Create many PayoffPlanEntries
     * const payoffPlanEntry = await prisma.payoffPlanEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PayoffPlanEntries and only return the `id`
     * const payoffPlanEntryWithIdOnly = await prisma.payoffPlanEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PayoffPlanEntryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PayoffPlanEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PayoffPlanEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PayoffPlanEntry.
     * @param {PayoffPlanEntryDeleteArgs} args - Arguments to delete one PayoffPlanEntry.
     * @example
     * // Delete one PayoffPlanEntry
     * const PayoffPlanEntry = await prisma.payoffPlanEntry.delete({
     *   where: {
     *     // ... filter to delete one PayoffPlanEntry
     *   }
     * })
     *
     */
    delete<T extends PayoffPlanEntryDeleteArgs>(args: Prisma.SelectSubset<T, PayoffPlanEntryDeleteArgs<ExtArgs>>): Prisma.Prisma__PayoffPlanEntryClient<runtime.Types.Result.GetResult<Prisma.$PayoffPlanEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PayoffPlanEntry.
     * @param {PayoffPlanEntryUpdateArgs} args - Arguments to update one PayoffPlanEntry.
     * @example
     * // Update one PayoffPlanEntry
     * const payoffPlanEntry = await prisma.payoffPlanEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PayoffPlanEntryUpdateArgs>(args: Prisma.SelectSubset<T, PayoffPlanEntryUpdateArgs<ExtArgs>>): Prisma.Prisma__PayoffPlanEntryClient<runtime.Types.Result.GetResult<Prisma.$PayoffPlanEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PayoffPlanEntries.
     * @param {PayoffPlanEntryDeleteManyArgs} args - Arguments to filter PayoffPlanEntries to delete.
     * @example
     * // Delete a few PayoffPlanEntries
     * const { count } = await prisma.payoffPlanEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PayoffPlanEntryDeleteManyArgs>(args?: Prisma.SelectSubset<T, PayoffPlanEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PayoffPlanEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoffPlanEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PayoffPlanEntries
     * const payoffPlanEntry = await prisma.payoffPlanEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PayoffPlanEntryUpdateManyArgs>(args: Prisma.SelectSubset<T, PayoffPlanEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PayoffPlanEntries and returns the data updated in the database.
     * @param {PayoffPlanEntryUpdateManyAndReturnArgs} args - Arguments to update many PayoffPlanEntries.
     * @example
     * // Update many PayoffPlanEntries
     * const payoffPlanEntry = await prisma.payoffPlanEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PayoffPlanEntries and only return the `id`
     * const payoffPlanEntryWithIdOnly = await prisma.payoffPlanEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends PayoffPlanEntryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PayoffPlanEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PayoffPlanEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PayoffPlanEntry.
     * @param {PayoffPlanEntryUpsertArgs} args - Arguments to update or create a PayoffPlanEntry.
     * @example
     * // Update or create a PayoffPlanEntry
     * const payoffPlanEntry = await prisma.payoffPlanEntry.upsert({
     *   create: {
     *     // ... data to create a PayoffPlanEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PayoffPlanEntry we want to update
     *   }
     * })
     */
    upsert<T extends PayoffPlanEntryUpsertArgs>(args: Prisma.SelectSubset<T, PayoffPlanEntryUpsertArgs<ExtArgs>>): Prisma.Prisma__PayoffPlanEntryClient<runtime.Types.Result.GetResult<Prisma.$PayoffPlanEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PayoffPlanEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoffPlanEntryCountArgs} args - Arguments to filter PayoffPlanEntries to count.
     * @example
     * // Count the number of PayoffPlanEntries
     * const count = await prisma.payoffPlanEntry.count({
     *   where: {
     *     // ... the filter for the PayoffPlanEntries we want to count
     *   }
     * })
    **/
    count<T extends PayoffPlanEntryCountArgs>(args?: Prisma.Subset<T, PayoffPlanEntryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PayoffPlanEntryCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PayoffPlanEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoffPlanEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PayoffPlanEntryAggregateArgs>(args: Prisma.Subset<T, PayoffPlanEntryAggregateArgs>): Prisma.PrismaPromise<GetPayoffPlanEntryAggregateType<T>>;
    /**
     * Group by PayoffPlanEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoffPlanEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends PayoffPlanEntryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PayoffPlanEntryGroupByArgs['orderBy'];
    } : {
        orderBy?: PayoffPlanEntryGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PayoffPlanEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayoffPlanEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PayoffPlanEntry model
     */
    readonly fields: PayoffPlanEntryFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for PayoffPlanEntry.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PayoffPlanEntryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    plan<T extends Prisma.PayoffPlanDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PayoffPlanDefaultArgs<ExtArgs>>): Prisma.Prisma__PayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$PayoffPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    debt<T extends Prisma.DebtAccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DebtAccountDefaultArgs<ExtArgs>>): Prisma.Prisma__DebtAccountClient<runtime.Types.Result.GetResult<Prisma.$DebtAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the PayoffPlanEntry model
 */
export interface PayoffPlanEntryFieldRefs {
    readonly id: Prisma.FieldRef<"PayoffPlanEntry", 'String'>;
    readonly planId: Prisma.FieldRef<"PayoffPlanEntry", 'String'>;
    readonly debtId: Prisma.FieldRef<"PayoffPlanEntry", 'String'>;
    readonly month: Prisma.FieldRef<"PayoffPlanEntry", 'Int'>;
    readonly year: Prisma.FieldRef<"PayoffPlanEntry", 'Int'>;
    readonly payment: Prisma.FieldRef<"PayoffPlanEntry", 'Decimal'>;
    readonly interestPortion: Prisma.FieldRef<"PayoffPlanEntry", 'Decimal'>;
    readonly principalPortion: Prisma.FieldRef<"PayoffPlanEntry", 'Decimal'>;
    readonly remainingBalance: Prisma.FieldRef<"PayoffPlanEntry", 'Decimal'>;
    readonly createdAt: Prisma.FieldRef<"PayoffPlanEntry", 'DateTime'>;
}
/**
 * PayoffPlanEntry findUnique
 */
export type PayoffPlanEntryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlanEntry
     */
    select?: Prisma.PayoffPlanEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlanEntry
     */
    omit?: Prisma.PayoffPlanEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanEntryInclude<ExtArgs> | null;
    /**
     * Filter, which PayoffPlanEntry to fetch.
     */
    where: Prisma.PayoffPlanEntryWhereUniqueInput;
};
/**
 * PayoffPlanEntry findUniqueOrThrow
 */
export type PayoffPlanEntryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlanEntry
     */
    select?: Prisma.PayoffPlanEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlanEntry
     */
    omit?: Prisma.PayoffPlanEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanEntryInclude<ExtArgs> | null;
    /**
     * Filter, which PayoffPlanEntry to fetch.
     */
    where: Prisma.PayoffPlanEntryWhereUniqueInput;
};
/**
 * PayoffPlanEntry findFirst
 */
export type PayoffPlanEntryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlanEntry
     */
    select?: Prisma.PayoffPlanEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlanEntry
     */
    omit?: Prisma.PayoffPlanEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanEntryInclude<ExtArgs> | null;
    /**
     * Filter, which PayoffPlanEntry to fetch.
     */
    where?: Prisma.PayoffPlanEntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PayoffPlanEntries to fetch.
     */
    orderBy?: Prisma.PayoffPlanEntryOrderByWithRelationInput | Prisma.PayoffPlanEntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PayoffPlanEntries.
     */
    cursor?: Prisma.PayoffPlanEntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PayoffPlanEntries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PayoffPlanEntries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PayoffPlanEntries.
     */
    distinct?: Prisma.PayoffPlanEntryScalarFieldEnum | Prisma.PayoffPlanEntryScalarFieldEnum[];
};
/**
 * PayoffPlanEntry findFirstOrThrow
 */
export type PayoffPlanEntryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlanEntry
     */
    select?: Prisma.PayoffPlanEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlanEntry
     */
    omit?: Prisma.PayoffPlanEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanEntryInclude<ExtArgs> | null;
    /**
     * Filter, which PayoffPlanEntry to fetch.
     */
    where?: Prisma.PayoffPlanEntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PayoffPlanEntries to fetch.
     */
    orderBy?: Prisma.PayoffPlanEntryOrderByWithRelationInput | Prisma.PayoffPlanEntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PayoffPlanEntries.
     */
    cursor?: Prisma.PayoffPlanEntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PayoffPlanEntries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PayoffPlanEntries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PayoffPlanEntries.
     */
    distinct?: Prisma.PayoffPlanEntryScalarFieldEnum | Prisma.PayoffPlanEntryScalarFieldEnum[];
};
/**
 * PayoffPlanEntry findMany
 */
export type PayoffPlanEntryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlanEntry
     */
    select?: Prisma.PayoffPlanEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlanEntry
     */
    omit?: Prisma.PayoffPlanEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanEntryInclude<ExtArgs> | null;
    /**
     * Filter, which PayoffPlanEntries to fetch.
     */
    where?: Prisma.PayoffPlanEntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PayoffPlanEntries to fetch.
     */
    orderBy?: Prisma.PayoffPlanEntryOrderByWithRelationInput | Prisma.PayoffPlanEntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PayoffPlanEntries.
     */
    cursor?: Prisma.PayoffPlanEntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PayoffPlanEntries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PayoffPlanEntries.
     */
    skip?: number;
    distinct?: Prisma.PayoffPlanEntryScalarFieldEnum | Prisma.PayoffPlanEntryScalarFieldEnum[];
};
/**
 * PayoffPlanEntry create
 */
export type PayoffPlanEntryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlanEntry
     */
    select?: Prisma.PayoffPlanEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlanEntry
     */
    omit?: Prisma.PayoffPlanEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanEntryInclude<ExtArgs> | null;
    /**
     * The data needed to create a PayoffPlanEntry.
     */
    data: Prisma.XOR<Prisma.PayoffPlanEntryCreateInput, Prisma.PayoffPlanEntryUncheckedCreateInput>;
};
/**
 * PayoffPlanEntry createMany
 */
export type PayoffPlanEntryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many PayoffPlanEntries.
     */
    data: Prisma.PayoffPlanEntryCreateManyInput | Prisma.PayoffPlanEntryCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PayoffPlanEntry createManyAndReturn
 */
export type PayoffPlanEntryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlanEntry
     */
    select?: Prisma.PayoffPlanEntrySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlanEntry
     */
    omit?: Prisma.PayoffPlanEntryOmit<ExtArgs> | null;
    /**
     * The data used to create many PayoffPlanEntries.
     */
    data: Prisma.PayoffPlanEntryCreateManyInput | Prisma.PayoffPlanEntryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanEntryIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * PayoffPlanEntry update
 */
export type PayoffPlanEntryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlanEntry
     */
    select?: Prisma.PayoffPlanEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlanEntry
     */
    omit?: Prisma.PayoffPlanEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanEntryInclude<ExtArgs> | null;
    /**
     * The data needed to update a PayoffPlanEntry.
     */
    data: Prisma.XOR<Prisma.PayoffPlanEntryUpdateInput, Prisma.PayoffPlanEntryUncheckedUpdateInput>;
    /**
     * Choose, which PayoffPlanEntry to update.
     */
    where: Prisma.PayoffPlanEntryWhereUniqueInput;
};
/**
 * PayoffPlanEntry updateMany
 */
export type PayoffPlanEntryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update PayoffPlanEntries.
     */
    data: Prisma.XOR<Prisma.PayoffPlanEntryUpdateManyMutationInput, Prisma.PayoffPlanEntryUncheckedUpdateManyInput>;
    /**
     * Filter which PayoffPlanEntries to update
     */
    where?: Prisma.PayoffPlanEntryWhereInput;
    /**
     * Limit how many PayoffPlanEntries to update.
     */
    limit?: number;
};
/**
 * PayoffPlanEntry updateManyAndReturn
 */
export type PayoffPlanEntryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlanEntry
     */
    select?: Prisma.PayoffPlanEntrySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlanEntry
     */
    omit?: Prisma.PayoffPlanEntryOmit<ExtArgs> | null;
    /**
     * The data used to update PayoffPlanEntries.
     */
    data: Prisma.XOR<Prisma.PayoffPlanEntryUpdateManyMutationInput, Prisma.PayoffPlanEntryUncheckedUpdateManyInput>;
    /**
     * Filter which PayoffPlanEntries to update
     */
    where?: Prisma.PayoffPlanEntryWhereInput;
    /**
     * Limit how many PayoffPlanEntries to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanEntryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * PayoffPlanEntry upsert
 */
export type PayoffPlanEntryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlanEntry
     */
    select?: Prisma.PayoffPlanEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlanEntry
     */
    omit?: Prisma.PayoffPlanEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanEntryInclude<ExtArgs> | null;
    /**
     * The filter to search for the PayoffPlanEntry to update in case it exists.
     */
    where: Prisma.PayoffPlanEntryWhereUniqueInput;
    /**
     * In case the PayoffPlanEntry found by the `where` argument doesn't exist, create a new PayoffPlanEntry with this data.
     */
    create: Prisma.XOR<Prisma.PayoffPlanEntryCreateInput, Prisma.PayoffPlanEntryUncheckedCreateInput>;
    /**
     * In case the PayoffPlanEntry was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PayoffPlanEntryUpdateInput, Prisma.PayoffPlanEntryUncheckedUpdateInput>;
};
/**
 * PayoffPlanEntry delete
 */
export type PayoffPlanEntryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlanEntry
     */
    select?: Prisma.PayoffPlanEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlanEntry
     */
    omit?: Prisma.PayoffPlanEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanEntryInclude<ExtArgs> | null;
    /**
     * Filter which PayoffPlanEntry to delete.
     */
    where: Prisma.PayoffPlanEntryWhereUniqueInput;
};
/**
 * PayoffPlanEntry deleteMany
 */
export type PayoffPlanEntryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PayoffPlanEntries to delete
     */
    where?: Prisma.PayoffPlanEntryWhereInput;
    /**
     * Limit how many PayoffPlanEntries to delete.
     */
    limit?: number;
};
/**
 * PayoffPlanEntry without action
 */
export type PayoffPlanEntryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlanEntry
     */
    select?: Prisma.PayoffPlanEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlanEntry
     */
    omit?: Prisma.PayoffPlanEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanEntryInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=PayoffPlanEntry.d.ts.map