async function initiateComponent() {
    // 1. Create an instance of AdyenCheckout
    const checkout = await AdyenCheckout({});

    // 2. Create and mount the Component
    const googlepay = checkout
        .create('googlepay', {
            showPayButton: true,
            environment: 'TEST', // Google Pay environment
            configuration: {
                gatewayMerchantId: '50', // name of your Adyen Merchant account
                merchantName: 'AdyenTechSupport_CarltonTest_TEST' // Name to be shown
                // merchantIdentifier: '' // Required in Production environment. Google's merchantId: https://developers.google.com/pay/api/web/guides/test-and-deploy/deploy-production-environment#obtain-your-merchantID
            },

            // Events
            onSubmit: (state, component) => {
                // Submit Payment
                console.log(state.data);

                // updateStateContainer(state); // Demo purposes only
            },
            onError: error => {
                console.error(error);
            }
        })
        // Normally, you should check if Google Pay is available before mounting it.
        // Here we are mounting it directly for demo purposes.
        // Please refer to the documentation for more information on Google Pay's availability.
        .mount('#googlepay-container');
}
initiateComponent()