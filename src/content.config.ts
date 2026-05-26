import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const properties = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/properties",
  }),

  schema: z.object({
    title: z.string(),
    price: z.number(),
    city: z.string(),
    rooms: z.number(),
    bathrooms: z.number(),
    images: z.array(z.string()).optional(),
  }),
});

export const collections = {
  properties,
};