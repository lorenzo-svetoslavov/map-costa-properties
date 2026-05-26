import { defineCollection } from "astro:content";
import { z } from 'astro/zod';
import { glob } from "astro/loaders";

const properties = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/properties",
  }),

  schema: z.object({
    title: z.string(),
    operacion: z.enum(["Venta", "Alquiler", "Alquiler temporal"]),
    tipo: z.enum(["Casa", "Departamento", "Local comercial", "Oficina", "Terreno", "PH"]),
    estado: z.enum(["Disponible", "Reservado", "Vendido/Alquilado"]).default("Disponible"),
    precio: z.number(),
    superficie_total: z.number(),
    superficie_cubierta: z.number().optional(),
    ambientes: z.number().optional(),
    dormitorios: z.number().optional(),
    banos: z.number().optional(),
    cochera: z.boolean().default(false),
    ubicacion: z.object({
      direccion: z.string(),
      barrio: z.string(),
      ciudad: z.string(),
      provincia: z.string(),
    }),
    imagenes: z.array(z.string()).optional(),
    imagen_destacada: z.string(),
    destacada: z.boolean().default(false),
  }),
});

export const collections = {
  properties,
};