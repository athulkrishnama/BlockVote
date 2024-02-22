#!/bin/bash

mongosh blockvote --eval "printjson(db.dropDatabase())"  

cd contracts
truffle migrate
wait
truffle develop &
sleep 5
cd ../server
npm start &

cd ../client
npm run dev &



wait

while true: do
	sleep 1
done
