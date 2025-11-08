import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model PayoffPlan
 *
 */
export type PayoffPlanModel = runtime.Types.Result.DefaultSelection<Prisma.$PayoffPlanPayload>;
export type AggregatePayoffPlan = {
    _count: PayoffPlanCountAggregateOutputType | null;
    _avg: PayoffPlanAvgAggregateOutputType | null;
    _sum: PayoffPlanSumAggregateOutputType | null;
    _min: PayoffPlanMinAggregateOutputType | null;
    _max: PayoffPlanMaxAggregateOutputType | null;
};
export type PayoffPlanAvgAggregateOutputType = {
    totalInterestPaid: runtime.Decimal | null;
};
export type PayoffPlanSumAggregateOutputType = {
    totalInterestPaid: runtime.Decimal | null;
};
export type PayoffPlanMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    strategy: string | null;
    totalInterestPaid: runtime.Decimal | null;
    estimatedPayoffDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PayoffPlanMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    strategy: string | null;
    totalInterestPaid: runtime.Decimal | null;
    estimatedPayoffDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PayoffPlanCountAggregateOutputType = {
    id: number;
    userId: number;
    strategy: number;
    totalInterestPaid: number;
    estimatedPayoffDate: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PayoffPlanAvgAggregateInputType = {
    totalInterestPaid?: true;
};
export type PayoffPlanSumAggregateInputType = {
    totalInterestPaid?: true;
};
export type PayoffPlanMinAggregateInputType = {
    id?: true;
    userId?: true;
    strategy?: true;
    totalInterestPaid?: true;
    estimatedPayoffDate?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PayoffPlanMaxAggregateInputType = {
    id?: true;
    userId?: true;
    strategy?: true;
    totalInterestPaid?: true;
    estimatedPayoffDate?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PayoffPlanCountAggregateInputType = {
    id?: true;
    userId?: true;
    strategy?: true;
    totalInterestPaid?: true;
    estimatedPayoffDate?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PayoffPlanAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PayoffPlan to aggregate.
     */
    where?: Prisma.PayoffPlanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PayoffPlans to fetch.
     */
    orderBy?: Prisma.PayoffPlanOrderByWithRelationInput | Prisma.PayoffPlanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PayoffPlanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PayoffPlans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PayoffPlans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PayoffPlans
    **/
    _count?: true | PayoffPlanCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PayoffPlanAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PayoffPlanSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PayoffPlanMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PayoffPlanMaxAggregateInputType;
};
export type GetPayoffPlanAggregateType<T extends PayoffPlanAggregateArgs> = {
    [P in keyof T & keyof AggregatePayoffPlan]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePayoffPlan[P]> : Prisma.GetScalarType<T[P], AggregatePayoffPlan[P]>;
};
export type PayoffPlanGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PayoffPlanWhereInput;
    orderBy?: Prisma.PayoffPlanOrderByWithAggregationInput | Prisma.PayoffPlanOrderByWithAggregationInput[];
    by: Prisma.PayoffPlanScalarFieldEnum[] | Prisma.PayoffPlanScalarFieldEnum;
    having?: Prisma.PayoffPlanScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PayoffPlanCountAggregateInputType | true;
    _avg?: PayoffPlanAvgAggregateInputType;
    _sum?: PayoffPlanSumAggregateInputType;
    _min?: PayoffPlanMinAggregateInputType;
    _max?: PayoffPlanMaxAggregateInputType;
};
export type PayoffPlanGroupByOutputType = {
    id: string;
    userId: string;
    strategy: string;
    totalInterestPaid: runtime.Decimal;
    estimatedPayoffDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: PayoffPlanCountAggregateOutputType | null;
    _avg: PayoffPlanAvgAggregateOutputType | null;
    _sum: PayoffPlanSumAggregateOutputType | null;
    _min: PayoffPlanMinAggregateOutputType | null;
    _max: PayoffPlanMaxAggregateOutputType | null;
};
type GetPayoffPlanGroupByPayload<T extends PayoffPlanGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PayoffPlanGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PayoffPlanGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PayoffPlanGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PayoffPlanGroupByOutputType[P]>;
}>>;
export type PayoffPlanWhereInput = {
    AND?: Prisma.PayoffPlanWhereInput | Prisma.PayoffPlanWhereInput[];
    OR?: Prisma.PayoffPlanWhereInput[];
    NOT?: Prisma.PayoffPlanWhereInput | Prisma.PayoffPlanWhereInput[];
    id?: Prisma.StringFilter<"PayoffPlan"> | string;
    userId?: Prisma.StringFilter<"PayoffPlan"> | string;
    strategy?: Prisma.StringFilter<"PayoffPlan"> | string;
    totalInterestPaid?: Prisma.DecimalFilter<"PayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Prisma.DateTimeNullableFilter<"PayoffPlan"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PayoffPlan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PayoffPlan"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    entries?: Prisma.PayoffPlanEntryListRelationFilter;
};
export type PayoffPlanOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    strategy?: Prisma.SortOrder;
    totalInterestPaid?: Prisma.SortOrder;
    estimatedPayoffDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    entries?: Prisma.PayoffPlanEntryOrderByRelationAggregateInput;
};
export type PayoffPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PayoffPlanWhereInput | Prisma.PayoffPlanWhereInput[];
    OR?: Prisma.PayoffPlanWhereInput[];
    NOT?: Prisma.PayoffPlanWhereInput | Prisma.PayoffPlanWhereInput[];
    userId?: Prisma.StringFilter<"PayoffPlan"> | string;
    strategy?: Prisma.StringFilter<"PayoffPlan"> | string;
    totalInterestPaid?: Prisma.DecimalFilter<"PayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Prisma.DateTimeNullableFilter<"PayoffPlan"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PayoffPlan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PayoffPlan"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    entries?: Prisma.PayoffPlanEntryListRelationFilter;
}, "id">;
export type PayoffPlanOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    strategy?: Prisma.SortOrder;
    totalInterestPaid?: Prisma.SortOrder;
    estimatedPayoffDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PayoffPlanCountOrderByAggregateInput;
    _avg?: Prisma.PayoffPlanAvgOrderByAggregateInput;
    _max?: Prisma.PayoffPlanMaxOrderByAggregateInput;
    _min?: Prisma.PayoffPlanMinOrderByAggregateInput;
    _sum?: Prisma.PayoffPlanSumOrderByAggregateInput;
};
export type PayoffPlanScalarWhereWithAggregatesInput = {
    AND?: Prisma.PayoffPlanScalarWhereWithAggregatesInput | Prisma.PayoffPlanScalarWhereWithAggregatesInput[];
    OR?: Prisma.PayoffPlanScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PayoffPlanScalarWhereWithAggregatesInput | Prisma.PayoffPlanScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PayoffPlan"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"PayoffPlan"> | string;
    strategy?: Prisma.StringWithAggregatesFilter<"PayoffPlan"> | string;
    totalInterestPaid?: Prisma.DecimalWithAggregatesFilter<"PayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Prisma.DateTimeNullableWithAggregatesFilter<"PayoffPlan"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PayoffPlan"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PayoffPlan"> | Date | string;
};
export type PayoffPlanCreateInput = {
    id?: string;
    strategy: string;
    totalInterestPaid: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPayoffPlansInput;
    entries?: Prisma.PayoffPlanEntryCreateNestedManyWithoutPlanInput;
};
export type PayoffPlanUncheckedCreateInput = {
    id?: string;
    userId: string;
    strategy: string;
    totalInterestPaid: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entries?: Prisma.PayoffPlanEntryUncheckedCreateNestedManyWithoutPlanInput;
};
export type PayoffPlanUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.StringFieldUpdateOperationsInput | string;
    totalInterestPaid?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPayoffPlansNestedInput;
    entries?: Prisma.PayoffPlanEntryUpdateManyWithoutPlanNestedInput;
};
export type PayoffPlanUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.StringFieldUpdateOperationsInput | string;
    totalInterestPaid?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entries?: Prisma.PayoffPlanEntryUncheckedUpdateManyWithoutPlanNestedInput;
};
export type PayoffPlanCreateManyInput = {
    id?: string;
    userId: string;
    strategy: string;
    totalInterestPaid: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PayoffPlanUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.StringFieldUpdateOperationsInput | string;
    totalInterestPaid?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PayoffPlanUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.StringFieldUpdateOperationsInput | string;
    totalInterestPaid?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PayoffPlanListRelationFilter = {
    every?: Prisma.PayoffPlanWhereInput;
    some?: Prisma.PayoffPlanWhereInput;
    none?: Prisma.PayoffPlanWhereInput;
};
export type PayoffPlanOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PayoffPlanCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    strategy?: Prisma.SortOrder;
    totalInterestPaid?: Prisma.SortOrder;
    estimatedPayoffDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PayoffPlanAvgOrderByAggregateInput = {
    totalInterestPaid?: Prisma.SortOrder;
};
export type PayoffPlanMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    strategy?: Prisma.SortOrder;
    totalInterestPaid?: Prisma.SortOrder;
    estimatedPayoffDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PayoffPlanMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    strategy?: Prisma.SortOrder;
    totalInterestPaid?: Prisma.SortOrder;
    estimatedPayoffDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PayoffPlanSumOrderByAggregateInput = {
    totalInterestPaid?: Prisma.SortOrder;
};
export type PayoffPlanScalarRelationFilter = {
    is?: Prisma.PayoffPlanWhereInput;
    isNot?: Prisma.PayoffPlanWhereInput;
};
export type PayoffPlanCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PayoffPlanCreateWithoutUserInput, Prisma.PayoffPlanUncheckedCreateWithoutUserInput> | Prisma.PayoffPlanCreateWithoutUserInput[] | Prisma.PayoffPlanUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PayoffPlanCreateOrConnectWithoutUserInput | Prisma.PayoffPlanCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PayoffPlanCreateManyUserInputEnvelope;
    connect?: Prisma.PayoffPlanWhereUniqueInput | Prisma.PayoffPlanWhereUniqueInput[];
};
export type PayoffPlanUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PayoffPlanCreateWithoutUserInput, Prisma.PayoffPlanUncheckedCreateWithoutUserInput> | Prisma.PayoffPlanCreateWithoutUserInput[] | Prisma.PayoffPlanUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PayoffPlanCreateOrConnectWithoutUserInput | Prisma.PayoffPlanCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PayoffPlanCreateManyUserInputEnvelope;
    connect?: Prisma.PayoffPlanWhereUniqueInput | Prisma.PayoffPlanWhereUniqueInput[];
};
export type PayoffPlanUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PayoffPlanCreateWithoutUserInput, Prisma.PayoffPlanUncheckedCreateWithoutUserInput> | Prisma.PayoffPlanCreateWithoutUserInput[] | Prisma.PayoffPlanUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PayoffPlanCreateOrConnectWithoutUserInput | Prisma.PayoffPlanCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PayoffPlanUpsertWithWhereUniqueWithoutUserInput | Prisma.PayoffPlanUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PayoffPlanCreateManyUserInputEnvelope;
    set?: Prisma.PayoffPlanWhereUniqueInput | Prisma.PayoffPlanWhereUniqueInput[];
    disconnect?: Prisma.PayoffPlanWhereUniqueInput | Prisma.PayoffPlanWhereUniqueInput[];
    delete?: Prisma.PayoffPlanWhereUniqueInput | Prisma.PayoffPlanWhereUniqueInput[];
    connect?: Prisma.PayoffPlanWhereUniqueInput | Prisma.PayoffPlanWhereUniqueInput[];
    update?: Prisma.PayoffPlanUpdateWithWhereUniqueWithoutUserInput | Prisma.PayoffPlanUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PayoffPlanUpdateManyWithWhereWithoutUserInput | Prisma.PayoffPlanUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PayoffPlanScalarWhereInput | Prisma.PayoffPlanScalarWhereInput[];
};
export type PayoffPlanUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PayoffPlanCreateWithoutUserInput, Prisma.PayoffPlanUncheckedCreateWithoutUserInput> | Prisma.PayoffPlanCreateWithoutUserInput[] | Prisma.PayoffPlanUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PayoffPlanCreateOrConnectWithoutUserInput | Prisma.PayoffPlanCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PayoffPlanUpsertWithWhereUniqueWithoutUserInput | Prisma.PayoffPlanUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PayoffPlanCreateManyUserInputEnvelope;
    set?: Prisma.PayoffPlanWhereUniqueInput | Prisma.PayoffPlanWhereUniqueInput[];
    disconnect?: Prisma.PayoffPlanWhereUniqueInput | Prisma.PayoffPlanWhereUniqueInput[];
    delete?: Prisma.PayoffPlanWhereUniqueInput | Prisma.PayoffPlanWhereUniqueInput[];
    connect?: Prisma.PayoffPlanWhereUniqueInput | Prisma.PayoffPlanWhereUniqueInput[];
    update?: Prisma.PayoffPlanUpdateWithWhereUniqueWithoutUserInput | Prisma.PayoffPlanUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PayoffPlanUpdateManyWithWhereWithoutUserInput | Prisma.PayoffPlanUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PayoffPlanScalarWhereInput | Prisma.PayoffPlanScalarWhereInput[];
};
export type PayoffPlanCreateNestedOneWithoutEntriesInput = {
    create?: Prisma.XOR<Prisma.PayoffPlanCreateWithoutEntriesInput, Prisma.PayoffPlanUncheckedCreateWithoutEntriesInput>;
    connectOrCreate?: Prisma.PayoffPlanCreateOrConnectWithoutEntriesInput;
    connect?: Prisma.PayoffPlanWhereUniqueInput;
};
export type PayoffPlanUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: Prisma.XOR<Prisma.PayoffPlanCreateWithoutEntriesInput, Prisma.PayoffPlanUncheckedCreateWithoutEntriesInput>;
    connectOrCreate?: Prisma.PayoffPlanCreateOrConnectWithoutEntriesInput;
    upsert?: Prisma.PayoffPlanUpsertWithoutEntriesInput;
    connect?: Prisma.PayoffPlanWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PayoffPlanUpdateToOneWithWhereWithoutEntriesInput, Prisma.PayoffPlanUpdateWithoutEntriesInput>, Prisma.PayoffPlanUncheckedUpdateWithoutEntriesInput>;
};
export type PayoffPlanCreateWithoutUserInput = {
    id?: string;
    strategy: string;
    totalInterestPaid: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entries?: Prisma.PayoffPlanEntryCreateNestedManyWithoutPlanInput;
};
export type PayoffPlanUncheckedCreateWithoutUserInput = {
    id?: string;
    strategy: string;
    totalInterestPaid: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entries?: Prisma.PayoffPlanEntryUncheckedCreateNestedManyWithoutPlanInput;
};
export type PayoffPlanCreateOrConnectWithoutUserInput = {
    where: Prisma.PayoffPlanWhereUniqueInput;
    create: Prisma.XOR<Prisma.PayoffPlanCreateWithoutUserInput, Prisma.PayoffPlanUncheckedCreateWithoutUserInput>;
};
export type PayoffPlanCreateManyUserInputEnvelope = {
    data: Prisma.PayoffPlanCreateManyUserInput | Prisma.PayoffPlanCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PayoffPlanUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PayoffPlanWhereUniqueInput;
    update: Prisma.XOR<Prisma.PayoffPlanUpdateWithoutUserInput, Prisma.PayoffPlanUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PayoffPlanCreateWithoutUserInput, Prisma.PayoffPlanUncheckedCreateWithoutUserInput>;
};
export type PayoffPlanUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PayoffPlanWhereUniqueInput;
    data: Prisma.XOR<Prisma.PayoffPlanUpdateWithoutUserInput, Prisma.PayoffPlanUncheckedUpdateWithoutUserInput>;
};
export type PayoffPlanUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PayoffPlanScalarWhereInput;
    data: Prisma.XOR<Prisma.PayoffPlanUpdateManyMutationInput, Prisma.PayoffPlanUncheckedUpdateManyWithoutUserInput>;
};
export type PayoffPlanScalarWhereInput = {
    AND?: Prisma.PayoffPlanScalarWhereInput | Prisma.PayoffPlanScalarWhereInput[];
    OR?: Prisma.PayoffPlanScalarWhereInput[];
    NOT?: Prisma.PayoffPlanScalarWhereInput | Prisma.PayoffPlanScalarWhereInput[];
    id?: Prisma.StringFilter<"PayoffPlan"> | string;
    userId?: Prisma.StringFilter<"PayoffPlan"> | string;
    strategy?: Prisma.StringFilter<"PayoffPlan"> | string;
    totalInterestPaid?: Prisma.DecimalFilter<"PayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Prisma.DateTimeNullableFilter<"PayoffPlan"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PayoffPlan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PayoffPlan"> | Date | string;
};
export type PayoffPlanCreateWithoutEntriesInput = {
    id?: string;
    strategy: string;
    totalInterestPaid: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPayoffPlansInput;
};
export type PayoffPlanUncheckedCreateWithoutEntriesInput = {
    id?: string;
    userId: string;
    strategy: string;
    totalInterestPaid: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PayoffPlanCreateOrConnectWithoutEntriesInput = {
    where: Prisma.PayoffPlanWhereUniqueInput;
    create: Prisma.XOR<Prisma.PayoffPlanCreateWithoutEntriesInput, Prisma.PayoffPlanUncheckedCreateWithoutEntriesInput>;
};
export type PayoffPlanUpsertWithoutEntriesInput = {
    update: Prisma.XOR<Prisma.PayoffPlanUpdateWithoutEntriesInput, Prisma.PayoffPlanUncheckedUpdateWithoutEntriesInput>;
    create: Prisma.XOR<Prisma.PayoffPlanCreateWithoutEntriesInput, Prisma.PayoffPlanUncheckedCreateWithoutEntriesInput>;
    where?: Prisma.PayoffPlanWhereInput;
};
export type PayoffPlanUpdateToOneWithWhereWithoutEntriesInput = {
    where?: Prisma.PayoffPlanWhereInput;
    data: Prisma.XOR<Prisma.PayoffPlanUpdateWithoutEntriesInput, Prisma.PayoffPlanUncheckedUpdateWithoutEntriesInput>;
};
export type PayoffPlanUpdateWithoutEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.StringFieldUpdateOperationsInput | string;
    totalInterestPaid?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPayoffPlansNestedInput;
};
export type PayoffPlanUncheckedUpdateWithoutEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.StringFieldUpdateOperationsInput | string;
    totalInterestPaid?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PayoffPlanCreateManyUserInput = {
    id?: string;
    strategy: string;
    totalInterestPaid: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PayoffPlanUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.StringFieldUpdateOperationsInput | string;
    totalInterestPaid?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entries?: Prisma.PayoffPlanEntryUpdateManyWithoutPlanNestedInput;
};
export type PayoffPlanUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.StringFieldUpdateOperationsInput | string;
    totalInterestPaid?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entries?: Prisma.PayoffPlanEntryUncheckedUpdateManyWithoutPlanNestedInput;
};
export type PayoffPlanUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.StringFieldUpdateOperationsInput | string;
    totalInterestPaid?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type PayoffPlanCountOutputType
 */
