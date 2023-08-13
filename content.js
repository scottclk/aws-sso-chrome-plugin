const main = async () => {
  // Need to ensure the DOM has loaded fully
  // TODO: Make this more dynamic.
  await new Promise((r) => setTimeout(r, 1000));

  const source = document.querySelector(
    '[data-testid="awsc-nav-account-menu-button"] span'
  );

  if (source) {
    const role = source.textContent;
    const accountName = source.title.match(/[^ ]*$/)[0];
    source.textContent = `${role} \t (${accountName})`;
  }
};

main();
