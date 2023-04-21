FROM alpine:3.14
# Comment
RUN echo 'we are running some # of cool things'
CMD ["npm", "start"]
EXPOSE 80