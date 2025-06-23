export default function ReconcileFiles({ user }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success
      resolve({
        message: `Reconciliation is successful for user ${user}. Go to Recent Reconciliation to view the results.`,
      });

      // To simulate an error, comment the above and uncomment below:
      // reject({ message: "Reconciliation failed due to a server error." });
    }, 2000); // 2 seconds delay
  });
}
