# Stage 1
FROM node:10 as react-build
WORKDIR /app
COPY . ./
RUN npm set registry https://registry.npmjs.org/
RUN npm config delete proxy
RUN npm install
RUN npm run build

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
