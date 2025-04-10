### To Build and Run:

#### Prerequisites:
- have npm installed
- have python >= 3.9 installed (earlier 3.x versions may work but are untested)
- have pip installed

1) Clone the repo to your local machine and `cd` into the `ivf_calculator` dir
2) Build the Frontend by following these commands:
    - `cd client`
    - `npm install`
    - `npm run build`
3) Navigate to the Backend directory to build and start the app by following these commands from your current location in the terminal:
    - `cd ..`
    - `cd sunfish`
    - `python -m venv ./venv`
    - `source ./venv/bin/activate`
    - `pip install -r requirements.txt`
    - `python manage.py migrate`
    - `python manage.py runserver`
4) Access the app in a browser at `localhost:8000`


### To update frontend code:
1) Navigate to the `client` directory
2) Run the following command to build the FE code:
    - `npm run build`


### For Development:
1) In one terminal window, navigate to the `client` dir and run `npm run start` to launch the Frontend with live reload enabled.
    - the Frontend can be accessed at `localhost:3000`
2) In a second terminal window, navigate to the `sunfish` dir and run `python manage.py runserver` to start the Backend server.
    - the Backend will be served on `localhost:8000`
