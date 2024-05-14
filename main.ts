#!/usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";

async function getUserInput() {
    const res = await inquirer.prompt([
        {
            name: "userinput",
            type: "input",
            message: "Please enter the number of seconds:",
            validate: (input) => {
                const num = parseInt(input, 10);
                if (isNaN(num)) {
                    return "Please enter a number";
                } else if (num > 60) {
                    return "The number should be less than 60 seconds";
                } else {
                    return true;
                }
            }
        }
    ]);

    return parseInt(res.userinput, 10);
}

function startTime(val: number) {
    const endTime = new Date().getTime() + val * 1000;

    const intervalId = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDiff = Math.max(0, Math.floor((endTime - currentTime) / 1000));

        if (timeDiff <= 0) {
            console.log("Timer has expired");
            clearInterval(intervalId);
            process.exit(); 
        }

        const min = Math.floor((timeDiff % 3600) / 60);
        const sec = timeDiff % 60;
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000);
}

async function main() {
    const time = await getUserInput();
    startTime(time);
}

main();
