const resources = [
  {
    title: "How to connect accounts securely",
    content:
      "We use Plaid to provide read-only access to your creditors. Learn how Plaid keeps your credentials encrypted and how to revoke access anytime.",
    link: "https://plaid.com/safety/",
  },
  {
    title: "Debt payoff strategies explained",
    content:
      "Understand Avalanche vs. Snowball vs. Balanced strategies so you can pick the repayment style that fits your motivation and cash flow.",
    link: "https://www.investopedia.com/ask/answers/100214/what-are-differences-between-debt-snowball-and-debt-avalanche-methods.asp",
  },
  {
    title: "Avoiding missed payments",
    content:
      "Set up autopay for minimums, rely on our reminders for statement balances, and keep an eye on your cash cushion to stay current.",
    link: "https://consumer.ftc.gov/articles/how-avoid-late-payment-fees",
  },
];

const faqs = [
  {
    question: "Is my data secure?",
    answer:
      "Yes. We never store or see your banking credentials. Plaid provides a token that grants read-only access to balances, rates, and due dates.",
  },
  {
    question: "Can I use Clarity Planner for free?",
    answer:
      "Absolutely. There are no subscriptions or paywalls. Our goal is to help you avoid interest and fees without adding to your obligations.",
  },
  {
    question: "How often is the plan updated?",
    answer:
      "Any time your balances change or you adjust your budget, you can regenerate the plan. We recommend refreshing after statements close.",
  },
];

export const HelpPage = () => (
  <div className="space-y-8">
    <section className="rounded-3xl bg-white p-6 shadow-card">
      <h2 className="text-lg font-semibold text-slate-900">Guided onboarding</h2>
      <p className="text-sm text-slate-500">
        Follow these steps to unlock the full value of the Debt & Expense Optimizer.
      </p>
      <ol className="mt-6 list-decimal space-y-3 pl-6 text-sm text-slate-700">
        <li>Connect all credit cards, loans, and BNPL accounts via Plaid.</li>
        <li>Add any manual debts that are not available through Plaid.</li>
        <li>Track recurring expenses so you never miss a payment window.</li>
        <li>Set a safe-but-ambitious monthly payoff budget and generate your plan.</li>
        <li>
          Review AI coaching tips and adjust as life changes—your plan can be regenerated anytime.
        </li>
      </ol>
    </section>

    <section className="rounded-3xl bg-white p-6 shadow-card">
      <h2 className="text-lg font-semibold text-slate-900">Helpful resources</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {resources.map((resource) => (
          <a
            key={resource.title}
            href={resource.link}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-primary-200 hover:bg-white hover:shadow-card"
          >
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-primary-600">
              {resource.title}
            </h3>
            <p className="mt-2 text-xs text-slate-500">{resource.content}</p>
          </a>
        ))}
      </div>
    </section>

    <section className="rounded-3xl bg-white p-6 shadow-card">
      <h2 className="text-lg font-semibold text-slate-900">Frequently asked questions</h2>
      <div className="mt-4 space-y-4">
        {faqs.map((faq) => (
          <div key={faq.question} className="rounded-2xl border border-slate-200 p-4">
            <p className="text-sm font-semibold text-slate-900">{faq.question}</p>
            <p className="mt-1 text-sm text-slate-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);