export type PayoffPlanCountOutputType = {
    entries: number;
};
export type PayoffPlanCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entries?: boolean | PayoffPlanCountOutputTypeCountEntriesArgs;
};
/**
 * PayoffPlanCountOutputType without action
 */
export type PayoffPlanCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlanCountOutputType
     */
    select?: Prisma.PayoffPlanCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * PayoffPlanCountOutputType without action
 */
export type PayoffPlanCountOutputTypeCountEntriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PayoffPlanEntryWhereInput;
};
export type PayoffPlanSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    strategy?: boolean;
    totalInterestPaid?: boolean;
    estimatedPayoffDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    entries?: boolean | Prisma.PayoffPlan$entriesArgs<ExtArgs>;
    _count?: boolean | Prisma.PayoffPlanCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payoffPlan"]>;
export type PayoffPlanSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    strategy?: boolean;
    totalInterestPaid?: boolean;
    estimatedPayoffDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payoffPlan"]>;
export type PayoffPlanSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    strategy?: boolean;
    totalInterestPaid?: boolean;
    estimatedPayoffDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payoffPlan"]>;
export type PayoffPlanSelectScalar = {
    id?: boolean;
    userId?: boolean;
    strategy?: boolean;
    totalInterestPaid?: boolean;
    estimatedPayoffDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PayoffPlanOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "strategy" | "totalInterestPaid" | "estimatedPayoffDate" | "createdAt" | "updatedAt", ExtArgs["result"]["payoffPlan"]>;
export type PayoffPlanInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    entries?: boolean | Prisma.PayoffPlan$entriesArgs<ExtArgs>;
    _count?: boolean | Prisma.PayoffPlanCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PayoffPlanIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PayoffPlanIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PayoffPlanPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PayoffPlan";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        entries: Prisma.$PayoffPlanEntryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        strategy: string;
        totalInterestPaid: runtime.Decimal;
        estimatedPayoffDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["payoffPlan"]>;
    composites: {};
};
export type PayoffPlanGetPayload<S extends boolean | null | undefined | PayoffPlanDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PayoffPlanPayload, S>;
export type PayoffPlanCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PayoffPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PayoffPlanCountAggregateInputType | true;
};
export interface PayoffPlanDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PayoffPlan'];
        meta: {
            name: 'PayoffPlan';
        };
    };
    /**
     * Find zero or one PayoffPlan that matches the filter.
     * @param {PayoffPlanFindUniqueArgs} args - Arguments to find a PayoffPlan
     * @example
     * // Get one PayoffPlan
     * const payoffPlan = await prisma.payoffPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayoffPlanFindUniqueArgs>(args: Prisma.SelectSubset<T, PayoffPlanFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$PayoffPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PayoffPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PayoffPlanFindUniqueOrThrowArgs} args - Arguments to find a PayoffPlan
     * @example
     * // Get one PayoffPlan
     * const payoffPlan = await prisma.payoffPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayoffPlanFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PayoffPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$PayoffPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PayoffPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoffPlanFindFirstArgs} args - Arguments to find a PayoffPlan
     * @example
     * // Get one PayoffPlan
     * const payoffPlan = await prisma.payoffPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayoffPlanFindFirstArgs>(args?: Prisma.SelectSubset<T, PayoffPlanFindFirstArgs<ExtArgs>>): Prisma.Prisma__PayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$PayoffPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PayoffPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoffPlanFindFirstOrThrowArgs} args - Arguments to find a PayoffPlan
     * @example
     * // Get one PayoffPlan
     * const payoffPlan = await prisma.payoffPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayoffPlanFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PayoffPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$PayoffPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PayoffPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoffPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PayoffPlans
     * const payoffPlans = await prisma.payoffPlan.findMany()
     *
     * // Get first 10 PayoffPlans
     * const payoffPlans = await prisma.payoffPlan.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const payoffPlanWithIdOnly = await prisma.payoffPlan.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PayoffPlanFindManyArgs>(args?: Prisma.SelectSubset<T, PayoffPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PayoffPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PayoffPlan.
     * @param {PayoffPlanCreateArgs} args - Arguments to create a PayoffPlan.
     * @example
     * // Create one PayoffPlan
     * const PayoffPlan = await prisma.payoffPlan.create({
     *   data: {
     *     // ... data to create a PayoffPlan
     *   }
     * })
     *
     */
    create<T extends PayoffPlanCreateArgs>(args: Prisma.SelectSubset<T, PayoffPlanCreateArgs<ExtArgs>>): Prisma.Prisma__PayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$PayoffPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PayoffPlans.
     * @param {PayoffPlanCreateManyArgs} args - Arguments to create many PayoffPlans.
     * @example
     * // Create many PayoffPlans
     * const payoffPlan = await prisma.payoffPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PayoffPlanCreateManyArgs>(args?: Prisma.SelectSubset<T, PayoffPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PayoffPlans and returns the data saved in the database.
     * @param {PayoffPlanCreateManyAndReturnArgs} args - Arguments to create many PayoffPlans.
     * @example
     * // Create many PayoffPlans
     * const payoffPlan = await prisma.payoffPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PayoffPlans and only return the `id`
     * const payoffPlanWithIdOnly = await prisma.payoffPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PayoffPlanCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PayoffPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PayoffPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PayoffPlan.
     * @param {PayoffPlanDeleteArgs} args - Arguments to delete one PayoffPlan.
     * @example
     * // Delete one PayoffPlan
     * const PayoffPlan = await prisma.payoffPlan.delete({
     *   where: {
     *     // ... filter to delete one PayoffPlan
     *   }
     * })
     *
     */
    delete<T extends PayoffPlanDeleteArgs>(args: Prisma.SelectSubset<T, PayoffPlanDeleteArgs<ExtArgs>>): Prisma.Prisma__PayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$PayoffPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PayoffPlan.
     * @param {PayoffPlanUpdateArgs} args - Arguments to update one PayoffPlan.
     * @example
     * // Update one PayoffPlan
     * const payoffPlan = await prisma.payoffPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PayoffPlanUpdateArgs>(args: Prisma.SelectSubset<T, PayoffPlanUpdateArgs<ExtArgs>>): Prisma.Prisma__PayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$PayoffPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PayoffPlans.
     * @param {PayoffPlanDeleteManyArgs} args - Arguments to filter PayoffPlans to delete.
     * @example
     * // Delete a few PayoffPlans
     * const { count } = await prisma.payoffPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PayoffPlanDeleteManyArgs>(args?: Prisma.SelectSubset<T, PayoffPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PayoffPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoffPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PayoffPlans
     * const payoffPlan = await prisma.payoffPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PayoffPlanUpdateManyArgs>(args: Prisma.SelectSubset<T, PayoffPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PayoffPlans and returns the data updated in the database.
     * @param {PayoffPlanUpdateManyAndReturnArgs} args - Arguments to update many PayoffPlans.
     * @example
     * // Update many PayoffPlans
     * const payoffPlan = await prisma.payoffPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PayoffPlans and only return the `id`
     * const payoffPlanWithIdOnly = await prisma.payoffPlan.updateManyAndReturn({
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
    updateManyAndReturn<T extends PayoffPlanUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PayoffPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PayoffPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PayoffPlan.
     * @param {PayoffPlanUpsertArgs} args - Arguments to update or create a PayoffPlan.
     * @example
     * // Update or create a PayoffPlan
     * const payoffPlan = await prisma.payoffPlan.upsert({
     *   create: {
     *     // ... data to create a PayoffPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PayoffPlan we want to update
     *   }
     * })
     */
    upsert<T extends PayoffPlanUpsertArgs>(args: Prisma.SelectSubset<T, PayoffPlanUpsertArgs<ExtArgs>>): Prisma.Prisma__PayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$PayoffPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PayoffPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoffPlanCountArgs} args - Arguments to filter PayoffPlans to count.
     * @example
     * // Count the number of PayoffPlans
     * const count = await prisma.payoffPlan.count({
     *   where: {
     *     // ... the filter for the PayoffPlans we want to count
     *   }
     * })
    **/
    count<T extends PayoffPlanCountArgs>(args?: Prisma.Subset<T, PayoffPlanCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PayoffPlanCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PayoffPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoffPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PayoffPlanAggregateArgs>(args: Prisma.Subset<T, PayoffPlanAggregateArgs>): Prisma.PrismaPromise<GetPayoffPlanAggregateType<T>>;
    /**
     * Group by PayoffPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoffPlanGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PayoffPlanGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PayoffPlanGroupByArgs['orderBy'];
    } : {
        orderBy?: PayoffPlanGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PayoffPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayoffPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PayoffPlan model
     */
    readonly fields: PayoffPlanFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for PayoffPlan.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PayoffPlanClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    entries<T extends Prisma.PayoffPlan$entriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PayoffPlan$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PayoffPlanEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the PayoffPlan model
 */
export interface PayoffPlanFieldRefs {
    readonly id: Prisma.FieldRef<"PayoffPlan", 'String'>;
    readonly userId: Prisma.FieldRef<"PayoffPlan", 'String'>;
    readonly strategy: Prisma.FieldRef<"PayoffPlan", 'String'>;
    readonly totalInterestPaid: Prisma.FieldRef<"PayoffPlan", 'Decimal'>;
    readonly estimatedPayoffDate: Prisma.FieldRef<"PayoffPlan", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"PayoffPlan", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PayoffPlan", 'DateTime'>;
}
/**
 * PayoffPlan findUnique
 */
export type PayoffPlanFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlan
     */
    select?: Prisma.PayoffPlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlan
     */
    omit?: Prisma.PayoffPlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanInclude<ExtArgs> | null;
    /**
     * Filter, which PayoffPlan to fetch.
     */
    where: Prisma.PayoffPlanWhereUniqueInput;
};
/**
 * PayoffPlan findUniqueOrThrow
 */
export type PayoffPlanFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlan
     */
    select?: Prisma.PayoffPlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlan
     */
    omit?: Prisma.PayoffPlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanInclude<ExtArgs> | null;
    /**
     * Filter, which PayoffPlan to fetch.
     */
    where: Prisma.PayoffPlanWhereUniqueInput;
};
/**
 * PayoffPlan findFirst
 */
export type PayoffPlanFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlan
     */
    select?: Prisma.PayoffPlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlan
     */
    omit?: Prisma.PayoffPlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanInclude<ExtArgs> | null;
    /**
     * Filter, which PayoffPlan to fetch.
     */
    where?: Prisma.PayoffPlanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PayoffPlans to fetch.
     */
    orderBy?: Prisma.PayoffPlanOrderByWithRelationInput | Prisma.PayoffPlanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PayoffPlans.
     */
    cursor?: Prisma.PayoffPlanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PayoffPlans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PayoffPlans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PayoffPlans.
     */
    distinct?: Prisma.PayoffPlanScalarFieldEnum | Prisma.PayoffPlanScalarFieldEnum[];
};
/**
 * PayoffPlan findFirstOrThrow
 */
export type PayoffPlanFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlan
     */
    select?: Prisma.PayoffPlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlan
     */
    omit?: Prisma.PayoffPlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanInclude<ExtArgs> | null;
    /**
     * Filter, which PayoffPlan to fetch.
     */
    where?: Prisma.PayoffPlanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PayoffPlans to fetch.
     */
    orderBy?: Prisma.PayoffPlanOrderByWithRelationInput | Prisma.PayoffPlanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PayoffPlans.
     */
    cursor?: Prisma.PayoffPlanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PayoffPlans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PayoffPlans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PayoffPlans.
     */
    distinct?: Prisma.PayoffPlanScalarFieldEnum | Prisma.PayoffPlanScalarFieldEnum[];
};
/**
 * PayoffPlan findMany
 */
export type PayoffPlanFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlan
     */
    select?: Prisma.PayoffPlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlan
     */
    omit?: Prisma.PayoffPlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanInclude<ExtArgs> | null;
    /**
     * Filter, which PayoffPlans to fetch.
     */
    where?: Prisma.PayoffPlanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PayoffPlans to fetch.
     */
    orderBy?: Prisma.PayoffPlanOrderByWithRelationInput | Prisma.PayoffPlanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PayoffPlans.
     */
    cursor?: Prisma.PayoffPlanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PayoffPlans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PayoffPlans.
     */
    skip?: number;
    distinct?: Prisma.PayoffPlanScalarFieldEnum | Prisma.PayoffPlanScalarFieldEnum[];
};
/**
 * PayoffPlan create
 */
