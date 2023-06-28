# ubuntu 22.04 이용
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y software-properties-common
RUN apt-get install -y git

WORKDIR /app
RUN git clone https://github.com/hyeokjonghan/cal_lostark.git

# npm setting
ENV NVM_DIR /root/.nvm
ENV PATH $NVM_DIR/versions/node/v18.14.0/bin:$PATH
RUN apt-get install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# install pm2
RUN . /root/.nvm/nvm.sh \
    && echo "source ${NVM_DIR}/nvm.sh" >> /root/.bashrc \
    && nvm install 18.14.0 \
    && npm install -g pm2

WORKDIR /app/cal_lostark
RUN npm install
RUN npm run build

EXPOSE 3001

CMD ["tail", "-f", "/dev/null"]