// Define constants for retry settings
const MAX_ATTEMPTS = 5;
const DELAY = 200;

// Function to retry asynchronous function with delay
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

// Function to set account name
async function setAccountName() {
  const source = document.querySelector(
    '[data-testid="awsc-nav-account-menu-button"] span'
  );
  if (!source) {
    throw new Error("Account name element not found");
  }
  const role = source.textContent;
  const accountName = source.title.match(/[^ ]*$/)[0];
  source.textContent = `${role} \t (${accountName})`;
}

// Function to set navbar background color based on region
async function setNavbarBackgroundColor() {
  const region = await getRegion();
  const navbar = document.querySelector("#awsc-nav-header nav");
  if (!navbar) {
    throw new Error("Navbar element not found");
  }

  if (region.textContent.includes("Ireland")) {
    navbar.style.backgroundColor = "#38a3a5";
  } else if (region.textContent.includes("Global")) {
    navbar.style.backgroundColor = "#00a8e8";
  } else {
    navbar.style.backgroundColor = "#ff9f1c";
  }
}

// Function to get region element
async function getRegion() {
  const region = document.querySelector(
    '[data-testid="awsc-nav-regions-menu-button"] span'
  );
  if (!region) {
    throw new Error("Region element not found");
  }
  return region;
}

// Retry setting account name with delay
retryFunctionWithDelay(setAccountName, MAX_ATTEMPTS, DELAY);

// Retry setting navbar background color with delay
retryFunctionWithDelay(setNavbarBackgroundColor, MAX_ATTEMPTS, DELAY);
