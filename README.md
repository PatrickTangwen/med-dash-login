## Instructions for Running the Website Locally
If you haven't install Node.js in your computer,please download it from the following url:<br>
[Node.js](https://nodejs.org/en/download)

1. Open your terminal<br> 
2. Navigate to the main directory by typing the following command:<br>
```cd med-dash-login```
3. Install the necessary dependencies:<br>
```npm install```<br>
```pip install -r requirements.txt```<br>
4. Enter src directory, create a new folder called "vital_csvs".
5. Run the following command to fetch data:<br>
```python pull_data.py```<br>
```python process_vital_data.py analysis```<br>
6. Start the server:<br>
```npm run dev```
7. After starting the server, you will see the URL of the local host displayed in the terminal.<br>
8. Copy and paste this URL into your web browser's address bar.<br>
9. You should now be able to access and interact with the website locally in your browser.
10. As for now, the username and password is fixed. Please use ```13800000002``` for username and ```246810``` for the password.