export type PayoffPlanCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlan
     */
    select?: Prisma.PayoffPlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlan
     */
    omit?: Prisma.PayoffPlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanInclude<ExtArgs> | null;
    /**
     * The data needed to create a PayoffPlan.
     */
    data: Prisma.XOR<Prisma.PayoffPlanCreateInput, Prisma.PayoffPlanUncheckedCreateInput>;
};
/**
 * PayoffPlan createMany
 */
export type PayoffPlanCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many PayoffPlans.
     */
    data: Prisma.PayoffPlanCreateManyInput | Prisma.PayoffPlanCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PayoffPlan createManyAndReturn
 */
export type PayoffPlanCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlan
     */
    select?: Prisma.PayoffPlanSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlan
     */
    omit?: Prisma.PayoffPlanOmit<ExtArgs> | null;
    /**
     * The data used to create many PayoffPlans.
     */
    data: Prisma.PayoffPlanCreateManyInput | Prisma.PayoffPlanCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * PayoffPlan update
 */
export type PayoffPlanUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlan
     */
    select?: Prisma.PayoffPlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlan
     */
    omit?: Prisma.PayoffPlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanInclude<ExtArgs> | null;
    /**
     * The data needed to update a PayoffPlan.
     */
    data: Prisma.XOR<Prisma.PayoffPlanUpdateInput, Prisma.PayoffPlanUncheckedUpdateInput>;
    /**
     * Choose, which PayoffPlan to update.
     */
    where: Prisma.PayoffPlanWhereUniqueInput;
};
/**
 * PayoffPlan updateMany
 */
