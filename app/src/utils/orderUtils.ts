import { Flower } from "../types/flower";
import { Order, OrderItemData } from "../types/order";

export const calculateOrderCost = (items: OrderItemData[]) => {
  let total = 0;

  items.forEach(({ quantity, price }) => {
    if (price) {
      const itemCost = Math.floor(price * quantity * 100) / 100;
      total = Math.floor((total + itemCost) * 100) / 100;
    }
  });

  return total;
};

export const calcStats = (orders?: Order[], flowers?: Flower[]) => {
  // Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday,
  const orderByDaysOfWeek = [0, 0, 0, 0, 0, 0, 0];
  // Rose, Lily, Tulip, Orchid, Carnation
  const ordersByFlowers = [0, 0, 0, 0, 0, 0];

  if (!orderByDaysOfWeek || !flowers) {
    return {
      orderByDaysOfWeek,
      ordersByFlowers,
    };
  }

  if (orders) {
    orders.forEach(({ deliveryTime, items }) => {
      const day = new Date(deliveryTime).getDay();
      orderByDaysOfWeek[day]++;

      if (items) {
        items.forEach(({ flowerId }) => {
          const flower = flowers.find(({ id }) => id === flowerId);
          if (!flower) return;
          switch (flower.name) {
            case "Rose":
              ordersByFlowers[0]++;
              break;
            case "Lily":
              ordersByFlowers[1]++;
              break;
            case "Tulip":
              ordersByFlowers[2]++;
              break;
            case "Orchid":
              ordersByFlowers[3]++;
              break;
            case "Carnation":
              ordersByFlowers[4]++;
              break;
          }
        });
      }
    });
  }

  return {
    orderByDaysOfWeek,
    ordersByFlowers,
  };
};
