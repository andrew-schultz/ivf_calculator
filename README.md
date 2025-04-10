To Build and Run:

1) Clone the repo to your preferred repo.
2) Build the Frontend by following these commands:
    - `cd client`
    - `npm install`
    - `npm run build`
3) Navigate to the Backend directory to build and start the app by following these commands from your current location in the terminal:
    - `cd ..`
    - `cd sunfish`
    - `pip install -r requirements.txt`
    - `python manage.py migrate`
    - `python mange.py runserver`
4) Access the app at `localhost:8000`

To update frontend code:
1) Navigate to the `client` directory
2) Run the following command to build the FE code:
    - `npm run build`