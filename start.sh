#!/bin/bash

mongosh blockvote --eval "printjson(db.dropDatabase())"  

cd server
npm start &

cd ../client
#serve -s dist -l 5173 &
npm run dev &



wait

while true: do
	sleep 1
done