export type PayoffPlanUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update PayoffPlans.
     */
    data: Prisma.XOR<Prisma.PayoffPlanUpdateManyMutationInput, Prisma.PayoffPlanUncheckedUpdateManyInput>;
    /**
     * Filter which PayoffPlans to update
     */
    where?: Prisma.PayoffPlanWhereInput;
    /**
     * Limit how many PayoffPlans to update.
     */
    limit?: number;
};
/**
 * PayoffPlan updateManyAndReturn
 */
export type PayoffPlanUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlan
     */
    select?: Prisma.PayoffPlanSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlan
     */
    omit?: Prisma.PayoffPlanOmit<ExtArgs> | null;
    /**
     * The data used to update PayoffPlans.
     */
    data: Prisma.XOR<Prisma.PayoffPlanUpdateManyMutationInput, Prisma.PayoffPlanUncheckedUpdateManyInput>;
    /**
     * Filter which PayoffPlans to update
     */
    where?: Prisma.PayoffPlanWhereInput;
    /**
     * Limit how many PayoffPlans to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * PayoffPlan upsert
 */
export type PayoffPlanUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlan
     */
    select?: Prisma.PayoffPlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlan
     */
    omit?: Prisma.PayoffPlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanInclude<ExtArgs> | null;
    /**
     * The filter to search for the PayoffPlan to update in case it exists.
     */
    where: Prisma.PayoffPlanWhereUniqueInput;
    /**
     * In case the PayoffPlan found by the `where` argument doesn't exist, create a new PayoffPlan with this data.
     */
    create: Prisma.XOR<Prisma.PayoffPlanCreateInput, Prisma.PayoffPlanUncheckedCreateInput>;
    /**
     * In case the PayoffPlan was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PayoffPlanUpdateInput, Prisma.PayoffPlanUncheckedUpdateInput>;
};
/**
 * PayoffPlan delete
 */
