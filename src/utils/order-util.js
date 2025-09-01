

export const createOrderRequest = (cartItems, userId, addressId) => {
    let request = {};
    request.userId = userId;
    request.addressId = addressId;
    request.orderDate = new Date().toISOString();
    let orderItems = [];
    let amount = 0;
    cartItems?.map((item) => {
        amount += item?.subTotal;
        orderItems.push({
            productId: item.id,
            productVariantId: item?.variant?.id,
            discount: 0,
            quantity: item.quantity
        });
    });
    request.orderItemRequests = orderItems;
    request.totalAmount = amount?.toFixed(2);
    request.discount = 0;
    request.paymentMethod = 'CARD';
    request.expectedDeliveryDate = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();
    request.currency = 'USD';
    return request;
}