FROM nginx

RUN apt-get update && \
    apt-get install curl gnupg python -y && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get update && \
    apt-get install nodejs npm -y

RUN mkdir /app
ADD . /app
RUN cd /app && \
    npm install && \
    npm run build

RUN cp -a /app/dist/* /usr/share/nginx/html && \
    rm -rf ./app

RUN apt-get remove --purge -y curl gnupg python nodejs make && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

COPY nginx.conf /etc/nginx/nginx.conf
