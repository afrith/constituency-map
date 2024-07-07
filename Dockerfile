FROM nginx:stable
COPY nginx-config /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
EXPOSE 8000