import { OrderItemData } from "../types/order";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 3,
});
export const calculateOrderCost = (items: OrderItemData[]) => {
  console.log(items);
  let total = 0;
  items.forEach(({ quantity, price }) => {
    const itemCost = Number(currencyFormatter.format(price * quantity));
    total = Number(currencyFormatter.format(total + itemCost));
  });

  return total;
};
