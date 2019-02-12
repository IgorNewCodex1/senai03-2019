import {prompt} from 'inquirer';

export class Perguntas {
    public facaUmaPergunta(){
        prompt(
            [
                {
                    name: 'name',
                    type: 'input',
                    message: 'qual o seu nome',
                },
                {
                    name: 'name',
                    type: 'input',
                    message: 'Qual o seu telefone',
                },
                {
                    name: 'car',
                        type: 'list',
                        message: 'Qual sabor você gostaria?',
                        choices: ['Clabresa', 'Frango', '4 queijos', 'Coração', 'Portuguesa'],
                        default: 3,
                },
                {
                    name: 'name',
                    type: 'input',
                    message: 'Qual o tamanho da pizza? você pode escolher entre\n Pequena \nMédia \nGrande ', 
                },
                {
                    name: 'name',
                    type: 'input',
                    message: 'Quantas pizzas ?',
                },
                {
                    name: 'name',
                    type: 'input',
                    message: 'Gostaria que nós entregássemos?',
                }
            ]
        ).then(
                (
                    (answers : any) =>{
                        console.log(`\nOlá  ${answers.name}!\n`);

                    }
                )
        )
    }
}