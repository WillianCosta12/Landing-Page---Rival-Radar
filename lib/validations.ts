import { z } from 'zod'

/**
 * Schema de validação do e-mail — usado no server (segurança real)
 * e pode ser importado no client para feedback imediato de UX.
 */
export const waitlistSchema = z.object({
  email: z
    .string({ required_error: 'E-mail é obrigatório.' })
    .email('Informe um e-mail válido.')
    .min(5, 'E-mail muito curto.')
    .max(254, 'E-mail muito longo.')
    .toLowerCase()
    .trim(),
})

export type WaitlistInput = z.infer<typeof waitlistSchema>
