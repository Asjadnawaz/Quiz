#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

const apilink: string  = "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";

let fetchData = async (data: string) => {

    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
}

let data = await fetchData(apilink);

let startQuiz = async () => {
    
    let score: number = 0;
    //for username

    let name = await inquirer.prompt({
        message: "What is your name?",
        type: "input",
        name: "fname"
    });

    for (let i = 1; i < 6; i++){

        let answers = [...data[i].incorrect_answers, data[i].correct_answer];

        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message:data[i].question,
            choices: answers.map((val:any)=> val)
        });

        if(ans.quiz == data[i].correct_answer) {

            ++score;
            console.log(chalk.bold.italic.green("Correct"));

        } else {

            console.log(`The Correct Answer is ${chalk.bold.italic.red(data[i].correct_answer)}`)
        }
    }

    console.log(`Dear ${chalk.green(name.fname)} Your score is: ` + score);
};

startQuiz();