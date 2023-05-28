FROM gitpod/workspace-node-lts
USER gitpod

RUN sudo apt-get update && \
    sudo apt-get install -y zsh && \
    sudo rm -rf /var/lib/apt/lists/*
