#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

FROM node:10

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive


# Configure apt and install packages
RUN apt-get update \
    && apt-get -y install --no-install-recommends apt-utils 2>&1 \ 
    #
    # Verify git and needed tools are installed
    && apt-get install -y git procps \
    #
    # Remove outdated yarn from /opt and install via package 
    # so it can be easily updated via apt-get upgrade yarn
    && rm -rf /opt/yarn-* \
    && rm -f /usr/local/bin/yarn \
    && rm -f /usr/local/bin/yarnpkg \
    && apt-get install -y curl apt-transport-https lsb-release \
    && curl -sS https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/pubkey.gpg | apt-key add - 2>/dev/null \
    && echo "deb https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get -y install --no-install-recommends yarn \
    #
    # Install eslint globally
    && npm install -g eslint \
    #
    ## Install Truffle
    && npm install truffle \
    #
    ## Install IPFS
    && wget https://github.com/ipfs/go-ipfs/releases/download/v0.4.21/go-ipfs_v0.4.21_linux-386.tar.gz \
    && tar xvfz go-ipfs_v0.4.21_linux-386.tar.gz \
    && cd go-ipfs \
    && ./install.sh \
    #
    && npm install -g ganache-cli \
    #
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Swarm TCP; should be exposed to the public
EXPOSE 4001
# # Daemon API; must not be exposed publicly but to client services under you control
EXPOSE 5001
# # Web Gateway; can be exposed publicly with a proxy, e.g. as https://ipfs.example.org
EXPOSE 8080
# # HTTP serve
EXPOSE 8081
#Ganache
EXPOSE 8545


COPY start.sh start.sh 

ENTRYPOINT ./start.sh 

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=dialog