function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <p className="summary-balance-label">Balance</p>
      <p className="summary-balance-amount">{balance < 0 ? `-$${Math.abs(balance).toLocaleString()}` : `$${balance.toLocaleString()}`}</p>
      <div className="summary-sub">
        <span className="income-stat">↑ ${totalIncome.toLocaleString()}</span>
        <span className="summary-dot">·</span>
        <span className="expense-stat">↓ ${totalExpenses.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default Summary
