import {prompt} from 'inquirer';
import {VpHttp} from './http/vphttp';

interface Isabores{
    sabor: string;
    disponivel: boolean;
}
interface Itamanhos{
    tamanhos: string;
    
}
interface Icidades{
    cidades: string;
    
}
interface Ibairro{
    bairro: string;
    
}
export class Perguntas {

    private dadosDaEntrega : any = null;
    private dadosDoPedido : any = null;
    private sabores : Array<Isabores> = [];
    private tamanhos : Array<Itamanhos> = [];
    private cidades : Array<Icidades> = [];
    private bairro : Array<Ibairro> = [];

    public servicoEntrega(){
        this.getSabores();
    }
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
                        choices: this.sabores.map(i => i.sabor),
                        default: 0,
                },
                {
                    name: 'tamanho',
                        type: 'list',
                        message: 'Qual sabor você gostaria?',
                        choices: this.tamanhos.map(i => i.tamanhos),
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
            (answers : any) => {
                this.dadosDoPedido = answers;

                if (this.dadosDoPedido.entrega === 'Sim'){
                    this.entrega();
                } else {
                    this.relatorio();
                }
            }
    );
}

public entrega(){
    prompt(
        [
            {
                name: 'cidade',
                type: 'list',
                message: 'Digite sua cidade',
                choices: this.cidades.map(i => i.cidades),
            },
            {
                name: 'bairro',
                type: 'list',
                message: 'Digite a seu bairro',
                choices: this.bairro.map(i => i.bairro),
            },
            {
                name: 'rua',
                type: 'input',
                message: 'Digite sua rua',
            },
            {
                name: 'numero',
                type: 'input',
                message: 'Digite seu numero',
            },
            {
                name: 'complemento',
                type: 'input',
                message: 'Digite um complemento',
            }
        ]
    ).then(
        (answers : any) => {
            this.dadosDaEntrega = answers;
            this.relatorio();
        }
    );
}

public relatorio(){
    console.log('--------------------------------');
    console.log(' Relatório do Pedido:\n');
    console.log(` Nome: ${this.dadosDoPedido.name}`);
    console.log(` Telefone: ${this.dadosDoPedido.telefone}`);
    console.log(` Tamanho: ${this.dadosDoPedido.tamanho}`);
    console.log(` Sabor: ${this.dadosDoPedido.sabor}`);
    console.log(` Quantidade: ${this.dadosDoPedido.quantidade}`);

    if (this.dadosDaEntrega === null) {
        console.log('--------------------------------');
        console.log(' O cliente irá buscar a pizza');
        console.log(' Obrigado pela preferência');
        console.log('--------------------------------');
    }else {
        console.log('--------------------------------');
        console.log(' Relarório da Entrega\n');
        console.log(` Cidade: ${this.dadosDaEntrega.cidade}`);
        console.log(` Bairro: ${this.dadosDaEntrega.bairro}`);
        console.log(` Rua: ${this.dadosDaEntrega.rua}`);
        console.log(` Número: ${this.dadosDaEntrega.numero}`);
        console.log(` Complemento: ${this.dadosDaEntrega.complemento}`);
        console.log(' Obrigado pela preferência');
        console.log('--------------------------------');
    }
}
public getSabores(){
    new VpHttp('http://5c64a0f4c969210014a32ee6.mockapi.io/sabores').get().subscribe(
        (data : any) => {
           this.sabores = data;
           this.getTamanhos();
        },
        (error : any) => {
            console.log(error);
        }
    );
}
public getTamanhos(){
    new VpHttp('http://5c64a0f4c969210014a32ee6.mockapi.io/tamanhos').get().subscribe(
        (data : any) => {
           this.tamanhos = data;
           this.getCidades();
           
        },
        (error : any) => {
            console.log(error);
        }
    );
}
public getCidades(){
    new VpHttp('http://5c64a0f4c969210014a32ee6.mockapi.io/cidades').get().subscribe(
        (data : any) => {
           this.cidades = data;
           this.getBairro();
           
        },
        (error : any) => {
            console.log(error);
        }
    );
}
public getBairro(){
    new VpHttp('http://5c64a0f4c969210014a32ee6.mockapi.io/bairro').get().subscribe(
        (data : any) => {
           this.bairro = data;
           this.facaUmaPergunta();
        },
        (error : any) => {
            console.log(error);
        }
    );
}
}