import { z } from "zod";

const projectSchema = z.object({
  key: z.string(),
  title: z.string(),
  description: z.string(),
});
