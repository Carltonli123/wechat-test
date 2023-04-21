FROM node:18-alpine
RUN yarn install --production
CMD ["node", "index.js"]
EXPOSE 80