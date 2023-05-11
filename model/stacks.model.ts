import { z } from "zod";

const stackSchema = z.object({
  key: z.string(),
  name: z.string(),
  description: z.string(),
});
