/**
 * Simulates a real M-Pesa STK Push API call.
 * In a real-world application, this function would make a POST request to your backend,
 * which would then securely communicate with the Safaricom M-Pesa API.
 * This simulation includes different outcomes based on the phone number for realistic testing.
 * 
 * Test Numbers:
 * - `0746079270`: Simulates a successful transaction (the designated "receipt" number).
 * - `254700000001`: Simulates user cancellation.
 * - `254700000002`: Simulates a transaction timeout.
 * - Any other valid number: Simulates a failed transaction for an unregistered number.
 * 
 * @param phoneNumber The phone number to receive the STK push.
 * @param amount The amount to be paid.
 * @returns A promise that resolves on successful payment simulation, and rejects on failure.
 */
export const initiateStkPush = (phoneNumber: string, amount: number): Promise<string> => {
  console.log(`Initiating STK Push for ${phoneNumber} with amount ${amount}`);
  
  return new Promise((resolve, reject) => {
    // Basic validation, now allows numbers starting with 07...
    if (!/^(254|0)?[7]\d{8}$/.test(phoneNumber)) {
      return reject(new Error('Invalid phone number format. Use a valid Safaricom number.'));
    }

    // Normalize phone number to last 9 digits for consistent testing
    const testNumber = phoneNumber.slice(-9);

    if (testNumber === '700000001') {
      // Simulate user cancellation
      setTimeout(() => {
        console.log('Simulation: User cancelled the transaction.');
        reject(new Error('The transaction was cancelled by the user.'));
      }, 3000); // Cancellation is usually quick
    } else if (testNumber === '700000002') {
      // Simulate a timeout
      setTimeout(() => {
        console.log('Simulation: Transaction timed out.');
        reject(new Error('The transaction timed out. Please try again.'));
      }, 10000); // Timeouts take longer
    } else if (testNumber === '746079270') {
        // Simulate a successful payment with the designated receipt number
        setTimeout(() => {
            console.log('Simulation: Payment successful.');
            resolve(`Payment of ${amount} for number ${phoneNumber} was successful.`);
        }, 5000); // Simulate a 5-second delay for user to enter PIN and for processing
    } else {
        // Simulate a failure for any other number not registered for the test
        setTimeout(() => {
            console.log('Simulation: Phone number not registered for testing.');
            reject(new Error('This phone number is not registered for this payment simulation.'));
        }, 2000);
    }
  });
};
