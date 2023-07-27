import { Knex } from "knex";
import {
  FLOWER_TABLE_NAME,
} from "../table_names";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(FLOWER_TABLE_NAME).del();

  // Inserts initial user accounts
  await knex(FLOWER_TABLE_NAME).insert([
    {
      name: "Rose",
      price: 3.53,
      description:
        "Make any occasion a memorable one for you and your loved ones! Send stunning roses to them and let them know you remember their day. Our long-lasting roses have the beauty of true flowers that will never wither, representing your love is forever. Let our box roses be the metaphor for your love! Our roses that last forever are not only suitable as gifts but also make a wonderful centerpiece decor for your home. With our wide variety of products, we offer you various solutions for any occasion!",
    },
    {
      name: "Lily",
      price: 7.99,
      description:
        "On the most special of days, show those closest to you how much you think of them through the language of flowers from Benchmark Bouquets. Featuring a marvelous mix of roses and classic white oriental lilies that says your heart is 'true and pure,' This magnificent bouquet represents the unity you share with the others. All roses from our farms are Rainforest Alliance Certified signifying environmental, social and economic responsibility.",
    },
    {
      name: "Tulip",
      price: 5.25,
      description:
        "You can also use them to brighten up your living room, bedroom, bathroom, kitchen, dining area, breakfast nook, garden, covered porch, backyard deck,sitting area, office cubicle, office conference room, office reception area, dinner theatre, classroom and so on.",
    },
    {
      name: "Orchid",
      price: 9.99,
      description:
        "Phalaenopsis discourse: I love you, a symbol of noble, elegant. Best gift for your loved ones at Christmas, Valentine's day, Thanksgiving, Mother’s Day, Father’s Day etc",
    },
    {
      name: "Carnation",
      price: 8.37,
      description:
        "All our flowers and roses are cut specially for you, your loved one or special event. Grown in state-of-the-art greenhouses, you will have the freshest and most beautiful blossoms you can possibly find. Beautiful, rich vibrant color with dewy petals that will be delivered in pristine condition.",
    },
  ]);
}
