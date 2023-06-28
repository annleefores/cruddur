FROM public.ecr.aws/lambda/nodejs:18.2023.06.12.16 as builder
WORKDIR /app

COPY . .
RUN npm ci && npm run build

FROM public.ecr.aws/lambda/nodejs:18.2023.06.12.16 as runner
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.7.0 /lambda-adapter /opt/extensions/lambda-adapter

ENV PORT=3000 NODE_ENV=production
# run
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
RUN ln -s /tmp/cache ./.next/cache

ENTRYPOINT ["npm", "run", "start", "--loglevel=verbose", "--cache=/tmp/npm"]