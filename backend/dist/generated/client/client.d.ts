import * as runtime from "@prisma/client/runtime/library";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model DebtAccount
 *
 */
export type DebtAccount = Prisma.DebtAccountModel;
/**
 * Model DebtPayment
 *
 */
export type DebtPayment = Prisma.DebtPaymentModel;
/**
 * Model RecurringExpense
 *
 */
export type RecurringExpense = Prisma.RecurringExpenseModel;
/**
 * Model PayoffPlan
 *
 */
export type PayoffPlan = Prisma.PayoffPlanModel;
/**
 * Model PayoffPlanEntry
 *
 */
export type PayoffPlanEntry = Prisma.PayoffPlanEntryModel;
/**
 * Model Notification
 *
 */
export type Notification = Prisma.NotificationModel;
/**
 * Model PlaidItem
 *
 */
export type PlaidItem = Prisma.PlaidItemModel;
//# sourceMappingURL=client.d.ts.map