export type PayoffPlanDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlan
     */
    select?: Prisma.PayoffPlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlan
     */
    omit?: Prisma.PayoffPlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanInclude<ExtArgs> | null;
    /**
     * Filter which PayoffPlan to delete.
     */
    where: Prisma.PayoffPlanWhereUniqueInput;
};
/**
 * PayoffPlan deleteMany
 */
export type PayoffPlanDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PayoffPlans to delete
     */
    where?: Prisma.PayoffPlanWhereInput;
    /**
     * Limit how many PayoffPlans to delete.
     */
    limit?: number;
};
/**
 * PayoffPlan.entries
 */
export type PayoffPlan$entriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.PayoffPlanEntryWhereInput;
    orderBy?: Prisma.PayoffPlanEntryOrderByWithRelationInput | Prisma.PayoffPlanEntryOrderByWithRelationInput[];
    cursor?: Prisma.PayoffPlanEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PayoffPlanEntryScalarFieldEnum | Prisma.PayoffPlanEntryScalarFieldEnum[];
};
/**
 * PayoffPlan without action
 */
export type PayoffPlanDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoffPlan
     */
    select?: Prisma.PayoffPlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PayoffPlan
     */
    omit?: Prisma.PayoffPlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PayoffPlanInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=PayoffPlan.d.ts.map