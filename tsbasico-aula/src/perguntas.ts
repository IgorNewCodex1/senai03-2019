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
                    name: 'telefone',
                    type: 'input',
                    message: 'Qual o seu telefone',
                },
                {
                    name: 'sabor',
                        type: 'list',
                        message: 'Qual sabor você gostaria?',
                        choices: ['Clabresa', 'Frango', '4 queijos', 'Coração', 'Portuguesa'],
                        default: 0,
                },
                {
                    name: 'tamanho',
                        type: 'list',
                        message: 'Qual sabor você gostaria?',
                        choices: ['Pequena', 'Media', 'Grande', 'Mega Grande', 'Da casa'],
                        default: 0, 
                },
                {
                    name: 'quantidade',
                    type: 'input',
                    message: 'Quantas pizzas ?',
                },
                {
                    name: 'entrega',
                    type: 'list',
                    message: 'Gostaria da entrega?',
                    choices: ['Sim', 'Não'],
                    default: 0, 
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