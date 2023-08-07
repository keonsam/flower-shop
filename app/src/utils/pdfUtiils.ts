import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Customer } from "../types/customer";
import { Order } from "../types/order";

export function customerOrderDocDefinition(
  customer: Customer,
  orders: Order[]
): TDocumentDefinitions {
  return {
    content: [
      {
        text: "Customer Information",
        style: "header",
        fontSize: 34,
        bold: true,
        margin: [0, 10, 0, 20],
      },
      { text: `${customer.name}`, fontSize: 16, margin: [0, 5] },
      { text: `${customer.email}`, fontSize: 16, margin: [0, 5] },
      { text: `${customer.phoneNumber}`, fontSize: 16, margin: [0, 5] },
      { text: `${customer.location}`, fontSize: 16, margin: [0, 5] },
      { text: "Orders:", fontSize: 16, margin: [0, 10] },
      {
        ol: orders.map((order) => ({
          text: JSON.stringify(order),
          fontSize: 14,
          margin: [0, 5],
        })),
      },
    ],
    defaultStyle: {
      font: "Roboto",
    },
  };
}
