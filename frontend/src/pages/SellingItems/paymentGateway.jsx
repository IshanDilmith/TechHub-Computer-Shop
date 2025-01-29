import axios from "axios";
import React, { useEffect, useState, useContext, forwardRef, useImperativeHandle } from "react";
import toast, { Toaster } from "react-hot-toast";


const PaymentGateway = forwardRef(({amount}, ref) => {
    const [isModelOpen, setIsModelOpen] = useState(false);

    const initiatePayment = async () => {
        try {
            console.log("Initiating payment for amount:", amount);
            const response = await axios.get('http://localhost:3000/payment/success');
            const responseData = response.data;

            const payment = {
                sandbox: true,
                merchant_id: responseData.merchantId,
                return_url: responseData.return_url,
                cancel_url: responseData.cancel_url,
                notify_url: responseData.notify_url,
                first_name: responseData.first_name,
                last_name: responseData.last_name,
                email: responseData.email,
                phone: responseData.phone,
                address: responseData.address,
                city: responseData.city,
                country: responseData.country,
                order_id: responseData.orderId,
                items: responseData.items,
                amount: amount,
                currency: responseData.currency,
                hash: responseData.hash,
            }

            window.payhere.onCompleted = function (orderId) {
                toast.success("Payment completed. Order ID: " + orderId);
                console.log("Payment completed. Order ID: " + orderId);
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            };

            window.payhere.onDismissed = function () {
                console.log("Payment dismissed");
                setIsModelOpen(true);
            };

            window.payhere.onError = function (error) {
                toast.error("Error occurred. " + error);
                console.log("Error: " + error);
                setTimeout(() => {
                    window.location.href = '/profile';
                }, 2000);
            };

            window.payhere.startPayment(payment);
        } catch (err) {
            console.error(err);
        }
    };

    useImperativeHandle(ref, () => ({
        initiatePayment
    }));

    const handleConfirm = () => {
        setIsModelOpen(false);
        
    };

    const handleCancel = () => {
        setIsModelOpen(false);
        window.location.href = '/'; 
    };

    return (
        <>
        <Toaster />
        {isModelOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                    <h2 className="text-lg font-semibold mb-4">Do you still want to pay?</h2>
                    <div className="flex justify-between">
                        <button 
                            onClick={handleConfirm} 
                            className={`bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={loading}
                        >
                            Yes
                        </button>
                        <button 
                            onClick={handleCancel} 
                            className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
    );

});
PaymentGateway.displayName = 'PaymentGateway';
export default PaymentGateway;