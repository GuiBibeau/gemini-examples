import { googleGenAi } from "./utils";

async function codeExecutionExample() {
  const codeModel = googleGenAi.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25",
    tools: [
      {
        codeExecution: {},
      },
    ],
  });
  const codePrompt = `Calculate the retirement age for a 35-year-old individual with 300,000 CAD currently invested entirely in US total stock market ETFs. The individual plans to contribute an additional 40,000 CAD annually: 7,000 CAD to a TFSA, 20,000 CAD to an RRSP, and the remaining 13,000 CAD to a non-registered account.

Assume an average nominal annual investment return of 7% before taxes and fees, and an average annual inflation rate of 2%. The desired retirement income is 65,000 CAD per year, adjusted annually for inflation.

The retirement plan involves a variable withdrawal strategy, potentially starting around a 4% withdrawal rate but adjusting based on portfolio performance and remaining life expectancy (assume planning until age 95).

Factor in simplified Canadian tax implications:
- TFSA: Growth and withdrawals are tax-free.
- RRSP: Contributions are tax-deductible (assume a marginal tax rate of 30% during contribution years, providing a tax refund that is *not* reinvested for simplicity in this model), growth is tax-deferred, withdrawals in retirement are taxed as income (assume an average retirement tax rate of 25%).
- Non-registered: Assume investment growth is subject to an average effective tax rate of 15% annually on returns (dividends and capital gains), applied to the 7% nominal growth.

Determine the earliest approximate age the individual can retire while sustaining the desired inflation-adjusted income until age 95. Generate and execute Python code to model this scenario, track the balances in each account type separately, and find the retirement age. Clearly state any assumptions made in the calculation, especially regarding withdrawal order from different account types in retirement.`;

  const codeResult = await codeModel.generateContent(codePrompt);
  const codeResponse = await codeResult.response;
  console.log("\n--- Code Execution (within prompt) ---");
  console.log(codeResponse.text());
}

codeExecutionExample();
