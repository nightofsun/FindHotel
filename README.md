# KaleCare
kalecare is project to management kale farm
## Install farm controller
this code for running on raspberry pi 4 model b
copy code from folder src/control_fram to your raspberry pi
install library from
https://pypi.org/project/pymodbus/
open terminal and follow this command
```bash
pip install mongodb
pip install pymongo
python3 main_run.py
```

## Install server
have two way to install
### use docker
you can pull docker image from nightofsun/kale_farm:server
```bash
docker pull nightofsun/kale_farm:server
docker run -dit –-restart unless-stopped –-name kale_server -p 1999:1999 nightofsun/kale_farm:server
```
### use source code
have 4 step to install
#### 1 create app
create project by command
```bash
sudo apt-get install npm -y
npm init
```
#### 2 install library
install library by command
```bash
npm i bcrypt@5.0.1 --save
npm i express@4.17.1 --save
npm i google-auth-library@7.10.3 --save
npm i mongoose@5.12.7 --save
npm i morgan@1.10.0 --save
```
#### 3 copy code
copy code from floder src/code_server to floder /src
#### 4 run
run server
```bash
npm start /src/server.js
```
## Install web application
have two way to install
### use docker
you can pull docker image from nightofsun/kale_farm:webserver
```bash
docker pull nightofsun/kale_farm:webserver
docker run -dit –-restart unless-stopped –-name kale_webserver -p 2000:2000 nightofsun/kale_farm:webserver
```
### use source code
have 4 step to install
#### 1 create app
create project by command
```bash
sudo apt-get install npm -y
npx create-react-app kalecare
cd kalecare
```
#### 2 install library
install library by command
```bash
npm i axois@0.24.0 --save
npm i bootstrap@5.1.3 --save
npm i chart.js@3.6.1 --save
npm i react-bootstrap@2.0.1 --save
npm i react-chartjs-2@4.0.0 --save
npm i react-chat-elements@10.16.0 --save
npm i react-dom@17.0.2 --save
npm i react-google-login@5.2.2 --save
npm i react-icons@4.3.1 --save
npm i react-router-dom@5.2.0 --save
npm i react-scroll-to-bottom@4.2.0 --save
npm i @react-icons/all-files@4.1.0 --save
```
#### 3 copy code
copy code from floder src/code_webserver to floder /src
#### 4 run
run server
```bash
npm start
```
## How to use find pest models
have 3 step to use find pest models
#### 1 copy code
copy file from /src/model
#### 2 install library
```bash
pip install tensorflow
pip install keras
pip install opencv-python
```
#### 3 use model
you can use model by this command
```bash
python3 findpest.py <path> <filename>
```
example python3 findpest.py ./img/ cutworm.jpg
