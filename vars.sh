#!/bin/sh
ORGANIZATION=meritoki
NAME=web
VERSION="0.1"
TAG="v$VERSION"
DATE_TIME=$(date +"%Y%m%d%H")
ID=$DATE_TIME
ROOT=/var/www/meritbuilders/
APP=$NAME
LINK="${ROOT}${APP}"
USER="root"
PASSWORD="ncrsb"
DATABASE=$NAME
HOST="localhost"
BACKUP_PATH="./model/relational/backup"
LOAD_PATH="model/relational"
COMPILE_PATH="model/"
INSTALL=$(pwd)
LOG_PATH="/var/log/$ORGANIZATION/$NAME/"
#util
TAR=$(which tar)
GUNZIP=$(which gunzip)
MYSQL=$(which mysql)
RM=$(which rm)
MKDIR=$(which mkdir)
MYSQLDUMP=$(which mysqldump)
MV=$(which mv)
JAVA=$(which java)