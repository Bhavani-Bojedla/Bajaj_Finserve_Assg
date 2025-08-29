require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FULL_NAME = "Bhavani_Bojedla";
const DOB = "20042005";
const EMAIL = "bhavanibojadla8@gmail.com";
const ROLL_NUMBER = "22BCE9957";

function reverseAlternatingCaps(str) {
  let res = "";
  let toggle = true;
  for (let i = str.length - 1; i >= 0; i--) {
    res += toggle ? str[i].toUpperCase() : str[i].toLowerCase();
    toggle = !toggle;
  }
  return res;
}

app.post("/bfhl", (req, res) => {
  try {
    const inputData = req.body.data;

    if (!Array.isArray(inputData)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. 'data' must be an array",
      });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let alphabetsConcat = "";

    inputData.forEach((item) => {
      if (/^\d+$/.test(item)) {
        let num = parseInt(item, 10);
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        alphabetsConcat += item;
      } else {
        special_characters.push(item);
      }
    });

    const response = {
      is_success: true,
      user_id: `${FULL_NAME.toLowerCase()}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: reverseAlternatingCaps(alphabetsConcat),
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      is_success: false,
      message: "Internal server error",
    });
  }
});

app.get("/", (req, res) => {
  res.send("API is running. Use POST /bfhl");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
