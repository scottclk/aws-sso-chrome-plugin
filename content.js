async function retryFunctionWithDelay(func, maxAttempts, delay) {
  for (let attempts = 0; attempts < maxAttempts; attempts++) {
    try {
      await func();
      break; // If successful, break out of the loop
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

async function getAccountName() {
  const source = document.querySelector(
    '[data-testid="awsc-nav-account-menu-button"] span'
  );

  if (source) {
    const role = source.textContent;
    const accountName = source.title.match(/[^ ]*$/)[0];
    source.textContent = `${role} \t (${accountName})`;
  } else {
    throw new Error("No account name found");
  }
}

// The Account Name is dynamically loaded to the AWS Consolve from a script
// so we grep the page every second for a maximum of 5 seconds to ensure its loaded.
retryFunctionWithDelay(getAccountName, 5, 1000);
