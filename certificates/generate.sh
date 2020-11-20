#!/bin/sh
KEY_NAME="UMS-rs512"

ssh-keygen -t rsa -b 2048 -E sha512 -m PEM -f $KEY_NAME.key
openssl rsa -in $KEY_NAME.key -pubout -outform PEM -out $KEY_NAME.pub

rm -rf $KEY_NAME.key.pub

cat $KEY_NAME.key
cat $KEY_NAME.pub
