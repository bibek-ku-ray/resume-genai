import { treeifyError, z } from 'zod'

const Env = z.object({
  PORT: z.string().default("5001"),
  MONGOOSE_URI: z.string(),
  JWT_SECRET: z.string()
})

const parsed = Env.safeParse(process.env)

if (parsed.error) {
  console.error("❌ Invalid environment variables");
  console.error(treeifyError(parsed.error));
  process.exit(1);
}


export const env = parsed.data